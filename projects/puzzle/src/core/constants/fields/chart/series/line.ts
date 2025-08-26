import { EditorChartField } from 'ngx-puzzle/core';

// TypeScript
export const CHART_LINE_SERIES: EditorChartField = {
  label: '数据系列（折线图）',
  key: 'series',
  path: 'series',
  schemaType: 'array',
  removeActive: true,
  children: [
    // 基础
    { label: '类型', key: 'type', path: 'type', schemaType: 'select', disabled: true, options: [{ label: '折线图', val: 'line' }] },
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

    // 数据绑定（基于 dataset，无需 data 与 encode）
    {
      label: '数据布局方式',
      key: 'layoutBy',
      path: 'seriesLayoutBy',
      schemaType: 'select',
      options: [
        { label: '按行（每行一个系列）', val: 'row' },
        { label: '按列（每列一个系列）', val: 'column' }
      ],
      description: '与 dataset 的二维表结构对齐；对象数组源一般无需配置'
    },
    {
      label: '数据集索引',
      key: 'datasetIndex',
      path: 'datasetIndex',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '指向 dataset 数组中的下标，通常为 0'
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

    // 折线特性
    {
      label: '阶梯模式',
      key: 'step',
      path: 'step',
      schemaType: 'select',
      options: [
        { label: '不阶梯', val: false },
        { label: '阶梯-起点', val: 'start' },
        { label: '阶梯-中点', val: 'middle' },
        { label: '阶梯-终点', val: 'end' }
      ]
    },
    {
      label: '平滑系数',
      key: 'smooth',
      path: 'smooth',
      schemaType: 'number',
      min: 0,
      max: 1,
      step: 0.1,
      description: '0 表示不平滑，1 表示最平滑；也可在代码中使用 true/false'
    },
    {
      label: '单调性',
      key: 'smoothMonotone',
      path: 'smoothMonotone',
      schemaType: 'select',
      options: [
        { label: '无', val: 'none' },
        { label: 'x 方向', val: 'x' },
        { label: 'y 方向', val: 'y' }
      ],
      description: '在相应方向上保证单调，可避免折线回折'
    },
    {
      label: '连接空值',
      key: 'connectNulls',
      path: 'connectNulls',
      schemaType: 'select',
      options: [{ label: '禁用', val: false }, { label: '启用', val: true }]
    },
    {
      label: '显示符号',
      key: 'showSymbol',
      path: 'showSymbol',
      schemaType: 'select',
      options: [{ label: '禁用', val: false }, { label: '启用', val: true }],
      description: '控制折线上散点符号显示'
    },
    {
      label: '显示全部符号',
      key: 'showAllSymbol',
      path: 'showAllSymbol',
      schemaType: 'select',
      options: [
        { label: '自动', val: 'auto' },
        { label: '全部显示', val: true },
        { label: '全部隐藏', val: false }
      ],
      description: 'auto：仅在高亮时显示'
    },

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
      ],
      description: '大数据场景用于提升性能'
    },

    // 行为/性能
    { label: '裁剪溢出', key: 'clip', path: 'clip', schemaType: 'select', options: [{ label: '禁用', val: false }, { label: '启用', val: true }] },

    // 线条样式
    { label: '线条颜色', key: 'lineColor', path: 'lineStyle.color', schemaType: 'color' },
    { label: '线条宽度', key: 'lineWidth', path: 'lineStyle.width', schemaType: 'number', min: 0, max: 100, step: 1, description: '单位：像素' },
    {
      label: '线条类型',
      key: 'lineType',
      path: 'lineStyle.type',
      schemaType: 'select',
      options: [
        { label: '实线', val: 'solid' },
        { label: '虚线', val: 'dashed' },
        { label: '点线', val: 'dotted' }
      ]
    },
    { label: '线条不透明度', key: 'lineOpacity', path: 'lineStyle.opacity', schemaType: 'number', min: 0, max: 1, step: 0.05 },

    // 面积样式
    { label: '开启面积填充', key: 'areaEnable', path: 'areaStyle.__enable__', schemaType: 'select', options: [{ label: '禁用', val: false }, { label: '启用', val: true }], description: '仅在编辑器中作为开关使用' },
    { label: '填充颜色', key: 'areaColor', path: 'areaStyle.color', schemaType: 'color' },
    { label: '填充不透明度', key: 'areaOpacity', path: 'areaStyle.opacity', schemaType: 'number', min: 0, max: 1, step: 0.05 },
    {
      label: '面积基准',
      key: 'areaOrigin',
      path: 'areaStyle.origin',
      schemaType: 'select',
      options: [
        { label: '自动', val: 'auto' },
        { label: '起点', val: 'start' },
        { label: '终点', val: 'end' }
      ],
      description: '控制面积与 x 轴/径向的基准位置'
    },

    // 符号样式
    {
      label: '符号形状',
      key: 'symbol',
      path: 'symbol',
      schemaType: 'select',
      options: [
        { label: '自动', val: 'emptyCircle' },
        { label: '圆形', val: 'circle' },
        { label: '方形', val: 'rect' },
        { label: '三角形', val: 'triangle' },
        { label: '菱形', val: 'diamond' },
        { label: '水滴', val: 'pin' },
        { label: '箭头', val: 'arrow' }
      ]
    },
    { label: '符号大小', key: 'symbolSize', path: 'symbolSize', schemaType: 'number', min: 1, max: 200, step: 1, description: '单位：像素' },
    { label: '符号旋转角度', key: 'symbolRotate', path: 'symbolRotate', schemaType: 'number', min: -360, max: 360, step: 1, description: '单位：度' },

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

    // 末端数值标签
    { label: '显示末端标签', key: 'endLabelShow', path: 'endLabel.show', schemaType: 'select', options: [{ label: '禁用', val: false }, { label: '启用', val: true }] },
    { label: '末端标签颜色', key: 'endLabelColor', path: 'endLabel.color', schemaType: 'color' },
    { label: '末端标签字号', key: 'endLabelFontSize', path: 'endLabel.fontSize', schemaType: 'number', min: 8, max: 200, step: 1, description: '单位：像素' },
    { label: '末端值动画', key: 'endLabelValueAnimation', path: 'endLabel.valueAnimation', schemaType: 'select', options: [{ label: '禁用', val: false }, { label: '启用', val: true }] },

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
    { label: '强调时显示数值标签', key: 'emphasisLabelShow', path: 'emphasis.label.show', schemaType: 'select', options: [{ label: '禁用', val: false }, { label: '启用', val: true }] },

    // 事件
    {
      label: '触发行事件',
      key: 'triggerLineEvent',
      path: 'triggerLineEvent',
      schemaType: 'select',
      options: [{ label: '禁用', val: false }, { label: '启用', val: true }],
      description: '触发系列中线段的事件（如 mouseover）'
    }
  ]
};
