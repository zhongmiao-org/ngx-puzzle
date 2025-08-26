import { ChartTypesEnum } from '../enums';

export const CHART_DEFAULT_MOCKS_MAP: Partial<{ [key in ChartTypesEnum]: string[] }> = {
  [ChartTypesEnum.line]: ['barAndLineData'],
  [ChartTypesEnum.bar]: ['barAndLineData'],
  [ChartTypesEnum.scatter]: ['maleHeightWeight', 'femaleHeightWeight'],
  [ChartTypesEnum.pie]: ['pieChartData'],
  [ChartTypesEnum.donut]: ['donutChartData'],
  [ChartTypesEnum.boxPlot]: ['boxPlotData'],
  [ChartTypesEnum.candlestick]: ['candlestickAndOhlcData'],
  [ChartTypesEnum.heatmap]: ['heatmapData'],
  [ChartTypesEnum.sunburst]: ['sunburstData'],
  [ChartTypesEnum.treemap]: ['treemapData'],
  [ChartTypesEnum.sankey]: ['sankeyData'],
  [ChartTypesEnum.chord]: ['chordData'],
  [ChartTypesEnum.funnel]: ['funnelData'],
};
