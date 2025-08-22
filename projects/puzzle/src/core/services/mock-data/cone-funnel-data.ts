/**
 * 锥形漏斗图数据
 * 包含组别和数值数据
 */

export interface ConeFunnelDataItem {
  group: string;
  value: number;
}

export const coneFunnelData: ConeFunnelDataItem[] = [
  { group: "Close", value: 4460 },
  { group: "Propose", value: 7260 },
  { group: "Develop", value: 7910 },
  { group: "Qualify", value: 8170 },
];
