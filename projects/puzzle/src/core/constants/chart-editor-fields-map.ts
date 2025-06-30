import { ChartAxesTypesEnum, ChartTypesEnum, LabelFormatterEnum } from '../enums';
import { EditorChartField } from '../interfaces';
import { CHART_AXES_TYPE_OPTIONS_BY_KEY, CHART_SERIES_TYPE_OPTIONS_BY_KEY } from './chart-list';
import {
	AGGREGATION_OPTIONS,
	AXIS_POSITION_OPTIONS,
	COLOR_OPTIONS,
	DIRECTION_OPTIONS,
	ENABLE_OPTIONS,
	FONT_WEIGHT_OPTIONS,
	ORIENTATION_OPTIONS,
	POLAR_AXIS_SHAPE_OPTIONS,
	YES_OR_NO_OPTIONS,
} from './select-options.const';

// 主题设置
export const CHART_THEME: EditorChartField = {
	label: '主题',
	key: 'theme',
	path: 'theme',
	schemaType: 'group',
	children: [
		{
			label: '选择主题',
			key: 'theme',
			path: 'theme',
			schemaType: 'select',
			options: [
				{ label: '默认主题', val: 'ag-default' },
				{ label: '默认暗色主题', val: 'ag-default-dark' },
				{ label: 'Sheets 主题', val: 'ag-sheets' },
				{ label: 'Sheets 暗色主题', val: 'ag-sheets-dark' },
				{ label: 'Polychroma 主题', val: 'ag-polychroma' },
				{ label: 'Polychroma 暗色主题', val: 'ag-polychroma-dark' },
				{ label: 'Vivid 主题', val: 'ag-vivid' },
				{ label: 'Vivid 暗色主题', val: 'ag-vivid-dark' },
				{ label: 'Material 主题', val: 'ag-material' },
				{ label: 'Material 暗色主题', val: 'ag-material-dark' },
				{ label: 'Financial 主题', val: 'ag-financial' },
				{ label: 'Financial 暗色主题', val: 'ag-financial-dark' },
			],
		},
	],
};

// 轴设置
export const CHART_AXES: EditorChartField = {
	label: '坐标轴设置',
	key: 'axes',
	path: 'axes',
	schemaType: 'group',
	children: [
		{
			label: '轴设置',
			key: 'axes',
			path: 'axes',
			schemaType: 'array',
			itemSchema: [
				{
					label: '轴类型',
					key: 'type',
					schemaType: 'select',
					disabled: true,
					options: [CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.category], CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.number]],
				},
				{
					label: '位置',
					key: 'position',
					schemaType: 'select',
					options: AXIS_POSITION_OPTIONS,
				},
				{ label: '标签颜色', key: 'labelColor', path: 'label.color', schemaType: 'color' },
				{ label: '字体大小', key: 'labelFontSize', path: 'label.fontSize', schemaType: 'number' },
				{
					label: '展示轴标题',
					key: 'titleEnabled',
					path: 'title.enabled',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
				{ label: '轴标题', key: 'titleText', path: 'title.text', schemaType: 'text' },
				{ label: '轴标题大小', key: 'titleFontSize', path: 'title.fontSize', schemaType: 'number' },
				{ label: '轴标题颜色', key: 'titleColor', path: 'title.color', schemaType: 'color' },
			],
		},
	],
};

// 散点图轴设置
export const CHART_SCATTER_AXES: EditorChartField = {
	label: '坐标轴设置',
	key: 'axes',
	path: 'axes',
	schemaType: 'group',
	children: [
		{
			label: '轴设置',
			key: 'axes',
			path: 'axes',
			schemaType: 'array',
			itemSchema: [
				{
					label: '轴类型',
					key: 'type',
					path: 'type',
					schemaType: 'select',
					disabled: true,
					options: [CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.category], CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.number]],
				},
				{
					label: '位置',
					key: 'position',
					path: 'position',
					schemaType: 'select',
					options: AXIS_POSITION_OPTIONS,
				},
				{ label: '标签颜色', key: 'labelColor', path: 'label.color', schemaType: 'color' },
				{ label: '字体大小', key: 'labelFontSize', path: 'label.fontSize', schemaType: 'number' },
				{
					label: '展示轴标题',
					key: 'titleEnabled',
					path: 'title.enabled',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
				{ label: '轴标题', key: 'titleText', path: 'title.text', schemaType: 'text' },
				{ label: '轴标题大小', key: 'titleFontSize', path: 'title.fontSize', schemaType: 'number' },
				{ label: '轴标题颜色', key: 'titleColor', path: 'title.color', schemaType: 'color' },
				{
					label: '标签单位格式化',
					key: 'labelFormatter',
					path: 'label.formatter',
					schemaType: 'select',
					options: [
						{
							label: '默认',
							val: LabelFormatterEnum.default,
						},
						{
							label: '长度（cm）',
							val: LabelFormatterEnum.lengthCm,
						},
						{
							label: '质量（kg）',
							val: LabelFormatterEnum.massKg,
						},
						{
							label: '百分比（%）',
							val: LabelFormatterEnum.percentage,
						},
					],
				},
			],
		},
	],
};

// 气泡图轴设置
export const CHART_BUBBLE_AXES: EditorChartField = CHART_SCATTER_AXES;

// k线图轴设置
export const CHART_CANDLESTICK_AXES: EditorChartField = {
	label: '坐标轴设置',
	key: 'axes',
	path: 'axes',
	schemaType: 'group',
	children: [
		{
			label: '轴设置',
			key: 'axes',
			path: 'axes',
			schemaType: 'array',
			itemSchema: [
				{
					label: '轴类型',
					key: 'type',
					schemaType: 'select',
					disabled: true,
					options: [
						CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.ordinalTime],
						CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.number],
					],
				},
				{
					label: '位置',
					key: 'position',
					schemaType: 'select',
					options: AXIS_POSITION_OPTIONS,
				},
				{
					label: '标签格式',
					key: 'labelFormat',
					path: 'label.format',
					description: '%Y(年) %m(月) %d(日) %H(时) %M(分)',
					schemaType: 'text',
					belong: [ChartAxesTypesEnum.ordinalTime],
				},
				{
					label: '标签颜色',
					key: 'labelColor',
					path: 'label.color',
					schemaType: 'color',
				},
				{
					label: '标签字体大小',
					key: 'labelFontSize',
					path: 'label.fontSize',
					schemaType: 'number',
				},
				{
					label: '显示标题',
					key: 'titleEnabled',
					path: 'title.enabled',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
				{
					label: '标题文本',
					key: 'titleText',
					path: 'title.text',
					schemaType: 'text',
				},
				{
					label: '标题字体大小',
					key: 'titleFontSize',
					path: 'title.fontSize',
					schemaType: 'number',
				},
				{
					label: '标题颜色',
					key: 'titleColor',
					path: 'title.color',
					schemaType: 'color',
				},
				{
					label: '十字准线标签格式',
					key: 'crosshairLabelFormat',
					path: 'crosshair.label.format',
					schemaType: 'text',
					belong: [ChartAxesTypesEnum.number],
				},
			],
		},
	],
};

// ohlc 轴配置
export const CHART_OHLC_AXES: EditorChartField = CHART_CANDLESTICK_AXES;

// 热力图轴设置
export const CHART_HEATMAP_AXES: EditorChartField = {
	label: '坐标轴设置',
	key: 'axes',
	path: 'axes',
	schemaType: 'group',
	children: [
		{
			label: '轴设置',
			key: 'axes',
			path: 'axes',
			schemaType: 'array',
			itemSchema: [
				{
					label: '轴类型',
					key: 'type',
					path: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.category]],
				},
				{
					label: '位置',
					key: 'position',
					path: 'position',
					disabled: true,
					schemaType: 'select',
					options: AXIS_POSITION_OPTIONS,
				},
				{
					label: '标签颜色',
					key: 'labelColor',
					path: 'label.color',
					schemaType: 'color',
				},
				{
					label: '标签字体大小',
					key: 'labelFontSize',
					path: 'label.fontSize',
					schemaType: 'number',
				},
				{
					label: '显示标题',
					key: 'titleEnabled',
					path: 'title.enabled',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
				{
					label: '标题文本',
					key: 'titleText',
					path: 'title.text',
					schemaType: 'text',
				},
				{
					label: '标题字体大小',
					key: 'titleFontSize',
					path: 'title.fontSize',
					schemaType: 'number',
				},
				{
					label: '标题颜色',
					key: 'titleColor',
					path: 'title.color',
					schemaType: 'color',
				},
			],
		},
	],
};

