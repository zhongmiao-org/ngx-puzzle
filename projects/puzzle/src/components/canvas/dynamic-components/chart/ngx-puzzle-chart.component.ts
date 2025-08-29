import { NgxPuzzleDragWrapperComponent } from '../drag-wrapper/ngx-puzzle-drag-wrapper.component';
import { Component, inject } from '@angular/core';
import { NgxPuzzleCanvasBaseComponent } from '../base/ngx-puzzle-canvas-base.component';
import { ComponentChartProps, ComponentConfig, DataRequestConfig } from 'ngx-puzzle/core/interfaces';
import { mainTypes } from 'ngx-puzzle/core/types';
import { ChartTypesEnum } from 'ngx-puzzle/core/enums';
import { CHART_DATA_OPTIONS, CHART_DEFAULT_MOCKS_MAP } from 'ngx-puzzle/core/constants';
import { SafeAny } from 'ngx-tethys/types';
import { map } from 'rxjs/operators';
import { AggregationService, DataSearchService, MockService, PuzzleCanvasMediatorService } from 'ngx-puzzle/core';
import { getChangedIndexes } from 'ngx-puzzle/core/utils/util';
import { NgxPuzzleChartsComponent } from 'ngx-puzzle/components/primitives/ngx-puzzle-charts/ngx-puzzle-charts.component';

@Component({
  selector: 'puzzle-chart',
  standalone: true,
  imports: [NgxPuzzleDragWrapperComponent, NgxPuzzleChartsComponent],
  templateUrl: './ngx-puzzle-chart.component.html',
  styleUrl: './ngx-puzzle-chart.component.scss'
})
export class NgxPuzzleChartComponent extends NgxPuzzleCanvasBaseComponent<ComponentChartProps, ChartTypesEnum> {
  dataKey: mainTypes = 'chart';

  private aggregationService = inject(AggregationService);
  private mockService = inject(MockService);
  private dataSearchService = inject(DataSearchService);

  set config(config: ComponentConfig<ComponentChartProps, ChartTypesEnum>) {
    this.initConfig(config);
  }

  get config(): ComponentConfig<ComponentChartProps, ChartTypesEnum> {
    return this._config;
  }

  // get hasChartRef() {
  //   // return !!this?.charts?.chart;
  // }

  public options!: SafeAny;

  constructor(mediator: PuzzleCanvasMediatorService<ComponentChartProps, ChartTypesEnum>) {
    super(mediator);
  }

  // 实现抽象方法：获取默认配置
  getDefaultOptions(subType: ChartTypesEnum): SafeAny {
    return CHART_DATA_OPTIONS[subType];
  }

  // 实现抽象方法：更新数据
  updateData(requestData: DataRequestConfig): void {
    const { paramSearch, aggregations } = requestData;
    if (this.isEdit) {
      // 编辑模式：增量更新
      this.updateDataIncrementally(paramSearch, aggregations);
    } else {
      // 如果 controlFilter 存在就塞入到 paramSearch
      if (this.controlFilter && this.controlFilter.length) {
        paramSearch?.forEach((item) => {
          let newColumnFilters;
          if (item?.columnFilters && item.columnFilters?.length) {
            newColumnFilters = item.columnFilters.concat(this.controlFilter);
          } else {
            newColumnFilters = this.controlFilter;
          }
          item['columnFilters'] = newColumnFilters;
        });
      }
      // 预览模式：全量更新
      this.updateDataCompletely(paramSearch, aggregations);
    }
  }

  override afterUpdateConfig(): void {
    // 检测系列变化并补全数据
    this.handleSeriesChanges();

    this.restartRefreshTimer();
  }

  override setBaseDataRequest(): void {
    const { paramSearch, aggregations } = this.config.dataRequest || {};
    this.mediator.updateDataRequest(this.config.id, { paramSearch, aggregations });
  }

