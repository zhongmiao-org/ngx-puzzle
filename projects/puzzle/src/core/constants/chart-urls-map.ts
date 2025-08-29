import { ChartTypesEnum } from '../enums';

export const CHART_DEFAULT_MOCKS_MAP: Partial<{ [key in ChartTypesEnum]: string[] }> = {
  [ChartTypesEnum.bar]: ['bar2012', 'bar2013', 'bar2014', 'bar2015', 'bar2016'],
  [ChartTypesEnum.line]: ['lineSubscriptions', 'lineServices', 'lineProducts'],
  [ChartTypesEnum.radar]: ['radarData', 'radarData2'],
  [ChartTypesEnum.scatter]: ['scatterMale', 'scatterFemale'],
  [ChartTypesEnum.pie]: ['pieData'],
  [ChartTypesEnum.boxPlot]: ['boxPlotData'],
  [ChartTypesEnum.candlestick]: ['candlestickData'],
  [ChartTypesEnum.heatmap]: ['heatmapData'],
  [ChartTypesEnum.sunburst]: ['sunburstData'],
  [ChartTypesEnum.treemap]: ['treemapData'],
  [ChartTypesEnum.sankey]: ['sankeyData'],
  [ChartTypesEnum.chord]: ['chordData'],
  [ChartTypesEnum.funnel]: ['funnelData'],
  [ChartTypesEnum.effectScatter]: ['effectScatterData'],
  [ChartTypesEnum.parallel]: ['parallelData'],
  [ChartTypesEnum.themeRiver]: ['themeRiverData'],
  [ChartTypesEnum.tree]: ['treeData'],
  [ChartTypesEnum.gauge]: ['gaugeData'],
  [ChartTypesEnum.graph]: ['graphNodes'],
};