// 南丁格尔玫瑰图轴设置
export const CHART_NIGHTINGALE_AXES: EditorChartField = {
	label: '坐标轴设置',
	key: 'axes',
	path: 'axes',
	schemaType: 'group',
	children: [
		{
			label: '轴设置',
			key: 'axes',
			path: 'axes',
			schemaType: 'array',
			itemSchema: [
				{
					label: '轴类型',
					key: 'type',
					path: 'type',
					schemaType: 'select',
					disabled: true,
					options: [
						CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.angleCategory],
						CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.radiusNumber],
					],
				},
				{
					label: '组内间距',
					key: 'groupPaddingInner',
					path: 'groupPaddingInner',
					schemaType: 'number',
					step: 0.1,
					min: 0,
					max: 1,
					belong: [ChartAxesTypesEnum.angleCategory],
				},
				{
					label: '内间距',
					key: 'paddingInner',
					path: 'paddingInner',
					schemaType: 'number',
					step: 0.1,
					min: 0,
					max: 1,
					belong: [ChartAxesTypesEnum.angleCategory],
				},
				{
					label: '内半径比',
					key: 'innerRadiusRatio',
					path: 'innerRadiusRatio',
					schemaType: 'number',
					step: 0.1,
					min: 0,
					max: 1,
					belong: [ChartAxesTypesEnum.radiusNumber],
				},
			],
		},
	],
};

// 雷达面积图轴设置
export const CHART_RADAR_AREA_AXES: EditorChartField = {
	label: '坐标轴设置',
	key: 'axes',
	path: 'axes',
	schemaType: 'group',
	children: [
		{
			label: '轴设置',
			key: 'axes',
			path: 'axes',
			schemaType: 'array',
			itemSchema: [
				{
					label: '轴类型',
					key: 'type',
					path: 'type',
					schemaType: 'select',
					disabled: true,
					options: [
						CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.angleCategory],
						CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.radiusNumber],
					],
				},
				{
					label: '形状',
					key: 'shape',
					path: 'shape',
					schemaType: 'select',
					options: POLAR_AXIS_SHAPE_OPTIONS,
				},
				{
					label: '标签方向',
					key: 'labelOrientation',
					path: 'label.orientation',
					schemaType: 'select',
					belong: [ChartAxesTypesEnum.angleCategory],
					options: ORIENTATION_OPTIONS,
				},
				{
					label: '位置角度',
					key: 'positionAngle',
					path: 'positionAngle',
					schemaType: 'number',
					step: 1,
					min: -360,
					max: 360,
					belong: [ChartAxesTypesEnum.radiusNumber],
				},
				{
					label: '标签旋转角度',
					key: 'labelRotation',
					path: 'label.rotation',
					schemaType: 'number',
					step: 1,
					min: -360,
					max: 360,
					belong: [ChartAxesTypesEnum.radiusNumber],
				},
				{
					label: '标签颜色',
					key: 'labelColor',
					path: 'label.color',
					schemaType: 'color',
				},
			],
		},
	],
};

// 雷达折线图轴设置
export const CHART_RADAR_LINE_AXES = CHART_RADAR_AREA_AXES;

// 径向柱状图轴设置
export const CHART_RADIAL_BAR_AXES: EditorChartField = {
	label: '坐标轴设置',
	key: 'axes',
	path: 'axes',
	schemaType: 'group',
	children: [
		{
			label: '轴设置',
			key: 'axes',
			path: 'axes',
			schemaType: 'array',
			itemSchema: [
				{
					label: '轴类型',
					key: 'type',
					path: 'type',
					schemaType: 'select',
					disabled: true,
					options: [
						CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.angleNumber],
						CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.radiusCategory],
					],
				},
				{
					label: '标签方向',
					key: 'labelOrientation',
					path: 'label.orientation',
					schemaType: 'select',
					belong: [ChartAxesTypesEnum.angleNumber],
					options: ORIENTATION_OPTIONS,
				},
				{
					label: '标签字号',
					key: 'labelFontSize',
					path: 'label.fontSize',
					schemaType: 'number',
				},
				{
					label: '标签加粗',
					key: 'labelFontWeight',
					path: 'label.fontWeight',
					schemaType: 'select',
					options: FONT_WEIGHT_OPTIONS,
				},
				{
					label: '标签颜色',
					key: 'labelColor',
					path: 'label.color',
					schemaType: 'color',
				},
				{
					label: '起始角度',
					key: 'startAngle',
					path: 'startAngle',
					schemaType: 'number',
					step: 1,
					min: -360,
					max: 360,
					belong: [ChartAxesTypesEnum.angleNumber],
				},
				{
					label: '结束角度',
					key: 'endAngle',
					path: 'endAngle',
					schemaType: 'number',
					step: 1,
					min: -360,
					max: 360,
					belong: [ChartAxesTypesEnum.angleNumber],
				},
				{
					label: '位置角度',
					key: 'positionAngle',
					path: 'positionAngle',
					schemaType: 'number',
					step: 1,
					min: -360,
					max: 360,
					belong: [ChartAxesTypesEnum.radiusCategory],
				},
				{
					label: '组内间距',
					key: 'groupPaddingInner',
					path: 'groupPaddingInner',
					schemaType: 'number',
					step: 0.1,
					min: 0,
					max: 1,
					belong: [ChartAxesTypesEnum.radiusCategory],
				},
				{
					label: '内间距',
					key: 'paddingInner',
					path: 'paddingInner',
					schemaType: 'number',
					step: 0.1,
					min: 0,
					max: 1,
					belong: [ChartAxesTypesEnum.radiusCategory],
				},
				{
					label: '外间距',
					key: 'paddingOuter',
					path: 'paddingOuter',
					schemaType: 'number',
					step: 0.1,
					min: 0,
					max: 1,
					belong: [ChartAxesTypesEnum.radiusCategory],
				},
			],
		},
	],
};

// 径向条形图轴设置
export const CHART_RADIAL_COLUMN_AXES: EditorChartField = {
	label: '坐标轴设置',
	key: 'axes',
	path: 'axes',
	schemaType: 'group',
	children: [
		{
			label: '轴设置',
			key: 'axes',
			path: 'axes',
			schemaType: 'array',
			itemSchema: [
				{
					label: '轴类型',
					key: 'type',
					path: 'type',
					schemaType: 'select',
					disabled: true,
					options: [
						CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.angleCategory],
						CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.radiusNumber],
					],
				},
				{
					label: '标签方向',
					key: 'labelOrientation',
					path: 'label.orientation',
					schemaType: 'select',
					belong: [ChartAxesTypesEnum.angleCategory],
					options: ORIENTATION_OPTIONS,
				},
				{
					label: '标签颜色',
					key: 'labelColor',
					path: 'label.color',
					schemaType: 'color',
				},
				{
					label: '标签字号',
					key: 'labelFontSize',
					path: 'label.fontSize',
					schemaType: 'number',
				},
				{
					label: '标签加粗',
					key: 'labelFontWeight',
					path: 'label.fontWeight',
					schemaType: 'select',
					options: FONT_WEIGHT_OPTIONS,
				},
				{
					label: '组内间距',
					key: 'groupPaddingInner',
					path: 'groupPaddingInner',
					schemaType: 'number',
					description: '此属性用于在角度类别轴上绘制的分组极坐标序列。它是0到1之间的比例，它决定了沿角度轴的单个组内项目之间的间隙大小。',
					step: 0.1,
					min: 0,
					max: 1,
					belong: [ChartAxesTypesEnum.angleCategory],
				},
				{
					label: '内间距',
					key: 'paddingInner',
					path: 'paddingInner',
					schemaType: 'number',
					step: 0.1,
					min: 0,
					max: 1,
					belong: [ChartAxesTypesEnum.angleCategory],
				},
				{
					label: '内半径比例',
					key: 'innerRadiusRatio',
					path: 'innerRadiusRatio',
					schemaType: 'number',
					step: 0.1,
					min: 0,
					max: 1,
					belong: [ChartAxesTypesEnum.radiusNumber],
				},
				{
					label: '位置角度',
					key: 'positionAngle',
					path: 'positionAngle',
					schemaType: 'number',
					step: 1,
					min: -360,
					max: 360,
					belong: [ChartAxesTypesEnum.radiusNumber],
				},
				{
					label: '标签旋转角度',
					key: 'labelRotation',
					path: 'label.rotation',
					schemaType: 'number',
					step: 1,
					min: -360,
					max: 360,
					belong: [ChartAxesTypesEnum.radiusNumber],
				},
			],
		},
	],
};

