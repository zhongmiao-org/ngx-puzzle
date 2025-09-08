import { EditorBaseField } from 'ngx-puzzle/core';
import { BASE_POSITION_FIELDS, BASE_WIDTH_FIELDS } from '../base-style-fields';

export const CONTROL_EDITOR_BASE_FIELD: EditorBaseField = {
  label: '基础属性',
  key: 'base',
  path: 'base',
  schemaType: 'group',
  children: [
    ...BASE_POSITION_FIELDS,
    ...BASE_WIDTH_FIELDS
  ]
}