  /**
   * 处理系列变化，检测哪些系列缺少数据并进行补全
   */
  private handleSeriesChanges(): void {
    const series = this.normalizeSeries();
    const { paramSearch, aggregations } = this.config.dataRequest || {};

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
      this.updateDataForSeriesWithNames(seriesToUpdate, paramSearch, aggregations);
    }
  }

  /**
   * 为指定的系列更新数据（支持系列名称智能匹配）
   */
  private updateDataForSeriesWithNames(
    seriesToUpdate: Array<{ index: number; name?: string }>,
    params?: SafeAny[],
    aggregations?: string[]
  ): void {
    seriesToUpdate.forEach(({ index, name }) => {
      this.processDataForIndex(index, params, aggregations, name);
    });
  }

  private updateDataIncrementally(params?: SafeAny[], aggregations?: string[]): void {
    const diffIndexes = getChangedIndexes(this.config?.dataRequest?.paramSearch || [], params || []);
    const aggDiffIndexes = getChangedIndexes(this.config?.dataRequest?.aggregations || [], aggregations || []);
    console.log(`[图表] 编辑模式 - 变更索引:`, diffIndexes, aggDiffIndexes);

    if (diffIndexes.length === 0 && aggDiffIndexes.length === 0) {
      console.log(`[图表] 没有数据变化`);
      return;
    }
    console.log(`updateDataIncrementally`);
    this.updateDataByIndexes(diffIndexes.length ? diffIndexes : aggDiffIndexes, params, aggregations);
  }

  private updateDataCompletely(params?: SafeAny[], aggregations?: string[]): void {
    let allIndexes: number[];
    if (!params) {
      allIndexes = CHART_DEFAULT_MOCKS_MAP[this.config.subType]?.map((_, index) => index) || [];
    } else {
      allIndexes = params.map((_, index) => index);
    }
    this.updateDataByIndexes(allIndexes, params, aggregations);
  }

  /**
   * 根据索引数组更新数据（支持系列名称智能匹配）
   */
  private updateDataByIndexes(indexes: number[], params?: SafeAny[], aggregations?: string[]): void {
    const series = this.normalizeSeries();
    indexes.forEach((index) => {
      const seriesName = series[index]?.name;
      this.processDataForIndex(index, params, aggregations, seriesName);
    });
  }

  /**
   * 处理指定索引的数据（支持系列名称智能匹配）
   * @param index 系列索引
   * @param params 请求参数数组
   * @param aggregations 聚合函数数组
   * @param seriesName 系列名称，用于智能匹配 mock 数据
   */
  private processDataForIndex(index: number, params?: SafeAny[], aggregations?: string[], seriesName?: string): void {
    console.log(`processDataForIndex`, { index, subType: this.config.subType, seriesName, hasParams: !!params?.[index] });

    if (!params || !params[index] || !params[index]?.modelName) {
      // 使用模拟数据，传递系列名称进行智能匹配
      const rawMockData = this.mockService.getMockData(this.config.subType, index, seriesName);
      const mockData = this.applyAggregationIfExists(rawMockData, aggregations, index);
      console.log(`processDataForIndex mockData:`, { seriesName, rawMockData, processedData: mockData });
      this.updateChartData(mockData, index);
    } else {
      // 从服务获取真实数据
      console.log(`processDataForIndex: 从服务获取数据`, params[index]);
      this.dataSearchService
        .webSearchMap(params[index])
        .pipe(map((data) => this.applyAggregationIfExists(data, aggregations, index)))
        .subscribe((data) => {
          console.log(`processDataForIndex: 服务返回数据`, data);
          this.updateChartData(data, index);
        });
    }
  }

  private applyAggregationIfExists(data: any, aggregations?: string[], index: number = 0): any {
    const aggregation = aggregations?.[index];

    if (aggregation) {
      try {
        // 使用聚合服务执行函数
        const result = this.aggregationService.execute(aggregation, data);
        console.log(`[图表] 聚合处理结果:`, result);
        return result;
      } catch (error) {
        console.error(`[图表] 聚合处理失败:`, error);
        return data;
      }
    }
    return data;
  }

  // 统一的图表数据更新方法：始终写入 series[index].data
  private updateChartData(data: SafeAny, index: number): void {
    this.updateDataForSeries(data, index);
  }

  private normalizeSeries(): SafeAny[] {
    const chart = this.config.props.chart as SafeAny;
    let series = chart.series as SafeAny;
    if (!Array.isArray(series)) {
      // 将单个对象标准化为数组，便于统一写入逻辑
      series = series ? [series] : [];
      chart.series = series;
    }
    return series as SafeAny[];
  }

  private extractSeriesDataPayload(raw: SafeAny): SafeAny {
    // 当返回对象中包含 data/values/seriesData 字段时，优先取这些常用数据字段
    if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
      if (Array.isArray(raw.data)) return raw.data;
      if (Array.isArray((raw as any).values)) return (raw as any).values;
      if (Array.isArray((raw as any).seriesData)) return (raw as any).seriesData;
    }
    // 默认直接返回，支持数值数组、二维数组或对象数组（由聚合函数自行处理）
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
    seriesItem['data'] = payload;

    // 更新组件的 options 以触发图表重新渲染
    this.options = { ...this.config.props.chart };
    console.log(`updateDataForSeries updated options:`, this.options);
  }
}