// 范围面积图轴设置
export const CHART_RANGE_AREA_AXES: EditorChartField = {
	label: '坐标轴设置',
	key: 'axes',
	path: 'axes',
	schemaType: 'group',
	children: [
		{
			label: '轴设置',
			key: 'axes',
			path: 'axes',
			schemaType: 'array',
			itemSchema: [
				{
					label: '轴类型',
					key: 'type',
					path: 'type',
					schemaType: 'select',
					disabled: true,
					options: [CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.number], CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.time]],
				},
				{
					label: '位置',
					key: 'position',
					path: 'position',
					schemaType: 'select',
					options: AXIS_POSITION_OPTIONS,
				},
				{
					label: '展示标题',
					key: 'titleEnabled',
					path: 'title.enabled',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
				{
					label: '标题文本',
					key: 'titleText',
					path: 'title.text',
					schemaType: 'text',
				},
				{
					label: '标题颜色',
					key: 'titleColor',
					path: 'title.color',
					schemaType: 'color',
				},
				{
					label: '标题字号',
					key: 'titleFontSize',
					path: 'title.fontSize',
					schemaType: 'number',
				},
				{
					label: '标签颜色',
					key: 'labelColor',
					path: 'label.color',
					schemaType: 'color',
				},
				{
					label: '标签字号',
					key: 'labelFontSize',
					path: 'label.fontSize',
					schemaType: 'number',
				},
				{
					label: '标签加粗',
					key: 'labelFontWeight',
					path: 'label.fontWeight',
					schemaType: 'select',
					options: FONT_WEIGHT_OPTIONS,
				},
			],
		},
	],
};

// 范围柱状图轴设置
export const CHART_RANGE_BAR_AXES: EditorChartField = {
	label: '坐标轴设置',
	key: 'axes',
	path: 'axes',
	schemaType: 'group',
	children: [
		{
			label: '轴设置',
			key: 'axes',
			path: 'axes',
			schemaType: 'array',
			itemSchema: [
				{
					label: '轴类型',
					key: 'type',
					path: 'type',
					schemaType: 'select',
					disabled: true,
					options: [CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.category], CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.number]],
				},
				{
					label: '位置',
					key: 'position',
					path: 'position',
					schemaType: 'select',
					options: AXIS_POSITION_OPTIONS,
				},
				{
					label: '标签颜色',
					key: 'labelColor',
					path: 'label.color',
					schemaType: 'color',
				},
				{
					label: '标签字号',
					key: 'labelFontSize',
					path: 'label.fontSize',
					schemaType: 'number',
				},
				{
					label: '启用标题',
					key: 'titleEnabled',
					path: 'title.enabled',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
				{
					label: '标题文本',
					key: 'titleText',
					path: 'title.text',
					schemaType: 'text',
				},
				{
					label: '标题字号',
					key: 'titleFontSize',
					path: 'title.fontSize',
					schemaType: 'number',
				},
				{
					label: '标题颜色',
					key: 'titleColor',
					path: 'title.color',
					schemaType: 'color',
				},
			],
		},
	],
};

