import { EditorChartField } from 'ngx-puzzle/core';

// 参考 ECharts ScatterSeriesOption & 相关 Mixins，补全常用可编辑项
export const CHART_SCATTER_SERIES: EditorChartField = {
  label: '数据系列（散点图）',
  key: 'series',
  path: 'series',
  schemaType: 'array',
  removeActive: true,
  children: [
    // 基础
    { label: '类型', key: 'type', path: 'type', schemaType: 'select', disabled: true, options: [{ label: '散点图', val: 'scatter' }] },
    { label: '系列名称', key: 'name', path: 'name', schemaType: 'text' },

    // 调色与数据布局（SeriesOption$1）
    {
      label: '颜色分配',
      key: 'colorBy',
      path: 'colorBy',
      schemaType: 'select',
      options: [
        { label: '按系列（整组统一）', val: 'series' },
        { label: '按数据（每条不同）', val: 'data' }
      ]
    },
    {
      label: '数据布局方式',
      key: 'seriesLayoutBy',
      path: 'seriesLayoutBy',
      schemaType: 'select',
      options: [
        { label: '按行（每行一个系列）', val: 'row' },
        { label: '按列（每列一个系列）', val: 'column' }
      ]
    },
    { label: '数据集索引', key: 'datasetIndex', path: 'datasetIndex', schemaType: 'number', min: 0, step: 1 },
    { label: '数据集ID', key: 'datasetId', path: 'datasetId', schemaType: 'text' },
    { label: 'X 轴维度映射', key: 'encodeX', path: 'encode.x', schemaType: 'text' },
    { label: 'Y 轴维度映射', key: 'encodeY', path: 'encode.y', schemaType: 'text' },
    { label: '数据项名称映射', key: 'encodeItemName', path: 'encode.itemName', schemaType: 'text' },
    { label: '数值维度映射', key: 'encodeValue', path: 'encode.value', schemaType: 'text' },

    // 坐标系（支持多坐标系）
    {
      label: '坐标系',
      key: 'coordinateSystem',
      path: 'coordinateSystem',
      schemaType: 'select',
      options: [
        { label: '直角坐标系', val: 'cartesian2d' },
        { label: '极坐标', val: 'polar' },
        { label: '日历坐标系', val: 'calendar' },
        { label: '地理坐标系', val: 'geo' },
        { label: '单轴', val: 'singleAxis' }
      ]
    },
    // 直角坐标索引
    { label: 'x 轴索引', key: 'xAxisIndex', path: 'xAxisIndex', schemaType: 'number', min: 0, step: 1, visibleWhen: (v: any) => v.coordinateSystem === 'cartesian2d' },
    { label: 'y 轴索引', key: 'yAxisIndex', path: 'yAxisIndex', schemaType: 'number', min: 0, step: 1, visibleWhen: (v: any) => v.coordinateSystem === 'cartesian2d' },
    // 极坐标索引
    { label: '极坐标索引', key: 'polarIndex', path: 'polarIndex', schemaType: 'number', min: 0, step: 1, visibleWhen: (v: any) => v.coordinateSystem === 'polar' },

    // 符号（SymbolOptionMixin）
    {
      label: '标记形状',
      key: 'symbol',
      path: 'symbol',
      schemaType: 'select',
      options: [
        { label: '圆形', val: 'circle' },
        { label: '矩形', val: 'rect' },
        { label: '圆角矩形', val: 'roundRect' },
        { label: '三角形', val: 'triangle' },
        { label: '菱形', val: 'diamond' },
        { label: '大头针', val: 'pin' },
        { label: '箭头', val: 'arrow' },
        { label: '无', val: 'none' }
      ]
    },
    { label: '标记大小', key: 'symbolSize', path: 'symbolSize', schemaType: 'number', min: 1, max: 200, step: 1, description: '单位：像素（函数配置请在源码中使用）' },
    { label: '标记旋转角', key: 'symbolRotate', path: 'symbolRotate', schemaType: 'number', min: -360, max: 360, step: 1 },
    { label: '保持宽高比', key: 'symbolKeepAspect', path: 'symbolKeepAspect', schemaType: 'select', options: [{ label: '否', val: false }, { label: '是', val: true }] },
    { label: '标记偏移', key: 'symbolOffset', path: 'symbolOffset', schemaType: 'text', description: '如 [0, 0] 或 [0, "50%"]' },

    // 标签与样式
    { label: '显示标签', key: 'labelShow', path: 'label.show', schemaType: 'select', options: [{ label: '禁用', val: false }, { label: '启用', val: true }] },
    {
      label: '标签位置',
      key: 'labelPosition',
      path: 'label.position',
      schemaType: 'select',
      options: [
        { label: '顶部', val: 'top' },
        { label: '底部', val: 'bottom' },
        { label: '左侧', val: 'left' },
        { label: '右侧', val: 'right' },
        { label: '内部', val: 'inside' },
        { label: '中心', val: 'center' }
      ]
    },
    { label: '填充颜色', key: 'itemColor', path: 'itemStyle.color', schemaType: 'color' },
    { label: '图形不透明度', key: 'itemOpacity', path: 'itemStyle.opacity', schemaType: 'number', min: 0, max: 1, step: 0.05 },
    { label: '边框颜色', key: 'itemBorderColor', path: 'itemStyle.borderColor', schemaType: 'color' },
    { label: '边框宽度', key: 'itemBorderWidth', path: 'itemStyle.borderWidth', schemaType: 'number', min: 0, max: 20, step: 1 },

    // 性能（大数据优化）
    { label: '启用大数据模式', key: 'large', path: 'large', schemaType: 'select', options: [{ label: '否', val: false }, { label: '是', val: true }] },
    { label: '大数据阈值', key: 'largeThreshold', path: 'largeThreshold', schemaType: 'number', min: 0, step: 100 },

    // 交互、选择与强调
    { label: '鼠标指针', key: 'cursor', path: 'cursor', schemaType: 'text' },
    { label: '图例悬停联动', key: 'legendHoverLink', path: 'legendHoverLink', schemaType: 'select', options: [{ label: '否', val: false }, { label: '是', val: true }] },
    { label: '是否裁剪溢出', key: 'clip', path: 'clip', schemaType: 'select', options: [{ label: '否', val: false }, { label: '是', val: true }] },
    {
      label: '选中模式',
      key: 'selectedMode',
      path: 'selectedMode',
      schemaType: 'select',
      options: [
        { label: '关闭', val: false },
        { label: '单选', val: 'single' },
        { label: '多选', val: 'multiple' },
        { label: '同系列', val: 'series' }
      ]
    },
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
    { label: '强调放大', key: 'emphasisScale', path: 'emphasis.scale', schemaType: 'number', min: 0, max: 5, step: 0.1, description: '0 关闭；>0 表示放大比例' }
  ]
};
