// Sunburst mock hierarchical data
export interface SunburstNode { name: string; value?: number; children?: SunburstNode[] }
export const sunburstData: SunburstNode[] = [
  {
    name: 'Grand',
    children: [
      {
        name: 'A',
        value: 6,
        children: [
          { name: 'A1', value: 2 },
          { name: 'A2', value: 4 }
        ]
      },
      {
        name: 'B',
        value: 4,
        children: [
          { name: 'B1', value: 2 },
          { name: 'B2', value: 2 }
        ]
      }
    ]
  }
];
