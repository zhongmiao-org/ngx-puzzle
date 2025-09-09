import { EditorChartField } from '../../../../interfaces';

export const CHART_PIE_SERIES: EditorChartField = {
  label: '数据系列配置',
  key: 'seriesGroup',
  schemaType: 'group',
  children: [
    {
      label: '数据系列（饼图）',
      key: 'series',
      path: 'series',
      schemaType: 'array',
      removeActive: true,
      children: [
        // 基础（保留常用 8-9 项）
        { label: '类型', key: 'type', path: 'type', schemaType: 'select', disabled: true, options: [{ label: '饼图', val: 'pie' }] },
        { label: '系列名称', key: 'name', path: 'name', schemaType: 'text' },

        // 几何/布局（基础）
        { label: '半径', key: 'radius', path: 'radius', schemaType: 'text' },
        { label: '圆心', key: 'center', path: 'center', schemaType: 'text' },
        {
          label: '玫瑰图',
          key: 'roseType',
          path: 'roseType',
          schemaType: 'select',
          options: [
            { label: '关闭', val: false },
            { label: '半径模式', val: 'radius' },
            { label: '面积模式', val: 'area' }
          ]
        },

        // 样式与标签（基础）
        { label: '填充颜色', key: 'itemColor', path: 'itemStyle.color', schemaType: 'color' },
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
            { label: '外部', val: 'outside' },
            { label: '内部', val: 'inside' },
            { label: '居中', val: 'center' }
          ]
        }
      ]
    }
  ]
};
