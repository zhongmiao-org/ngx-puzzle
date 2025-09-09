import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { SafeAny } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class DataSearchService {
  private http: HttpClient = inject(HttpClient);

  private orgCache = new Map<number, string>();

  webSearchMap(params: SafeAny): Observable<any> {
    return this.http.post('searchMap', params).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  rfd(orgId: number): Observable<string> {
    // 先检查缓存
    if (this.orgCache.has(orgId)) {
      return of(this.orgCache.get(orgId)!);
    }

    const rfdParams = {
      modelName: 'pmOrg',
      labelField: 'orgName',
      valueField: 'id',
      type: '=',
      fiter: orgId,
      whereField: 'id'
    };

    // 创建请求，提取 label 并缓存
    return this.http.post('RFD', rfdParams).pipe(
      map((response: any) => {
        const orgName = response[0]?.label || '';
        this.orgCache.set(orgId, orgName);
        return orgName;
      }),
      shareReplay(1)
    );
  }

  /**
   * 清空组织缓存
   */
  clearOrgCache() {
    this.orgCache.clear();
  }
}
