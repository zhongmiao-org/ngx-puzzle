import { Injectable } from '@angular/core';
import * as MockData from './mock-data';
import { ChartTypesEnum } from '../enums';
import { CHART_DEFAULT_MOCKS_MAP } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class MockService {
  private mockData = MockData;

  constructor() {}

  /**
   * 获取特定的 mock 数据
   * @param subType 图表类型
   * @param index 系列索引
   * @param seriesName 系列名称（可选，用于智能匹配）
   * @returns 请求的 mock 数据
   */
  getMockData(subType: ChartTypesEnum, index: number, seriesName?: string): any {
    // 方案1：基于系列名称的智能匹配
    if (seriesName) {
      const mockKey = this.getMockKeyBySeriesName(subType, seriesName);
      if (mockKey && (this.mockData as any)[mockKey]) {
        console.log(`getMockData by name: ${seriesName} -> ${mockKey}`);
        return (this.mockData as any)[mockKey];
      }
    }

    // 回退到索引方式
    const mockKeys = CHART_DEFAULT_MOCKS_MAP[subType];
    if (!mockKeys || index >= mockKeys.length) {
      console.warn(`getMockData: 索引 ${index} 超出范围或不存在 mock 数据`);
      return [];
    }

    const key = mockKeys[index];
    console.log(`getMockData by index: ${index} -> ${key}`);
    return (this.mockData as any)[key];
  }

  /**
   * 根据系列名称获取对应的 mock 数据键
   */
  private getMockKeyBySeriesName(subType: ChartTypesEnum, seriesName: string): string | null {
    // 定义系列名称到 mock 数据键的映射
    const seriesNameMappings: Partial<{ [key in ChartTypesEnum]: Record<string, string> }> = {
      [ChartTypesEnum.bar]: {
        '2012': 'bar2012',
        '2013': 'bar2013',
        '2014': 'bar2014',
        '2015': 'bar2015',
        '2016': 'bar2016'
      },
      [ChartTypesEnum.line]: {
        Subscriptions: 'lineSubscriptions',
        Services: 'lineServices',
        Products: 'lineProducts'
      },
      [ChartTypesEnum.radar]: {
        'Allocated Budget': 'radarData',
        'Actual Spending': 'radarData2'
      },
      [ChartTypesEnum.scatter]: {
        Male: 'scatterMale',
        Female: 'scatterFemale'
      }
    };

    const mapping = seriesNameMappings[subType];
    return mapping?.[seriesName] || null;
  }

  /**
   * 获取所有可用的 mock 数据键
   */
  getAvailableMockKeys(subType: ChartTypesEnum): string[] {
    return CHART_DEFAULT_MOCKS_MAP[subType] || [];
  }
}
