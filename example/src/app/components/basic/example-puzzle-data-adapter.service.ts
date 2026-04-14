import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ThyDialog } from 'ngx-tethys/dialog';
import {
  DataRequestConfig,
  NgxPuzzleControlChangeNotification,
  PuzzleBindingContext,
  PuzzleControlChangeContext,
  PuzzleDataAdapter,
  setDataRequestSources
} from '@zhongmiao/ngx-puzzle';
import { ExampleDataSourceDialogComponent } from './data-source-dialog.component';

@Injectable()
export class ExamplePuzzleDataAdapter extends PuzzleDataAdapter {
  private dialog = inject(ThyDialog);

  override openBinding(context: PuzzleBindingContext): Observable<DataRequestConfig | null> {
    const currentSources = context.currentDataRequest?.sources || context.currentDataRequest?.apiSources || [];
    const currentSource = currentSources[context.request.seriesIndex] || context.request.source || context.request.apiSource;
    const initialData: { type?: 'GET' | 'POST'; url?: string; body?: string } = {};

    if (currentSource?.method === 'GET' || currentSource?.method === 'POST') {
      initialData.type = currentSource.method;
      initialData.url = currentSource.url;

      if (currentSource.method === 'POST' && currentSource.params) {
        try {
          initialData.body = JSON.stringify(currentSource.params, null, 2);
        } catch {
          initialData.body = '';
        }
      }
    }

    const ref = this.dialog.open(ExampleDataSourceDialogComponent, {
      initialState: {
        inputType: initialData.type,
        inputUrl: initialData.url,
        inputBody: initialData.body
      }
    });

    return (ref.afterClosed() as Observable<{ type: 'GET' | 'POST'; url: string; body?: string } | undefined>).pipe(
      map((result) => {
        if (!result) {
          return null;
        }

        const source = this.createSource(result);
        if (!source) {
          return null;
        }

        const request = context.currentDataRequest || {};
        const nextSources = [...(request.sources || request.apiSources || [])];
        nextSources[context.request.seriesIndex] = source;
        return setDataRequestSources(request, nextSources);
      })
    );
  }

  override onControlChange(context: PuzzleControlChangeContext): DataRequestConfig | null {
    const currentDataRequest = context.currentDataRequest || {};
    const currentSources = currentDataRequest.sources || currentDataRequest.apiSources || [];

    if (!currentSources.length) {
      return null;
    }

    const nextSources = currentSources.map((source, index) => ({
      ...source,
      kind: source.kind || 'http',
      url: source.url || `/api/chart-data-${index + 1}`,
      method: source.method || 'POST',
      params: this.buildParamsFromFilters(context.notification)
    }));

    return setDataRequestSources(currentDataRequest, nextSources);
  }

  private createSource(result: { type: 'GET' | 'POST'; url: string; body?: string }) {
    if (!result?.url?.trim()) {
      return null;
    }

    const url = result.url.trim();
    if (result.type === 'POST') {
      let payload: Record<string, unknown>;
      try {
        payload = result.body ? JSON.parse(result.body) : {};
      } catch {
        payload = {};
      }

      return {
        kind: 'http',
        url,
        method: 'POST',
        params: payload
      };
    }

    return {
      kind: 'http',
      url,
      method: 'GET'
    };
  }

  private buildParamsFromFilters(notification: NgxPuzzleControlChangeNotification) {
    return {
      filters: notification.controlFilters
    };
  }
}
