import { EditorChartField } from '../../../interfaces';
import { ENABLE_OPTIONS, FONT_WEIGHT_OPTIONS } from '../../select-options.const';
export const CHART_Y_AXIS: EditorChartField = {
  label: 'Y轴设置',
  key: 'yAxis',
  schemaType: 'group',
  children: [
    {
      label: '轴类型',
      key: 'yAxisType',
      path: 'yAxis.type',
      schemaType: 'select',
      options: [
        { label: '数值轴', val: 'value' },
        { label: '类目轴', val: 'category' },
        { label: '时间轴', val: 'time' },
        { label: '对数轴', val: 'log' }
      ]
    },
    {
      label: '显示Y轴',
      key: 'yAxisShow',
      path: 'yAxis.show',
      schemaType: 'select',
      options: ENABLE_OPTIONS
    },
    {
      label: '反向坐标轴',
      key: 'yAxisInverse',
      path: 'yAxis.inverse',
      schemaType: 'select',
      options: ENABLE_OPTIONS
    },
    {
      label: '轴名称',
      key: 'yAxisName',
      path: 'yAxis.name',
      schemaType: 'text'
    },
    {
      label: '轴名称位置',
      key: 'yAxisNameLocation',
      path: 'yAxis.nameLocation',
      schemaType: 'select',
      options: [
        { label: '开始', val: 'start' },
        { label: '中间', val: 'middle' },
        { label: '居中', val: 'center' },
        { label: '结束', val: 'end' }
      ]
    },
    {
      label: '轴名称间距',
      key: 'yAxisNameGap',
      path: 'yAxis.nameGap',
      schemaType: 'number',
      min: 0,
      step: 1
    },
    {
      label: '最小值',
      key: 'yAxisMin',
      path: 'yAxis.min',
      schemaType: 'text'
    },
    {
      label: '最大值',
      key: 'yAxisMax',
      path: 'yAxis.max',
      schemaType: 'text'
    },
    // 轴名称文字样式（基础）
    {
      label: '轴名称文字颜色',
      key: 'yAxisNameTextStyleColor',
      path: 'yAxis.nameTextStyle.color',
      schemaType: 'color'
    },
    {
      label: '轴名称文字大小',
      key: 'yAxisNameTextStyleFontSize',
      path: 'yAxis.nameTextStyle.fontSize',
      schemaType: 'number',
      min: 8,
      max: 100,
      step: 1
    },
    {
      label: '轴名称文字粗细',
      key: 'yAxisNameTextStyleFontWeight',
      path: 'yAxis.nameTextStyle.fontWeight',
      schemaType: 'select',
      options: FONT_WEIGHT_OPTIONS
    },
    // 轴标签样式（常用）
    {
      label: '显示轴标签',
      key: 'yAxisAxisLabelShow',
      path: 'yAxis.axisLabel.show',
      schemaType: 'select',
      options: ENABLE_OPTIONS
    },
    {
      label: '标签旋转角度',
      key: 'yAxisAxisLabelRotate',
      path: 'yAxis.axisLabel.rotate',
      schemaType: 'number',
      min: -90,
      max: 90,
      step: 1
    },
    {
      label: '标签内边距',
      key: 'yAxisAxisLabelMargin',
      path: 'yAxis.axisLabel.margin',
      schemaType: 'number',
      min: 0,
      step: 1
    },
    {
      label: '标签文字颜色',
      key: 'yAxisAxisLabelColor',
      path: 'yAxis.axisLabel.color',
      schemaType: 'color'
    },
    {
      label: '标签文字大小',
      key: 'yAxisAxisLabelFontSize',
      path: 'yAxis.axisLabel.fontSize',
      schemaType: 'number',
      min: 8,
      max: 100,
      step: 1
    },
    {
      label: '标签文字粗细',
      key: 'yAxisAxisLabelFontWeight',
      path: 'yAxis.axisLabel.fontWeight',
      schemaType: 'select',
      options: FONT_WEIGHT_OPTIONS
    },
    // 轴线样式（基础）
    {
      label: '显示轴线',
      key: 'yAxisAxisLineShow',
      path: 'yAxis.axisLine.show',
      schemaType: 'select',
      options: ENABLE_OPTIONS
    },
    {
      label: '轴线颜色',
      key: 'yAxisAxisLineLineStyleColor',
      path: 'yAxis.axisLine.lineStyle.color',
      schemaType: 'color'
    },
    {
      label: '轴线宽度',
      key: 'yAxisAxisLineLineStyleWidth',
      path: 'yAxis.axisLine.lineStyle.width',
      schemaType: 'number',
      min: 0,
      step: 0.5
    },
    {
      label: '轴线类型',
      key: 'yAxisAxisLineLineStyleType',
      path: 'yAxis.axisLine.lineStyle.type',
      schemaType: 'select',
      options: [
        { label: '实线', val: 'solid' },
        { label: '虚线', val: 'dashed' },
        { label: '点线', val: 'dotted' }
      ]
    },
    // 分割线样式（基础）
    {
      label: '显示分割线',
      key: 'yAxisSplitLineShow',
      path: 'yAxis.splitLine.show',
      schemaType: 'select',
      options: ENABLE_OPTIONS
    },
    {
      label: '分割线颜色',
      key: 'yAxisSplitLineLineStyleColor',
      path: 'yAxis.splitLine.lineStyle.color',
      schemaType: 'color'
    },
    {
      label: '分割线宽度',
      key: 'yAxisSplitLineLineStyleWidth',
      path: 'yAxis.splitLine.lineStyle.width',
      schemaType: 'number',
      min: 0,
      step: 0.5
    },
    {
      label: '分割线类型',
      key: 'yAxisSplitLineLineStyleType',
      path: 'yAxis.splitLine.lineStyle.type',
      schemaType: 'select',
      options: [
        { label: '实线', val: 'solid' },
        { label: '虚线', val: 'dashed' },
        { label: '点线', val: 'dotted' }
      ]
    }
  ]
};
