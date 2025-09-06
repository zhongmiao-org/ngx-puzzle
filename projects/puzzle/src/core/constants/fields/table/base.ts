import { EditorBaseField } from 'ngx-puzzle/core';

export const TABLE_EDITOR_BASE_FIELD: EditorBaseField = {
  label: '基础属性',
  key: 'base',
  path: 'base',
  schemaType: 'group',
  children: [
    { label: '宽度', key: 'width', schemaType: 'number' },
    { label: '高度', key: 'height', schemaType: 'number' },
    { label: 'X', key: 'positionX', schemaType: 'number' },
    { label: 'Y', key: 'positionY', schemaType: 'number' }
  ]
}
