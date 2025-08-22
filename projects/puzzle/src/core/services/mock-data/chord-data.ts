/**
 * 弦图数据
 * 包含区域间连接的来源、目标和大小数据
 */

export interface ChordDataItem {
  from: string;
  to: string;
  size: number;
}

export const chordData: ChordDataItem[] = [
  { from: 'Asia', to: 'Europe', size: 20 },
  { from: 'Asia', to: 'Americas', size: 19 },
  { from: 'Asia', to: 'Africa', size: 4 },
  { from: 'Asia', to: 'Oceania', size: 8 },
  { from: 'Europe', to: 'Asia', size: 5 },
  { from: 'Europe', to: 'Americas', size: 5 },
  { from: 'Europe', to: 'Africa', size: 3 },
  { from: 'Europe', to: 'Oceania', size: 2 },
  { from: 'Americas', to: 'Asia', size: 4 },
  { from: 'Americas', to: 'Europe', size: 5 },
  { from: 'Americas', to: 'Africa', size: 11 },
  { from: 'Americas', to: 'Oceania', size: 6 },
  { from: 'Africa', to: 'Asia', size: 3 },
  { from: 'Africa', to: 'Europe', size: 9 },
  { from: 'Africa', to: 'Americas', size: 3 },
  { from: 'Oceania', to: 'Asia', size: 1 },
  { from: 'Oceania', to: 'Europe', size: 1 },
  { from: 'Oceania', to: 'Americas', size: 1 },
];
