/**
 * 径向柱状图数据
 * 包含季度、软件、硬件和服务数据
 */

export interface RadialBarDataItem {
  quarter: string;
  software: number;
  hardware: number;
  services: number;
}

export const radialBarData: RadialBarDataItem[] = [
  {
    quarter: `Q1'23`,
    software: 3.35,
    hardware: 3.14,
    services: 3.91,
  },
  {
    quarter: `Q2'23`,
    software: 3.28,
    hardware: 3.13,
    services: 3.54,
  },
  {
    quarter: `Q3'23`,
    software: 3.14,
    hardware: 2.84,
    services: 3.18,
  },
  {
    quarter: `Q4'23`,
    software: 2.48,
    hardware: 2.46,
    services: 3.21,
  },
];
