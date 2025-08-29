// Funnel mock data
export interface FunnelItem { name: string; value: number }
export const funnelData: FunnelItem[] = [
  { name: 'Visit', value: 100 },
  { name: 'Click', value: 80 },
  { name: 'Inquiry', value: 60 },
  { name: 'Order', value: 40 },
  { name: 'Deal', value: 20 }
];