// 漏斗图轴设置
export const CHART_FUNNEL_AXES: EditorChartField = {
	label: '坐标轴设置',
	key: 'axes',
	path: 'axes',
	schemaType: 'group',
	children: [
		{
			label: '轴设置',
			key: 'axes',
			path: 'axes',
			schemaType: 'array',
			itemSchema: [
				{
					label: '轴类型',
					key: 'type',
					path: 'type',
					schemaType: 'select',
					disabled: true,
					options: [CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.category], CHART_AXES_TYPE_OPTIONS_BY_KEY[ChartAxesTypesEnum.number]],
				},
				{
					label: '位置',
					key: 'position',
					path: 'position',
					schemaType: 'select',
					options: AXIS_POSITION_OPTIONS,
				},
				{
					label: '启用标签',
					key: 'labelEnabled',
					path: 'label.enabled',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
				{
					label: '标签颜色',
					key: 'labelColor',
					path: 'label.color',
					schemaType: 'color',
				},
				{
					label: '标签字号',
					key: 'labelFontSize',
					path: 'label.fontSize',
					schemaType: 'number',
				},
				{
					label: '启用标题',
					key: 'titleEnabled',
					path: 'title.enabled',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
				{
					label: '标题文本',
					key: 'titleText',
					path: 'title.text',
					schemaType: 'text',
				},
				{
					label: '标题字号',
					key: 'titleFontSize',
					path: 'title.fontSize',
					schemaType: 'number',
				},
				{
					label: '标题颜色',
					key: 'titleColor',
					path: 'title.color',
					schemaType: 'color',
				},
			],
		},
	],
};

// 锥形漏斗图轴设置
export const CHART_CONE_FUNNEL_AXES = CHART_FUNNEL_AXES;

// 数据面板
export const CHART_DATA: EditorChartField = {
	label: '数据源设置',
	key: 'data',
	path: 'data',
	schemaType: 'table',
	children: [
		{
			label: '数据源设置',
			key: 'data',
			path: 'data',
			schemaType: 'button',
		},
	],
};

// 标题设置
export const CHART_TITLE: EditorChartField = {
	label: '标题设置',
	key: 'title',
	path: 'title',
	schemaType: 'group',
	children: [
		{
			label: '展示主标题',
			key: 'titleEnabled',
			path: 'title.enabled',
			schemaType: 'select',
			options: ENABLE_OPTIONS,
		},
		{ label: '主标题', key: 'titleText', path: 'title.text', schemaType: 'text' },
		{
			label: '对齐方式',
			key: 'titleTextAlign',
			path: 'title.textAlign',
			schemaType: 'select',
			options: [
				{ label: '左对齐', val: 'left' },
				{ label: '居中', val: 'center' },
				{ label: '右对齐', val: 'right' },
			],
		},
		{ label: '颜色', key: 'titleColor', path: 'title.color', schemaType: 'color' },
		{ label: '字体大小', key: 'titleFontSize', path: 'title.fontSize', schemaType: 'number' },
	],
};

// 副标题设置
export const CHART_SUBTITLE: EditorChartField = {
	label: '副标题设置',
	key: 'subtitle',
	path: 'subtitle',
	schemaType: 'group',
	children: [
		{
			label: '展示副标题',
			key: 'subtitleEnabled',
			path: 'subtitle.enabled',
			schemaType: 'select',
			options: ENABLE_OPTIONS,
		},
		{ label: '副标题', key: 'subtitleText', path: 'subtitle.text', schemaType: 'text' },
		{
			label: '对齐方式',
			key: 'subtitleTextAlign',
			path: 'subtitle.textAlign',
			schemaType: 'select',
			options: [
				{ label: '左对齐', val: 'left' },
				{ label: '居中', val: 'center' },
				{ label: '右对齐', val: 'right' },
			],
		},
		{ label: '颜色', key: 'subtitleColor', path: 'subtitle.color', schemaType: 'color' },
		{ label: '字体大小', key: 'subtitleFontSize', path: 'subtitle.fontSize', schemaType: 'number' },
	],
};

// 注脚设置
export const CHART_FOOTNOTE: EditorChartField = {
	label: '注脚设置',
	key: 'footnote',
	path: 'footnote',
	schemaType: 'group',
	children: [
		{
			label: '展示注脚',
			key: 'footnoteEnabled',
			path: 'footnote.enabled',
			schemaType: 'select',
			options: ENABLE_OPTIONS,
		},
		{ label: '注脚', key: 'footnoteText', path: 'footnote.text', schemaType: 'text' },
		{
			label: '对齐方式',
			key: 'footnoteTextAlign',
			path: 'footnote.textAlign',
			schemaType: 'select',
			options: [
				{ label: '左对齐', val: 'left' },
				{ label: '居中', val: 'center' },
				{ label: '右对齐', val: 'right' },
			],
		},
		{ label: '颜色', key: 'footnoteColor', path: 'footnote.color', schemaType: 'color' },
		{ label: '字体大小', key: 'footnoteFontSize', path: 'footnote.fontSize', schemaType: 'number' },
	],
};

// 图例配置
export const CHART_LEGEND: EditorChartField = {
	label: '图例设置',
	key: 'legend',
	path: 'legend',
	schemaType: 'group',
	children: [
		{
			label: '展示图例',
			key: 'legendEnabled',
			path: 'legend.enabled',
			schemaType: 'select',
			options: ENABLE_OPTIONS,
		},
		{
			label: '图例定位',
			key: 'legendPosition',
			path: 'legend.position',
			schemaType: 'select',
			options: AXIS_POSITION_OPTIONS,
		},
		{ label: '图例字体颜色', key: 'legendItemLabelColor', path: 'legend.item.label.color', schemaType: 'color' },
		{
			label: '图例项标签加粗',
			key: 'legendItemLabelFontWeight',
			path: 'legend.item.label.fontWeight',
			schemaType: 'select',
			options: FONT_WEIGHT_OPTIONS,
		},
	],
};

// 热力图图例配置
export const GRADIENT_LEGEND: EditorChartField = {
	label: '渐变图例设置',
	key: 'gradientLegend',
	path: 'gradientLegend',
	schemaType: 'group',
	children: [
		{
			label: '启用渐变图例',
			key: 'gradientLegendEnabled',
			path: 'gradientLegend.enabled',
			schemaType: 'select',
			options: ENABLE_OPTIONS,
		},
		{
			label: '图例位置',
			key: 'gradientLegendPosition',
			path: 'gradientLegend.position',
			schemaType: 'select',
			options: AXIS_POSITION_OPTIONS,
		},
		{
			label: '渐变条厚度',
			key: 'gradientLegendGradientThickness',
			path: 'gradientLegend.gradient.thickness',
			schemaType: 'number',
			min: 10,
			max: 100,
		},
		{
			label: '渐变条长度',
			key: 'gradientLegendGradientPreferredLength',
			path: 'gradientLegend.gradient.preferredLength',
			schemaType: 'number',
			min: 100,
			max: 1000,
		},
		{
			label: '刻度标签字号',
			key: 'gradientLegendScaleLabelFontSize',
			path: 'gradientLegend.scale.label.fontSize',
			schemaType: 'number',
			min: 8,
			max: 24,
		},
		{
			label: '刻度标签加粗',
			key: 'gradientLegendScaleLabelFontWeight',
			path: 'gradientLegend.scale.label.fontWeight',
			schemaType: 'select',
			options: FONT_WEIGHT_OPTIONS,
		},
		{
			label: '刻度标签颜色',
			key: 'gradientLegendScaleLabelColor',
			path: 'gradientLegend.scale.label.color',
			schemaType: 'color',
		},
		{
			label: '刻度内边距',
			key: 'gradientLegendScalePadding',
			path: 'gradientLegend.scale.padding',
			schemaType: 'number',
			min: 0,
			max: 50,
		},
	],
};

// 柱状图系列设置
export const BAR_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			schemaType: 'array',
			removeActive: true,
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.bar]],
				},
				{
					label: '图例排列方向',
					key: 'direction',
					schemaType: 'select',
					description: '水平排列时，分类轴【位置】需要设置左右，数值轴【位置】需要设置上下',
					options: DIRECTION_OPTIONS,
				},
				{ label: 'X 轴字段', key: 'xKey', schemaType: 'text' },
				{ label: 'Y 轴字段', key: 'yKey', schemaType: 'text' },
				{ label: '系列名称', key: 'yName', schemaType: 'text' },
			],
		},
	],
};

// 折线图系列设置
export const LINE_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.line]],
				},
				{ label: 'X 轴字段', key: 'xKey', schemaType: 'text' },
				{ label: 'X 轴名称', key: 'xName', schemaType: 'text' },
				{ label: 'Y 轴字段', key: 'yKey', schemaType: 'text' },
				{ label: 'Y 轴名称', key: 'yName', schemaType: 'text' },
				{ label: '系列宽度', key: 'strokeWidth', schemaType: 'number' },
				{
					label: '展示标记',
					key: 'markerEnabled',
					path: 'marker.enabled',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
				{
					label: '曲线类型',
					key: 'interpolationType',
					path: 'interpolation.type',
					schemaType: 'select',
					options: [
						{ label: '直线连接', val: 'linear' },
						{ label: '平滑曲线', val: 'smooth' },
						{ label: '阶梯状', val: 'step' },
					],
				},
				{
					label: '阶梯定位（限阶梯状）', // 专指 step 类型的定位
					key: 'interpolationPosition',
					path: 'interpolation.position',
					schemaType: 'select',
					options: [
						{ label: '起点对齐', val: 'start' },
						{ label: '中点对齐', val: 'middle' },
						{ label: '终点对齐', val: 'end' },
					],
				},
			],
		},
	],
};

// 面积图系列设置
export const AREA_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.area]],
				},
				{ label: 'X 轴字段', key: 'xKey', schemaType: 'text' },
				{ label: 'X 轴名称', key: 'xName', schemaType: 'text' },
				{ label: 'Y 轴字段', key: 'yKey', schemaType: 'text' },
				{ label: 'Y 轴名称', key: 'yName', schemaType: 'text' },
				{ label: '系列宽度', key: 'strokeWidth', schemaType: 'number' },
				{
					label: '展示标记',
					key: 'markerEnabled',
					path: 'marker.enabled',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
				{
					label: '曲线类型',
					key: 'interpolationType',
					path: 'interpolation.type',
					schemaType: 'select',
					options: [
						{ label: '直线连接', val: 'linear' },
						{ label: '平滑曲线', val: 'smooth' },
						{ label: '阶梯状', val: 'step' },
					],
				},
				{
					label: '阶梯定位（限阶梯状）', // 专指 step 类型的定位
					key: 'interpolationPosition',
					path: 'interpolation.position',
					schemaType: 'select',
					options: [
						{ label: '起点对齐', val: 'start' },
						{ label: '中点对齐', val: 'middle' },
						{ label: '终点对齐', val: 'end' },
					],
				},
			],
		},
	],
};

