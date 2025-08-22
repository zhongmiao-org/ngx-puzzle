import { Component, inject, ViewChild } from '@angular/core';
import {
	ComponentChartProps,
	ComponentConfig,
	DataRequestConfig,
	mainTypes,
	mapLevelTypes,
	SafeAny,
	ChartTypesEnum,
	CHART_DATA_OPTIONS,
	CHART_DEFAULT_MOCKS_MAP,
	CanvasMediatorService,
	AggregationService,
	ChartMapsService,
	DataSearchService,
	MockService,
} from '../../../../../core';
import { CanvasBaseComponent } from '../base/canvas-base.component';
import { AgChartOptions } from 'ag-charts-community';
import { AgCharts } from 'ag-charts-angular';
import { getChangedIndexes, updateCharts } from '../../../../utils';
import { DragWrapperComponent } from '../../drag-wrapper/drag-wrapper.component';
import { AgBubbleSeriesOptions, AgScatterSeriesOptions, AgTopologySeriesOptions } from 'ag-charts-enterprise';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { Search } from 'imm-element-ui';
import { map } from 'rxjs/operators';

@Component({
	selector: 'imm-bi-chart',
	standalone: true,
	imports: [DragWrapperComponent, AgCharts, DatePickerModule, FormsModule],
	templateUrl: './chart.component.html',
	styleUrl: './chart.component.scss',
})
export class ChartComponent extends CanvasBaseComponent<ComponentChartProps, ChartTypesEnum> {
	@ViewChild(AgCharts, { static: false }) private charts!: AgCharts;

	dataKey: mainTypes = 'chart';

	private aggregationService = inject(AggregationService);
	private mockService = inject(MockService);
	private dataSearchService = inject(DataSearchService);
	private chartMapService = inject(ChartMapsService);
	private chartData: SafeAny[] = [];

	set config(config: ComponentConfig<ComponentChartProps, ChartTypesEnum>) {
		this.initConfig(config);
	}

	get config(): ComponentConfig<ComponentChartProps, ChartTypesEnum> {
		return this._config;
	}

	get hasChartRef() {
		return !!this?.charts?.chart;
	}

	public options!: AgChartOptions;

	constructor(mediator: CanvasMediatorService<ComponentChartProps, ChartTypesEnum>) {
		super(mediator);
	}

