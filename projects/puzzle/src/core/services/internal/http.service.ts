import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiSource } from 'ngx-puzzle/core';
import { SafeAny } from 'ngx-puzzle/core';

@Injectable({ providedIn: 'root' })
export class NgxPuzzleHttpService {
  private http = inject(HttpClient);

  request<T = SafeAny>(api: ApiSource): Observable<T> {
    const method = (api.method || 'GET').toUpperCase();
    const url = api.url;
    const params = api.params || {};

    if (!url) {
      return throwError(() => new Error('NgxPuzzleHttpService: url is required'));
    }

    switch (method) {
      case 'POST':
        return this.http.post<T>(url, params).pipe(
          catchError((err) => {
            console.warn('[NgxPuzzleHttpService] POST error', { url, err });
            return throwError(() => err);
          })
        );
      case 'GET':
      default: {
        // For GET, params go to querystring
        const httpParams = new HttpParams({ fromObject: params as Record<string, string> });
        return this.http.get<T>(url, { params: httpParams as SafeAny }).pipe(
          catchError((err) => {
            console.warn('[NgxPuzzleHttpService] GET error', { url, err });
            return throwError(() => err);
          })
        );
      }
    }
  }
}