// 散点图系列设置
export const SCATTER_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.scatter]],
				},
				{ label: '标题', key: 'title', schemaType: 'text' },
				{ label: '数据源', key: 'data', schemaType: 'button' },
				{ label: 'X 轴字段', key: 'xKey', schemaType: 'text' },
				{ label: 'X 轴名称', key: 'xName', schemaType: 'text' },
				{ label: 'Y 轴字段', key: 'yKey', schemaType: 'text' },
				{ label: 'Y 轴名称', key: 'yName', schemaType: 'text' },
				{
					label: '显示标签',
					key: 'labelEnabled',
					path: 'label.enabled',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
				{ label: '标签字段', key: 'labelKey', schemaType: 'text' },
				{ label: '标签名称', key: 'labelName', schemaType: 'text' },
				{
					label: '形状',
					key: 'shape',
					schemaType: 'select',
					options: [
						{ label: '圆形', val: 'circle' },
						{ label: '十字', val: 'cross' },
						{ label: '菱形', val: 'diamond' },
						{ label: '心形', val: 'heart' },
						{ label: '加号', val: 'plus' },
						{ label: '图钉', val: 'pin' },
						{ label: '方形', val: 'square' },
						{ label: '星形', val: 'star' },
						{ label: '三角形', val: 'triangle' },
					],
				},
				{ label: '填充颜色', key: 'fill', schemaType: 'color' },
				{ label: '线条颜色', key: 'stroke', schemaType: 'color' },
			],
		},
	],
};

// 气泡图系列设置
export const BUBBLE_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.bubble]],
				},
				{ label: '标题', key: 'title', schemaType: 'text' },
				{ label: '数据源', key: 'data', schemaType: 'button' },
				{ label: 'X 轴字段', key: 'xKey', schemaType: 'text' },
				{ label: 'X 轴名称', key: 'xName', schemaType: 'text' },
				{ label: 'Y 轴字段', key: 'yKey', schemaType: 'text' },
				{ label: 'Y 轴名称', key: 'yName', schemaType: 'text' },
				{ label: '气泡大小取值', key: 'sizeKey', schemaType: 'text' },
				{ label: '气泡大小说明', key: 'sizeName', schemaType: 'text' },
				{
					label: '显示标签',
					key: 'labelEnabled',
					path: 'label.enabled',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
				{ label: '标签字段', key: 'labelKey', schemaType: 'text' },
				{ label: '标签名称', key: 'labelName', schemaType: 'text' },
				{
					label: '形状',
					key: 'shape',
					schemaType: 'select',
					options: [
						{ label: '圆形', val: 'circle' },
						{ label: '十字', val: 'cross' },
						{ label: '菱形', val: 'diamond' },
						{ label: '心形', val: 'heart' },
						{ label: '加号', val: 'plus' },
						{ label: '图钉', val: 'pin' },
						{ label: '方形', val: 'square' },
						{ label: '星形', val: 'star' },
						{ label: '三角形', val: 'triangle' },
					],
				},
				{ label: '填充颜色', key: 'fill', schemaType: 'color' },
				{ label: '线条颜色', key: 'stroke', schemaType: 'color' },
			],
		},
	],
};

// 饼图系列设置
export const PIE_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			hasAdd: false,
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.pie]],
				},
				{ label: '数据键值', key: 'angleKey', schemaType: 'text' },
				{ label: '标题', key: 'title', path: 'title.text', schemaType: 'text' },
				{ label: '标注标签键', key: 'calloutLabelKey', schemaType: 'text' },
				{ label: '扇区标签键', key: 'sectorLabelKey', schemaType: 'text' },
				{ label: '扇区半径键', key: 'radiusKey', schemaType: 'text' },
				{
					label: '显示扇区标签',
					key: 'sectorLabelEnabled',
					path: 'sectorLabel.enabled',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
				{ label: '扇区标签颜色', key: 'sectorLabelColor', path: 'sectorLabel.color', schemaType: 'color' },
				{
					label: '扇区标签加粗',
					key: 'sectorFontWeight',
					path: 'sectorLabel.fontWeight',
					schemaType: 'select',
					options: FONT_WEIGHT_OPTIONS,
				},
			],
		},
	],
};

// 环形图系列设置
export const DONUT_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			hasAdd: false,
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.donut]],
				},
				{ label: '标题', key: 'title', path: 'title.text', schemaType: 'text' },
				{
					label: '是否显示图例前缀',
					key: 'titleShowInLegend',
					path: 'title.showInLegend',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
				{ label: '图例前缀键', key: 'calloutLabelKey', schemaType: 'text' },
				{ label: '数据键值', key: 'angleKey', schemaType: 'text' },
				{ label: '外半径的比率', key: 'outerRadiusRatio', schemaType: 'number', min: 0, max: 1, step: 0.1 },
				{ label: '内半径的比率', key: 'innerRadiusRatio', schemaType: 'number', min: 0, max: 1, step: 0.1 },
			],
		},
	],
};

// 混合图系列设置
export const COMBINATION_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					schemaType: 'select',
					options: [
						CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.bar],
						CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.line],
						CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.area],
					],
				},
				{ label: 'X 轴字段', key: 'xKey', schemaType: 'text' },
				{ label: 'Y 轴字段', key: 'yKey', schemaType: 'text' },
				{ label: '系列名称', key: 'yName', schemaType: 'text' },
			],
		},
	],
};

// 箱线图系列设置
export const BOX_PLOT_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			hasAdd: false,
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.boxPlot]],
				},
				{ label: 'Y轴名称', key: 'yName', schemaType: 'text' },
				{ label: 'X轴键', key: 'xKey', schemaType: 'text' },
				{ label: 'X轴名称', key: 'xName', schemaType: 'text' },

				// 数据键配置（一级属性，省略path）
				{ label: '最小值键', key: 'minKey', schemaType: 'text' },
				{ label: '最小值名称', key: 'minName', schemaType: 'text' },
				{ label: '下四分位键', key: 'q1Key', schemaType: 'text' },
				{ label: '下四分位名称', key: 'q1Name', schemaType: 'text' },
				{ label: '中位数值键', key: 'medianKey', schemaType: 'text' },
				{ label: '中位数名称', key: 'medianName', schemaType: 'text' },
				{ label: '上四分位键', key: 'q3Key', schemaType: 'text' },
				{ label: '上四分位名称', key: 'q3Name', schemaType: 'text' },
				{ label: '最大值键', key: 'maxKey', schemaType: 'text' },
				{ label: '最大值名称', key: 'maxName', schemaType: 'text' },

				// 样式配置
				{ label: '填充颜色', key: 'fill', schemaType: 'color' },
				{ label: '边框颜色', key: 'stroke', schemaType: 'color' },
				{ label: '边框宽度', key: 'strokeWidth', schemaType: 'number', min: 0, step: 1 },

				// 须线样式
				{ label: '线颜色', key: 'whiskerStroke', path: 'whisker.stroke', schemaType: 'color' },
				{ label: '线宽度', key: 'whiskerStrokeWidth', path: 'whisker.strokeWidth', schemaType: 'number', min: 0, step: 1 },
				// { label: '须线虚线样式', key: 'whiskerLineDash', path: 'whisker.lineDash', schemaType: 'text' },

				// 端帽样式
				{ label: '端帽长度比率', key: 'capLengthRatio', path: 'cap.lengthRatio', schemaType: 'number', min: 0, max: 1, step: 0.1 },
			],
		},
	],
};

// K线图系列设置
export const CANDLESTICK_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			hasAdd: false,
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.candlestick]],
				},
				{ label: 'X轴键', key: 'xKey', schemaType: 'text' },
				{ label: 'X轴名称', key: 'xName', schemaType: 'text' },
				{ label: '最低价键', key: 'lowKey', schemaType: 'text' },
				{ label: '最高价键', key: 'highKey', schemaType: 'text' },
				{ label: '开盘价键', key: 'openKey', schemaType: 'text' },
				{ label: '收盘价键', key: 'closeKey', schemaType: 'text' },

				// 上涨样式（二级嵌套保留path）
				{ label: '上涨填充色', key: 'itemUpFill', path: 'item.up.fill', schemaType: 'color' },
				{ label: '上涨边框色', key: 'itemUpStroke', path: 'item.up.stroke', schemaType: 'color' },
				{ label: '上涨灯芯线宽', key: 'itemUpWickStrokeWidth', path: 'item.up.wick.strokeWidth', schemaType: 'number', min: 0 },

				// 下跌样式（二级嵌套保留path）
				{ label: '下跌填充色', key: 'itemDownFill', path: 'item.down.fill', schemaType: 'color' },
				{ label: '下跌边框色', key: 'itemDownStroke', path: 'item.down.stroke', schemaType: 'color' },
				{ label: '下跌灯芯线宽', key: 'itemDownWickStrokeWidth', path: 'item.down.wick.strokeWidth', schemaType: 'number', min: 0 },
			],
		},
	],
};