	override afterUpdateConfig() {
		this.options = updateCharts(this.config.props.chart, { data: this.chartData[0] });
		if (this.config.subType === ChartTypesEnum.mapMarker) {
			this.handleMapMarkerUpdate();
		}
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
			this.updateDataCompletely(paramSearch, aggregations);
		}
	}

	private updateDataIncrementally(params?: Search[], aggregations?: string[]) {
		const diffIndexes = getChangedIndexes(this.config?.dataRequest?.paramSearch || [], params || []);
		const aggDiffIndexes = getChangedIndexes(this.config?.dataRequest?.aggregations || [], aggregations || []);
		console.log(`[图表] 编辑模式 - 变更索引:`, diffIndexes, aggDiffIndexes);

		if (diffIndexes.length === 0 && aggDiffIndexes.length === 0) {
			console.log(`[图表] 没有数据变化`);
			return;
		}

		this.updateDataByIndexes(diffIndexes.length ? diffIndexes : aggDiffIndexes, params, aggregations);
	}

	private updateDataCompletely(params?: Search[], aggregations?: string[]) {
		let allIndexes: number[];
		if (!params) {
			allIndexes = CHART_DEFAULT_MOCKS_MAP[this.config.subType]?.map((_, index) => index) || [];
		} else {
			allIndexes = params.map((_, index) => index);
		}
		this.updateDataByIndexes(allIndexes, params, aggregations);
	}

	private updateDataByIndexes(indexes: number[], params?: Search[], aggregations?: string[]) {
		const isScatterOrBubble = this.config.subType === ChartTypesEnum.bubble || this.config.subType === ChartTypesEnum.scatter;

		indexes.forEach((index) => {
			this.processDataForIndex(index, params, aggregations, isScatterOrBubble);
		});
	}

	// 提取的通用数据处理方法
	private processDataForIndex(index: number, params?: Search[], aggregations?: string[], isScatterOrBubble?: boolean) {
		if (!params || !params[index] || !params[index]?.modelName) {
			// 使用模拟数据
			const mockData = this.applyAggregationIfExists(this.mockService.getMockData(this.config.subType, index), aggregations, index);
			this.updateChartData(mockData, index, isScatterOrBubble);
		} else {
			// 从服务获取真实数据
			this.dataSearchService
				.webSearchMap(params[index])
				.pipe(map((data) => this.applyAggregationIfExists(data, aggregations, index)))
				.subscribe((data) => {
					this.updateChartData(data, index, isScatterOrBubble);
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

	// 统一的图表数据更新方法
	private updateChartData(data: SafeAny, index: number, isScatterOrBubble?: boolean) {
		if (isScatterOrBubble) {
			this.updateDataForSeries(data, index);
		} else {
			this.updateDataForOptions(data, index);
		}
	}

	private updateDataForOptions(data: SafeAny, index: number = 0) {
		this.chartData[index] = data;
		if (this.hasChartRef) {
			this.charts?.chart?.updateDelta({ data });
		}
	}

	private updateDataForSeries(data: SafeAny, index: number = 0) {
		let series = this.config.props.chart.series as AgBubbleSeriesOptions[] | AgScatterSeriesOptions[];
		series[index]['data'] = data;
		this.chartData[index] = data;
		if (this.hasChartRef) {
			this.charts?.chart?.updateDelta({ series });
		}
	}

	getDefaultOptions(subType: ChartTypesEnum) {
		return CHART_DATA_OPTIONS[subType];
	}

	// 提取的地图标记更新处理逻辑
	private handleMapMarkerUpdate() {
		let dataList: SafeAny[][] = [];

		if (this.hasChartRef && this.charts?.chart?.getOptions()) {
			const { hasChangeLevel, levelValue, dataList: extractedDataList } = this.extractMapChangeInfo();
			dataList = extractedDataList;

			if (hasChangeLevel) {
				this.getTopology(levelValue);
			}

			this.updateMapOptions(dataList);
		} else {
			this.handleInitialMapTopology();
		}
	}

	// 提取地图变更信息
	private extractMapChangeInfo() {
		const lastOptionsSeries = this.charts?.chart?.getOptions().series as Record<string, SafeAny>[];
		const seriesKey = 'levelKey';
		const seriesDataKey = 'data';

		let hasChangeLevel = false;
		let levelValue: mapLevelTypes = 'province';
		let dataList: SafeAny[][] = [];

		for (let i = 0; i < lastOptionsSeries.length; i++) {
			dataList.push(lastOptionsSeries[i][seriesDataKey]);

			if (!hasChangeLevel) {
				hasChangeLevel = lastOptionsSeries[i][seriesKey] !== (this.config.props.chart.series as Record<string, SafeAny>[])[i][seriesKey];
				levelValue = (this.config.props.chart.series as Record<string, SafeAny>[])[i][seriesKey];
			}
		}

		return { hasChangeLevel, levelValue, dataList };
	}

	// 更新地图选项
	private updateMapOptions(dataList: SafeAny[][]) {
		if (this.hasChartRef) {
			console.log(`[图表] 更新地图数据:`, dataList.length);
			this.options = {
				...this.options,
				series: (this.options.series as AgTopologySeriesOptions[]).map((item: AgTopologySeriesOptions, index: number) => {
					if (dataList?.[index]) {
						return {
							...item,
							// @ts-ignore
							data: dataList[index],
						};
					}
					return item;
				}),
			};
			this.charts?.chart?.update(this.options);
		}
	}

	// 处理初始地图拓扑
	private handleInitialMapTopology() {
		const topology = (this.config.props.chart.series as AgTopologySeriesOptions[])[0].topology;
		if (topology === null) {
			this.getTopology();
		}
	}

	getTopology(level: mapLevelTypes = 'province') {
		this.chartMapService.getChinaMap(level).subscribe(({ topology, points }) => {
			let series = this.options.series as AgTopologySeriesOptions[];
			console.log(`[图表] 获取地图拓扑数据: ${level}`);

			series = series.map((seriesItem) => {
				if (seriesItem.type === 'map-shape-background') {
					return {
						...seriesItem,
						topology,
					};
				} else if (seriesItem.type === 'map-marker') {
					return {
						...seriesItem,
						data: points,
					};
				}
				return seriesItem;
			});

			if (this.hasChartRef) {
				this.charts?.chart?.updateDelta({ series });
			}
		});
	}
}
