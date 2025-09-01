import { EditorBaseField, ENABLE_OPTIONS } from 'ngx-puzzle/core';

export const CONTROL_SELECT_FIELDS: EditorBaseField = {
  label: '控件属性',
  key: 'props',
  path: 'props',
  schemaType: 'group',
  children: [
    {
      label: '占位符',
      key: 'placeholder',
      path: 'props.placeholder',
      schemaType: 'text',
      defaultValue: '请选择',
    },
    {
      label: '显示清除按钮',
      key: 'showClear',
      path: 'props.showClear',
      schemaType: 'select',
      defaultValue: false,
      options: ENABLE_OPTIONS,
    },
    {
      label: '可过滤',
      key: 'filter',
      path: 'props.filter',
      schemaType: 'select',
      defaultValue: false,
      options: ENABLE_OPTIONS,
    },
    {
      label: '过滤占位符',
      key: 'filterPlaceholder',
      path: 'props.filterPlaceholder',
      schemaType: 'text',
      defaultValue: '搜索选项',
    },
    {
      label: '禁用状态',
      key: 'disabled',
      path: 'props.disabled',
      schemaType: 'select',
      defaultValue: false,
      options: ENABLE_OPTIONS,
    },
    {
      label: '选项标签字段',
      key: 'optionLabel',
      path: 'props.optionLabel',
      schemaType: 'text',
      defaultValue: 'label',
    },
    {
      label: '选项值字段',
      key: 'optionValue',
      path: 'props.optionValue',
      schemaType: 'text',
      defaultValue: 'value',
    },
    {
      label: '选项',
      key: 'propsOptions',
      path: 'props.options',
      schemaType: 'options-editor',
      defaultValue: [],
    },
  ],
};
