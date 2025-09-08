import { EditorBaseField } from 'ngx-puzzle/core';

export const BASE_STYLE_FIELDS: EditorBaseField[] = [
  { label: '背景图片X轴偏移', key: 'backgroundPositionX', schemaType: 'number', path: 'props.styles.backgroundPositionX', suffix: '%' },
  { label: '背景图片Y轴偏移', key: 'backgroundPositionY', schemaType: 'number', path: 'props.styles.backgroundPositionY', suffix: '%' },
  { label: '背景图片缩放比例', key: 'backgroundSize', schemaType: 'number', path: 'props.styles.backgroundSize', suffix: '%' },
  { label: '上内边距', key: 'paddingTop', schemaType: 'number', path: 'props.styles.paddingTop' },
  { label: '下内边距', key: 'paddingBottom', schemaType: 'number', path: 'props.styles.paddingBottom' },
  { label: '左内边距', key: 'paddingLeft', schemaType: 'number', path: 'props.styles.paddingLeft' },
  { label: '右内边距', key: 'paddingRight', schemaType: 'number', path: 'props.styles.paddingRight' }
];

export const BASE_WIDTH_FIELDS:EditorBaseField[] =[
  { label: '宽度', key: 'width', schemaType: 'number', path: 'size.width', min: 0, step:1 },
  { label: '高度', key: 'height', schemaType: 'number', path: 'size.height', min: 0, step:1 }
]

export const BASE_POSITION_FIELDS: EditorBaseField[] = [
  { label: 'X', key: 'positionX', schemaType: 'number', path: 'position.x', min: 0, step: 1 },
  { label: 'Y', key: 'positionY', schemaType: 'number', path: 'position.y', min: 0, step: 1 }
];
