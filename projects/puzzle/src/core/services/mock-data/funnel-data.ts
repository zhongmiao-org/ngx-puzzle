/**
 * 漏斗图数据
 * 包含组别和数值数据
 */

export interface FunnelDataItem {
  group: string;
  value: number;
}

export const funnelData: FunnelDataItem[] = [
  { group: 'Qualify', value: 7910 },
  { group: 'Develop', value: 8170 },
  { group: 'Propose', value: 7260 },
  { group: 'Close', value: 4460 },
];
