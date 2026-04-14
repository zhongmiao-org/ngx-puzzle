import { SafeAny } from '../types';

export interface DataSourceConfig {
  kind?: string;
  url?: string;
  method?: string;
  params?: Record<string, SafeAny>;
  [key: string]: SafeAny;
}

export interface DataRequestConfig {
  // 通用绑定扩展容器，由宿主 adapter 自行解释
  binding?: Record<string, SafeAny>;
  // 运行态扩展容器，由宿主 adapter 自行解释
  runtime?: Record<string, SafeAny>;
  // 推荐使用的通用数据源数组
  sources?: DataSourceConfig[];
  // 数据流数组 - 每个流对应一个系列（兼容旧版）
  apiSources?: ApiSource[];
  // 额外元数据，用于扩展
  metadata?: Record<string, SafeAny>;
}

export interface ApiSource extends DataSourceConfig {
  url: string;
  method: string;
  params?: Record<string, SafeAny>;
}

export interface NgxPuzzleDataBindingRequest {
  componentId: string;
  componentType: string;
  seriesIndex: number;
  dataRequest?: DataRequestConfig;
  source?: DataSourceConfig;
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
