/**
 * 柱状图和折线图数据
 * 包含苹果公司各季度产品收入数据
 */

export interface BarAndLineDataItem {
  quarter: string;
  iphone: number;
  mac: number;
  ipad: number;
  wearables: number;
  services: number;
}

export const barAndLineData: BarAndLineDataItem[] = [
  {
    quarter: "Q1'18",
    iphone: 140,
    mac: 16,
    ipad: 14,
    wearables: 12,
    services: 20,
  },
  {
    quarter: "Q2'18",
    iphone: 124,
    mac: 20,
    ipad: 14,
    wearables: 12,
    services: 30,
  },
  {
    quarter: "Q3'18",
    iphone: 112,
    mac: 20,
    ipad: 18,
    wearables: 14,
    services: 36,
  },
  {
    quarter: "Q4'18",
    iphone: 118,
    mac: 24,
    ipad: 14,
    wearables: 14,
    services: 36,
  },
];

/**
 * 柱状图和折线图数据2
 * 包含三星公司各季度产品收入数据
 */
export interface BarAndLineData2Item {
  quarter: string;
  smartphones: number;
  computers: number;
  tablets: number;
  wearables: number;
  services: number;
}

export const barAndLineData2: BarAndLineData2Item[] = [
  {
    quarter: "Q1'19",
    smartphones: 132,
    computers: 25,
    tablets: 19,
    wearables: 8,
    services: 22,
  },
  {
    quarter: "Q2'19",
    smartphones: 128,
    computers: 27,
    tablets: 15,
    wearables: 12,
    services: 26,
  },
  {
    quarter: "Q3'19",
    smartphones: 145,
    computers: 22,
    tablets: 17,
    wearables: 15,
    services: 31,
  },
  {
    quarter: "Q4'19",
    smartphones: 138,
    computers: 30,
    tablets: 20,
    wearables: 19,
    services: 28,
  },
];

/**
 * 柱状图和折线图数据3
 * 包含华为公司各季度产品收入数据
 */
export interface BarAndLineData3Item {
  quarter: string;
  phones: number;
  laptops: number;
  tablets: number;
  wearables: number;
  cloud: number;
}

export const barAndLineData3: BarAndLineData3Item[] = [
  {
    quarter: "Q1'20",
    phones: 87,
    laptops: 19,
    tablets: 15,
    wearables: 11,
    cloud: 14,
  },
  {
    quarter: "Q2'20",
    phones: 93,
    laptops: 21,
    tablets: 12,
    wearables: 9,
    cloud: 18,
  },
  {
    quarter: "Q3'20",
    phones: 78,
    laptops: 24,
    tablets: 17,
    wearables: 13,
    cloud: 22,
  },
  {
    quarter: "Q4'20",
    phones: 105,
    laptops: 18,
    tablets: 14,
    wearables: 16,
    cloud: 25,
  },
];

/**
 * 柱状图和折线图数据4
 * 包含小米公司各季度产品收入数据
 */
export interface BarAndLineData4Item {
  quarter: string;
  smartphones: number;
  iot: number;
  lifestyle: number;
  internet: number;
  overseas: number;
}

export const barAndLineData4: BarAndLineData4Item[] = [
  {
    quarter: "Q1'21",
    smartphones: 76,
    iot: 38,
    lifestyle: 12,
    internet: 25,
    overseas: 37,
  },
  {
    quarter: "Q2'21",
    smartphones: 92,
    iot: 32,
    lifestyle: 19,
    internet: 18,
    overseas: 42,
  },
  {
    quarter: "Q3'21",
    smartphones: 85,
    iot: 45,
    lifestyle: 16,
    internet: 30,
    overseas: 48,
  },
  {
    quarter: "Q4'21",
    smartphones: 103,
    iot: 41,
    lifestyle: 24,
    internet: 22,
    overseas: 53,
  },
];

/**
 * 柱状图和折线图数据5
 * 包含谷歌公司各季度产品收入数据
 */
export interface BarAndLineData5Item {
  quarter: string;
  search: number;
  cloud: number;
  hardware: number;
  youtube: number;
  other: number;
}

export const barAndLineData5: BarAndLineData5Item[] = [
  {
    quarter: "Q1'22",
    search: 165,
    cloud: 35,
    hardware: 28,
    youtube: 32,
    other: 18,
  },
  {
    quarter: "Q2'22",
    search: 152,
    cloud: 48,
    hardware: 24,
    youtube: 38,
    other: 15,
  },
  {
    quarter: "Q3'22",
    search: 178,
    cloud: 42,
    hardware: 31,
    youtube: 35,
    other: 22,
  },
  {
    quarter: "Q4'22",
    search: 172,
    cloud: 57,
    hardware: 29,
    youtube: 42,
    other: 19,
  },
];

