import { EditorBaseField, getCanvasBackgroundOptions } from 'ngx-puzzle/core';

export const CANVAS_EDITOR_STYLE_FIELD: EditorBaseField = {
  label: '样式外观',
  key: 'style',
  path: 'style',
  schemaType: 'group',
  children: [
    { label: '背景颜色', key: 'backgroundColor', schemaType: 'color' },
    { label: '背景颜色透明度', key: 'backgroundColorAlpha', schemaType: 'number', step: 0.1, min: 0.1, max: 1 },
    {
      label: '背景图片',
      key: 'backgroundImage',
      schemaType: 'select-image',
      options: getCanvasBackgroundOptions()
    }
  ]
};
