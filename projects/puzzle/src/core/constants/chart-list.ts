import { keyBy } from 'lodash';
import { ChartAxesTypesEnum, ChartTypesEnum } from '../enums';
import { BaseSelectOption, ChartAxesTypeOption } from '../interfaces';

export const CHART_SERIES_TYPE_OPTIONS: BaseSelectOption<ChartTypesEnum>[] = [
    { label: '柱状图', val: ChartTypesEnum.bar },
    { label: '折线图', val: ChartTypesEnum.line },
    { label: '面积图', val: ChartTypesEnum.area },
    { label: '散点图', val: ChartTypesEnum.scatter },
    { label: '气泡图', val: ChartTypesEnum.bubble },
    { label: '饼图', val: ChartTypesEnum.pie },
    { label: '环形图', val: ChartTypesEnum.donut },
    { label: '混合图', val: ChartTypesEnum.combination },
    { label: '箱线图（盒须图）', val: ChartTypesEnum.boxPlot },
    { label: 'K线图', val: ChartTypesEnum.candlestick },
    { label: 'OHLC图（开盘-最高-最低-收盘图）', val: ChartTypesEnum.ohlc },
    { label: '热力图', val: ChartTypesEnum.heatmap },
    { label: '直方图', val: ChartTypesEnum.histogram },
    { label: '南丁格尔玫瑰图', val: ChartTypesEnum.nightingale },
    { label: '雷达面积图', val: ChartTypesEnum.radarArea },
    { label: '雷达线图', val: ChartTypesEnum.radarLine },
    { label: '径向柱状图', val: ChartTypesEnum.radialBar },
    { label: '径向条形图', val: ChartTypesEnum.radialColumn },
    { label: '范围面积图', val: ChartTypesEnum.rangeArea },
    { label: '范围柱状图', val: ChartTypesEnum.rangeBar },
    { label: '瀑布图', val: ChartTypesEnum.waterfall },
    { label: '旭日图', val: ChartTypesEnum.sunburst },
    { label: '矩形树图', val: ChartTypesEnum.treemap },
    { label: '桑基图', val: ChartTypesEnum.sankey },
    { label: '弦图', val: ChartTypesEnum.chord },
    { label: '漏斗图', val: ChartTypesEnum.funnel },
    { label: '锥形漏斗图', val: ChartTypesEnum.coneFunnel },
    { label: '金字塔图', val: ChartTypesEnum.pyramid }
    // { label: '形状地图', val: ChartTypesEnum.mapShape },
    // { label: '线地图', val: ChartTypesEnum.mapLine },
    // { label: '标记地图', val: ChartTypesEnum.mapMarker },
    // { label: '背景形状地图', val: ChartTypesEnum.mapShapeBackground },
    // { label: '背景线地图', val: ChartTypesEnum.mapLineBackground },
];

export const CHART_SERIES_TYPE_OPTIONS_BY_KEY: { [key in ChartTypesEnum]: BaseSelectOption<ChartTypesEnum> } = keyBy(
    CHART_SERIES_TYPE_OPTIONS,
    'val'
) as {
    [key in ChartTypesEnum]: BaseSelectOption<ChartTypesEnum>;
};

export const CHART_AXES_TYPE_OPTIONS: ChartAxesTypeOption[] = [
    {
        label: '序数时间轴',
        val: ChartAxesTypesEnum.ordinalTime
    },
    {
        label: '数值轴',
        val: ChartAxesTypesEnum.number
    },
    {
        label: '对数轴',
        val: ChartAxesTypesEnum.log
    },
    {
        label: '分类轴',
        val: ChartAxesTypesEnum.category
    },
    {
        label: '分组分类轴',
        val: ChartAxesTypesEnum.groupedCategory
    },
    {
        label: '时间轴',
        val: ChartAxesTypesEnum.time
    },
    {
        label: '极坐标角度轴（分类）',
        val: ChartAxesTypesEnum.angleCategory
    },
    {
        label: '极坐标角度轴（数值）',
        val: ChartAxesTypesEnum.angleNumber
    },
    {
        label: '极坐标半径轴（分类）',
        val: ChartAxesTypesEnum.radiusCategory
    },
    {
        label: '极坐标半径轴（数值）',
        val: ChartAxesTypesEnum.radiusNumber
    }
];

export const CHART_AXES_TYPE_OPTIONS_BY_KEY: { [key in ChartAxesTypesEnum]: ChartAxesTypeOption } = keyBy(
    CHART_AXES_TYPE_OPTIONS,
    'val'
) as {
    [key in ChartAxesTypesEnum]: ChartAxesTypeOption;
};
