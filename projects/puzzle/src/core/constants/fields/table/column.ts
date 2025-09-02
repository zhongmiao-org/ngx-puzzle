import { EditorTableField, ENABLE_OPTIONS } from 'ngx-puzzle/core';

export const TABLE_COLUMN: EditorTableField = {
  label: '表格列配置',
  key: 'columns',
  path: 'columns',
  schemaType: 'group',
  headerSetting: [
    {
      field: 'field',
      headerName: '映射字段',
      schemaType: 'text'
    },
    {
      field: 'header',
      headerName: '表头名称',
      schemaType: 'text'
    },
    {
      field: 'rowGroup',
      headerName: '分组',
      schemaType: 'select',
      options: ENABLE_OPTIONS
    },
    {
      field: 'enableRowGroup',
      headerName: '拖拽分组',
      schemaType: 'select',
      options: ENABLE_OPTIONS
    },
    {
      field: 'pivot',
      headerName: '数据透视',
      schemaType: 'select',
      options: ENABLE_OPTIONS
    },
    {
      field: 'enablePivot',
      headerName: '拖拽透视',
      schemaType: 'select',
      options: ENABLE_OPTIONS
    }
  ],
  rowData: []
};
