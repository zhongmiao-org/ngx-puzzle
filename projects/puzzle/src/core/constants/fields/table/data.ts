// 数据源配置
import { EditorTableField } from 'ngx-puzzle/core';

export const TABLE_DATA: EditorTableField = {
  label: '数据源设置',
  key: 'data',
  path: 'data',
  schemaType: 'table',
  children: [
    {
      label: '数据源设置',
      key: 'data',
      path: 'data',
      schemaType: 'button',
    },
  ],
};