export const barData = [
  {
    "id": 72,
    "createdAt": "2025-07-15T14:09:24Z",
    "updatedAt": "2025-07-15T14:09:24Z",
    "orgId": 12,
    "code": "100108-00008",
    "name": "鲜胡萝卜",
    "batchNo": "SC02",
    "supplierName": "BOCAI",
    "specNum": 10,
    "specUnit": "kg",
    "class": 1,
    "receiver": "蔡兴钰",
    "storeTime": "0001-01-01T00:00:00Z",
    "status": 2,
    "mrOrderNo": "QH100000021",
    "arrTime": "2026-07-15T00:00:00Z"
  },
  {
    "id": 71,
    "createdAt": "2025-07-15T13:53:49Z",
    "updatedAt": "2025-07-15T14:07:30Z",
    "orgId": 12,
    "code": "100108-00006",
    "name": "菠菜碎",
    "batchNo": "SC02",
    "supplierName": "BOCAI",
    "specNum": 10,
    "specUnit": "kg",
    "class": 1,
    "receiver": "蔡兴钰",
    "storeTime": "2025-07-15T14:07:30Z",
    "status": 2,
    "mrOrderNo": "QH100000001",
    "arrTime": "2026-07-15T00:00:00Z"
  },
  {
    "id": 70,
    "createdAt": "2025-07-15T09:28:56Z",
    "updatedAt": "2025-07-15T13:53:49Z",
    "orgId": 12,
    "code": "100201-00011",
    "name": "全蛋液",
    "batchNo": "DZ02",
    "supplierName": "德",
    "specNum": 10,
    "specUnit": "kg",
    "class": 1,
    "receiver": "蔡兴钰",
    "storeTime": "0001-01-01T00:00:00Z",
    "status": 3,
    "mrOrderNo": "QH100000001",
    "arrTime": "2026-07-15T00:00:00Z"
  },
  {
    "id": 68,
    "createdAt": "2025-07-10T16:48:07Z",
    "updatedAt": "2025-07-10T16:48:07Z",
    "orgId": 12,
    "code": "10010201-00002",
    "name": "鸡大胸",
    "batchNo": "H2506280000163",
    "supplierName": "高密市南洋食品有限公司",
    "specNum": 10,
    "specUnit": "kg",
    "class": 1,
    "receiver": "蔡兴钰",
    "storeTime": "0001-01-01T00:00:00Z",
    "realWeight": 7440,
    "orginNum": 744,
    "status": 2,
    "mrOrderNo": "QH100000011",
    "arrTime": "2025-06-30T00:00:00Z",
    "adsMrNo": "113",
    "orginWeight": 7440
  },
  {
    "id": 66,
    "createdAt": "2025-07-03T16:32:53Z",
    "updatedAt": "2025-07-15T09:27:26Z",
    "orgId": 12,
    "code": "10010201-00002",
    "name": "鸡大胸",
    "batchNo": "DZ02",
    "supplierName": "德州扒鸡",
    "specNum": 10,
    "specUnit": "kg",
    "class": 1,
    "receiver": "蔡兴钰",
    "storeTime": "2025-07-15T09:27:26Z",
    "realWeight": 7410,
    "orginNum": 744,
    "status": 2,
    "mrOrderNo": "QH100000011",
    "arrTime": "2026-06-06T00:00:00Z",
    "adsMrNo": "113",
    "orginWeight": 7440
  },
  {
    "id": 65,
    "createdAt": "2025-07-03T16:32:40Z",
    "updatedAt": "2025-07-08T15:52:39Z",
    "orgId": 12,
    "code": "10010201-00002",
    "name": "鸡大胸",
    "batchNo": "FX0702",
    "supplierName": "凤翔",
    "specNum": 5,
    "specUnit": "kg",
    "class": 1,
    "receiver": "蔡兴钰",
    "storeTime": "2025-07-08T15:52:38Z",
    "realWeight": 14860,
    "orginNum": 1859,
    "status": 2,
    "mrOrderNo": "QH100000011",
    "arrTime": "2026-02-01T00:00:00Z",
    "adsMrNo": "113",
    "orginWeight": 14875
  }
]

