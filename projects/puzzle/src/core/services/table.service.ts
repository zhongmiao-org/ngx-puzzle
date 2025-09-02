import { Injectable } from '@angular/core';
import { SafeAny } from '../types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(private http: HttpClient) {}

  getRowGroupingData(url: string): Observable<SafeAny> {
    return this.http.get(url);
  }
}
