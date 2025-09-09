import { EditorBaseField } from '../../../interfaces';

import {
  TEXT_ALIGN_OPTIONS,
  TEXT_DECORATIONS_OPTIONS,
  TEXT_FONT_STYLE_OPTIONS,
  TEXT_FONT_WEIGHT_OPTIONS,
  TEXT_WHITE_SPACE_OPTIONS
} from '../../select-options.const';

export const TEXT_STYLE_FIELDS: EditorBaseField = {
  label: '基本样式',
  key: 'basicStyle',
  path: 'basicStyle',
  schemaType: 'group',
  children: [
    {
      label: '字体颜色',
      key: 'color',
      path: 'styles.color',
      schemaType: 'color'
    },
    {
      label: '字体大小',
      key: 'fontSize',
      path: 'styles.fontSize',
      schemaType: 'number'
    },
    {
      label: '字体粗细',
      key: 'fontWeight',
      path: 'styles.fontWeight',
      schemaType: 'select',
      options: TEXT_FONT_WEIGHT_OPTIONS
    },
    {
      label: '字体样式',
      key: 'fontStyle',
      path: 'styles.fontStyle',
      schemaType: 'select',
      options: TEXT_FONT_STYLE_OPTIONS
    },
    // {
    // 	label: '字体',
    // 	key: 'fontFamily',
    // 	path: 'styles.fontFamily',
    // 	schemaType: 'text',
    // },
    {
      label: '文本对齐',
      key: 'textAlign',
      path: 'styles.textAlign',
      schemaType: 'select',
      options: TEXT_ALIGN_OPTIONS
    },
    {
      label: '行高',
      key: 'lineHeight',
      path: 'styles.lineHeight',
      schemaType: 'number'
    },
    {
      label: '字间距',
      key: 'letterSpacing',
      path: 'styles.letterSpacing',
      schemaType: 'number'
    },
    {
      label: '文字装饰',
      key: 'textDecoration',
      path: 'styles.textDecoration',
      schemaType: 'select',
      options: TEXT_DECORATIONS_OPTIONS
    },
    {
      label: '文本换行',
      key: 'whiteSpace',
      path: 'styles.whiteSpace',
      schemaType: 'select',
      options: TEXT_WHITE_SPACE_OPTIONS
    }
  ]
};
