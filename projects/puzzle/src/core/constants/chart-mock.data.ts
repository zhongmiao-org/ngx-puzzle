import { ChartTypesEnum } from '../enums';

export const CHART_DATA_OPTIONS: Partial<{ [key in ChartTypesEnum]: object }> = {
  [ChartTypesEnum.bar]: {
    legend: {},
    tooltip: { trigger: 'axis' },
    dataset: {
      dimensions: ['type', '2012', '2013', '2014', '2015', '2016'],
      source: [
        { type: 'Forest', '2012': 320, '2013': 332, '2014': 301, '2015': 334, '2016': 390 },
        { type: 'Steppe', '2012': 220, '2013': 182, '2014': 191, '2015': 234, '2016': 290 },
        { type: 'Desert', '2012': 150, '2013': 232, '2014': 201, '2015': 154, '2016': 190 },
        { type: 'Wetland', '2012': 98, '2013': 77, '2014': 101, '2015': 99, '2016': 40 }
      ]
    },
    xAxis: { type: 'category', axisTick: { show: false } },
    yAxis: {},
    series: [
      { type: 'bar', layoutBy: 'row', itemStyle: { color: '#003366' } },
      { type: 'bar', layoutBy: 'row', itemStyle: { color: '#006699' } },
      { type: 'bar', layoutBy: 'row', itemStyle: { color: '#4cabce' } },
      { type: 'bar', layoutBy: 'row', itemStyle: { color: '#e5323e' } }
    ]
  },
  [ChartTypesEnum.line]: {
    tooltip: { trigger: 'axis' },
    legend: {},
    dataset: {
      dimensions: ['day', 'Subscriptions', 'Services', 'Products'],
      source: [
        { day: 'Mon', Subscriptions: 120, Services: 220, Products: 150 },
        { day: 'Tue', Subscriptions: 132, Services: 182, Products: 232 },
        { day: 'Wed', Subscriptions: 101, Services: 191, Products: 201 },
        { day: 'Thu', Subscriptions: 134, Services: 234, Products: 154 },
        { day: 'Fri', Subscriptions: 90, Services: 290, Products: 190 },
        { day: 'Sat', Subscriptions: 230, Services: 330, Products: 330 },
        { day: 'Sun', Subscriptions: 210, Services: 310, Products: 410 }
      ]
    },
    xAxis: { type: 'category', boundaryGap: false },
    yAxis: { type: 'value' },
    series: [
      { type: 'line', smooth: true, name: 'Subscriptions', encode: { x: 'day', y: 'Subscriptions' } },
      { type: 'line', smooth: true, name: 'Services', encode: { x: 'day', y: 'Services' } },
      { type: 'line', smooth: true, name: 'Products', encode: { x: 'day', y: 'Products' } }
    ]
  },
  [ChartTypesEnum.scatter]: {
    tooltip: { trigger: 'item' },
    dataset: {
      dimensions: ['height', 'weight', 'gender'],
      source: []
    },
    xAxis: { type: 'value', axisLabel: { formatter: '{value} cm' } },
    yAxis: { type: 'value', axisLabel: { formatter: '{value} kg' } },
    series: [
      { type: 'scatter', name: 'Male', encode: { x: 'height', y: 'weight' } },
      { type: 'scatter', name: 'Female', encode: { x: 'height', y: 'weight' } }
    ]
  },
  [ChartTypesEnum.pie]: {
    tooltip: { trigger: 'item' },
    legend: {},
    dataset: { dimensions: ['name', 'value'], source: [] },
    series: [{ type: 'pie', radius: '60%', label: { show: true }, encode: { itemName: 'name', value: 'value' } }]
  },
  [ChartTypesEnum.boxPlot]: {
    tooltip: { trigger: 'item' },
    dataset: { dimensions: ['category', 'min', 'Q1', 'median', 'Q3', 'max'], source: [] },
    xAxis: { type: 'category', boundaryGap: true, splitArea: { show: false } },
    yAxis: { type: 'value', splitArea: { show: true } },
    series: [{ type: 'boxplot', encode: { x: 'category', y: ['min', 'Q1', 'median', 'Q3', 'max'] } }]
  },
  [ChartTypesEnum.candlestick]: {
    tooltip: { trigger: 'axis' },
    dataset: { dimensions: ['date', 'open', 'close', 'low', 'high'], source: [] },
    xAxis: { type: 'category' },
    yAxis: { scale: true },
    series: [{ type: 'candlestick', encode: { x: 'date', y: ['open', 'close', 'low', 'high'] } }]
  },
  [ChartTypesEnum.heatmap]: {
    tooltip: {},
    grid: { height: '50%', top: '10%' },
    dataset: { dimensions: ['x', 'y', 'value'], source: [] },
    xAxis: { type: 'category' },
    yAxis: { type: 'category' },
    visualMap: { min: 0, max: 100, calculable: true, orient: 'horizontal', left: 'center', bottom: '5%' },
    series: [{ type: 'heatmap', label: { show: false }, encode: { x: 'x', y: 'y', value: 'value' } }]
  },
  [ChartTypesEnum.sunburst]: {
    dataset: { source: [] },
    series: [{ type: 'sunburst', radius: [0, '90%'] }]
  },
  [ChartTypesEnum.treemap]: {
    dataset: { source: [] },
    series: [{ type: 'treemap', leafDepth: 2 }]
  },
  [ChartTypesEnum.sankey]: {
    dataset: { dimensions: ['source', 'target', 'value'], source: [] },
    series: [{ type: 'sankey', emphasis: { focus: 'adjacency' }, encode: { source: 'source', target: 'target', value: 'value' } }]
  },
  [ChartTypesEnum.chord]: {
    dataset: { dimensions: ['source', 'target', 'value'], source: [] },
    series: [{ type: 'chord', encode: { source: 'source', target: 'target', value: 'value' } }]
  },
  [ChartTypesEnum.funnel]: {
    tooltip: { trigger: 'item' },
    dataset: { dimensions: ['name', 'value'], source: [] },
    series: [{ type: 'funnel', encode: { itemName: 'name', value: 'value' } }]
  }
};
