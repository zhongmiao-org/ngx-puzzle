// 基本配置
import { EditorBaseField, ENABLE_OPTIONS } from 'ngx-puzzle/core';

export const CONTROL_BASIC_FIELDS: EditorBaseField = {
  label: '基本配置',
  key: 'basicConfig',
  path: 'basicConfig',
  schemaType: 'group',
  children: [
    {
      label: '别名',
      key: 'alias',
      path: 'alias',
      schemaType: 'text',
      defaultValue: '测试时间选择器',
    },
    {
      label: '绑定字段',
      key: 'bindField',
      path: 'bindField',
      schemaType: 'text',
      defaultValue: 'testField',
    },
    {
      label: '启用控件',
      key: 'isActive',
      path: 'isActive',
      schemaType: 'select',
      defaultValue: true,
      options: ENABLE_OPTIONS,
    },
  ],
};
