import { inject, Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {
  DataRequestConfig,
  NgxPuzzleControlChangeNotification,
  NgxPuzzleDataBindingRequest,
  NgxPuzzleDataBindingResponse
} from 'ngx-puzzle/core/interfaces';
import { SafeAny } from 'ngx-tethys/types';
import { PuzzleCanvasMediatorService } from 'ngx-puzzle/core';

@Injectable({
  providedIn: 'root'
})
export class NgxPuzzleDataBindingService {
  private mediator = inject(PuzzleCanvasMediatorService);

  // 数据绑定请求流
  private bindingRequestSubject = new Subject<NgxPuzzleDataBindingRequest>();
  public readonly bindingRequest$ = this.bindingRequestSubject.asObservable();

  // 数据绑定响应流
  private bindingResponseSubject = new Subject<NgxPuzzleDataBindingResponse>();
  public readonly bindingResponse$ = this.bindingResponseSubject.asObservable();

  // 控件变化通知流 - 通知外部控件变化了
  private controlChangeSubject = new Subject<NgxPuzzleControlChangeNotification>();
  public readonly controlChange$ = this.controlChangeSubject.asObservable();

  // 当前激活的绑定请求
  private activeRequestSubject = new BehaviorSubject<NgxPuzzleDataBindingRequest | null>(null);
  public readonly activeRequest$ = this.activeRequestSubject.asObservable();

  // 组件数据请求存储 - 用于 hash 对比
  private componentDataRequests = new Map<string, DataRequestConfig>();

  // 数据绑定删除通知流
  private bindingDeleteSubject = new Subject<{ componentId: string; seriesIndex: number }>();
  public readonly bindingDelete$ = this.bindingDeleteSubject.asObservable();

  /**
   * 请求数据绑定
   */
  requestBinding(request: NgxPuzzleDataBindingRequest): void {
    console.log('[NgxPuzzle数据绑定] 发起绑定请求:', request);
    this.activeRequestSubject.next(request);
    this.bindingRequestSubject.next(request);
  }

  /**
   * 响应数据绑定 - 外部传入数据流
   */
  responseBinding(response: NgxPuzzleDataBindingResponse): void {
    console.log('[NgxPuzzle数据绑定] 完成绑定响应:', response);
    const {componentId, dataRequest} = response;
    this.mediator.updateDataRequest(componentId, dataRequest)

    this.componentDataRequests.set(componentId, dataRequest);

    this.bindingResponseSubject.next(response);
    this.activeRequestSubject.next(null);
  }

  /**
   * 通知控件变化 - 内部调用，通知外部
   */
  notifyControlChange(componentId: string, controlId: string, controlFilters: SafeAny): void {
    console.log('[NgxPuzzle数据绑定] 通知控件变化:', { componentId, controlId, controlFilters });

    this.controlChangeSubject.next({
      componentId,
      controlId,
      controlFilters
    });
  }

  /**
   * 获取数据流的 hash - 用于对比
   */
  getDataStreamHash(dataStream: Observable<SafeAny>): string {
    // 简单使用流的引用作为标识
    return `stream_${(dataStream as any).__streamId || Math.random().toString(36)}`;
  }

  /**
   * 删除特定系列的数据绑定
   */
  removeSeriesBinding(componentId: string, seriesIndex: number): void {
    console.log('[NgxPuzzle数据绑定] 删除系列绑定:', { componentId, seriesIndex });

    const dataRequest = this.componentDataRequests.get(componentId);
    if (dataRequest && dataRequest.apiSources) {
      // 删除对应索引的数据流
      dataRequest.apiSources.splice(seriesIndex, 1);

      this.componentDataRequests.set(componentId, dataRequest);
      this.bindingDeleteSubject.next({ componentId, seriesIndex });
      this.bindingResponseSubject.next({ componentId, dataRequest });
    }
  }

  /**
   * 插入系列绑定
   */
  insertSeriesBinding(componentId: string, seriesIndex: number): void {
    console.log('[NgxPuzzle数据绑定] 插入系列绑定:', { componentId, seriesIndex });

    const dataRequest = this.componentDataRequests.get(componentId);
    if (dataRequest) {
      if (dataRequest.apiSources) {
        // 插入占位的 API 源（外部需要后续配置）
        dataRequest.apiSources.splice(seriesIndex, 0, { url: '', method: 'GET', params: {} } as any);
      }

      this.componentDataRequests.set(componentId, dataRequest);
      this.bindingResponseSubject.next({ componentId, dataRequest });
    }
  }

  /**
   * 获取组件的数据请求配置
   */
  getComponentDataRequest(componentId: string): DataRequestConfig | undefined {
    return this.componentDataRequests.get(componentId);
  }

  /**
   * 删除组件的所有数据请求配置
   */
  removeComponentDataRequest(componentId: string): void {
    this.componentDataRequests.delete(componentId);
  }

  /**
   * 获取当前激活的请求
   */
  getActiveRequest(): NgxPuzzleDataBindingRequest | null {
    return this.activeRequestSubject.value;
  }
}
