import { EditorBaseField } from '../../../interfaces';
import { BASE_STYLE_FIELDS } from '../base-style-fields';
import { getHeaderBackgroundOptions } from '../../background-images';

export const TABLE_EDITOR_STYLE_FIELD: EditorBaseField = {
  label: '样式外观',
  key: 'style',
  path: 'style',
  schemaType: 'group',
  children: [
    { label: '背景颜色', key: 'backgroundColor', schemaType: 'color', path: 'props.styles.backgroundColor' },
    { label: '背景颜色透明度', key: 'backgroundColorAlpha', schemaType: 'number', path: 'props.styles.backgroundColorAlpha', step: 0.1, min: 0.1, max: 1 },
    {
      label: '背景图片',
      key: 'backgroundImage',
      schemaType: 'select-image',
      path: 'props.styles.backgroundImage',
      options: getHeaderBackgroundOptions()
    },
    ...BASE_STYLE_FIELDS
  ]
};
