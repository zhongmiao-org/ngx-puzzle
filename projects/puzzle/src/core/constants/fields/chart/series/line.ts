import { EditorChartField } from '../../../../interfaces';

export const CHART_LINE_SERIES: EditorChartField = {
  label: '数据系列配置',
  key: 'seriesGroup',
  schemaType: 'group',
  children: [
    {
      label: '数据系列（折线图）',
      key: 'series',
      path: 'series',
      schemaType: 'array',
      removeActive: true,
      children: [
        { label: '设置数据源', key: 'data', path: 'data', schemaType: 'button' },
        // 基础（保留常用 8 项）
        { label: '类型', key: 'type', path: 'type', schemaType: 'select', disabled: true, options: [{ label: '折线图', val: 'line' }] },
        { label: '系列名称', key: 'name', path: 'name', schemaType: 'text' },

        // 折线常用配置
        {
          label: '平滑',
          key: 'smooth',
          path: 'smooth',
          schemaType: 'select',
          options: [
            { label: '关闭', val: false },
            { label: '开启', val: true }
          ]
        },
        {
          label: '连接空值',
          key: 'connectNulls',
          path: 'connectNulls',
          schemaType: 'select',
          options: [
            { label: '禁用', val: false },
            { label: '启用', val: true }
          ]
        },

        // 线条样式（基础）
        { label: '线条颜色', key: 'lineColor', path: 'lineStyle.color', schemaType: 'color' },
        { label: '线条宽度', key: 'lineWidth', path: 'lineStyle.width', schemaType: 'number', min: 0, max: 100, step: 1 },

        // 面积开关（常用）
        {
          label: '开启面积填充',
          key: 'areaEnable',
          path: 'areaStyle.__enable__',
          schemaType: 'select',
          options: [
            { label: '禁用', val: false },
            { label: '启用', val: true }
          ]
        }
      ]
    }
  ]
};
