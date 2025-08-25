/**
 * 蜡烛图和OHLC图数据
 * 包含金融市场的开盘价、最高价、最低价和收盘价数据
 */

export interface CandlestickAndOhlcDataItem {
  date: number;
  volume: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export const candlestickAndOhlcData: CandlestickAndOhlcDataItem[] = [
  {
    date: new Date('2024-03-21T18:24:00.000Z').getTime(),
    volume: 1711041240000,
    open: 39863.58,
    high: 39870.44,
    low: 39862.47,
    close: 39867.41,
  },
  {
    date: new Date('2024-03-21T18:25:00.000Z').getTime(),
    volume: 1711041300000,
    open: 39867.02,
    high: 39868.19,
    low: 39863.48,
    close: 39863.65,
  },
  {
    date: new Date('2024-03-21T18:26:00.000Z').getTime(),
    volume: 1711041360000,
    open: 39864.35,
    high: 39865.24,
    low: 39858.74,
    close: 39858.85,
  },
  {
    date: new Date('2024-03-21T18:27:00.000Z').getTime(),
    volume: 1711041420000,
    open: 39858.04,
    high: 39865.13,
    low: 39858.04,
    close: 39861.59,
  },
  {
    date: new Date('2024-03-21T18:28:00.000Z').getTime(),
    volume: 1711041480000,
    open: 39859.33,
    high: 39859.33,
    low: 39855.74,
    close: 39855.93,
  },
  {
    date: new Date('2024-03-21T18:29:00.000Z').getTime(),
    volume: 1711041540000,
    open: 39851.89,
    high: 39854.23,
    low: 39851.85,
    close: 39854.23,
  },
  {
    date: new Date('2024-03-21T18:30:00.000Z').getTime(),
    volume: 1711041600000,
    open: 39853.09,
    high: 39853.09,
    low: 39844.98,
    close: 39845.26,
  },
  {
    date: new Date('2024-03-21T18:31:00.000Z').getTime(),
    volume: 1711041660000,
    open: 39841.15,
    high: 39847.25,
    low: 39839.9,
    close: 39847.25,
  },
  {
    date: new Date('2024-03-21T18:32:00.000Z').getTime(),
    volume: 1711041720000,
    open: 39847.75,
    high: 39850.3,
    low: 39846.01,
    close: 39850.3,
  },
  {
    date: new Date('2024-03-21T18:33:00.000Z').getTime(),
    volume: 1711041780000,
    open: 39849.21,
    high: 39849.21,
    low: 39842.77,
    close: 39842.77,
  },
  {
    date: new Date('2024-03-21T18:34:00.000Z').getTime(),
    volume: 1711041840000,
    open: 39838.3,
    high: 39838.3,
    low: 39828.7,
    close: 39829.22,
  },
  {
    date: new Date('2024-03-21T18:35:00.000Z').getTime(),
    volume: 1711041900000,
    open: 39829.55,
    high: 39829.55,
    low: 39829.55,
    close: 39829.55,
  },
  {
    date: new Date('2024-03-21T18:36:00.000Z').getTime(),
    volume: 1711041960000,
    open: 39831.68,
    high: 39831.68,
    low: 39826.62,
    close: 39826.62,
  },
  {
    date: new Date('2024-03-21T18:37:00.000Z').getTime(),
    volume: 1711042020000,
    open: 39827.69,
    high: 39832.95,
    low: 39827.69,
    close: 39832.95,
  }
];
