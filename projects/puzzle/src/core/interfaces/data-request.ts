import { SafeAny } from 'ngx-puzzle/core';

export interface DataRequestConfig {
  // 数据流数组 - 每个流对应一个系列
  apiSources?: ApiSource[];
  // 额外元数据，用于扩展
  metadata?: Record<string, SafeAny>;
}

export interface ApiSource {
  url: string;
  method: string;
  params?: Record<string, SafeAny>;
}

export interface NgxPuzzleDataBindingRequest {
  componentId: string;
  componentType: string;
  seriesIndex: number;
  apiSource?: ApiSource;
}

export interface NgxPuzzleDataBindingResponse {
  componentId: string;
  dataRequest: DataRequestConfig;
}

export interface NgxPuzzleControlChangeNotification {
  componentId: string;
  controlId: string;
  controlFilters: SafeAny;
}