export const lineData = [
  {
    "id": 37,
    "createdAt": "2025-07-08T17:31:19Z",
    "updatedAt": "2025-07-08T17:31:19Z",
    "orgId": 12,
    "code": "10010201-00002",
    "class": 1,
    "originWeight": 20,
    "realWeight": 21.8,
    "type": 1,
    "prodDate": "2025-07-08T00:00:00Z",
    "batchNo": "DZ02"
  },
  {
    "id": 36,
    "operator": "cs",
    "createdAt": "2025-07-07T15:47:34Z",
    "updatedAt": "2025-07-07T15:47:35Z",
    "orgId": 12,
    "code": "100201-00034",
    "class": 1,
    "originWeight": 240,
    "realWeight": 222,
    "lealOriWeight": 240,
    "lealRealWeight": 222,
    "prodDate": "2025-07-07T15:47:28Z",
    "batchNo": "cs"
  },
  {
    "id": 35,
    "operator": "cs",
    "createdAt": "2025-07-07T15:46:42Z",
    "updatedAt": "2025-07-07T15:46:44Z",
    "orgId": 12,
    "code": "100108-00006",
    "class": 1,
    "originWeight": 300,
    "realWeight": 298,
    "lealOriWeight": 299.999958,
    "lealRealWeight": 298,
    "prodDate": "2025-07-07T15:46:32Z",
    "batchNo": "cs"
  },
  {
    "id": 34,
    "operator": "ceshi",
    "createdAt": "2025-07-07T15:46:00Z",
    "updatedAt": "2025-07-07T15:46:01Z",
    "orgId": 12,
    "code": "100108-00005",
    "class": 1,
    "originWeight": 60,
    "realWeight": 55,
    "lealOriWeight": 60.000018,
    "lealRealWeight": 55,
    "prodDate": "2025-07-07T15:45:51Z",
    "batchNo": "cs"
  },
  {
    "id": 33,
    "operator": "ceshi",
    "createdAt": "2025-07-07T15:45:03Z",
    "updatedAt": "2025-07-07T15:45:04Z",
    "orgId": 12,
    "code": "100107-00053",
    "class": 1,
    "originWeight": 200,
    "realWeight": 150,
    "lealOriWeight": 200.000033,
    "lealRealWeight": 150,
    "prodDate": "2025-07-07T15:44:55Z",
    "batchNo": "cs"
  },
  {
    "id": 32,
    "operator": "cs",
    "createdAt": "2025-07-07T15:23:17Z",
    "updatedAt": "2025-07-07T15:23:18Z",
    "orgId": 12,
    "code": "10010502-00010",
    "class": 1,
    "originWeight": 99,
    "realWeight": 77,
    "lealOriWeight": 98.999957,
    "lealRealWeight": 77,
    "prodDate": "2025-07-07T15:23:05Z",
    "batchNo": "cs"
  },
  {
    "id": 31,
    "operator": "ceshi",
    "createdAt": "2025-07-07T15:21:26Z",
    "updatedAt": "2025-07-07T15:21:26Z",
    "orgId": 12,
    "code": "10010305-00005",
    "class": 1,
    "originWeight": 200,
    "realWeight": 160,
    "lealOriWeight": 200,
    "lealRealWeight": 160,
    "prodDate": "2025-07-07T15:21:12Z",
    "batchNo": "cs"
  },
  {
    "id": 30,
    "operator": "测试",
    "createdAt": "2025-07-07T15:20:27Z",
    "updatedAt": "2025-07-07T15:20:29Z",
    "orgId": 12,
    "code": "10010201-00054",
    "class": 1,
    "originWeight": 100,
    "realWeight": 80,
    "lealOriWeight": 100,
    "lealRealWeight": 80,
    "prodDate": "2025-07-07T15:20:12Z",
    "batchNo": "cs"
  },
  {
    "id": 29,
    "operator": "测试",
    "createdAt": "2025-07-07T15:15:54Z",
    "updatedAt": "2025-07-07T15:15:56Z",
    "orgId": 12,
    "code": "10010201-00010",
    "class": 1,
    "originWeight": 100,
    "realWeight": 90,
    "lealOriWeight": 99.999978,
    "lealRealWeight": 90,
    "prodDate": "2025-07-07T15:15:42Z",
    "batchNo": "DZ02"
  },
  {
    "id": 27,
    "operator": "蔡兴钰",
    "createdAt": "2025-07-04T10:57:34Z",
    "updatedAt": "2025-07-04T10:57:34Z",
    "orgId": 12,
    "code": "10010201-00002",
    "class": 1,
    "originWeight": 30,
    "realWeight": 18.8,
    "type": 1,
    "lealOriWeight": 30,
    "lealRealWeight": 18.8,
    "prodDate": "2025-07-04T00:00:00Z",
    "batchNo": "DZ02"
  },
  {
    "id": 28,
    "operator": "蔡兴钰",
    "createdAt": "2025-07-04T10:55:13Z",
    "updatedAt": "2025-07-04T10:55:13Z",
    "orgId": 12,
    "code": "10010201-00002",
    "class": 1,
    "originWeight": 322.8,
    "realWeight": 312.8,
    "lealOriWeight": 322.799979,
    "lealRealWeight": 312.8,
    "prodDate": "2025-07-04T00:00:00Z",
    "batchNo": "FX0702"
  },
  {
    "id": 26,
    "operator": "蔡兴钰",
    "createdAt": "2025-07-04T10:55:13Z",
    "updatedAt": "2025-07-04T10:55:13Z",
    "orgId": 12,
    "code": "10010201-00002",
    "class": 1,
    "originWeight": 15,
    "realWeight": 312.8,
    "prodDate": "2025-07-04T00:00:00Z",
    "batchNo": "FX0702"
  },
  {
    "id": 25,
    "operator": "蔡兴钰",
    "createdAt": "2025-07-03T16:59:05Z",
    "updatedAt": "2025-07-03T17:13:02Z",
    "orgId": 12,
    "code": "10010201-00002",
    "class": 1,
    "originWeight": 130,
    "realWeight": 81.1,
    "type": 1,
    "lealOriWeight": 130,
    "lealRealWeight": 81.1,
    "prodDate": "2025-07-03T00:00:00Z",
    "batchNo": "DZ02"
  }
]
