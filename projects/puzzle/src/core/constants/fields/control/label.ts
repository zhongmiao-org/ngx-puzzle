// 标签配置
import { EditorBaseField, ENABLE_OPTIONS, FONT_WEIGHT_CSS_OPTIONS } from 'ngx-puzzle/core';

export const CONTROL_LABEL_FIELDS: EditorBaseField = {
  label: '标签配置',
  key: 'label',
  path: 'label',
  schemaType: 'group',
  children: [
    {
      label: '显示标签',
      key: 'labelEnable',
      path: 'label.enable',
      schemaType: 'select',
      defaultValue: true,
      options: ENABLE_OPTIONS
    },
    {
      label: '标签文本',
      key: 'labelText',
      path: 'label.text',
      schemaType: 'text',
      defaultValue: '标签'
    },
    {
      label: '标签描述',
      key: 'labelDescription',
      path: 'label.description',
      schemaType: 'text',
      defaultValue: '这是一个标签'
    },
    {
      label: '标签宽度 (px)',
      key: 'labelWidth',
      path: 'label.styles.width',
      schemaType: 'number',
      min: 30,
      max: 300,
      step: 1,
      defaultValue: 80
    },
    {
      label: '字体大小 (px)',
      key: 'labelFontSize',
      path: 'label.styles.fontSize',
      schemaType: 'number',
      min: 10,
      max: 48,
      step: 1,
      defaultValue: 14
    },
    {
      label: '是否加粗',
      key: 'labelFontWeight',
      path: 'label.styles.fontWeight',
      schemaType: 'select',
      defaultValue: 'normal',
      options: FONT_WEIGHT_CSS_OPTIONS
    },
    {
      label: '行高',
      key: 'labelLineHeight',
      path: 'label.styles.lineHeight',
      schemaType: 'number'
    },
    {
      label: '标签颜色',
      key: 'labelColor',
      path: 'label.styles.color',
      schemaType: 'color'
    }
  ]
};
