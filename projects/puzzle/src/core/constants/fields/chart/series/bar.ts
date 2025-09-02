// TypeScript
import { EditorChartField } from 'ngx-puzzle/core';

// TypeScript
export const CHART_BAR_SERIES: EditorChartField = {
  label: '数据系列（柱状图）',
  key: 'series',
  path: 'series',
  schemaType: 'array',
  removeActive: true,
  children: [
    // 基础（保留常用 8-9 项）
    { label: '类型', key: 'type', path: 'type', schemaType: 'select', disabled: true, options: [{ label: '柱状图', val: 'bar' }] },
    { label: '系列名称', key: 'name', path: 'name', schemaType: 'text' },

    // 数据绑定（常用）

    // 柱体与堆叠（基础）
    { label: '柱宽', key: 'barWidth', path: 'barWidth', schemaType: 'number', min: 0, max: 2000, step: 1 },
    { label: '堆叠分组', key: 'stack', path: 'stack', schemaType: 'text' },

    // 柱体样式（基础）
    { label: '填充颜色', key: 'itemColor', path: 'itemStyle.color', schemaType: 'color' },
    { label: '柱体圆角', key: 'itemBorderRadius', path: 'itemStyle.borderRadius', schemaType: 'number', min: 0, max: 2000, step: 1 },

    // 数值标签（基础）
    {
      label: '显示数值标签',
      key: 'labelShow',
      path: 'label.show',
      schemaType: 'select',
      options: [
        { label: '禁用', val: false },
        { label: '启用', val: true }
      ]
    },
    {
      label: '数值标签位置',
      key: 'labelPosition',
      path: 'label.position',
      schemaType: 'select',
      options: [
        { label: '顶部', val: 'top' },
        { label: '内部', val: 'inside' },
        { label: '底部', val: 'bottom' }
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
