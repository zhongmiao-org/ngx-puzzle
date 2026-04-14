import { inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, from, isObservable, of } from 'rxjs';
import {
  ApiSource,
  ComponentConfig,
  DataRequestConfig,
  NgxPuzzleControlChangeNotification,
  NgxPuzzleDataBindingRequest
} from '../../interfaces';
import { SafeAny } from '../../types';
import { NgxPuzzleHttpService } from '../internal/http.service';

export interface PuzzleDataSource {
  kind?: string;
  url?: string;
  method?: string;
  params?: Record<string, SafeAny>;
  [key: string]: SafeAny;
}

export interface PuzzleBindingContext {
  request: NgxPuzzleDataBindingRequest;
  currentDataRequest?: DataRequestConfig;
}

export interface PuzzleControlChangeContext {
  notification: NgxPuzzleControlChangeNotification;
  currentDataRequest?: DataRequestConfig;
}

export interface PuzzleSourceExecutionContext {
  source: PuzzleDataSource;
  componentConfig: ComponentConfig;
  dataRequest?: DataRequestConfig;
  seriesIndex?: number;
  isEdit: boolean;
}

export type PuzzleAdapterResult<T> = T | Promise<T> | Observable<T>;

@Injectable({
  providedIn: 'root'
})
export class DefaultPuzzleDataAdapter {
  private httpService = inject(NgxPuzzleHttpService);

  openBinding(_context: PuzzleBindingContext): PuzzleAdapterResult<DataRequestConfig | null> {
    return null;
  }

  onControlChange(_context: PuzzleControlChangeContext): PuzzleAdapterResult<DataRequestConfig | null> {
    return null;
  }

  getSources(dataRequest?: DataRequestConfig): PuzzleDataSource[] {
    return dataRequest?.sources || dataRequest?.apiSources || [];
  }

  executeSource(context: PuzzleSourceExecutionContext): PuzzleAdapterResult<SafeAny> {
    const { source } = context;

    if (!source?.url || !source?.method) {
      return null;
    }

    return this.httpService.request(source as ApiSource);
  }
}

export abstract class PuzzleDataAdapter extends DefaultPuzzleDataAdapter {}

export const PUZZLE_DATA_ADAPTER = new InjectionToken<PuzzleDataAdapter>('PUZZLE_DATA_ADAPTER', {
  providedIn: 'root',
  factory: () => inject(DefaultPuzzleDataAdapter) as PuzzleDataAdapter
});

export function adapterResultToObservable<T>(
  result: PuzzleAdapterResult<T> | null | undefined
): Observable<T | null | undefined> {
  if (isObservable(result)) {
    return result as Observable<T | null | undefined>;
  }

  if (result instanceof Promise) {
    return from(result);
  }

  return of(result);
}
