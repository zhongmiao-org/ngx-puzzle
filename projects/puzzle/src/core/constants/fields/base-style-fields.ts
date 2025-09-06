import { EditorBaseField } from 'ngx-puzzle/core';

export const BASE_STYLE_FIELDS: EditorBaseField[] = [
  { label: '背景图片X轴偏移', key: 'backgroundPositionX', schemaType: 'number', suffix: '%' },
  { label: '背景图片Y轴偏移', key: 'backgroundPositionY', schemaType: 'number', suffix: '%' },
  { label: '背景图片缩放比例', key: 'backgroundSize', schemaType: 'number', suffix: '%' },
  { label: '上内边距', key: 'paddingTop', schemaType: 'number' },
  { label: '下内边距', key: 'paddingBottom', schemaType: 'number' },
  { label: '左内边距', key: 'paddingLeft', schemaType: 'number' },
  { label: '右内边距', key: 'paddingRight', schemaType: 'number' }
];
