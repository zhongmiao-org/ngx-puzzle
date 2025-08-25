import { Injectable } from '@angular/core';
import * as MockData from './mock-data';
import { ChartTypesEnum } from '../enums';
import { CHART_DEFAULT_MOCKS_MAP } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class MockService {
  private mockData = MockData;

  constructor() { }

  /**
	 * Get specific mock data by key
	 * @param subType The key of the mock data
	 * @param index key's index
	 * @returns The requested mock data
	 */
  getMockData(subType: ChartTypesEnum, index: number): any {
		let key = CHART_DEFAULT_MOCKS_MAP[subType]![index];
    return (this.mockData as any)[key];
  }
}
