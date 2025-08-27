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
  [ChartTypesEnum.radar]: {
    tooltip: { trigger: 'item' },
    legend: {},
    dataset: [
      {
        id: 'raw',
        source: [
          { height: 172, weight: 65, gender: 'Male' },
          { height: 168, weight: 59, gender: 'Female' },
          { height: 181, weight: 75, gender: 'Male' },
          { height: 160, weight: 50, gender: 'Female' },
          { height: 174, weight: 70, gender: 'Male' },
          { height: 155, weight: 48, gender: 'Female' },
          { height: 169, weight: 62, gender: 'Male' },
          { height: 165, weight: 55, gender: 'Female' },
          { height: 178, weight: 80, gender: 'Male' },
          { height: 158, weight: 52, gender: 'Female' }
        ]
      },
      {
        id: 'male',
        fromDatasetId: 'raw',
        transform: {
          type: 'filter',
          config: {
            dimension: 'gender',
            '=': 'Male'
          }
        }
      },
      {
        id: 'female',
        fromDatasetId: 'raw',
        transform: {
          type: 'filter',
          config: {
            dimension: 'gender',
            '=': 'Female'
          }
        }
      }
    ],
    xAxis: { type: 'value', axisLabel: { formatter: '{value} cm' } },
    yAxis: { type: 'value', axisLabel: { formatter: '{value} kg' } },
    series: [
      {
        name: 'Male',
        type: 'scatter',
        datasetId: 'male',
        encode: { x: 'height', y: 'weight' }
      },
      {
        name: 'Female',
        type: 'scatter',
        datasetId: 'female',
        encode: { x: 'height', y: 'weight' }
      }
    ]
  },
  [ChartTypesEnum.scatter]: {
    tooltip: { trigger: 'item' },
    legend: {},
    dataset: [
      {
        id: 'raw',
        dimensions: ['height', 'weight', 'gender'],
        source: [
          { height: 172, weight: 65, gender: 'Male' },
          { height: 168, weight: 59, gender: 'Female' },
          { height: 181, weight: 75, gender: 'Male' },
          { height: 160, weight: 50, gender: 'Female' },
          { height: 174, weight: 70, gender: 'Male' },
          { height: 155, weight: 48, gender: 'Female' },
          { height: 169, weight: 62, gender: 'Male' },
          { height: 165, weight: 55, gender: 'Female' },
          { height: 178, weight: 80, gender: 'Male' },
          { height: 158, weight: 52, gender: 'Female' }
        ]
      },
      {
        id: 'male',
        fromDatasetId: 'raw',
        transform: {
          type: 'filter',
          config: {
            dimension: 'gender',
            '=': 'Male'
          }
        }
      },
      {
        id: 'female',
        fromDatasetId: 'raw',
        transform: {
          type: 'filter',
          config: {
            dimension: 'gender',
            '=': 'Female'
          }
        }
      }
    ],
    xAxis: { type: 'value', axisLabel: { formatter: '{value} cm' } },
    yAxis: { type: 'value', axisLabel: { formatter: '{value} kg' } },
    series: [
      {
        name: 'Male',
        type: 'scatter',
        datasetId: 'male',
        encode: { x: 'height', y: 'weight' }
      },
      {
        name: 'Female',
        type: 'scatter',
        datasetId: 'female',
        encode: { x: 'height', y: 'weight' }
      }
    ]
  },
  [ChartTypesEnum.pie]: {
    tooltip: { trigger: 'item' },
    legend: {},
    dataset: {
      dimensions: ['name', 'value'],
      source: [
        { name: 'Direct', value: 335 },
        { name: 'Email', value: 310 },
        { name: 'Affiliate', value: 234 },
        { name: 'Video Ads', value: 135 },
        { name: 'Search', value: 1548 }
      ]
    },
    series: [{ type: 'pie', radius: '60%', label: { show: true }, encode: { itemName: 'name', value: 'value' } }]
  },
  [ChartTypesEnum.boxPlot]: {
    tooltip: { trigger: 'item' },
    dataset: {
      dimensions: ['category', 'min', 'Q1', 'median', 'Q3', 'max'],
      source: [
        { category: 'A', min: 850, Q1: 940, median: 980, Q3: 1040, max: 1160 },
        { category: 'B', min: 740, Q1: 800, median: 850, Q3: 890, max: 970 },
        { category: 'C', min: 900, Q1: 990, median: 1040, Q3: 1100, max: 1200 }
      ]
    },
    xAxis: { type: 'category', boundaryGap: true, splitArea: { show: false } },
    yAxis: { type: 'value', splitArea: { show: true } },
    series: [{ type: 'boxplot', encode: { x: 'category', y: ['min', 'Q1', 'median', 'Q3', 'max'] } }]
  },
  [ChartTypesEnum.candlestick]: {
    tooltip: { trigger: 'axis' },
    dataset: {
      dimensions: ['date', 'open', 'close', 'low', 'high'],
      source: [
        { date: '2020-01-01', open: 2320.26, close: 2302.6, low: 2287.3, high: 2362.94 },
        { date: '2020-01-02', open: 2300, close: 2291.3, low: 2288.26, high: 2308.38 },
        { date: '2020-01-03', open: 2295.35, close: 2346.5, low: 2295.35, high: 2346.92 },
        { date: '2020-01-04', open: 2347.22, close: 2358.98, low: 2337.35, high: 2363.8 },
        { date: '2020-01-05', open: 2360.75, close: 2382.48, low: 2347.89, high: 2383.76 }
      ]
    },
    xAxis: { type: 'category' },
    yAxis: { scale: true },
    series: [{ type: 'candlestick', encode: { x: 'date', y: ['open', 'close', 'low', 'high'] } }]
  },
  [ChartTypesEnum.heatmap]: {
    tooltip: {},
    grid: { height: '50%', top: '10%' },
    dataset: {
      dimensions: ['x', 'y', 'value'],
      source: [
        { x: 'Mon', y: '1', value: 10 },
        { x: 'Tue', y: '1', value: 20 },
        { x: 'Wed', y: '1', value: 30 },
        { x: 'Thu', y: '1', value: 40 },
        { x: 'Fri', y: '1', value: 50 },
        { x: 'Mon', y: '2', value: 20 },
        { x: 'Tue', y: '2', value: 10 },
        { x: 'Wed', y: '2', value: 60 },
        { x: 'Thu', y: '2', value: 80 },
        { x: 'Fri', y: '2', value: 30 }
      ]
    },
    xAxis: { type: 'category' },
    yAxis: { type: 'category' },
    visualMap: { min: 0, max: 100, calculable: true, orient: 'horizontal', left: 'center', bottom: '5%' },
    series: [{ type: 'heatmap', label: { show: false }, encode: { x: 'x', y: 'y', value: 'value' } }]
  },
  [ChartTypesEnum.sunburst]: {
    dataset: {
      source: [
        {
          name: 'Grand',
          children: [
            {
              name: 'A',
              value: 6,
              children: [
                { name: 'A1', value: 2 },
                { name: 'A2', value: 4 }
              ]
            },
            {
              name: 'B',
              value: 4,
              children: [
                { name: 'B1', value: 2 },
                { name: 'B2', value: 2 }
              ]
            }
          ]
        }
      ]
    },
    series: [{ type: 'sunburst', radius: [0, '90%'] }]
  },
  [ChartTypesEnum.treemap]: {
    dataset: {
      source: [
        {
          name: 'Category A',
          value: 10,
          children: [
            { name: 'A1', value: 4 },
            { name: 'A2', value: 6 }
          ]
        },
        {
          name: 'Category B',
          value: 8,
          children: [
            { name: 'B1', value: 3 },
            { name: 'B2', value: 5 }
          ]
        }
      ]
    },
    series: [{ type: 'treemap', leafDepth: 2 }]
  },
  [ChartTypesEnum.sankey]: {
    dataset: {
      dimensions: ['source', 'target', 'value'],
      source: [
        { source: 'A', target: 'B', value: 5 },
        { source: 'A', target: 'C', value: 3 },
        { source: 'B', target: 'D', value: 2 },
        { source: 'C', target: 'D', value: 2 },
        { source: 'C', target: 'E', value: 1 }
      ]
    },
    series: [{ type: 'sankey', emphasis: { focus: 'adjacency' }, encode: { source: 'source', target: 'target', value: 'value' } }]
  },
  [ChartTypesEnum.chord]: {
    dataset: {
      dimensions: ['source', 'target', 'value'],
      source: [
        { source: 'Group1', target: 'Group2', value: 10 },
        { source: 'Group2', target: 'Group3', value: 8 },
        { source: 'Group3', target: 'Group1', value: 6 },
        { source: 'Group1', target: 'Group4', value: 4 }
      ]
    },
    series: [{ type: 'chord', encode: { source: 'source', target: 'target', value: 'value' } }]
  },
  [ChartTypesEnum.funnel]: {
    tooltip: { trigger: 'item' },
    dataset: {
      dimensions: ['name', 'value'],
      source: [
        { name: 'Visit', value: 100 },
        { name: 'Click', value: 80 },
        { name: 'Inquiry', value: 60 },
        { name: 'Order', value: 40 },
        { name: 'Deal', value: 20 }
      ]
    },
    series: [{ type: 'funnel', encode: { itemName: 'name', value: 'value' } }]
  }
};
