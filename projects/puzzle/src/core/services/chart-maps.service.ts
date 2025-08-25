import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ALL_CITIES, POINTS } from '../constants';
// import { convertGeoJSONToCustomFormat } from '../../shared';
import { mapLevelTypes } from '../types';
import { convertGeoJSONToCustomFormat } from 'ngx-puzzle/core/utils';

const geoJsonMap = {
  province: 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
  city: 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full_city.json'
};

@Injectable({
  providedIn: 'root'
})
export class ChartMapsService {
  private http = inject(HttpClient);

  getChinaMap(level: mapLevelTypes) {
    return this.http.get(geoJsonMap[level]).pipe(
      map((res) => {
        return {
          topology: res,
          data: ALL_CITIES,
          points: convertGeoJSONToCustomFormat(POINTS)
        };
      })
    );
  }
}
