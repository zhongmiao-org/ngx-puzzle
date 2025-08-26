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
    // 基础
    { label: '类型', key: 'type', path: 'type', schemaType: 'select', disabled: true, options: [{ label: '柱状图', val: 'bar' }] },
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
    // 坐标系/轴
    {
      label: '坐标系',
      key: 'coordinateSystem',
      path: 'coordinateSystem',
      schemaType: 'select',
      options: [
        { label: '直角坐标系', val: 'cartesian2d' },
        { label: '极坐标', val: 'polar' }
      ]
    },

    // 柱体尺寸/间距
    { label: '柱宽', key: 'barWidth', path: 'barWidth', schemaType: 'number', min: 0, max: 2000, step: 1, description: '单位：像素' },
    { label: '最大柱宽', key: 'barMaxWidth', path: 'barMaxWidth', schemaType: 'number', min: 0, max: 2000, step: 1, description: '单位：像素' },
    { label: '最小柱宽', key: 'barMinWidth', path: 'barMinWidth', schemaType: 'number', min: 0, max: 2000, step: 1, description: '单位：像素' },
    { label: '最小柱高', key: 'barMinHeight', path: 'barMinHeight', schemaType: 'number', min: 0, max: 2000, step: 1, description: '单位：像素' },
    { label: '最小角度', key: 'barMinAngle', path: 'barMinAngle', schemaType: 'number', min: 0, max: 360, step: 1, description: '单位：度（仅极坐标）' },

    // 间距
    { label: '同类间距', key: 'barGap', path: 'barGap', schemaType: 'text', description: '单位：百分比或像素，例如 30% 或 10' },
    { label: '类目间距', key: 'barCategoryGap', path: 'barCategoryGap', schemaType: 'text', description: '单位：百分比或像素，例如 20% 或 8' },

    // 堆叠/采样
    { label: '堆叠分组', key: 'stack', path: 'stack', schemaType: 'text', description: '相同名称将堆叠' },
    {
      label: '采样方式',
      key: 'sampling',
      path: 'sampling',
      schemaType: 'select',
      options: [
        { label: '不采样', val: 'none' },
        { label: '平均', val: 'average' },
        { label: '最小', val: 'min' },
        { label: '最大', val: 'max' },
        { label: '求和', val: 'sum' },
        { label: 'LTTB', val: 'lttb' }
      ]
    },

    // 性能
    { label: '大数据优化', key: 'large', path: 'large', schemaType: 'select', options: [{ label: '禁用', val: false }, { label: '启用', val: true }] },
    { label: '大数据阈值', key: 'largeThreshold', path: 'largeThreshold', schemaType: 'number', min: 0, max: 1000000, step: 100, description: '单位：数据项数量' },

    // 行为
    { label: '裁剪溢出', key: 'clip', path: 'clip', schemaType: 'select', options: [{ label: '禁用', val: false }, { label: '启用', val: true }] },
    { label: '端帽圆角', key: 'roundCap', path: 'roundCap', schemaType: 'select', options: [{ label: '禁用', val: false }, { label: '启用', val: true }], description: '仅极坐标生效' },
    { label: '实时排序', key: 'realtimeSort', path: 'realtimeSort', schemaType: 'select', options: [{ label: '禁用', val: false }, { label: '启用', val: true }] },
    { label: '显示背景', key: 'showBackground', path: 'showBackground', schemaType: 'select', options: [{ label: '禁用', val: false }, { label: '启用', val: true }] },

    // 背景样式
    { label: '背景圆角', key: 'backgroundRadius', path: 'backgroundStyle.borderRadius', schemaType: 'number', min: 0, max: 2000, step: 1, description: '单位：像素' },
    { label: '背景颜色', key: 'backgroundColor', path: 'backgroundStyle.color', schemaType: 'color' },
    { label: '背景不透明度', key: 'backgroundOpacity', path: 'backgroundStyle.opacity', schemaType: 'number', min: 0, max: 1, step: 0.05 },

    // 柱体样式
    { label: '填充颜色', key: 'itemColor', path: 'itemStyle.color', schemaType: 'color' },
    { label: '图形不透明度', key: 'itemOpacity', path: 'itemStyle.opacity', schemaType: 'number', min: 0, max: 1, step: 0.05 },
    { label: '边框颜色', key: 'itemBorderColor', path: 'itemStyle.borderColor', schemaType: 'color' },
    { label: '边框宽度', key: 'itemBorderWidth', path: 'itemStyle.borderWidth', schemaType: 'number', min: 0, max: 100, step: 1, description: '单位：像素' },
    { label: '柱体圆角', key: 'itemBorderRadius', path: 'itemStyle.borderRadius', schemaType: 'number', min: 0, max: 2000, step: 1, description: '单位：像素' },

    // 数值标签
    { label: '显示数值标签', key: 'labelShow', path: 'label.show', schemaType: 'select', options: [{ label: '禁用', val: false }, { label: '启用', val: true }] },
    {
      label: '数值标签位置',
      key: 'labelPosition',
      path: 'label.position',
      schemaType: 'select',
      options: [
        { label: '顶部', val: 'top' },
        { label: '内部', val: 'inside' },
        { label: '内部顶部', val: 'insideTop' },
        { label: '内部底部', val: 'insideBottom' },
        { label: '左侧', val: 'left' },
        { label: '右侧', val: 'right' },
        { label: '底部', val: 'bottom' }
      ]
    },
    { label: '数值标签颜色', key: 'labelColor', path: 'label.color', schemaType: 'color' },
    { label: '数值标签字号', key: 'labelFontSize', path: 'label.fontSize', schemaType: 'number', min: 8, max: 200, step: 1, description: '单位：像素' },
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
    { label: '强调时显示数值标签', key: 'emphasisLabelShow', path: 'emphasis.label.show', schemaType: 'select', options: [{ label: '禁用', val: false }, { label: '启用', val: true }] }
  ]
};
