import { EditorTab } from '../interfaces';
import { mainTypes } from '../types';

// 通用样式设置


/**
export const EDITOR_FIELDS_MAP: {
  [key in mainTypes]: {
    fields: EditorBaseField[]; // 通用字段
    styles: EditorBaseField[]; // 样式字段
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
**/
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
