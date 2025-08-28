import { NgxPuzzleDragWrapperComponent } from '../drag-wrapper/ngx-puzzle-drag-wrapper.component';
import { Component, inject, ViewChild } from '@angular/core';
import { NgxPuzzleCanvasBaseComponent } from '../base/ngx-puzzle-canvas-base.component';
import { ComponentChartProps, ComponentConfig, DataRequestConfig } from 'ngx-puzzle/core/interfaces';
import { mainTypes, mapLevelTypes } from 'ngx-puzzle/core/types';
import { ChartTypesEnum } from 'ngx-puzzle/core/enums';
import { CHART_DATA_OPTIONS, CHART_DEFAULT_MOCKS_MAP } from 'ngx-puzzle/core/constants';
import { SafeAny } from 'ngx-tethys/types';
import { map } from 'rxjs/operators';
import { AggregationService, ChartMapsService, DataSearchService, MockService, PuzzleCanvasMediatorService } from 'ngx-puzzle/core';
import { getChangedIndexes } from 'ngx-puzzle/core/utils/util';
import {
  NgxPuzzleChartsComponent
} from 'ngx-puzzle/components/primitives/ngx-puzzle-charts/ngx-puzzle-charts.component';

@Component({
  selector: 'app-chart',
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
  private chartData: SafeAny[] = [];

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

  override afterUpdateConfig() {
    // this.options = updateCharts(this.config.props.chart, { data: this.chartData[0] });
    // MapMarker subtype removed; map marker handling disabled.
    this.restartRefreshTimer();
  }

  override setBaseDataRequest() {
    const { paramSearch, aggregations } = this.config.dataRequest || {};
    this.mediator.updateDataRequest(this.config.id, { paramSearch, aggregations });
  }

  updateData(requestData: DataRequestConfig) {
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
      // this.updateDataCompletely(paramSearch, aggregations);
    }
  }

  private updateDataIncrementally(params?: SafeAny[], aggregations?: string[]) {
    const diffIndexes = getChangedIndexes(this.config?.dataRequest?.paramSearch || [], params || []);
    const aggDiffIndexes = getChangedIndexes(this.config?.dataRequest?.aggregations || [], aggregations || []);
    console.log(`[图表] 编辑模式 - 变更索引:`, diffIndexes, aggDiffIndexes);

    if (diffIndexes.length === 0 && aggDiffIndexes.length === 0) {
      console.log(`[图表] 没有数据变化`);
      return;
    }

    this.updateDataByIndexes(diffIndexes.length ? diffIndexes : aggDiffIndexes, params, aggregations);
  }

  private updateDataCompletely(params?: SafeAny[], aggregations?: string[]) {
    let allIndexes: number[];
    if (!params) {
      allIndexes = CHART_DEFAULT_MOCKS_MAP[this.config.subType]?.map((_, index) => index) || [];
    } else {
      allIndexes = params.map((_, index) => index);
    }
    this.updateDataByIndexes(allIndexes, params, aggregations);
  }

  private updateDataByIndexes(indexes: number[], params?: SafeAny[], aggregations?: string[]) {
    indexes.forEach((index) => {
      this.processDataForIndex(index, params, aggregations);
    });
  }

  // 提取的通用数据处理方法
  private processDataForIndex(index: number, params?: SafeAny[], aggregations?: string[],): void {
    if (!params || !params[index] || !params[index]?.modelName) {
      // 使用模拟数据
      const mockData = this.applyAggregationIfExists(this.mockService.getMockData(this.config.subType, index), aggregations, index);
      this.updateChartData(mockData, index);
    } else {
      // 从服务获取真实数据
      this.dataSearchService
        .webSearchMap(params[index])
        .pipe(map((data) => this.applyAggregationIfExists(data, aggregations, index)))
        .subscribe((data) => {
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
  private updateChartData(data: SafeAny, index: number) {
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

  private ensureSeriesItem(index: number) {
    const series = this.normalizeSeries();
    while (series.length <= index) {
      series.push({});
    }
    return series[index];
  }

  private updateDataForSeries(data: SafeAny, index: number = 0) {
    const seriesItem = this.ensureSeriesItem(index);
    const payload = this.extractSeriesDataPayload(data);
    seriesItem['data'] = payload;
    this.chartData[index] = payload;
  }

  getDefaultOptions(subType: ChartTypesEnum) {
    return CHART_DATA_OPTIONS[subType];
  }

}
