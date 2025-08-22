/**
 * 瀑布图数据
 * 包含财务类别和对应金额数据
 */

export interface WaterfallDataItem {
  financials: string;
  amount: number;
}

export const waterfallData: WaterfallDataItem[] = [
  {
    financials: 'Income\nTax',
    amount: 185,
  },
  {
    financials: 'VAT',
    amount: 145,
  },
  {
    financials: 'NI',
    amount: 134,
  },
  {
    financials: 'Corp\nTax',
    amount: 55,
  },
  {
    financials: 'Council\nTax',
    amount: 34,
  },
  {
    financials: 'Social\nProtection',
    amount: -252,
  },
  {
    financials: 'Health',
    amount: -155,
  },
  {
    financials: 'Education',
    amount: -112,
  },
  {
    financials: 'Defence',
    amount: -65,
  },
  {
    financials: 'Debt\nInterest',
    amount: -63,
  },
  {
    financials: 'Housing',
    amount: -31,
  },
];
