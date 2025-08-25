/**
 * 热力图数据
 * 包含按年份和月份组织的温度数据
 */

export interface HeatmapDataItem {
  year: string;
  month: string;
  temperature: number;
}

export const heatmapData: HeatmapDataItem[] = [
  {
    year: '2010',
    month: 'Jan',
    temperature: 1.2,
  },
  {
    year: '2010',
    month: 'Feb',
    temperature: 1.9,
  },
  {
    year: '2010',
    month: 'Mar',
    temperature: 5.9,
  },
  {
    year: '2010',
    month: 'Apr',
    temperature: 9.1,
  },
  {
    year: '2010',
    month: 'May',
    temperature: 10.9,
  },
  {
    year: '2010',
    month: 'Jun',
    temperature: 15.2,
  },
  {
    year: '2010',
    month: 'Jul',
    temperature: 16.2,
  },
  {
    year: '2010',
    month: 'Aug',
    temperature: 14.9,
  },
  {
    year: '2010',
    month: 'Sep',
    temperature: 13.4,
  },
  {
    year: '2010',
    month: 'Oct',
    temperature: 9.5,
  },
  {
    year: '2010',
    month: 'Nov',
    temperature: 4.9,
  },
  {
    year: '2010',
    month: 'Dec',
    temperature: 0.4,
  },
  {
    year: '2011',
    month: 'Jan',
    temperature: 3.9,
  },
  {
    year: '2011',
    month: 'Feb',
    temperature: 6,
  },
  {
    year: '2011',
    month: 'Mar',
    temperature: 6.6,
  },
  {
    year: '2011',
    month: 'Apr',
    temperature: 12,
  },
  {
    year: '2011',
    month: 'May',
    temperature: 12,
  },
  {
    year: '2011',
    month: 'Jun',
    temperature: 14.2,
  },
  {
    year: '2011',
    month: 'Jul',
    temperature: 15.8,
  },
  {
    year: '2011',
    month: 'Aug',
    temperature: 15.8,
  },
  {
    year: '2011',
    month: 'Sep',
    temperature: 14.9,
  },
  {
    year: '2011',
    month: 'Oct',
    temperature: 12.2,
  }
];
