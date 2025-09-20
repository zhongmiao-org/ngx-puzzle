import { Component, inject, OnDestroy } from '@angular/core';
import {
  NgxPuzzleHttpService,
  mainTypes,
  ComponentChartProps,
  ComponentConfig,
  DataRequestConfig,
  ApiSource,
  MockService,
  PuzzleCanvasMediatorService,
  CHART_DATA_OPTIONS,
  CHART_DEFAULT_MOCKS_MAP,
  ChartTypesEnum
} from '../../../../core';
import { SafeAny } from 'ngx-tethys/types';
import { takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { NgxPuzzleDragWrapperComponent } from '../drag-wrapper/ngx-puzzle-drag-wrapper.component';
import { NgxPuzzleCanvasBaseComponent } from '../base/ngx-puzzle-canvas-base.component';
import { PuzzleChartsComponent } from '../../../primitives';

@Component({
  selector: 'puzzle-chart',
  standalone: true,
  imports: [NgxPuzzleDragWrapperComponent, PuzzleChartsComponent],
  templateUrl: './ngx-puzzle-chart.component.html',
  styleUrl: './ngx-puzzle-chart.component.scss'
})
export class NgxPuzzleChartComponent extends NgxPuzzleCanvasBaseComponent<ComponentChartProps, ChartTypesEnum> implements OnDestroy {
  dataKey: mainTypes = 'chart';

  private mockService = inject(MockService);

  // 数据缓存：索引 -> 数据
  private cacheData: Map<number, SafeAny> = new Map();

  // 数据流订阅管理：索引 -> 订阅
  private dataStreamSubscriptions: Map<number, Subscription> = new Map();

  // 上一次的 API 源快照，用于计算增量变化（编辑模式）
  private lastApiSources: ApiSource[] = [];

  set config(config: ComponentConfig<ComponentChartProps, ChartTypesEnum>) {
    this.initConfig(config);
  }

  get config(): ComponentConfig<ComponentChartProps, ChartTypesEnum> {
    return this._config;
  }

  private httpService = inject(NgxPuzzleHttpService);

  constructor(mediator: PuzzleCanvasMediatorService<ComponentChartProps, ChartTypesEnum>) {
    super(mediator);
  }

  // 实现抽象方法：获取默认配置
  getDefaultOptions(subType: ChartTypesEnum): SafeAny {
    return CHART_DATA_OPTIONS[subType];
  }

  // 实现抽象方法：更新数据
  updateData(requestData: DataRequestConfig): void {
    const { apiSources } = requestData;

    if (this.isEdit) {
      // 编辑模式：使用上一份快照与新的 apiSources 计算差异
      const prevSources = this.lastApiSources || [];
      this.updateDataIncrementallyByApi(prevSources, apiSources || []);
      // 同步快照
      this.lastApiSources = (apiSources || []).map((s) => (s ? { ...s, params: s.params ? { ...s.params } : undefined } : s));
    } else {
      // 预览模式：全量更新并刷新快照
      this.updateDataCompletelyByApi(apiSources);
      this.lastApiSources = (apiSources || []).map((s) => (s ? { ...s, params: s.params ? { ...s.params } : undefined } : s));
    }
  }

  override afterUpdateConfig(): void {
    // 检测系列变化并补全数据
    this.handleSeriesChanges();
    this.restartRefreshTimer();
  }

  override setBaseDataRequest(): void {
    const dataRequest = this.config.dataRequest || {};
    this.mediator.updateDataRequest(this.config.id, dataRequest);
  }

  /**
   * 处理系列变化，检测哪些系列缺少数据并进行补全
   */
  private handleSeriesChanges(): void {
    const series = this.normalizeSeries();
    const { apiSources } = this.config.dataRequest || {};

    // 找出需要补全数据的系列信息（包含索引和名称）
    const seriesToUpdate: Array<{ index: number; name?: string }> = [];

    series.forEach((seriesItem, index) => {
      // 如果系列的 data 为空或者未定义，需要补全数据
      if (!seriesItem.data || (Array.isArray(seriesItem.data) && seriesItem.data.length === 0)) {
        seriesToUpdate.push({
          index,
          name: seriesItem.name
        });
      }
    });

    console.log(`[图表] 检测到需要补全数据的系列:`, seriesToUpdate);

    // 为需要的系列补全数据
    if (seriesToUpdate.length > 0) {
      this.updateDataForSeriesWithNames(seriesToUpdate, apiSources);
    }
  }

  /**
   * 为指定的系列更新数据（支持系列名称智能匹配）
   */
  private updateDataForSeriesWithNames(seriesToUpdate: Array<{ index: number; name?: string }>, dataStreams?: ApiSource[]): void {
    seriesToUpdate.forEach(({ index, name }) => {
      this.processDataForIndex(index, dataStreams, name);
    });
  }

  private updateDataIncrementallyByApi(prevStreams: ApiSource[], newStreamsInput?: ApiSource[]): void {
    const newDataStreams = newStreamsInput || [];

    // 检测变化并同步缓存（基于上一次与本次）
    this.syncDataCacheWithStreams(prevStreams, newDataStreams);

    // 对比数据流变化（基于上一次与本次）
    const dataStreamChanges = this.getDataStreamChanges(prevStreams, newDataStreams);

    console.log(`[图表] 编辑模式 - 数据流变化:`, dataStreamChanges);

    if (dataStreamChanges.length === 0) {
      console.log(`[图表] 没有数据变化`);
      return;
    }

    console.log(`[图表] 需要更新的索引:`, dataStreamChanges);

    this.updateDataByIndexes(dataStreamChanges, newDataStreams);
  }

  private updateDataCompletelyByApi(dataStreams?: ApiSource[]): void {
    let allIndexes: number[];

    if (!dataStreams || dataStreams.length === 0) {
      // 使用 mock 数据的默认索引
      allIndexes = CHART_DEFAULT_MOCKS_MAP[this.config.subType]?.map((_, index) => index) || [];
    } else {
      // 使用数据流的索引
      allIndexes = dataStreams.map((_, index) => index);
    }

    this.updateDataByIndexes(allIndexes, dataStreams);
  }

  /**
   * 同步数据缓存与数据流变化
   */
  private syncDataCacheWithStreams(currentStreams: ApiSource[], newStreams: ApiSource[]): void {
    console.log(`[图表缓存] 同步缓存`, {
      currentLength: currentStreams.length,
      newLength: newStreams.length,
      cacheSize: this.cacheData.size
    });

    // 1. 如果新数组比旧数组短，删除多余的缓存
    if (newStreams.length < currentStreams.length) {
      for (let i = newStreams.length; i < currentStreams.length; i++) {
        this.removeCachedData(i);
      }
    }

    // 2. 检测被删除/插入的项，重新排列缓存
    const maxLength = Math.max(currentStreams.length, newStreams.length);
    const newCacheData = new Map<number, SafeAny>();

    for (let i = 0; i < maxLength; i++) {
      const currentStream = currentStreams[i];
      const newStream = newStreams[i];

      if (newStream && currentStream && currentStream === newStream) {
        // 数据流没变，保持缓存
        if (this.cacheData.has(i)) {
          newCacheData.set(i, this.cacheData.get(i));
        }
      }
      // 如果数据流变了或者是新增的，不复制缓存（让后续重新请求）
    }

    // 更新缓存
    this.cacheData.clear();
    newCacheData.forEach((value, key) => {
      this.cacheData.set(key, value);
    });

    console.log(`[图表缓存] 缓存同步完成`, { newCacheSize: this.cacheData.size });
  }

  /**
   * 检测数据流变化，返回变化的索引
   */
  private getDataStreamChanges(current: ApiSource[], updated: ApiSource[]): number[] {
    const changes: number[] = [];
    const maxLength = Math.max(current.length, updated.length);

    for (let i = 0; i < maxLength; i++) {
      const currentStream = current[i];
      const updatedStream = updated[i];

      // 如果索引超出范围，认为是变化
      if (!currentStream || !updatedStream) {
        changes.push(i);
        continue;
      }

      // 对比数据源是否有变化（url/method/params）
      const serialize = (s: ApiSource) => `${s?.method || ''}|${s?.url || ''}|${JSON.stringify(s?.params || {})}`;
      if (serialize(currentStream) !== serialize(updatedStream)) {
        changes.push(i);
      }
    }

    return changes;
  }

  /**
   * 根据索引数组更新数据
   */
  private updateDataByIndexes(indexes: number[], dataStreams?: ApiSource[]): void {
    const series = this.normalizeSeries();

    indexes.forEach((index) => {
      const seriesName = series[index]?.name;
      this.processDataForIndex(index, dataStreams, seriesName);
    });
  }

  /**
   * 处理指定索引的数据
   */
  private processDataForIndex(index: number, dataStreams?: ApiSource[], seriesName?: string): void {
    console.log(`processDataForIndex`, { index, subType: this.config.subType, seriesName, hasDataStreams: !!dataStreams });

    // 获取对应索引的数据源
    const apiSource = dataStreams?.[index];

    if (!apiSource) {
      // 没有数据源，使用模拟数据
      const mockData = this.mockService.getMockData(this.config.subType, index, seriesName);
      console.log(`processDataForIndex mockData:`, { seriesName, mockData });
      this.setCachedData(index, mockData);
      this.updateChartData(mockData, index);
    } else {
      // 清理旧的订阅
      this.cleanupSubscription(index);

      // 基于数据源发起请求
      const request$ = this.httpService.request(apiSource);

      const subscription = request$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
        console.log(`processDataForIndex: API 返回数据`, { index, data });
        this.setCachedData(index, data);
        this.updateChartData(data, index);
      });

      // 保存订阅引用
      this.dataStreamSubscriptions.set(index, subscription);
    }
  }

  /**
   * 设置缓存数据
   */
  private setCachedData(index: number, data: SafeAny): void {
    this.cacheData.set(index, data);
    console.log(`[图表缓存] 设置缓存数据`, { index, cacheSize: this.cacheData.size });
  }

  /**
   * 删除缓存数据
   */
  private removeCachedData(index: number): void {
    this.cacheData.delete(index);
    this.cleanupSubscription(index);
    console.log(`[图表缓存] 删除缓存数据`, { index, cacheSize: this.cacheData.size });
  }

  /**
   * 清理指定索引的订阅
   */
  private cleanupSubscription(index: number): void {
    const subscription = this.dataStreamSubscriptions.get(index);
    if (subscription && !subscription.closed) {
      subscription.unsubscribe();
    }
    this.dataStreamSubscriptions.delete(index);
  }

  /**
   * 清理所有订阅和缓存
   */
  private cleanupAll(): void {
    console.log(`[图表缓存] 清理所有缓存和订阅`);

    // 清理所有订阅
    this.dataStreamSubscriptions.forEach((subscription) => {
      if (!subscription.closed) {
        subscription.unsubscribe();
      }
    });
    this.dataStreamSubscriptions.clear();

    // 清理所有缓存
    this.cacheData.clear();
  }

  // 统一的图表数据更新方法：始终写入 series[index].data
  private updateChartData(data: SafeAny, index: number): void {
    this.updateDataForSeries(data, index);
  }

  private normalizeSeries(): SafeAny[] {
    const chart = this.config.props.chart as SafeAny;
    let series = chart.series;
    if (!Array.isArray(series)) {
      // 将单个对象标准化为数组，便于统一写入逻辑
      series = series ? [series] : [];
      chart.series = series;
    }
    return series as SafeAny[];
  }

  private extractSeriesDataPayload(raw: SafeAny): SafeAny {
    console.log('extractSeriesDataPayload 原始数据:', raw);

    // 当返回对象中包含 data/values/seriesData 字段时，优先取这些常用数据字段
    if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
      // 检查 success 字段，确保是成功的响应
      if (raw.success !== false) {
        if (Array.isArray(raw.data)) {
          console.log('提取到 data 字段:', raw.data);
          return raw.data;
        }
        if (Array.isArray(raw.values)) {
          console.log('提取到 values 字段:', raw.values);
          return raw.values;
        }
        if (Array.isArray(raw.seriesData)) {
          console.log('提取到 seriesData 字段:', raw.seriesData);
          return raw.seriesData;
        }
      }

      // 如果响应失败，返回空数组避免图表报错
      if (raw.success === false) {
        console.warn('API 响应失败:', raw.message || '未知错误');
        return [];
      }
    }

    // 默认直接返回，支持数值数组、二维数组或对象数组
    console.log('使用原始数据:', raw);
    return raw;
  }

  private ensureSeriesItem(index: number): SafeAny {
    const series = this.normalizeSeries();
    while (series.length <= index) {
      series.push({});
    }
    return series[index];
  }

  private updateDataForSeries(data: SafeAny, index: number = 0): void {
    console.log(`updateDataForSeries`, { data, index });

    const seriesItem = this.ensureSeriesItem(index);
    const payload = this.extractSeriesDataPayload(data);

    console.log(`更新系列 ${index} 的数据:`, payload);

    seriesItem['data'] = payload;
    this.config.props.chart = {
      ...this.config.props.chart
    };

    console.log(`updateDataForSeries 直接更新 config.props.chart:`, this.config.props.chart);
    console.log(`当前系列配置:`, this.config.props.chart.series);
  }

  /**
   * 处理系列绑定删除 - 重写基类方法
   */
  protected override handleSeriesBindingDelete(seriesIndex: number): void {
    console.log(`[组件-${this._config.id}] 系列绑定已删除:`, seriesIndex);

    // 删除对应的缓存数据
    this.removeCachedData(seriesIndex);

    // 重新排列缓存：将后面的数据往前移
    const newCacheData = new Map<number, SafeAny>();
    const newSubscriptions = new Map<number, Subscription>();

    this.cacheData.forEach((value, key) => {
      if (key < seriesIndex) {
        // 保持位置不变
        newCacheData.set(key, value);
      } else if (key > seriesIndex) {
        // 往前移一位
        newCacheData.set(key - 1, value);
      }
      // key === seriesIndex 的项被跳过（删除）
    });

    this.dataStreamSubscriptions.forEach((subscription, key) => {
      if (key < seriesIndex) {
        // 保持位置不变
        newSubscriptions.set(key, subscription);
      } else if (key > seriesIndex) {
        // 往前移一位
        newSubscriptions.set(key - 1, subscription);
      }
      // key === seriesIndex 的项被跳过（删除）
    });

    // 更新缓存和订阅
    this.cacheData = newCacheData;
    this.dataStreamSubscriptions = newSubscriptions;

    console.log(`[图表缓存] 删除系列后重新排列`, {
      deletedIndex: seriesIndex,
      newCacheSize: this.cacheData.size
    });
  }

  override ngOnDestroy(): void {
    this.cleanupAll();
    super.ngOnDestroy();
  }
}
