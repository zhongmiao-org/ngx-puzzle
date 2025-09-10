import { EditorBaseField } from '../../../interfaces';
import { BASE_WIDTH_FIELDS } from '../base-style-fields';

export const CANVAS_EDITOR_BASE_FIELD: EditorBaseField = {
  label: '基础属性',
  key: 'base',
  path: 'base',
  schemaType: 'group',
  children: [
    ...BASE_WIDTH_FIELDS,
  ]
}
