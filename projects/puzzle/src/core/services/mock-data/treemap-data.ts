// Treemap mock hierarchical data (flat for treemap data prop)
export interface TreemapNode { name: string; value?: number; children?: TreemapNode[] }
export const treemapData: TreemapNode[] = [
  {
    name: 'Category A',
    value: 10,
    children: [
      { name: 'A1', value: 4 },
      { name: 'A2', value: 6 }
    ]
  },
  {
    name: 'Category B',
    value: 8,
    children: [
      { name: 'B1', value: 3 },
      { name: 'B2', value: 5 }
    ]
  }
];
