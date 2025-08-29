import { EditorChartField } from 'ngx-puzzle/core';

export const CHART_SANKEY_SERIES: EditorChartField = {
  label: '数据系列（桑基图）',
  key: 'series',
  path: 'series',
  schemaType: 'array',
  removeActive: true,
  children: [
    { label: '类型', key: 'type', path: 'type', schemaType: 'select', disabled: true, options: [{ label: '桑基图', val: 'sankey' }] },
    { label: '系列名称', key: 'name', path: 'name', schemaType: 'text' },
    { label: '数据项名称映射', key: 'encodeItemName', path: 'encode.itemName', schemaType: 'text', description: '用于图例/提示框等展示的数据项名称维度；可填维度名或索引，支持单个或多个' },
    { label: '数值维度映射', key: 'encodeValue', path: 'encode.value', schemaType: 'text', description: '用于视觉/提示框的数值维度；可填维度名或索引，支持单个或多个' },
    { label: '设置数据源', key: 'data', path: 'data', schemaType: 'button' }
  ]
};
