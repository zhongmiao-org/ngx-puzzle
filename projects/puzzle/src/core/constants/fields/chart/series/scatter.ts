import { EditorChartField } from 'ngx-puzzle/core';

// 参考 ECharts ScatterSeriesOption & 相关 Mixins，补全常用可编辑项
export const CHART_SCATTER_SERIES: EditorChartField = {
  label: '数据系列（散点图）',
  key: 'series',
  path: 'series',
  schemaType: 'array',
  removeActive: true,
  children: [
    // 基础（保留常用 8-9 项）
    { label: '类型', key: 'type', path: 'type', schemaType: 'select', disabled: true, options: [{ label: '散点图', val: 'scatter' }] },
    { label: '系列名称', key: 'name', path: 'name', schemaType: 'text' },

    // 数据绑定（常用）

    // 符号（基础）
    {
      label: '标记形状',
      key: 'symbol',
      path: 'symbol',
      schemaType: 'select',
      options: [
        { label: '圆形', val: 'circle' },
        { label: '方形', val: 'rect' },
        { label: '三角形', val: 'triangle' },
        { label: '菱形', val: 'diamond' },
        { label: '无', val: 'none' }
      ]
    },
    { label: '标记大小', key: 'symbolSize', path: 'symbolSize', schemaType: 'number', min: 1, max: 200, step: 1 },

    // 样式与标签（基础）
    { label: '填充颜色', key: 'itemColor', path: 'itemStyle.color', schemaType: 'color' },
    { label: '显示标签', key: 'labelShow', path: 'label.show', schemaType: 'select', options: [{ label: '禁用', val: false }, { label: '启用', val: true }] },
    {
      label: '标签位置',
      key: 'labelPosition',
      path: 'label.position',
      schemaType: 'select',
      options: [
        { label: '顶部', val: 'top' },
        { label: '内部', val: 'inside' },
        { label: '中心', val: 'center' }
      ]
    },
    {
      label: '设置数据源',
      key: 'data',
      path: 'data',
      schemaType: 'button'
    }
  ]
};
