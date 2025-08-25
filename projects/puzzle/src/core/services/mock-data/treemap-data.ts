/**
 * 树图数据
 * 包含按类别和子类别组织的财政支出数据
 */

export interface TreemapChildItem {
  title: string;
  total: number;
  change: number;
}

export interface TreemapParentItem {
  title: string;
  children: TreemapChildItem[];
}

export const treemapData: TreemapParentItem[] = [
  {
    title: 'Health Care',
    children: [{ title: 'Medical service', total: 205.6, change: 9.4 }],
  },
  {
    title: 'Pensions',
    children: [
      { title: 'Sickness and disability', total: 61.2, change: 8.7 },
      { title: 'Old age', total: 141.8, change: 20 },
    ],
  },
  {
    title: 'Other Spending',
    children: [
      {
        title: 'General economic, commercial and labour',
        total: 18.8,
        change: -2.8,
      },
      {
        title: 'Agriculture, forestry, fishing and hunt',
        total: 6.5,
        change: 0.3,
      },
      { title: 'Fuel and energy', total: 8.8, change: -40 },
      { title: 'Communication', total: 0.2, change: -0.1 },
      { title: 'Other industries', total: 0.2, change: -0.1 },
      { title: 'R&D Economic affairs', total: 12.6, change: 5.4 },
      { title: 'Economic affairs n.e.c.', total: 1.1, change: 0.4 },
      { title: 'Waste management', total: 3.4, change: 0.4 },
      { title: 'Pollution abatement', total: 1, change: 0.6 },
      {
        title: 'Protection of biodiversity and landscap',
        total: 0.5,
        change: 0,
      },
      { title: 'R&D Environmental protection', total: 0.5, change: 0.2 },
      { title: 'Environmental protection n.e.c.', total: 2.3, change: 0.6 },
      { title: 'Housing development', total: 3.4, change: 0.7 },
      { title: 'Community development', total: 0.6, change: 0.1 },
      { title: 'Water supply', total: 0.4, change: -0.7 },
      {
        title: 'Housing and community amenities n.e.c.',
        total: 0.3,
        change: 0.1,
      },
      { title: 'Recreational and sporting services', total: 0.5, change: -0.5 },
      { title: 'Cultural services', total: 2.3, change: -0.3 },
      {
        title: 'Broadcasting and publishing services',
        total: 7.7,
        change: 2.6,
      },
      {
        title: 'Religious and other community services',
        total: 0.1,
        change: -0.1,
      },
      {
        title: 'R&D Recreation, culture and religion',
        total: 0.2,
        change: 0.1,
      },
      {
        title: 'Recreation, culture and religion n.e.c.',
        total: 0.2,
        change: 0,
      },
      { title: 'Other Spending', total: 59.4, change: 10.5 },
    ],
  },
  {
    title: 'Welfare',
    children: [
      { title: 'Family and children', total: 28.9, change: 1.9 },
      { title: 'Unemployment', total: 2.2, change: -0.5 },
      { title: 'Housing', total: 28.2, change: 0.4 },
      { title: 'Social exclusion n.e.c.', total: 10.8, change: 0.9 },
      { title: 'R&D Social protection', total: 0.3, change: 0 },
      { title: 'Social protection n.e.c.', total: 1.1, change: 0.3 },
    ],
  },
];
