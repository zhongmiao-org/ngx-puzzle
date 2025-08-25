/**
 * 桑基图数据
 * 包含能源流动的来源、目标和大小数据
 */

export interface SankeyDataItem {
  from: string;
  to: string;
  size: number;
}

export const sankeyData: SankeyDataItem[] = [
  { from: 'Wind', to: 'Renewables', size: 79 },
  { from: 'Nuclear', to: 'Renewables', size: 38 },
  { from: 'Biomass', to: 'Renewables', size: 14 },
  { from: 'Solar', to: 'Renewables', size: 13 },
  { from: 'Hydro', to: 'Renewables', size: 3 },
  { from: 'Natural Gas', to: 'Fossil Fuels', size: 86 },
  { from: 'Coal', to: 'Fossil Fuels', size: 3 },
  { from: 'Imports', to: 'Total', size: 33 },
  { from: 'Fossil Fuels', to: 'Total', size: 89 },
  { from: 'Renewables', to: 'Total', size: 147 },
];
