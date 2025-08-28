// Radar mock data (series[0].data items)
export interface RadarSeriesItem { name: string; value: number[] }
export const radarData: RadarSeriesItem[] = [
  { name: 'Allocated Budget', value: [4300, 10000, 28000, 35000, 50000, 19000] },
  { name: 'Actual Spending', value: [5000, 14000, 28000, 31000, 42000, 21000] }
];