// OHLC图系列设置
export const OHLC_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			hasAdd: false,
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.ohlc]],
				},
				{ label: 'X轴键', key: 'xKey', schemaType: 'text' },
				{ label: 'X轴名称', key: 'xName', schemaType: 'text' },
				{ label: '最低价键', key: 'lowKey', schemaType: 'text' },
				{ label: '最高价键', key: 'highKey', schemaType: 'text' },
				{ label: '开盘价键', key: 'openKey', schemaType: 'text' },
				{ label: '收盘价键', key: 'closeKey', schemaType: 'text' },

				// 上涨样式（二级嵌套保留path）
				{ label: '上涨边框色', key: 'itemUpStroke', path: 'item.up.stroke', schemaType: 'color' },
				{ label: '上涨灯芯线宽', key: 'itemUpStrokeWidth', path: 'item.up.strokeWidth', schemaType: 'number', min: 0 },

				// 下跌样式（二级嵌套保留path）
				{ label: '下跌边框色', key: 'itemDownStroke', path: 'item.down.stroke', schemaType: 'color' },
				{ label: '下跌灯芯线宽', key: 'itemDownStrokeWidth', path: 'item.down.strokeWidth', schemaType: 'number', min: 0 },
			],
		},
	],
};

// 热力图系列设置
export const HEATMAP_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			hasAdd: false,
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.heatmap]],
				},
				{ label: 'X轴键', key: 'xKey', schemaType: 'text' },
				{ label: 'X轴名称', key: 'xName', schemaType: 'text' },
				{ label: 'Y轴键', key: 'yKey', schemaType: 'text' },
				{ label: 'Y轴名称', key: 'yName', schemaType: 'text' },
				{ label: '颜色键', key: 'colorKey', schemaType: 'text' },
				{ label: '颜色名称', key: 'colorName', schemaType: 'text' },
				{
					label: '颜色范围',
					key: 'colorRange',
					schemaType: 'multiColorSelect',
					options: COLOR_OPTIONS,
				},
				{
					label: '显示标签',
					key: 'labelEnabled',
					path: 'label.enabled',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
				// {
				//   label: '标签格式化',
				//   key: 'labelFormatter',
				//   path: 'label.formatter',
				//   schemaType: 'code', // 可能需要代码编辑器支持
				// },
			],
		},
	],
};

// 直方图系列设置
export const HISTOGRAM_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			hasAdd: false,
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					path: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.histogram]],
				},
				{
					label: 'X轴键',
					key: 'xKey',
					path: 'xKey',
					schemaType: 'text',
				},
				{
					label: 'X轴名称',
					key: 'xName',
					path: 'xName',
					schemaType: 'text',
				},
				{
					label: 'Y轴键',
					key: 'yKey',
					path: 'yKey',
					schemaType: 'text',
				},
				{
					label: 'Y轴名称',
					key: 'yName',
					path: 'yName',
					schemaType: 'text',
				},
				{
					label: '聚合方式',
					key: 'aggregation',
					path: 'aggregation',
					schemaType: 'select',
					options: AGGREGATION_OPTIONS,
				},
				{
					label: '显示标签',
					key: 'labelEnabled',
					path: 'label.enabled',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
				{
					label: '标签颜色',
					key: 'labelColor',
					path: 'label.color',
					schemaType: 'color',
				},
				{
					label: '标签加粗',
					key: 'labelFontSize',
					path: 'label.fontSize',
					schemaType: 'number',
				},
				{
					label: '标签加粗',
					key: 'labelFontWeight',
					path: 'label.fontWeight',
					schemaType: 'select',
					options: FONT_WEIGHT_OPTIONS,
				},
			],
		},
	],
};

// 南丁格尔玫瑰图系列设置
export const NIGHTINGALE_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			hasAdd: true,
			schemaType: 'array',
			itemSchema: [
				{
					label: '图表类型',
					key: 'type',
					path: 'type',
					schemaType: 'select',
					disabled: true,
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.nightingale]],
				},
				{
					label: '数据键值',
					key: 'angleKey',
					path: 'angleKey',
					schemaType: 'text',
				},
				{
					label: '半径字段',
					key: 'radiusKey',
					path: 'radiusKey',
					schemaType: 'text',
				},
				{
					label: '半径名称',
					key: 'radiusName',
					path: 'radiusName',
					schemaType: 'text',
				},
				{
					label: '分组显示',
					key: 'grouped',
					path: 'grouped',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
			],
		},
	],
};

// 雷达面积图系列设置
export const RADAR_AREA_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			hasAdd: true,
			schemaType: 'array',
			itemSchema: [
				{
					label: '图表类型',
					key: 'type',
					path: 'type',
					schemaType: 'select',
					disabled: true,
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.radarArea]],
				},
				{
					label: '数据键值',
					key: 'angleKey',
					path: 'angleKey',
					schemaType: 'text',
				},
				{
					label: '半径字段',
					key: 'radiusKey',
					path: 'radiusKey',
					schemaType: 'text',
				},
				{
					label: '半径名称',
					key: 'radiusName',
					path: 'radiusName',
					schemaType: 'text',
				},
			],
		},
	],
};

// 雷达线图系列设置
export const RADAR_LINE_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			hasAdd: true,
			schemaType: 'array',
			itemSchema: [
				{
					label: '图表类型',
					key: 'type',
					path: 'type',
					schemaType: 'select',
					disabled: true,
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.radarLine]],
				},
				{
					label: '数据键值',
					key: 'angleKey',
					path: 'angleKey',
					schemaType: 'text',
				},
				{
					label: '半径字段',
					key: 'radiusKey',
					path: 'radiusKey',
					schemaType: 'text',
				},
				{
					label: '半径名称',
					key: 'radiusName',
					path: 'radiusName',
					schemaType: 'text',
				},
			],
		},
	],
};

// 径向柱状图系列设置
export const RADIAL_BAR_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.radialBar]],
				},
				{
					label: '半径字段',
					key: 'radiusKey',
					schemaType: 'text',
				},
				{
					label: '角度字段',
					key: 'angleKey',
					schemaType: 'text',
				},
				{
					label: '角度名称',
					key: 'angleName',
					schemaType: 'text',
				},
				{
					label: '是否堆叠',
					key: 'stacked',
					schemaType: 'select',
					description: '同时设置两条及以上数据时生效',
					options: YES_OR_NO_OPTIONS,
				},
			],
		},
	],
};

// 径向条形图系列设置
export const RADIAL_COLUMN_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.radialColumn]],
				},
				{
					label: '半径字段',
					key: 'radiusKey',
					schemaType: 'text',
				},
				{
					label: '角度字段',
					key: 'angleKey',
					schemaType: 'text',
				},
				{
					label: '角度名称',
					key: 'angleName',
					schemaType: 'text',
				},
				{
					label: '是否堆叠',
					key: 'stacked',
					schemaType: 'select',
					description: '同时设置两条及以上数据时生效',
					options: YES_OR_NO_OPTIONS,
				},
			],
		},
	],
};

// 范围面积图系列设置
export const RANGE_AREA_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.rangeArea]],
				},
				{
					label: 'X轴字段',
					key: 'xKey',
					schemaType: 'text',
				},
				{
					label: 'X轴名称',
					key: 'xName',
					schemaType: 'text',
				},
				{
					label: 'Y轴低值字段',
					key: 'yLowKey',
					schemaType: 'text',
				},
				{
					label: 'Y轴高值字段',
					key: 'yHighKey',
					schemaType: 'text',
				},
				{
					label: 'Y轴名称',
					key: 'yName',
					schemaType: 'text',
				},
				{
					label: 'Y轴低值名称',
					key: 'yLowName',
					schemaType: 'text',
				},
				{
					label: 'Y轴高值名称',
					key: 'yHighName',
					schemaType: 'text',
				},
			],
		},
	],
};

