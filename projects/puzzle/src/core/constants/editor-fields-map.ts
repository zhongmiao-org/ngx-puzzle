import { EditorFields, EditorStyleField, EditorTab } from '../interfaces';
import { mainTypes } from '../types';
import { getCanvasBackgroundOptions, getDataBackgroundOptions, getHeaderBackgroundOptions } from './background-images';

// 通用样式设置
const BASE_STYLE_FIELDS: EditorStyleField[] = [
  { label: '背景图片X轴偏移', key: 'backgroundPositionX', schemaType: 'number', suffix: '%' },
  { label: '背景图片Y轴偏移', key: 'backgroundPositionY', schemaType: 'number', suffix: '%' },
  { label: '背景图片缩放比例', key: 'backgroundSize', schemaType: 'number', suffix: '%' },
  { label: '上内边距', key: 'paddingTop', schemaType: 'number' },
  { label: '下内边距', key: 'paddingBottom', schemaType: 'number' },
  { label: '左内边距', key: 'paddingLeft', schemaType: 'number' },
  { label: '右内边距', key: 'paddingRight', schemaType: 'number' }
];

export const EDITOR_FIELDS_MAP: {
  [key in mainTypes]: {
    fields: EditorFields[]; // 通用字段
    styles: EditorStyleField[]; // 样式字段
  };
} = {
  canvas: {
    fields: [
      { label: '宽度', key: 'width', schemaType: 'number' },
      { label: '高度', key: 'height', schemaType: 'number' }
    ],
    styles: [
      { label: '背景颜色', key: 'backgroundColor', schemaType: 'color' },
      { label: '背景颜色透明度', key: 'backgroundColorAlpha', schemaType: 'number', step: 0.1, min: 0.1, max: 1 },
      {
        label: '背景图片',
        key: 'backgroundImage',
        schemaType: 'select-image',
        options: getCanvasBackgroundOptions()
      }
    ]
  },
  chart: {
    fields: [
      { label: '宽度', key: 'width', schemaType: 'number' },
      { label: '高度', key: 'height', schemaType: 'number' },
      { label: 'X', key: 'positionX', schemaType: 'number' },
      { label: 'Y', key: 'positionY', schemaType: 'number' }
    ],
    styles: [
      { label: '背景颜色', key: 'backgroundColor', schemaType: 'color' },
      { label: '背景颜色透明度', key: 'backgroundColorAlpha', schemaType: 'number', step: 0.1, min: 0.1, max: 1 },
      {
        label: '背景图片',
        key: 'backgroundImage',
        schemaType: 'select-image',
        options: getDataBackgroundOptions()
      },
      ...BASE_STYLE_FIELDS
    ]
  },
  table: {
    fields: [
      { label: '宽度', key: 'width', schemaType: 'number' },
      { label: '高度', key: 'height', schemaType: 'number' },
      { label: 'X', key: 'positionX', schemaType: 'number' },
      { label: 'Y', key: 'positionY', schemaType: 'number' }
    ],
    styles: [
      { label: '背景颜色', key: 'backgroundColor', schemaType: 'color' },
      { label: '背景颜色透明度', key: 'backgroundColorAlpha', schemaType: 'number', step: 0.1, min: 0.1, max: 1 },
      {
        label: '背景图片',
        key: 'backgroundImage',
        schemaType: 'select-image',
        options: getDataBackgroundOptions()
      },
      ...BASE_STYLE_FIELDS
    ]
  },
  text: {
    fields: [
      { label: '宽度', key: 'width', schemaType: 'number' },
      { label: '高度', key: 'height', schemaType: 'number' },
      { label: 'X', key: 'positionX', schemaType: 'number' },
      { label: 'Y', key: 'positionY', schemaType: 'number' }
    ],
    styles: [
      { label: '背景颜色', key: 'backgroundColor', schemaType: 'color' },
      { label: '背景颜色透明度', key: 'backgroundColorAlpha', schemaType: 'number', step: 0.1, min: 0.1, max: 1 },
      {
        label: '背景图片',
        key: 'backgroundImage',
        schemaType: 'select-image',
        options: getHeaderBackgroundOptions()
      },
      ...BASE_STYLE_FIELDS
    ]
  },
  control: {
    fields: [
      { label: '宽度', key: 'width', schemaType: 'number' },
      { label: '高度', key: 'height', schemaType: 'number' },
      { label: 'X', key: 'positionX', schemaType: 'number' },
      { label: 'Y', key: 'positionY', schemaType: 'number' }
    ],
    styles: [
      { label: '背景颜色', key: 'backgroundColor', schemaType: 'color' },
      { label: '背景颜色透明度', key: 'backgroundColorAlpha', schemaType: 'number', step: 0.1, min: 0.1, max: 1 }
    ]
  }
};

export const BASE_TAB: EditorTab = { title: '外观', value: 'appearance', icon: 'pi-sliders-h' };

export const DATA_TAB: EditorTab = { title: '数据', value: 'advanced', icon: 'pi-paperclip' };

export const STYLE_TAB: EditorTab = { title: '样式', value: 'styles', icon: 'pi-paperclip' };

export const REFRESH_TAB: EditorTab = { title: '自动化', value: 'refresh', icon: 'pi-refresh' };

export const CONTROL_TAB: EditorTab = { title: '控件', value: 'control', icon: 'pi-paperclip' };

export const EDITOR_TAB_MAP: Partial<Record<mainTypes, EditorTab[]>> = {
  chart: [BASE_TAB, DATA_TAB, REFRESH_TAB],
  table: [BASE_TAB, DATA_TAB, REFRESH_TAB],
  text: [BASE_TAB, STYLE_TAB],
  control: [BASE_TAB, CONTROL_TAB]
};
