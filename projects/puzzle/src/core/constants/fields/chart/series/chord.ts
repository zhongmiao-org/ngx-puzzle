import { EditorChartField } from 'ngx-puzzle/core';

export const CHART_CHORD_SERIES: EditorChartField = {
  label: '数据系列（和弦图）',
  key: 'series',
  path: 'series',
  schemaType: 'array',
  removeActive: true,
  children: [
    { label: '类型', key: 'type', path: 'type', schemaType: 'select', disabled: true, options: [{ label: '和弦图', val: 'chord' }] },
    { label: '系列名称', key: 'name', path: 'name', schemaType: 'text' }
  ]
};