//范围柱状图系列设置
export const RANGE_BAR_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.rangeBar]],
				},
				{
					label: 'X轴字段',
					key: 'xKey',
					schemaType: 'text',
				},
				{
					label: 'X轴名称',
					key: 'xName',
					schemaType: 'text',
				},
				{
					label: 'Y轴低值字段',
					key: 'yLowKey',
					schemaType: 'text',
				},
				{
					label: 'Y轴高值字段',
					key: 'yHighKey',
					schemaType: 'text',
				},
				{
					label: 'Y轴名称',
					key: 'yName',
					schemaType: 'text',
				},
				{
					label: 'Y轴低值名称',
					key: 'yLowName',
					schemaType: 'text',
				},
				{
					label: 'Y轴高值名称',
					key: 'yHighName',
					schemaType: 'text',
				},
			],
		},
	],
};

// 瀑布图系列设置
export const WATERFALL_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.waterfall]],
				},
				{
					label: 'X轴字段',
					key: 'xKey',
					schemaType: 'text',
				},
				{
					label: 'X轴名称',
					key: 'xName',
					schemaType: 'text',
				},
				{
					label: 'Y轴字段',
					key: 'yKey',
					schemaType: 'text',
				},
				{
					label: 'Y轴名称',
					key: 'yName',
					schemaType: 'text',
				},
			],
		},
	],
};

// 旭日图系列设置
export const SUNBURST_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			hasAdd: false,
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.sunburst]],
				},
				{
					label: '标签字段',
					key: 'labelKey',
					schemaType: 'text',
				},
				{
					label: '大小字段',
					key: 'sizeKey',
					schemaType: 'text',
				},
				{
					label: '大小名称',
					key: 'sizeName',
					schemaType: 'text',
				},
				{
					label: '颜色字段',
					key: 'colorKey',
					schemaType: 'text',
				},
				{
					label: '颜色名称',
					key: 'colorName',
					schemaType: 'text',
				},
				{
					label: '颜色范围',
					key: 'colorRange',
					// description: '当使用【颜色范围】时，【填充颜色】将被忽略',
					schemaType: 'multiColorSelect',
					options: COLOR_OPTIONS,
				},
				{
					label: '启用数值标签',
					key: 'labelEnabled',
					path: 'label.enabled',
					schemaType: 'select',
					options: YES_OR_NO_OPTIONS,
				},
				{
					label: '数值标签颜色',
					key: 'labelColor',
					path: 'label.color',
					schemaType: 'color',
				},
				{
					label: '数值标签字号',
					key: 'labelFontSize',
					path: 'label.fontSize',
					schemaType: 'number',
				},
				{
					label: '数值标签加粗',
					key: 'labelFontWeight',
					path: 'label.fontWeight',
					schemaType: 'select',
					options: FONT_WEIGHT_OPTIONS,
				},
			],
		},
	],
};

// 矩形树图系列设置
export const TREEMAP_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					path: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.treemap]],
				},
				{
					label: '主标签字段',
					key: 'labelKey',
					path: 'labelKey',
					schemaType: 'text',
				},
				{
					label: '副标签字段',
					key: 'secondaryLabelKey',
					path: 'secondaryLabelKey',
					schemaType: 'text',
				},
				{
					label: '大小字段',
					key: 'sizeKey',
					path: 'sizeKey',
					schemaType: 'text',
				},
				{
					label: '大小名称',
					key: 'sizeName',
					path: 'sizeName',
					schemaType: 'text',
				},
				{
					label: '自定义分组标签',
					key: 'groupLabelEnabled',
					path: 'group.label.enabled',
					schemaType: 'select',
					options: YES_OR_NO_OPTIONS,
				},
				{
					label: '分组标签字体颜色',
					key: 'groupLabelColor',
					path: 'group.label.color',
					schemaType: 'color',
				},
				{
					label: '分组标签字体大小',
					key: 'groupLabelFontSize',
					path: 'group.label.fontSize',
					schemaType: 'number',
				},
				{
					label: '分组标签间距',
					key: 'groupLabelSpacing',
					path: 'group.label.spacing',
					schemaType: 'number',
				},
				{
					label: '分组背景色',
					key: 'groupFill',
					path: 'group.fill',
					schemaType: 'color',
				},
				{
					label: '分组背景透明度',
					key: 'groupFillOpacity',
					path: 'group.fillOpacity',
					schemaType: 'number',
					min: 0,
					max: 1,
					step: 0.1
				},
				{
					label: '分组边框颜色',
					key: 'groupStroke',
					path: 'group.stroke',
					schemaType: 'color',
				},
				{
					label: '分组边框宽度',
					key: 'groupStrokeWidth',
					path: 'group.strokeWidth',
					schemaType: 'number',
					step: 1
				},
				{
					label: '分组边框透明度',
					key: 'groupStrokeOpacity',
					path: 'group.strokeOpacity',
					schemaType: 'number',
					min: 0,
					max: 1,
					step: 0.1
				},
				{
					label: '区块颜色',
					key: 'tileFill',
					path: 'tile.fill',
					schemaType: 'color',
				},
				{
					label: '区块透明度',
					key: 'tileFillOpacity',
					path: 'tile.fillOpacity',
					schemaType: 'number',
					min: 0,
					max: 1,
					step: 0.1
				},
				{
					label: '启用区块标签',
					key: 'tileLabelEnabled',
					path: 'tile.label.enabled',
					schemaType: 'select',
					options: YES_OR_NO_OPTIONS,
				},
				{
					label: '区块标签字体颜色',
					key: 'tileLabelColor',
					path: 'tile.label.color',
					schemaType: 'color',
				},
				{
					label: '区块标签字体大小',
					key: 'tileLabelFontSize',
					path: 'tile.label.fontSize',
					schemaType: 'number',
				},
				{
					label: '区块最小字体大小',
					key: 'tileLabelMinimumFontSize',
					path: 'tile.label.minimumFontSize',
					schemaType: 'number',
				},
				{
					label: '区块标签间距',
					key: 'tileLabelSpacing',
					path: 'tile.label.spacing',
					schemaType: 'number',
				},
				{
					label: '启用数值标签',
					key: 'tileSecondaryLabelEnabled',
					path: 'tile.secondaryLabel.enabled',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
				{
					label: '数值标签颜色',
					key: 'tileSecondaryLabelColor',
					path: 'tile.secondaryLabel.color',
					schemaType: 'color',
				},
				{
					label: '数值标签字号',
					key: 'tileSecondaryLabelFontSize',
					path: 'tile.secondaryLabel.fontSize',
					schemaType: 'number',
				},
				{
					label: '数值标签加粗',
					key: 'tileSecondaryLabelFontWeight',
					path: 'tile.secondaryLabel.fontWeight',
					schemaType: 'select',
					options: FONT_WEIGHT_OPTIONS,
				},
			],
		},
	],
};

