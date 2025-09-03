import { EditorChartField, ENABLE_OPTIONS, FONT_WEIGHT_OPTIONS } from 'ngx-puzzle/core';

// 提示框设置 - 轻量化: 仅保留常用选项
export const CHART_TOOLTIP: EditorChartField = {
  label: '提示框设置',
  key: 'tooltip',
  schemaType: 'group',
  children: [
    {
      label: '显示提示框',
      key: 'tooltipShow',
      path: 'tooltip.show',
      schemaType: 'select',
      options: ENABLE_OPTIONS
    },
    {
      label: '触发类型',
      key: 'tooltipTrigger',
      path: 'tooltip.trigger',
      schemaType: 'select',
      options: [
        { label: '数据项触发', val: 'item' },
        { label: '坐标轴触发', val: 'axis' },
        { label: '不触发', val: 'none' }
      ],
      description: '触发类型，只在坐标系中有效'
    },
    {
      label: '内容格式化器',
      key: 'tooltipFormatter',
      path: 'tooltip.formatter',
      schemaType: 'text',
      description: '提示框浮层内容格式器，支持字符串模板和回调函数'
    },
    {
      label: '数值格式化器',
      key: 'tooltipValueFormatter',
      path: 'tooltip.valueFormatter',
      schemaType: 'text',
      description: '数值的格式化器，当 formatter 未指定时生效'
    },
    // 外观样式（基础）
    {
      label: '背景颜色',
      key: 'tooltipBackgroundColor',
      path: 'tooltip.backgroundColor',
      schemaType: 'color'
    },
    // 文字样式（基础）
    {
      label: '文字颜色',
      key: 'tooltipTextStyleColor',
      path: 'tooltip.textStyle.color',
      schemaType: 'color'
    },
    {
      label: '文字大小',
      key: 'tooltipTextStyleFontSize',
      path: 'tooltip.textStyle.fontSize',
      schemaType: 'number',
      min: 8,
      max: 100,
      step: 1
    },
    {
      label: '文字粗细',
      key: 'tooltipTextStyleFontWeight',
      path: 'tooltip.textStyle.fontWeight',
      schemaType: 'select',
      options: FONT_WEIGHT_OPTIONS
    },
    // 轴指示器（常用）
    {
      label: '轴指示器类型',
      key: 'tooltipAxisPointerType',
      path: 'tooltip.axisPointer.type',
      schemaType: 'select',
      options: [
        { label: '直线指示器', val: 'line' },
        { label: '阴影指示器', val: 'shadow' },
        { label: '无指示器', val: 'none' },
        { label: '十字准星', val: 'cross' }
      ]
    }
  ]
};
