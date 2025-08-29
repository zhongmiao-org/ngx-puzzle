import { ChartAxesTypeOption, BaseSelectOption } from '../interfaces';
import { ChartAxesTypesEnum, ChartTypesEnum } from '../enums';
import { keyBy } from 'lodash';

export const CHART_SERIES_TYPE_OPTIONS: BaseSelectOption<ChartTypesEnum>[] = [
  { label: '柱状图', val: ChartTypesEnum.bar },
  { label: '折线图', val: ChartTypesEnum.line },
  { label: '散点图', val: ChartTypesEnum.scatter },
  { label: '饼图', val: ChartTypesEnum.pie },
  { label: '箱线图（盒须图）', val: ChartTypesEnum.boxPlot },
  { label: 'K线图', val: ChartTypesEnum.candlestick },
  { label: '雷达图', val: ChartTypesEnum.radar },
  { label: '热力图', val: ChartTypesEnum.heatmap },
  { label: '旭日图', val: ChartTypesEnum.sunburst },
  { label: '矩形树图', val: ChartTypesEnum.treemap },
  { label: '桑基图', val: ChartTypesEnum.sankey },
  { label: '弦图', val: ChartTypesEnum.chord },
  { label: '漏斗图', val: ChartTypesEnum.funnel },
  { label: '涟漪散点图', val: ChartTypesEnum.effectScatter },
  // { label: '线段图', val: ChartTypesEnum.lines },
  // { label: '地图', val: ChartTypesEnum.map },
  { label: '平行坐标', val: ChartTypesEnum.parallel },
  // { label: '象形柱图', val: ChartTypesEnum.pictorialBar },
  { label: '主题河流图', val: ChartTypesEnum.themeRiver },
  { label: '树图', val: ChartTypesEnum.tree },
  { label: '仪表盘', val: ChartTypesEnum.gauge },
  { label: '关系图', val: ChartTypesEnum.graph },
];

export const CHART_SERIES_TYPE_OPTIONS_BY_KEY: { [key in ChartTypesEnum]: BaseSelectOption<ChartTypesEnum> } = keyBy(CHART_SERIES_TYPE_OPTIONS, 'val') as {
	[key in ChartTypesEnum]: BaseSelectOption<ChartTypesEnum>;
};

export const CHART_AXES_TYPE_OPTIONS: ChartAxesTypeOption[] = [
	{
		label: '序数时间轴',
		val: ChartAxesTypesEnum.ordinalTime,
	},
	{
		label: '数值轴',
		val: ChartAxesTypesEnum.number,
	},
	{
		label: '对数轴',
		val: ChartAxesTypesEnum.log,
	},
	{
		label: '分类轴',
		val: ChartAxesTypesEnum.category,
	},
	{
		label: '分组分类轴',
		val: ChartAxesTypesEnum.groupedCategory,
	},
	{
		label: '时间轴',
		val: ChartAxesTypesEnum.time,
	},
	{
		label: '极坐标角度轴（分类）',
		val: ChartAxesTypesEnum.angleCategory,
	},
	{
		label: '极坐标角度轴（数值）',
		val: ChartAxesTypesEnum.angleNumber,
	},
	{
		label: '极坐标半径轴（分类）',
		val: ChartAxesTypesEnum.radiusCategory,
	},
	{
		label: '极坐标半径轴（数值）',
		val: ChartAxesTypesEnum.radiusNumber,
	},
];

export const CHART_AXES_TYPE_OPTIONS_BY_KEY: { [key in ChartAxesTypesEnum]: ChartAxesTypeOption } = keyBy(
	CHART_AXES_TYPE_OPTIONS,
	'val',
) as {
	[key in ChartAxesTypesEnum]: ChartAxesTypeOption;
};
