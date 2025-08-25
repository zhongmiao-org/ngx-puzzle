import { ChartTypesEnum, LabelFormatterEnum } from '../enums';

export const CHART_DATA_OPTIONS: Partial<{ [key in ChartTypesEnum]: object }> = {
  [ChartTypesEnum.bar]: {
    dataset: {
      dimensions: ['type', '2012', '2013', '2014', '2015', '2016'],
      source: [
        {
          '2012': 320,
          '2013': 332,
          '2014': 301,
          '2015': 334,
          '2016': 390,
          type: 'Forest'
        },
        {
          '2012': 220,
          '2013': 182,
          '2014': 191,
          '2015': 234,
          '2016': 290,
          type: 'Steppe'
        },
        {
          '2012': 150,
          '2013': 232,
          '2014': 201,
          '2015': 154,
          '2016': 190,
          type: 'Desert'
        },
        {
          '2012': 98,
          '2013': 77,
          '2014': 101,
          '2015': 99,
          '2016': 40,
          type: 'Wetland'
        }
      ]
    },
    legend: {},
    xAxis: {
      type: 'category',
      axisTick: {
        show: false
      }
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        layoutBy: 'row',
        itemStyle: {
          color: '#003366'
        }
      },
      {
        type: 'bar',
        layoutBy: 'row',
        itemStyle: {
          color: '#006699'
        }
      },
      {
        type: 'bar',
        layoutBy: 'row',
        itemStyle: {
          color: '#4cabce'
        }
      },
      {
        type: 'bar',
        layoutBy: 'row',
        itemStyle: {
          color: '#e5323e'
        }
      }
    ],
    title: {
      text: 'test',
      subtext: 'Sub Title',
      textStyle: {
        fontSize: 20
      },
      subtextStyle: {
        fontSize: 16
      }
    }
  },
  [ChartTypesEnum.area]: {
    theme: 'ag-default',
    title: {
      text: 'title',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'subtitle',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    },
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    axes: [
      {
        type: 'category',
        position: 'bottom',
        label: {
          color: '#666666',
          fontSize: 12
        },
        title: {
          enabled: false,
          text: '',
          fontSize: 10,
          color: '#666666'
        }
      },
      {
        type: 'number',
        position: 'left',
        label: {
          color: '#666666',
          fontSize: 12
        },
        title: {
          enabled: false,
          text: '',
          fontSize: 10,
          color: '#666666'
        }
      }
    ],
    data: [],
    series: [
      {
        type: 'area',
        xKey: 'month',
        yKey: 'subscriptions',
        yName: 'Subscriptions',
        marker: {
          enabled: false
        }
      },
      {
        type: 'area',
        xKey: 'month',
        yKey: 'services',
        yName: 'Services',
        marker: {
          enabled: false
        }
      },
      {
        type: 'area',
        xKey: 'month',
        yKey: 'products',
        yName: 'Products',
        marker: {
          enabled: false
        }
      }
    ],
    background: {
      fill: 'transparent'
    }
  },
  [ChartTypesEnum.scatter]: {
    theme: 'ag-default',
    title: {
      text: 'Weight vs Height',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'With Name Labels',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    },
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    axes: [
      {
        type: 'number',
        position: 'bottom',
        title: {
          text: 'Height'
        },
        label: {
          formatter: LabelFormatterEnum.lengthCm
        }
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: 'Weight'
        },
        label: {
          formatter: LabelFormatterEnum.massKg
        }
      }
    ],
    series: [
      {
        type: 'scatter',
        title: 'Male',
        data: [],
        xKey: 'height',
        xName: 'Height',
        yKey: 'weight',
        yName: 'Weight',
        labelKey: 'name',
        labelName: 'Name',
        shape: 'square',
        fill: '#6f6ab5',
        stroke: '#9f4e4a',
        label: {
          enabled: false
        }
      },
      {
        type: 'scatter',
        title: 'Female',
        data: [],
        xKey: 'height',
        xName: 'Height',
        yKey: 'weight',
        yName: 'Weight',
        labelKey: 'name',
        labelName: 'Name',
        fill: '#91deb5',
        stroke: '#56659b',
        label: { enabled: false }
      }
    ],
    background: {
      fill: 'transparent'
    }
  },
  [ChartTypesEnum.bubble]: {
    theme: 'ag-default',
    title: {
      text: 'Weight vs Height',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'With Name Labels',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    },
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    axes: [
      {
        type: 'number',
        position: 'bottom',
        title: {
          text: 'Height'
        },
        label: {
          formatter: LabelFormatterEnum.lengthCm
        }
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: 'Weight'
        },
        label: {
          formatter: LabelFormatterEnum.massKg
        }
      }
    ],
    series: [
      {
        type: 'bubble',
        title: 'Male',
        data: [],
        xKey: 'height',
        xName: 'Height',
        yKey: 'weight',
        yName: 'Weight',
        sizeKey: 'age',
        sizeName: 'Age',
        labelKey: 'name',
        labelName: 'Name',
        shape: 'square',
        fill: '#6f6ab5',
        stroke: '#9f4e4a',
        label: {
          enabled: false
        }
      },
      {
        type: 'bubble',
        title: 'Female',
        data: [],
        xKey: 'height',
        xName: 'Height',
        yKey: 'weight',
        yName: 'Weight',
        sizeKey: 'age',
        sizeName: 'Age',
        labelKey: 'name',
        labelName: 'Name',
        fill: '#91deb5',
        stroke: '#56659b',
        label: { enabled: false }
      }
    ],
    background: {
      fill: 'transparent'
    }
  },
  [ChartTypesEnum.pie]: {
    theme: 'ag-default',
    title: {
      text: 'Weight vs Height',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'With Name Labels',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    },
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    data: [],
    axes: [],
    series: [
      {
        type: 'pie',
        angleKey: 'amount',
        radiusKey: 'yield',
        calloutLabelKey: 'asset',
        calloutLabel: {
          enabled: true,
          color: '#333333',
          fontWeight: 'bold'
        },
        sectorLabelKey: 'amount',
        // legendItemKey: "asset",
        sectorLabel: {
          enabled: true,
          color: '#ffffff',
          fontWeight: 'bold'
        }
      }
    ],
    background: {
      fill: 'transparent'
    }
  },
  [ChartTypesEnum.donut]: {
    theme: 'ag-default',
    title: {
      text: 'Portfolio Composition',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'Versus Previous Year',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    },
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    data: [],
    axes: [],
    series: [
      {
        type: 'donut',
        title: {
          text: 'Previous Year',
          showInLegend: true
        },
        calloutLabelKey: 'asset',
        angleKey: 'previousYear',
        outerRadiusRatio: 1,
        innerRadiusRatio: 0.9
      },
      {
        type: 'donut',
        title: {
          text: 'Current Year',
          showInLegend: true
        },
        calloutLabelKey: 'asset',
        angleKey: 'currentYear',
        outerRadiusRatio: 0.6,
        innerRadiusRatio: 0.2
      }
    ],
    background: {
      fill: 'transparent'
    }
  },
  [ChartTypesEnum.combination]: {
    theme: 'ag-default',
    axes: [
      {
        type: 'category',
        position: 'bottom',
        label: {
          color: '#666666',
          fontSize: 12
        },
        title: {
          enabled: false,
          text: '',
          fontSize: 10,
          color: '#666666'
        }
      },
      {
        type: 'number',
        position: 'left',
        label: {
          color: '#666666',
          fontSize: 12
        },
        title: {
          enabled: false,
          text: '',
          fontSize: 10,
          color: '#666666'
        }
      }
    ],
    series: [
      {
        type: 'area',
        xKey: 'quarter',
        yKey: 'iphone',
        yName: 'iPhone'
      },
      {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'mac',
        yName: 'Mac'
      },
      {
        type: 'line',
        xKey: 'quarter',
        yKey: 'ipad',
        yName: 'iPad'
      },
      {
        type: 'line',
        xKey: 'quarter',
        yKey: 'wearables',
        yName: 'Wearables'
      },
      {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'services',
        yName: 'Services'
      }
    ],
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    data: [],
    background: {
      fill: 'transparent'
    },
    title: {
      text: 'title',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'subtitle',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.boxPlot]: {
    theme: 'ag-default',
    axes: [
      {
        type: 'category',
        position: 'bottom',
        label: {
          color: '#666666',
          fontSize: 12
        },
        title: {
          enabled: false,
          text: '',
          fontSize: 10,
          color: '#666666'
        }
      },
      {
        type: 'number',
        position: 'left',
        label: {
          color: '#666666',
          fontSize: 12
        },
        title: {
          enabled: false,
          text: '',
          fontSize: 10,
          color: '#666666'
        }
      }
    ],
    series: [
      {
        type: 'box-plot',
        yName: 'Employee Salaries',
        xKey: 'role',
        xName: 'Role',
        minKey: 'min',
        minName: 'Min',
        q1Key: 'q1',
        q1Name: 'Q1',
        medianKey: 'median',
        medianName: 'Median',
        q3Key: 'q3',
        q3Name: 'Q3',
        maxKey: 'max',
        maxName: 'Max',
        fill: '#7fc3c3',
        stroke: '#098a89',
        strokeWidth: 2,
        whisker: {
          stroke: '#098a89',
          strokeWidth: 3
          // lineDash: [10, 0],
        },
        cap: {
          lengthRatio: 0.8
        }
      }
    ],
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    data: [
      {
        role: 'Sales',
        min: 4001,
        q1: 5071,
        median: 6232,
        q3: 8620,
        max: 13872
      },
      {
        role: 'Research',
        min: 1009,
        q1: 2389,
        median: 2889,
        q3: 3904,
        max: 5974
      },
      {
        role: 'Manufacturing',
        min: 4011,
        q1: 5121,
        median: 6474,
        q3: 9547,
        max: 13973
      },
      {
        role: 'Manager',
        min: 12504,
        q1: 16437,
        median: 17465,
        q3: 19187,
        max: 19999
      },
      {
        role: 'HR',
        min: 1555,
        q1: 2342,
        median: 3195,
        q3: 5985,
        max: 10725
      }
    ],
    background: {
      fill: 'transparent'
    },
    title: {
      text: 'title',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'subtitle',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.candlestick]: {
    theme: 'ag-default',
    axes: [
      {
        type: 'ordinal-time',
        position: 'bottom',
        label: {
          format: '%H:%M',
          color: '#666666',
          fontSize: 12
        }
      },
      {
        type: 'number',
        position: 'left'
        // crosshair: {
        // 	enabled: true,
        // 	label: {
        // 		enabled: true,
        // 		format: ',f',
        // 		color: '#2ed608',
        // 		fontSize: 12,
        // 	},
        // },
      }
    ],
    series: [
      {
        type: 'candlestick',
        xKey: 'date',
        xName: 'Time',
        lowKey: 'low',
        highKey: 'high',
        openKey: 'open',
        closeKey: 'close',
        item: {
          up: {
            fill: 'transparent',
            stroke: '#2b5c95',
            wick: {
              strokeWidth: 2
            }
          },
          down: {
            fill: '#5090dc',
            stroke: '#2b5c95',
            wick: {
              strokeWidth: 2
            }
          }
        }
      }
    ],
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    data: [],
    background: {
      fill: 'transparent'
    },
    title: {
      text: 'Dow Jones Industrial Average',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'Candlestick Patterns',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: '1 Minute',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.ohlc]: {
    theme: 'ag-default',
    axes: [
      {
        type: 'ordinal-time',
        position: 'bottom',
        label: {
          format: '%H:%M'
        }
      },
      {
        type: 'number',
        position: 'left',
        crosshair: {
          label: {
            format: ',f'
          }
        }
      }
    ],
    series: [
      {
        type: 'ohlc',
        xKey: 'date',
        xName: 'Time',
        lowKey: 'low',
        highKey: 'high',
        openKey: 'open',
        closeKey: 'close',
        item: {
          up: {
            stroke: '#45ba45',
            strokeWidth: 1
          },
          down: {
            stroke: '#ba4545',
            strokeWidth: 1
          }
        }
      }
    ],
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    data: [],
    background: {
      fill: 'transparent'
    },
    title: {
      text: 'Dow Jones Industrial Average',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'Candlestick Patterns',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: '1 Minute',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.heatmap]: {
    theme: 'ag-default',
    axes: [
      {
        type: 'category',
        position: 'bottom',
        label: {
          color: '#666666',
          fontSize: 12
        },
        title: {
          enabled: false,
          text: '月平均温度',
          fontSize: 10,
          color: '#666666'
        }
      },
      {
        type: 'category', // Y
        position: 'left',
        label: {
          color: '#666666',
          fontSize: 12
        },
        title: {
          enabled: false,
          text: '月平均温度',
          fontSize: 10,
          color: '#666666'
        }
      }
    ],
    series: [
      {
        type: 'heatmap',
        xKey: 'month',
        xName: '月份',
        yKey: 'year',
        yName: '年份',
        colorKey: 'temperature',
        colorName: '温度（°C）',
        colorRange: ['#78C7EB', '#B2F7EF', '#FF6347'],
        label: {
          enabled: false
          // formatter: ({ datum, colorKey = "" } : {datum: any, colorKey: string}) => {
          // 	const value = datum[colorKey];
          // 	return `${value.toFixed(0)}°C`;
          // },
        }
      }
    ],
    gradientLegend: {
      // new
      enabled: true,
      position: 'bottom',
      gradient: {
        thickness: 10,
        preferredLength: 200
      },
      scale: {
        label: {
          fontSize: 10,
          // fontStyle: "italic",
          fontWeight: 'bold',
          // fontFamily: "serif",
          color: '#004ca8'
        },
        padding: 5
      }
    },
    data: [],
    background: {
      fill: 'transparent'
    },
    title: {
      text: '月平均温度（°C）',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'subtitle',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.histogram]: {
    theme: 'ag-default',
    axes: [
      {
        type: 'number', // X 轴
        position: 'bottom',
        label: {
          color: '#666666',
          fontSize: 12
        },
        title: {
          enabled: false,
          text: '年龄段（岁）',
          fontSize: 10,
          color: '#666666'
        },
        interval: { step: 2 },
        gridLine: {
          enabled: true,
          width: 1
        }
      },
      {
        type: 'number', // Y 轴
        position: 'left',
        label: {
          color: '#666666',
          fontSize: 12
        },
        title: {
          enabled: false,
          text: '奖金总额（人民币）',
          fontSize: 10,
          color: '#666666'
        },
        gridLine: {
          enabled: true,
          width: 1
        }
      }
    ],
    series: [
      {
        type: 'histogram',
        xKey: 'age',
        xName: 'Participant Age',
        yKey: 'winnings',
        yName: '奖金',
        aggregation: 'sum'
      }
    ],
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    data: [],
    background: {
      fill: 'transparent'
    },
    title: {
      text: '奖金分配',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: '按参与者年龄划分的总奖金',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.nightingale]: {
    theme: 'ag-default',
    axes: [
      {
        type: 'angle-category',
        groupPaddingInner: 0.2,
        paddingInner: 0.3
      },
      {
        type: 'radius-number',
        innerRadiusRatio: 0
      }
    ],
    series: [
      {
        type: 'nightingale',
        angleKey: 'quarter',
        radiusKey: 'software',
        radiusName: 'Software',
        grouped: false
      },
      {
        type: 'nightingale',
        angleKey: 'quarter',
        radiusKey: 'hardware',
        radiusName: 'Hardware',
        grouped: false
      },
      {
        type: 'nightingale',
        angleKey: 'quarter',
        radiusKey: 'services',
        radiusName: 'Services',
        grouped: false
      }
    ],
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    data: [],
    background: {
      fill: 'transparent'
    },
    title: {
      text: 'title',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'subtitle',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.radarArea]: {
    theme: 'ag-default',
    axes: [
      {
        type: 'angle-category',
        shape: 'polygon',
        label: {
          orientation: 'parallel',
          color: '#666666'
        }
      },
      {
        type: 'radius-number',
        shape: 'polygon',
        positionAngle: 72,
        label: {
          rotation: -72,
          color: '#666666'
        }
      }
    ],
    series: [
      {
        type: 'radar-area',
        angleKey: 'department',
        radiusKey: 'quality',
        radiusName: 'Quality'
      },
      {
        type: 'radar-area',
        angleKey: 'department',
        radiusKey: 'efficiency',
        radiusName: 'Efficiency'
      }
    ],
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    data: [
      {
        department: 'Sales',
        quality: 40,
        efficiency: 75
      },
      {
        department: 'Engineering',
        quality: 45,
        efficiency: 90
      },
      {
        department: 'HR',
        quality: 80,
        efficiency: 60
      },
      {
        department: 'Marketing',
        quality: 80,
        efficiency: 60
      },
      {
        department: 'Finance',
        quality: 85,
        efficiency: 50
      }
    ],
    background: {
      fill: 'transparent'
    },
    title: {
      text: 'title',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'subtitle',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.radarLine]: {
    theme: 'ag-default',
    axes: [
      {
        type: 'angle-category',
        shape: 'polygon',
        label: {
          orientation: 'parallel',
          color: '#666666'
        }
      },
      {
        type: 'radius-number',
        shape: 'polygon',
        positionAngle: 72,
        label: {
          rotation: -72,
          color: '#666666'
        }
      }
    ],
    series: [
      {
        type: 'radar-line',
        angleKey: 'department',
        radiusKey: 'quality',
        radiusName: 'Quality'
      },
      {
        type: 'radar-line',
        angleKey: 'department',
        radiusKey: 'efficiency',
        radiusName: 'Efficiency'
      }
    ],
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    data: [
      {
        department: 'Sales',
        quality: 40,
        efficiency: 75
      },
      {
        department: 'Engineering',
        quality: 45,
        efficiency: 90
      },
      {
        department: 'HR',
        quality: 80,
        efficiency: 60
      },
      {
        department: 'Marketing',
        quality: 80,
        efficiency: 60
      },
      {
        department: 'Finance',
        quality: 85,
        efficiency: 50
      }
    ],
    background: {
      fill: 'transparent'
    },
    title: {
      text: 'title',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'subtitle',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.radialBar]: {
    theme: 'ag-default',
    axes: [
      {
        type: 'radius-category',
        positionAngle: 0,
        groupPaddingInner: 0.5,
        paddingInner: 0.5,
        paddingOuter: 0.25,
        title: {
          enabled: false,
          text: '',
          fontSize: 10,
          color: '#666666'
        }
      },
      {
        type: 'angle-number',
        label: {
          orientation: 'parallel',
          color: '#666666',
          fontSize: 10
        },
        startAngle: 0,
        endAngle: 360
        // groupPaddingInner: 0.5,
        // paddingInner: 0.5,
      }
    ],
    series: [
      {
        type: 'radial-bar',
        radiusKey: 'quarter',
        angleKey: 'software',
        angleName: 'Software',
        stacked: false
      },
      {
        type: 'radial-bar',
        radiusKey: 'quarter',
        angleKey: 'hardware',
        angleName: 'Hardware',
        stacked: false
      },
      {
        type: 'radial-bar',
        radiusKey: 'quarter',
        angleKey: 'services',
        angleName: 'Services',
        stacked: false
      }
    ],
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    data: [],
    background: {
      fill: 'transparent'
    },
    title: {
      text: 'title',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'subtitle',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.radialColumn]: {
    theme: 'ag-default',
    axes: [
      {
        type: 'angle-category',
        label: {
          orientation: 'parallel',
          color: '#666666',
          fontSize: 10,
          fontWeight: 'normal'
        },
        groupPaddingInner: 0.5,
        paddingInner: 0.5
      },
      {
        type: 'radius-number',
        innerRadiusRatio: 0.2,
        positionAngle: 90,
        label: {
          rotation: -90,
          color: '#666666',
          fontSize: 10,
          fontWeight: 'normal'
        }
      }
    ],
    series: [
      { type: 'radial-column', angleKey: 'quarter', radiusKey: 'software', radiusName: 'Software', stacked: true },
      { type: 'radial-column', angleKey: 'quarter', radiusKey: 'hardware', radiusName: 'Hardware', stacked: true },
      { type: 'radial-column', angleKey: 'quarter', radiusKey: 'services', radiusName: 'Services', stacked: true }
    ],
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    data: [],
    background: {
      fill: 'transparent'
    },
    title: {
      text: 'title',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'subtitle',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.rangeArea]: {
    theme: 'ag-default',
    axes: [
      {
        type: 'number',
        position: 'left',
        title: {
          enabled: true,
          text: 'Average Price',
          color: '#666666',
          fontSize: 12
        },
        label: {
          color: '#666666',
          fontSize: 10,
          fontWeight: 'normal'
          // formatter: ({ value }) => `£${Number(value).toLocaleString()}`,
        }
      },
      {
        type: 'time',
        position: 'bottom',
        title: {
          enabled: false,
          text: 'time',
          color: '#666666',
          fontSize: 12
        },
        label: {
          color: '#666666',
          fontSize: 10,
          fontWeight: 'normal'
        }
      }
    ],
    series: [
      {
        type: 'range-area',
        xKey: 'date',
        yLowKey: 'flatsAndMaisonettes',
        yHighKey: 'terracedHouses',
        xName: 'Date',
        yName: 'Flats & Terraced',
        yLowName: 'Flats & Maisonettes',
        yHighName: 'Terraced'
      },
      {
        type: 'range-area',
        xKey: 'date',
        yLowKey: 'semiDetachedHouses',
        yHighKey: 'detachedHouses',
        xName: 'Date',
        yName: 'Semi-detached & Detached',
        yLowName: 'Semi-detached',
        yHighName: 'Detached'
      }
    ],
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    data: [],
    background: {
      fill: 'transparent'
    },
    title: {
      text: 'title',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'subtitle',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.rangeBar]: {
    theme: 'ag-default',
    axes: [
      {
        type: 'category',
        position: 'bottom',
        label: {
          color: '#666666',
          fontSize: 10
        },
        title: {
          enabled: false,
          text: '',
          fontSize: 12,
          color: '#666666'
        }
      },
      {
        type: 'number',
        position: 'left',
        label: {
          color: '#666666',
          fontSize: 12
        },
        title: {
          enabled: false,
          text: '',
          fontSize: 12,
          color: '#666666'
        }
      }
    ],
    series: [
      {
        type: 'range-bar',
        xKey: 'date',
        yLowKey: 'start',
        yHighKey: 'gain',
        xName: 'Month',
        yLowName: 'Start',
        yHighName: 'End',
        yName: 'Gained'
      },
      {
        type: 'range-bar',
        xKey: 'date',
        yLowKey: 'loss',
        yHighKey: 'gain',
        xName: 'Month',
        yLowName: 'End',
        yHighName: 'Start',
        yName: 'Lost'
      }
    ],
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    data: [],
    background: {
      fill: 'transparent'
    },
    title: {
      text: 'title',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'subtitle',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.waterfall]: {
    theme: 'ag-default',
    axes: [
      {
        type: 'category',
        position: 'bottom',
        label: {
          color: '#666666',
          fontSize: 12
        },
        title: {
          enabled: false,
          text: '',
          fontSize: 10,
          color: '#666666'
        }
      },
      {
        type: 'number',
        position: 'left',
        label: {
          color: '#666666',
          fontSize: 12
        },
        title: {
          enabled: false,
          text: '',
          fontSize: 10,
          color: '#666666'
        }
      }
    ],
    series: [
      {
        type: 'waterfall',
        xKey: 'financials',
        xName: 'Financials',
        yKey: 'amount',
        yName: 'Amount'
      }
    ],
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    data: [],
    background: {
      fill: 'transparent'
    },
    title: {
      text: 'title',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'subtitle',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.sunburst]: {
    theme: 'ag-default',
    axes: [
      {
        type: 'category',
        position: 'bottom',
        label: {
          color: '#666666',
          fontSize: 12
        },
        title: {
          enabled: false,
          text: '',
          fontSize: 10,
          color: '#666666'
        }
      },
      {
        type: 'number',
        position: 'left',
        label: {
          color: '#666666',
          fontSize: 12
        },
        title: {
          enabled: false,
          text: '',
          fontSize: 10,
          color: '#666666'
        }
      }
    ],
    series: [
      {
        type: 'sunburst',
        labelKey: 'name',
        sizeKey: 'gdp',
        sizeName: 'GDP',
        // fills: ['#D32F2F', '#FF5722', '#283593'], // '#D32F2F', '#FF5722', '#283593'  i.当使用【颜色范围】时，【填充颜色】将被忽略
        colorKey: 'gdpChange', //
        colorName: 'Change', //
        colorRange: ['#FF0000', '#FF6347', '#0047AB'], //
        label: {
          enabled: true,
          color: '#ffffff',
          fontSize: 12,
          fontWeight: 'normal'
        }
      }
    ],
    gradientLegend: {
      // new
      enabled: true,
      position: 'bottom',
      gradient: {
        thickness: 10,
        preferredLength: 200
      },
      scale: {
        label: {
          fontSize: 10,
          // fontStyle: "italic",
          fontWeight: 'bold',
          // fontFamily: "serif",
          color: '#004ca8'
        },
        padding: 5
      }
    },
    data: [],
    background: {
      fill: 'transparent'
    },
    title: {
      text: 'title',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'subtitle',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.treemap]: {
    theme: 'ag-default',
    series: [
      {
        type: 'treemap',
        labelKey: 'title',
        secondaryLabelKey: 'total',
        sizeKey: 'total',
        sizeName: 'Total',
        group: {
          label: {
            enabled: true,
            color: '#666666',
            fontSize: 12,
            spacing: 2
          },
          fill: '#ffffff',
          fillOpacity: 0.8,
          stroke: '#ffffff',
          strokeWidth: '1',
          strokeOpacity: '1'
        },
        tile: {
          label: {
            enabled: true,
            color: '#ffffff',
            fontSize: 12,
            minimumFontSize: 9,
            spacing: 8
          },
          secondaryLabel: {
            enabled: true,
            color: '#ffffff',
            fontSize: 12,
            fontWeight: 'normal'
          },
          fill: undefined,
          fillOpacity: 0.8
        }
      }
    ],
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    data: [],
    background: {
      fill: 'transparent'
    },
    title: {
      text: 'title',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'subtitle',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.sankey]: {
    theme: 'ag-default',
    series: [
      {
        type: 'sankey',
        fromKey: 'from',
        toKey: 'to',
        sizeKey: 'size',
        sizeName: 'Total (GWh)',
        label: {
          enabled: true,
          fontSize: 12,
          color: '#666666'
        },
        link: {
          fill: undefined,
          fillOpacity: 0.25,
          stroke: undefined,
          strokeWidth: 1,
          strokeOpacity: 0.25
        }
      }
    ],
    legend: {
      enabled: false,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    data: [],
    background: {
      fill: 'transparent'
    },
    title: {
      text: 'title',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'subtitle',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.chord]: {
    theme: 'ag-default',
    series: [
      {
        type: 'chord',
        fromKey: 'from',
        toKey: 'to',
        sizeKey: 'size',
        sizeName: 'Migration (millions)',
        label: {
          enabled: true,
          fontSize: 12,
          color: '#666666'
        },
        link: {
          fill: '#34495e',
          fillOpacity: 0.25,
          stroke: '#2c3e50',
          strokeWidth: 1,
          strokeOpacity: 0.25
        }
      }
    ],
    legend: {
      enabled: false,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    data: [],
    background: {
      fill: 'transparent'
    },
    title: {
      text: 'title',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'subtitle',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.funnel]: {
    theme: 'ag-default',
    axes: [
      {
        type: 'category',
        position: 'left',
        label: {
          enabled: true,
          color: '#666666',
          fontSize: 12
        },
        title: {
          enabled: false,
          text: '',
          fontSize: 10,
          color: '#666666'
        }
      },
      {
        type: 'number',
        position: 'bottom',
        label: {
          enabled: false,
          color: '#666666',
          fontSize: 12
        },
        title: {
          enabled: false,
          text: '',
          fontSize: 10,
          color: '#666666'
        }
      }
    ],
    series: [
      {
        type: 'funnel',
        stageKey: 'group',
        valueKey: 'value',
        fills: ['#00BFFF', '#FFD700', '#3CB371', '#00CED1'],
        dropOff: {
          enabled: true
        }
      }
    ],
    data: [],
    legend: {
      enabled: false,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    background: {
      fill: 'transparent'
    },
    title: {
      text: 'title',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'subtitle',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.coneFunnel]: {
    theme: 'ag-default',
    axes: [
      {
        type: 'category',
        position: 'left',
        label: {
          enabled: true,
          color: '#666666',
          fontSize: 12
        },
        title: {
          enabled: false,
          text: '',
          fontSize: 10,
          color: '#666666'
        }
      },
      {
        type: 'number',
        position: 'bottom',
        label: {
          enabled: false,
          color: '#666666',
          fontSize: 12
        },
        title: {
          enabled: false,
          text: '',
          fontSize: 10,
          color: '#666666'
        }
      }
    ],
    // seriesArea: {
    // 	padding: {
    // 		left: 20,
    // 		right: 20,
    // 	},
    // },
    series: [
      {
        type: 'cone-funnel',
        stageKey: 'group',
        valueKey: 'value',
        direction: 'vertical',
        fills: ['#00BFFF', '#FFD700', '#3CB371'],
        label: {
          enabled: true,
          color: '#666666',
          fontSize: 12,
          fontWeight: 'normal'
        }
      }
    ],
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    data: [],
    background: {
      fill: 'transparent'
    },
    title: {
      text: 'title',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'subtitle',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.pyramid]: {
    theme: 'ag-default',
    series: [
      {
        type: 'pyramid',
        stageKey: 'group',
        valueKey: 'value',
        direction: 'vertical',
        fills: undefined,
        label: {
          enabled: true,
          color: '#666666',
          fontSize: 12,
          fontWeight: 'normal'
        },
        stageLabel: {
          placement: 'before',
          enabled: true,
          color: '#666666',
          fontSize: 12,
          fontWeight: 'normal'
        }
      }
    ],
    legend: {
      enabled: true,
      item: {
        label: {
          color: '#666666',
          fontSize: 12
        }
      }
    },
    data: [],
    background: {
      fill: 'transparent'
    },
    title: {
      text: 'title',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    subtitle: {
      text: 'subtitle',
      textAlign: 'left',
      color: '#666666',
      enabled: false
    },
    footnote: {
      text: 'footnote',
      textAlign: 'center',
      color: '#666666',
      enabled: false
    }
  },
  [ChartTypesEnum.mapMarker]: {
    theme: 'ag-default',
    series: [
      {
        type: 'map-shape-background',
        // idKey: 'city',
        // labelKey: 'name',
        levelKey: 'province',
        topology: null
      },
      {
        type: 'map-marker',
        latitudeKey: 'lat',
        longitudeKey: 'lon',
        sizeKey: 'count',
        sizeName: 'Count',
        size: 3,
        maxSize: 5,
        idKey: 'gid',
        idName: 'id',
        shape: 'pin'
        // labelKey: "geometry",
        // labelName: "标记类型"
      }
    ],
    background: {
      fill: 'transparent'
    }
  }
};