// 桑基图系列设置
export const SANKEY_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					path: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.sankey]],
				},
				{
					label: '源字段',
					key: 'fromKey',
					path: 'fromKey',
					schemaType: 'text',
				},
				{
					label: '目标字段',
					key: 'toKey',
					path: 'toKey',
					schemaType: 'text',
				},
				{
					label: '数值字段',
					key: 'sizeKey',
					path: 'sizeKey',
					schemaType: 'text',
				},
				{
					label: '数值名称',
					key: 'sizeName',
					path: 'sizeName',
					schemaType: 'text',
				},
				{
					label: '启用标签',
					key: 'labelEnabled',
					path: 'label.enabled',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
				{
					label: '标签字体大小',
					key: 'labelFontSize',
					path: 'label.fontSize',
					schemaType: 'number',
					min: 0,
					step: 1,
				},
				{
					label: '标签颜色',
					key: 'labelColor',
					path: 'label.color',
					schemaType: 'color',
				},
				{
					label: '连线填充色',
					key: 'linkFill',
					path: 'link.fill',
					schemaType: 'color',
				},
				{
					label: '连线透明度',
					key: 'linkFillOpacity',
					path: 'link.fillOpacity',
					schemaType: 'number',
					step: 0.01,
					min: 0,
					max: 1,
				},
				{
					label: '连线描边色',
					key: 'linkStroke',
					path: 'link.stroke',
					schemaType: 'color',
				},
				{
					label: '连线描边宽度',
					key: 'linkStrokeWidth',
					path: 'link.strokeWidth',
					schemaType: 'number',
				},
				{
					label: '描边透明度',
					key: 'linkStrokeOpacity',
					path: 'link.strokeOpacity',
					schemaType: 'number',
					step: 0.01,
					min: 0,
					max: 1,
				},
			],
		},
	],
};

// 弦图系列设置
export const CHORD_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					path: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.chord]],
				},
				{
					label: '源字段',
					key: 'fromKey',
					path: 'fromKey',
					schemaType: 'text',
				},
				{
					label: '目标字段',
					key: 'toKey',
					path: 'toKey',
					schemaType: 'text',
				},
				{
					label: '数值字段',
					key: 'sizeKey',
					path: 'sizeKey',
					schemaType: 'text',
				},
				{
					label: '数值名称',
					key: 'sizeName',
					path: 'sizeName',
					schemaType: 'text',
				},
				{
					label: '启用标签',
					key: 'labelEnabled',
					path: 'label.enabled',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
				{
					label: '标签字体大小',
					key: 'labelFontSize',
					path: 'label.fontSize',
					schemaType: 'number',
				},
				{
					label: '标签颜色',
					key: 'labelColor',
					path: 'label.color',
					schemaType: 'color',
				},
				{
					label: '连线填充色',
					key: 'linkFill',
					path: 'link.fill',
					schemaType: 'color',
				},
				{
					label: '连线透明度',
					key: 'linkFillOpacity',
					path: 'link.fillOpacity',
					schemaType: 'number',
					step: 0.01,
					min: 0,
					max: 1,
				},
				{
					label: '连线描边色',
					key: 'linkStroke',
					path: 'link.stroke',
					schemaType: 'color',
				},
				{
					label: '连线描边宽度',
					key: 'linkStrokeWidth',
					path: 'link.strokeWidth',
					schemaType: 'number',
				},
				{
					label: '描边透明度',
					key: 'linkStrokeOpacity',
					path: 'link.strokeOpacity',
					schemaType: 'number',
					step: 0.01,
					min: 0,
					max: 1,
				},
			],
		},
	],
};

// 漏斗图系列设置
export const FUNNEL_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			hasAdd: false,
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					path: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.funnel]],
				},
				{
					label: '阶段字段',
					key: 'stageKey',
					path: 'stageKey',
					schemaType: 'text',
				},
				{
					label: '数值字段',
					key: 'valueKey',
					path: 'valueKey',
					schemaType: 'text',
				},
				{
					label: '填充颜色',
					key: 'fills',
					path: 'fills',
					schemaType: 'multiColorSelect',
					options: COLOR_OPTIONS,
				},
				{
					label: '启用下降效果',
					key: 'dropOffEnabled',
					path: 'dropOff.enabled',
					schemaType: 'select',
					options: ENABLE_OPTIONS,
				},
				{
					label: '排列方向',
					key: 'direction',
					schemaType: 'select',
					description: '水平排列时，分类轴【位置】需要设置上下，数值轴【位置】需要设置左右',
					options: DIRECTION_OPTIONS,
				},
			],
		},
	],
};

// 锥形漏斗图系列设置
export const CONE_FUNNEL_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			hasAdd: false,
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					path: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.coneFunnel]],
				},
				{
					label: '阶段字段',
					key: 'stageKey',
					path: 'stageKey',
					schemaType: 'text',
				},
				{
					label: '数值字段',
					key: 'valueKey',
					path: 'valueKey',
					schemaType: 'text',
				},
				{
					label: '填充颜色',
					key: 'fills',
					path: 'fills',
					schemaType: 'multiColorSelect',
					options: COLOR_OPTIONS,
				},
				{
					label: '排列方向',
					key: 'direction',
					schemaType: 'select',
					description: '水平排列时，分类轴【位置】需要设置上下，数值轴【位置】需要设置左右',
					options: DIRECTION_OPTIONS,
				},
				{
					label: '启用标签',
					key: 'labelEnabled',
					path: 'label.enabled',
					schemaType: 'select',
					options: YES_OR_NO_OPTIONS,
				},
				{
					label: '标签颜色',
					key: 'labelColor',
					path: 'label.color',
					schemaType: 'color',
				},
				{
					label: '标签字号',
					key: 'labelFontSize',
					path: 'label.fontSize',
					schemaType: 'number',
				},
				{
					label: '标签加粗',
					key: 'labelFontWeight',
					path: 'label.fontWeight',
					schemaType: 'select',
					options: FONT_WEIGHT_OPTIONS,
				},
			],
		},
	],
};

// 金字塔图系列设置
export const PYRAMID_SERIES: EditorChartField = {
	label: '数据系列设置',
	key: 'Series',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '数据系列',
			key: 'series',
			path: 'series',
			hasAdd: false,
			schemaType: 'array',
			itemSchema: [
				{
					label: '类型',
					key: 'type',
					path: 'type',
					disabled: true,
					schemaType: 'select',
					options: [CHART_SERIES_TYPE_OPTIONS_BY_KEY[ChartTypesEnum.pyramid]],
				},
				{
					label: '阶段字段',
					key: 'stageKey',
					path: 'stageKey',
					schemaType: 'text',
				},
				{
					label: '数值字段',
					key: 'valueKey',
					path: 'valueKey',
					schemaType: 'text',
				},
				{
					label: '方向',
					key: 'direction',
					path: 'direction',
					schemaType: 'select',
					options: DIRECTION_OPTIONS,
				},
				{
					label: '填充颜色',
					key: 'fills',
					path: 'fills',
					schemaType: 'multiColorSelect',
					options: COLOR_OPTIONS,
					description: '留空则使用默认配色',
				},
				{
					label: '启用数值标签',
					key: 'labelEnabled',
					path: 'label.enabled',
					schemaType: 'select',
					options: YES_OR_NO_OPTIONS,
				},
				{
					label: '数值标签颜色',
					key: 'labelColor',
					path: 'label.color',
					schemaType: 'color',
				},
				{
					label: '数值标签字号',
					key: 'labelFontSize',
					path: 'label.fontSize',
					schemaType: 'number',
				},
				{
					label: '数值标签加粗',
					key: 'labelFontWeight',
					path: 'label.fontWeight',
					schemaType: 'select',
					options: FONT_WEIGHT_OPTIONS,
				},
				{
					label: '启用阶段标签',
					key: 'stageLabelEnabled',
					path: 'stageLabel.enabled',
					schemaType: 'select',
					options: YES_OR_NO_OPTIONS,
				},
				{
					label: '阶段标签位置',
					key: 'stageLabelPlacement',
					path: 'stageLabel.placement',
					schemaType: 'select',
					options: [
						{ label: '前', val: 'before' },
						{ label: '后', val: 'after' },
					],
				},
				{
					label: '阶段标签颜色',
					key: 'stageLabelColor',
					path: 'stageLabel.color',
					schemaType: 'color',
				},
				{
					label: '阶段标签字号',
					key: 'stageLabelFontSize',
					path: 'stageLabel.fontSize',
					schemaType: 'number',
				},
				{
					label: '阶段标签加粗',
					key: 'stageLabelFontWeight',
					path: 'stageLabel.fontWeight',
					schemaType: 'select',
					options: FONT_WEIGHT_OPTIONS,
				},
			],
		},
	],
};
