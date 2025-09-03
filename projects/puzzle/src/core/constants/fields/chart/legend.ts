import { EditorChartField, ENABLE_OPTIONS, FONT_WEIGHT_OPTIONS } from 'ngx-puzzle/core';

// 图例设置 - 轻量化: 仅保留常用选项
export const CHART_LEGEND: EditorChartField = {
  label: '图例设置',
  key: 'legend',
  schemaType: 'group',
  children: [
    {
      label: '显示图例',
      key: 'legendShow',
      path: 'legend.show',
      schemaType: 'select',
      options: ENABLE_OPTIONS
    },
    {
      label: '布局方向',
      key: 'legendOrient',
      path: 'legend.orient',
      schemaType: 'select',
      options: [
        { label: '水平', val: 'horizontal' },
        { label: '垂直', val: 'vertical' }
      ]
    },
    {
      label: '对齐方式',
      key: 'legendAlign',
      path: 'legend.align',
      schemaType: 'select',
      options: [
        { label: '自动', val: 'auto' },
        { label: '左对齐', val: 'left' },
        { label: '右对齐', val: 'right' }
      ]
    },
    {
      label: '水平位置',
      key: 'legendLeft',
      path: 'legend.left',
      schemaType: 'select',
      options: [
        { label: '左侧', val: 'left' },
        { label: '居中', val: 'center' },
        { label: '右侧', val: 'right' },
        { label: '自定义', val: 'auto' }
      ]
    },
    {
      label: '垂直位置',
      key: 'legendTop',
      path: 'legend.top',
      schemaType: 'select',
      options: [
        { label: '顶部', val: 'top' },
        { label: '中间', val: 'middle' },
        { label: '底部', val: 'bottom' },
        { label: '自定义', val: 'auto' }
      ]
    },
    {
      label: '图例项间距',
      key: 'legendItemGap',
      path: 'legend.itemGap',
      schemaType: 'number',
      min: 0,
      step: 1
    },
    {
      label: '图例标记宽度',
      key: 'legendItemWidth',
      path: 'legend.itemWidth',
      schemaType: 'number',
      min: 0,
      step: 1
    },
    {
      label: '图例标记高度',
      key: 'legendItemHeight',
      path: 'legend.itemHeight',
      schemaType: 'number',
      min: 0,
      step: 1
    },
    {
      label: '选择模式',
      key: 'legendSelectedMode',
      path: 'legend.selectedMode',
      schemaType: 'select',
      options: [
        { label: '禁用选择', val: false },
        { label: '允许选择', val: true },
        { label: '单选', val: 'single' },
        { label: '多选', val: 'multiple' }
      ]
    },
    // 图例文字样式（基础）
    {
      label: '图例文字颜色',
      key: 'legendTextStyleColor',
      path: 'legend.textStyle.color',
      schemaType: 'color'
    },
    {
      label: '图例文字大小',
      key: 'legendTextStyleFontSize',
      path: 'legend.textStyle.fontSize',
      schemaType: 'number',
      min: 8,
      max: 100,
      step: 1
    },
    {
      label: '图例文字粗细',
      key: 'legendTextStyleFontWeight',
      path: 'legend.textStyle.fontWeight',
      schemaType: 'select',
      options: FONT_WEIGHT_OPTIONS
    }
  ]
};
