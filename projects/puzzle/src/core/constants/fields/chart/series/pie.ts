import { EditorChartField } from 'ngx-puzzle/core';

// 参考柱状图配置与 ECharts PieSeriesOption 定义
export const CHART_PIE_SERIES: EditorChartField = {
  label: '数据系列（饼图）',
  key: 'series',
  path: 'series',
  schemaType: 'array',
  removeActive: true,
  children: [
    // 基础
    { label: '类型', key: 'type', path: 'type', schemaType: 'select', disabled: true, options: [{ label: '饼图', val: 'pie' }] },
    { label: '系列名称', key: 'name', path: 'name', schemaType: 'text' },

    {
      label: '颜色分配',
      key: 'colorBy',
      path: 'colorBy',
      schemaType: 'select',
      options: [
        { label: '按系列（整组统一）', val: 'series' },
        { label: '按数据（每条不同）', val: 'data' }
      ],
      description: 'colorBy: series 表示整组统一色，data 表示每个数据项轮换调色盘'
    },
    {
      label: '数据项名称映射',
      key: 'encodeItemName',
      path: 'encode.itemName',
      schemaType: 'text',
      description: '用于图例/提示框等展示的数据项名称维度；可填维度名或索引，支持单个或多个'
    },
    {
      label: '数值维度映射',
      key: 'encodeValue',
      path: 'encode.value',
      schemaType: 'text',
      description: '用于视觉/提示框的数值维度；可填维度名或索引，支持单个或多个'
    },

    // 几何/布局
    {
      label: '南丁格尔玫瑰图',
      key: 'roseType',
      path: 'roseType',
      schemaType: 'select',
      options: [
        { label: '关闭', val: false },
        { label: '半径模式', val: 'radius' },
        { label: '面积模式', val: 'area' }
      ],
      description: '将普通饼图切换为玫瑰图样式'
    },
    {
      label: '半径',
      key: 'radius',
      path: 'radius',
      schemaType: 'text',
      description: '可填像素或百分比，如 80 或 60%；支持数组形式 [内半径, 外半径]'
    },
    {
      label: '圆心',
      key: 'center',
      path: 'center',
      schemaType: 'text',
      description: '如 [50%, 50%] 或 [x, y]；填写百分比更易自适应'
    },
    {
      label: '起始角度',
      key: 'startAngle',
      path: 'startAngle',
      schemaType: 'number',
      min: -360,
      max: 360,
      step: 1,
      description: '单位：度，默认 90'
    },
    {
      label: '顺时针绘制',
      key: 'clockwise',
      path: 'clockwise',
      schemaType: 'select',
      options: [
        { label: '否', val: false },
        { label: '是', val: true }
      ]
    },
    {
      label: '扇区间隔角度',
      key: 'padAngle',
      path: 'padAngle',
      schemaType: 'number',
      min: 0,
      max: 180,
      step: 1,
      description: '相邻扇区之间的间隔角度'
    },
    { label: '最小扇区角度', key: 'minAngle', path: 'minAngle', schemaType: 'number', min: 0, max: 180, step: 1 },
    { label: '显示标签最小角度', key: 'minShowLabelAngle', path: 'minShowLabelAngle', schemaType: 'number', min: 0, max: 180, step: 1 },
    {
      label: '总和为 0 仍显示',
      key: 'stillShowZeroSum',
      path: 'stillShowZeroSum',
      schemaType: 'select',
      options: [
        { label: '否', val: false },
        { label: '是', val: true }
      ]
    },

    // 选中与重叠
    {
      label: '选中模式',
      key: 'selectedMode',
      path: 'selectedMode',
      schemaType: 'select',
      options: [
        { label: '关闭', val: false },
        { label: '单选', val: 'single' },
        { label: '多选', val: 'multiple' }
      ]
    },
    {
      label: '选中偏移',
      key: 'selectedOffset',
      path: 'selectedOffset',
      schemaType: 'number',
      min: 0,
      max: 100,
      step: 1,
      description: '单位：像素'
    },
    {
      label: '避免标签重叠',
      key: 'avoidLabelOverlap',
      path: 'avoidLabelOverlap',
      schemaType: 'select',
      options: [
        { label: '否', val: false },
        { label: '是', val: true }
      ]
    },
    { label: '百分比精度', key: 'percentPrecision', path: 'percentPrecision', schemaType: 'number', min: 0, max: 6, step: 1 },

    // 数值标签
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
    },
    { label: '数值标签颜色', key: 'labelColor', path: 'label.color', schemaType: 'color' },
    {
      label: '数值标签字号',
      key: 'labelFontSize',
      path: 'label.fontSize',
      schemaType: 'number',
      min: 8,
      max: 200,
      step: 1,
      description: '单位：像素'
    },
    {
      label: '数值标签粗细',
      key: 'labelFontWeight',
      path: 'label.fontWeight',
      schemaType: 'select',
      options: [
        { label: '正常', val: 'normal' },
        { label: '加粗', val: 'bold' },
        { label: '较粗', val: 'bolder' },
        { label: '较细', val: 'lighter' }
      ]
    },

    // 标签引导线
    {
      label: '显示引导线',
      key: 'labelLineShow',
      path: 'labelLine.show',
      schemaType: 'select',
      options: [
        { label: '禁用', val: false },
        { label: '启用', val: true }
      ]
    },
    {
      label: '引导线长度1',
      key: 'labelLineLength',
      path: 'labelLine.length',
      schemaType: 'number',
      min: 0,
      max: 200,
      step: 1,
      description: '单位：像素'
    },
    {
      label: '引导线长度2',
      key: 'labelLineLength2',
      path: 'labelLine.length2',
      schemaType: 'number',
      min: 0,
      max: 200,
      step: 1,
      description: '单位：像素'
    },
    {
      label: '引导线平滑',
      key: 'labelLineSmooth',
      path: 'labelLine.smooth',
      schemaType: 'number',
      min: 0,
      max: 1,
      step: 0.1,
      description: '0 表示直线，1 表示最平滑'
    },

    // 扇区样式
    { label: '填充颜色', key: 'itemColor', path: 'itemStyle.color', schemaType: 'color' },
    { label: '图形不透明度', key: 'itemOpacity', path: 'itemStyle.opacity', schemaType: 'number', min: 0, max: 1, step: 0.05 },
    { label: '边框颜色', key: 'itemBorderColor', path: 'itemStyle.borderColor', schemaType: 'color' },
    {
      label: '边框宽度',
      key: 'itemBorderWidth',
      path: 'itemStyle.borderWidth',
      schemaType: 'number',
      min: 0,
      max: 100,
      step: 1,
      description: '单位：像素'
    },
    {
      label: '圆角',
      key: 'itemBorderRadius',
      path: 'itemStyle.borderRadius',
      schemaType: 'number',
      min: 0,
      max: 2000,
      step: 1,
      description: '单位：像素'
    },

    // 强调态
    {
      label: '强调焦点',
      key: 'emphasisFocus',
      path: 'emphasis.focus',
      schemaType: 'select',
      options: [
        { label: '无', val: 'none' },
        { label: '自身', val: 'self' },
        { label: '同系列', val: 'series' }
      ]
    },
    {
      label: '强调时显示数值标签',
      key: 'emphasisLabelShow',
      path: 'emphasis.label.show',
      schemaType: 'select',
      options: [
        { label: '禁用', val: false },
        { label: '启用', val: true }
      ]
    }
  ]
};
