import { EditorBaseField, ENABLE_OPTIONS } from 'ngx-puzzle/core';

export const CONTROL_BIND_FIELDS: EditorBaseField = {
  label: '控件绑定',
  key: 'refreshConfig',
  path: 'refreshConfig',
  schemaType: 'group',
  children: [
    {
      label: '绑定控件',
      key: 'controlIds',
      path: 'controlIds',
      schemaType: 'multiSelect',
      options: ENABLE_OPTIONS,
      defaultValue: [],
    },
  ]
}
