/**
 * 产品数据
 * 静态产品信息数据集
 */

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

// 产品数据数组
export const products: Product[] = [
  {
    id: 1,
    name: '智能手机',
    description: '最新款高性能智能手机，搭载先进处理器和高清摄像头',
    price: 4999,
    category: '电子产品',
    stock: 100
  },
  {
    id: 2,
    name: '笔记本电脑',
    description: '轻薄便携的商务笔记本，长续航，高性能',
    price: 6999,
    category: '电子产品',
    stock: 50
  },
  {
    id: 3,
    name: '无线耳机',
    description: '高音质蓝牙耳机，主动降噪，长续航',
    price: 1299,
    category: '配件',
    stock: 200
  },
  {
    id: 4,
    name: '智能手表',
    description: '多功能智能手表，健康监测，运动追踪',
    price: 1999,
    category: '可穿戴设备',
    stock: 80
  },
  {
    id: 5,
    name: '平板电脑',
    description: '大屏幕高清平板，适合工作和娱乐',
    price: 3599,
    category: '电子产品',
    stock: 60
  }
];