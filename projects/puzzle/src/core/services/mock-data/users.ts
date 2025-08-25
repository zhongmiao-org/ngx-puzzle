/**
 * 用户数据
 * 静态用户信息数据集
 */

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
}

// 用户数据数组
export const users: User[] = [
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    age: 28,
    role: '管理员'
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    age: 32,
    role: '开发者'
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    age: 25,
    role: '测试员'
  },
  {
    id: 4,
    name: '赵六',
    email: 'zhaoliu@example.com',
    age: 30,
    role: '产品经理'
  },
  {
    id: 5,
    name: '钱七',
    email: 'qianqi@example.com',
    age: 35,
    role: '设计师'
  }
];