// Radar mock data (series[0].data items)
export interface RadarSeriesItem {
  name: string;
  value: number[];
}
export const radarData: RadarSeriesItem[] = [
  {
    value: [4200, 3000, 20000, 35000, 50000, 18000],
    name: 'Allocated Budget'
  },
];

export const radarData2: RadarSeriesItem[] = [
  {
    value: [5000, 14000, 28000, 26000, 42000, 21000],
    name: 'Actual Spending'
  }
]
