import { inject, Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {
  DataRequestConfig,
  NgxPuzzleControlChangeNotification,
  NgxPuzzleDataBindingRequest,
  NgxPuzzleDataBindingResponse
} from '../../interfaces';
import { SafeAny } from 'ngx-tethys/types';
import { PuzzleCanvasMediatorService } from '../internal';
import { adapterResultToObservable, PUZZLE_DATA_ADAPTER } from './puzzle-data-adapter';
import { normalizeDataRequest, setDataRequestSources } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class NgxPuzzleDataBindingService {
  private dataAdapter = inject(PUZZLE_DATA_ADAPTER);

  private bindingRequestSubject = new Subject<NgxPuzzleDataBindingRequest>();
  public readonly bindingRequest$ = this.bindingRequestSubject.asObservable();

  private bindingResponseSubject = new Subject<NgxPuzzleDataBindingResponse>();
  public readonly bindingResponse$ = this.bindingResponseSubject.asObservable();

  private controlChangeSubject = new Subject<NgxPuzzleControlChangeNotification>();
  public readonly controlChange$ = this.controlChangeSubject.asObservable();

  private activeRequestSubject = new BehaviorSubject<NgxPuzzleDataBindingRequest | null>(null);
  public readonly activeRequest$ = this.activeRequestSubject.asObservable();

  private componentDataRequests = new Map<string, DataRequestConfig>();

  private bindingDeleteSubject = new Subject<{ componentId: string; seriesIndex: number }>();
  public readonly bindingDelete$ = this.bindingDeleteSubject.asObservable();

  constructor(private mediator: PuzzleCanvasMediatorService) {}

  requestBinding(request: NgxPuzzleDataBindingRequest): void {
    console.log('[NgxPuzzle数据绑定] 发起绑定请求:', request);
    this.activeRequestSubject.next(request);
    this.bindingRequestSubject.next(request);
    this.tryHandleBindingWithAdapter(request);
  }

  responseBinding(response: NgxPuzzleDataBindingResponse): void {
    console.log('[NgxPuzzle数据绑定] 完成绑定响应:', response);
    const { componentId, dataRequest } = response;
    const normalizedRequest = normalizeDataRequest(dataRequest);

    this.mediator.updateDataRequest(componentId, normalizedRequest);
    this.componentDataRequests.set(componentId, normalizedRequest);
    this.bindingResponseSubject.next({
      ...response,
      dataRequest: normalizedRequest
    });
    this.activeRequestSubject.next(null);
  }

  notifyControlChange(componentId: string, controlId: string, controlFilters: SafeAny): void {
    console.log('[NgxPuzzle数据绑定] 通知控件变化:', { componentId, controlId, controlFilters });

    const notification = {
      componentId,
      controlId,
      controlFilters
    };

    this.controlChangeSubject.next(notification);
    this.tryHandleControlChangeWithAdapter(notification);
  }

  getDataStreamHash(dataStream: Observable<SafeAny>): string {
    return `stream_${(dataStream as any).__streamId || Math.random().toString(36)}`;
  }

  removeSeriesBinding(componentId: string, seriesIndex: number): void {
    console.log('[NgxPuzzle数据绑定] 删除系列绑定:', { componentId, seriesIndex });

    const dataRequest = this.componentDataRequests.get(componentId);
    if (!dataRequest) {
      return;
    }

    const nextSources = [...(dataRequest.sources || dataRequest.apiSources || [])];
    nextSources.splice(seriesIndex, 1);
    const updatedRequest = setDataRequestSources(dataRequest, nextSources);

    this.componentDataRequests.set(componentId, updatedRequest);
    this.bindingDeleteSubject.next({ componentId, seriesIndex });
    this.bindingResponseSubject.next({ componentId, dataRequest: updatedRequest });
  }

  insertSeriesBinding(componentId: string, seriesIndex: number): void {
    console.log('[NgxPuzzle数据绑定] 插入系列绑定:', { componentId, seriesIndex });

    const dataRequest = this.componentDataRequests.get(componentId);
    if (!dataRequest) {
      return;
    }

    const nextSources = [...(dataRequest.sources || dataRequest.apiSources || [])];
    nextSources.splice(seriesIndex, 0, { url: '', method: 'GET', params: {} } as any);
    const updatedRequest = setDataRequestSources(dataRequest, nextSources);

    this.componentDataRequests.set(componentId, updatedRequest);
    this.bindingResponseSubject.next({ componentId, dataRequest: updatedRequest });
  }

  getComponentDataRequest(componentId: string): DataRequestConfig | undefined {
    return this.componentDataRequests.get(componentId);
  }

  removeComponentDataRequest(componentId: string): void {
    this.componentDataRequests.delete(componentId);
  }

  getActiveRequest(): NgxPuzzleDataBindingRequest | null {
    return this.activeRequestSubject.value;
  }

  private tryHandleBindingWithAdapter(request: NgxPuzzleDataBindingRequest): void {
    const currentDataRequest = this.getComponentDataRequest(request.componentId);
    const result = this.dataAdapter.openBinding({
      request: {
        ...request,
        dataRequest: currentDataRequest,
        source: request.source || request.apiSource
      },
      currentDataRequest
    });

    adapterResultToObservable(result).subscribe((resolvedDataRequest) => {
      if (!resolvedDataRequest) {
        return;
      }

      this.responseBinding({
        componentId: request.componentId,
        dataRequest: resolvedDataRequest
      });
    });
  }

  private tryHandleControlChangeWithAdapter(notification: NgxPuzzleControlChangeNotification): void {
    const currentDataRequest = this.getComponentDataRequest(notification.componentId);
    const result = this.dataAdapter.onControlChange({
      notification,
      currentDataRequest
    });

    adapterResultToObservable(result).subscribe((resolvedDataRequest) => {
      if (!resolvedDataRequest) {
        return;
      }

      this.responseBinding({
        componentId: notification.componentId,
        dataRequest: resolvedDataRequest
      });
    });
  }
}
