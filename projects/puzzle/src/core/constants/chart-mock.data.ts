import { ChartTypesEnum } from '../enums';

export const CHART_DATA_OPTIONS: Partial<{ [key in ChartTypesEnum]: object }> = {
  [ChartTypesEnum.bar]: {
    legend: {},
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', axisTick: { show: false }, data: ['Forest', 'Steppe', 'Desert', 'Wetland'] },
    yAxis: {},
    series: [
      { type: 'bar', name: '2012', data: [320, 220, 150, 98], itemStyle: { color: '#003366' } },
      { type: 'bar', name: '2013', data: [332, 182, 232, 77], itemStyle: { color: '#006699' } },
      { type: 'bar', name: '2014', data: [301, 191, 201, 101], itemStyle: { color: '#4cabce' } },
      { type: 'bar', name: '2015', data: [334, 234, 154, 99], itemStyle: { color: '#e5323e' } },
      { type: 'bar', name: '2016', data: [390, 290, 190, 40] }
    ]
  },
  [ChartTypesEnum.line]: {
    tooltip: { trigger: 'axis' },
    legend: {},
    xAxis: { type: 'category', boundaryGap: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    yAxis: { type: 'value' },
    series: [
      { type: 'line', smooth: true, name: 'Subscriptions', data: [120, 132, 101, 134, 90, 230, 210] },
      { type: 'line', smooth: true, name: 'Services', data: [220, 182, 191, 234, 290, 330, 310] },
      { type: 'line', smooth: true, name: 'Products', data: [150, 232, 201, 154, 190, 330, 410] }
    ]
  },
  [ChartTypesEnum.radar]: {
    tooltip: { trigger: 'item' },
    legend: {},
    radar: {
      indicator: [
        { name: 'Sales', max: 6500 },
        { name: 'Administration', max: 16000 },
        { name: 'Information Tech', max: 30000 },
        { name: 'Customer Support', max: 38000 },
        { name: 'Development', max: 52000 },
        { name: 'Marketing', max: 25000 }
      ]
    },
    series: [
      {
        type: 'radar',
        data: [
          { name: 'Allocated Budget', value: [4300, 10000, 28000, 35000, 50000, 19000] },
          { name: 'Actual Spending', value: [5000, 14000, 28000, 31000, 42000, 21000] }
        ]
      }
    ]
  },
  [ChartTypesEnum.scatter]: {
    tooltip: { trigger: 'item' },
    legend: {},
    xAxis: { type: 'value', axisLabel: { formatter: '{value} cm' } },
    yAxis: { type: 'value', axisLabel: { formatter: '{value} kg' } },
    series: [
      {
        name: 'Male',
        type: 'scatter',
        data: [
          [172, 65],
          [181, 75],
          [174, 70],
          [169, 62],
          [178, 80]
        ]
      },
      {
        name: 'Female',
        type: 'scatter',
        data: [
          [168, 59],
          [160, 50],
          [155, 48],
          [165, 55],
          [158, 52]
        ]
      }
    ]
  },
  [ChartTypesEnum.pie]: {
    tooltip: { trigger: 'item' },
    legend: {},
    series: [{
      type: 'pie',
      radius: '60%',
      label: { show: true },
      data: [
        { name: 'Direct', value: 335 },
        { name: 'Email', value: 310 },
        { name: 'Affiliate', value: 234 },
        { name: 'Video Ads', value: 135 },
        { name: 'Search', value: 1548 }
      ]
    }]
  },
  [ChartTypesEnum.boxPlot]: {
    tooltip: { trigger: 'item' },
    xAxis: { type: 'category', boundaryGap: true, splitArea: { show: false }, data: ['A', 'B', 'C'] },
    yAxis: { type: 'value', splitArea: { show: true } },
    series: [{ type: 'boxplot', data: [
      [850, 940, 980, 1040, 1160],
      [740, 800, 850, 890, 970],
      [900, 990, 1040, 1100, 1200]
    ] }]
  },
  [ChartTypesEnum.candlestick]: {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['2020-01-01','2020-01-02','2020-01-03','2020-01-04','2020-01-05'] },
    yAxis: { scale: true },
    series: [{ type: 'candlestick', data: [
      [2320.26, 2302.6, 2287.3, 2362.94],
      [2300, 2291.3, 2288.26, 2308.38],
      [2295.35, 2346.5, 2295.35, 2346.92],
      [2347.22, 2358.98, 2337.35, 2363.8],
      [2360.75, 2382.48, 2347.89, 2383.76]
    ] }]
  },
  [ChartTypesEnum.heatmap]: {
    tooltip: {},
    grid: { height: '50%', top: '10%' },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    yAxis: { type: 'category', data: ['1', '2'] },
    visualMap: { min: 0, max: 100, calculable: true, orient: 'horizontal', left: 'center', bottom: '5%' },
    series: [{ type: 'heatmap', label: { show: false }, data: [
      [0, 0, 10],
      [1, 0, 20],
      [2, 0, 30],
      [3, 0, 40],
      [4, 0, 50],
      [0, 1, 20],
      [1, 1, 10],
      [2, 1, 60],
      [3, 1, 80],
      [4, 1, 30]
    ] }]
  },
  [ChartTypesEnum.sunburst]: {
    series: {
      type: 'sunburst',
      radius: [0, '90%'],
      label: { rotate: 'radial' },
      data: [
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
    }
  },
  [ChartTypesEnum.treemap]: {
    series: [{ type: 'treemap', leafDepth: 2, data: [
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
    ] }]
  },
  [ChartTypesEnum.sankey]: {
    series: [{ type: 'sankey', emphasis: { focus: 'adjacency' }, data: [
      { name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }, { name: 'E' }
    ], links: [
      { source: 'A', target: 'B', value: 5 },
      { source: 'A', target: 'C', value: 3 },
      { source: 'B', target: 'D', value: 2 },
      { source: 'C', target: 'D', value: 2 },
      { source: 'C', target: 'E', value: 1 }
    ] }]
  },
  [ChartTypesEnum.chord]: {
    series: [{ type: 'chord', data: [
      { name: 'Group1' }, { name: 'Group2' }, { name: 'Group3' }, { name: 'Group4' }
    ], links: [
      { source: 'Group1', target: 'Group2', value: 10 },
      { source: 'Group2', target: 'Group3', value: 8 },
      { source: 'Group3', target: 'Group1', value: 6 },
      { source: 'Group1', target: 'Group4', value: 4 }
    ] }]
  },
  [ChartTypesEnum.funnel]: {
    tooltip: { trigger: 'item' },
    series: [{ type: 'funnel', data: [
      { name: 'Visit', value: 100 },
      { name: 'Click', value: 80 },
      { name: 'Inquiry', value: 60 },
      { name: 'Order', value: 40 },
      { name: 'Deal', value: 20 }
    ] }]
  },
  [ChartTypesEnum.effectScatter]: {
    tooltip: { trigger: 'item' },
    xAxis: { type: 'value' },
    yAxis: { type: 'value' },
    series: [
      {
        type: 'effectScatter',
        rippleEffect: { brushType: 'stroke', scale: 3 },
        symbolSize: 12,
        data: [
          [10, 8],
          [15, 20],
          [20, 18],
          [25, 30],
          [30, 22]
        ]
      }
    ]
  },
  [ChartTypesEnum.parallel]: {
    parallelAxis: [
      { dim: 0, name: 'Price' },
      { dim: 1, name: 'Net Weight' },
      { dim: 2, name: 'Amount' },
      { dim: 3, name: 'Score' }
    ],
    series: [
      {
        type: 'parallel',
        lineStyle: { width: 1 },
        data: [
          [12.99, 100, 80, 90],
          [9.99, 60, 50, 70],
          [22.5, 120, 110, 88],
          [5.5, 40, 30, 60]
        ]
      }
    ]
  },
  [ChartTypesEnum.themeRiver]: {
    tooltip: { trigger: 'axis' },
    singleAxis: { type: 'time' },
    series: [
      {
        type: 'themeRiver',
        data: [
          ['2020-01-01', 10, 'A'],
          ['2020-01-02', 15, 'A'],
          ['2020-01-03', 13, 'A'],
          ['2020-01-01', 8, 'B'],
          ['2020-01-02', 12, 'B'],
          ['2020-01-03', 10, 'B'],
          ['2020-01-01', 5, 'C'],
          ['2020-01-02', 6, 'C'],
          ['2020-01-03', 7, 'C']
        ]
      }
    ]
  },
  [ChartTypesEnum.tree]: {
    series: [
      {
        type: 'tree',
        orient: 'LR',
        expandAndCollapse: true,
        label: { position: 'left', verticalAlign: 'middle', align: 'right' },
        leaves: { label: { position: 'right', verticalAlign: 'middle', align: 'left' } },
        data: [
          {
            name: 'Root',
            children: [
              { name: 'Child A', children: [{ name: 'A1' }, { name: 'A2' }] },
              { name: 'Child B', children: [{ name: 'B1' }, { name: 'B2' }] }
            ]
          }
        ]
      }
    ]
  },
  [ChartTypesEnum.gauge]: {
    series: [
      {
        type: 'gauge',
        progress: { show: true },
        detail: { valueAnimation: true, formatter: '{value}%' },
        data: [{ value: 37, name: 'Completion' }]
      }
    ]
  },
  [ChartTypesEnum.graph]: {
    tooltip: {},
    series: [
      {
        type: 'graph',
        layout: 'force',
        roam: true,
        label: { show: true },
        data: [
          { name: 'Node1', value: 10 },
          { name: 'Node2', value: 20 },
          { name: 'Node3', value: 15 },
          { name: 'Node4', value: 12 }
        ],
        links: [
          { source: 'Node1', target: 'Node2' },
          { source: 'Node2', target: 'Node3' },
          { source: 'Node3', target: 'Node4' },
          { source: 'Node1', target: 'Node4' }
        ]
      }
    ]
  }
};
