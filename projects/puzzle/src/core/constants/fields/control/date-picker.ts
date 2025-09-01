
// 日期选择器属性配置
import { DATE_PICKER_SELECTION_MODE_OPTIONS, EditorBaseField, ENABLE_OPTIONS, SIZE_OPTIONS } from 'ngx-puzzle/core';

export const CONTROL_DATEPICKER_FIELDS: EditorBaseField = {
  label: '控件属性',
  key: 'props',
  path: 'props',
  schemaType: 'group',
  children: [
    {
      label: '选取模式',
      key: 'selectionMode',
      path: 'props.selectionMode',
      schemaType: 'select',
      defaultValue: 'range',
      options: DATE_PICKER_SELECTION_MODE_OPTIONS,
    },
    {
      label: '组件大小',
      key: 'size',
      path: 'props.size',
      schemaType: 'select',
      defaultValue: 'large',
      options: SIZE_OPTIONS,
    },
    {
      label: '日期格式',
      key: 'dateFormat',
      path: 'props.dateFormat',
      schemaType: 'text',
      defaultValue: 'yy-mm-dd',
    },
    {
      label: '显示时间',
      key: 'showTime',
      path: 'props.showTime',
      schemaType: 'select',
      defaultValue: false,
      options: ENABLE_OPTIONS,
    },
    {
      label: '显示秒',
      key: 'showSeconds',
      path: 'props.showSeconds',
      schemaType: 'select',
      defaultValue: false,
      options: ENABLE_OPTIONS,
    },
    {
      label: '占位符',
      key: 'placeholder',
      path: 'props.placeholder',
      schemaType: 'text',
      defaultValue: '请选择日期',
    },
    {
      label: '显示清除按钮',
      key: 'showButtonBar',
      path: 'props.showButtonBar',
      schemaType: 'select',
      defaultValue: false,
      options: ENABLE_OPTIONS,
    },
    {
      label: '最小日期',
      key: 'minDate',
      path: 'props.minDate',
      schemaType: 'date',
      defaultValue: null,
    },
    {
      label: '最大日期',
      key: 'maxDate',
      path: 'props.maxDate',
      schemaType: 'date',
      defaultValue: null,
    },
  ],
};
