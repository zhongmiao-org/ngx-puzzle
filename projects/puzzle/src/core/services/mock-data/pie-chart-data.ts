/**
 * 饼图数据
 * 包含资产类型、金额和收益率数据
 */

export interface PieChartDataItem {
  asset: string;
  amount: number;
  yield: number;
}

export const pieChartData: PieChartDataItem[] = [
  { asset: 'Stocks', amount: 60000, yield: 1 },
  { asset: 'Bonds', amount: 40000, yield: 1 },
  { asset: 'Cash', amount: 7000, yield: 1 },
  { asset: 'Real Estate', amount: 5000, yield: 1 },
  { asset: 'Commodities', amount: 3000, yield: 1 },
];
