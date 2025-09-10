import { EditorChartField } from '../../../interfaces';
import { ENABLE_OPTIONS, FONT_WEIGHT_OPTIONS } from '../../select-options.const';

export const CHART_X_AXIS: EditorChartField = {
  label: 'X轴设置',
  key: 'xAxis',
  schemaType: 'group',
  children: [
    {
      label: '轴类型',
      key: 'xAxisType',
      path: 'xAxis.type',
      schemaType: 'select',
      options: [
        { label: '数值轴', val: 'value' },
        { label: '类目轴', val: 'category' },
        { label: '时间轴', val: 'time' },
        { label: '对数轴', val: 'log' }
      ]
    },
    {
      label: '显示X轴',
      key: 'xAxisShow',
      path: 'xAxis.show',
      schemaType: 'select',
      options: ENABLE_OPTIONS
    },
    {
      label: '反向坐标轴',
      key: 'xAxisInverse',
      path: 'xAxis.inverse',
      schemaType: 'select',
      options: ENABLE_OPTIONS
    },
    {
      label: '轴名称',
      key: 'xAxisName',
      path: 'xAxis.name',
      schemaType: 'text'
    },
    {
      label: '轴名称位置',
      key: 'xAxisNameLocation',
      path: 'xAxis.nameLocation',
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
      key: 'xAxisNameGap',
      path: 'xAxis.nameGap',
      schemaType: 'number',
      min: 0,
      step: 1
    },
    {
      label: '最小值',
      key: 'xAxisMin',
      path: 'xAxis.min',
      schemaType: 'text'
    },
    {
      label: '最大值',
      key: 'xAxisMax',
      path: 'xAxis.max',
      schemaType: 'text'
    },
    // 轴名称文字样式（基础）
    {
      label: '轴名称文字颜色',
      key: 'xAxisNameTextStyleColor',
      path: 'xAxis.nameTextStyle.color',
      schemaType: 'color'
    },
    {
      label: '轴名称文字大小',
      key: 'xAxisNameTextStyleFontSize',
      path: 'xAxis.nameTextStyle.fontSize',
      schemaType: 'number',
      min: 8,
      max: 100,
      step: 1
    },
    {
      label: '轴名称文字粗细',
      key: 'xAxisNameTextStyleFontWeight',
      path: 'xAxis.nameTextStyle.fontWeight',
      schemaType: 'select',
      options: FONT_WEIGHT_OPTIONS
    },
    // 轴标签样式（常用）
    {
      label: '显示轴标签',
      key: 'xAxisAxisLabelShow',
      path: 'xAxis.axisLabel.show',
      schemaType: 'select',
      options: ENABLE_OPTIONS
    },
    {
      label: '标签旋转角度',
      key: 'xAxisAxisLabelRotate',
      path: 'xAxis.axisLabel.rotate',
      schemaType: 'number',
      min: -90,
      max: 90,
      step: 1
    },
    {
      label: '标签内边距',
      key: 'xAxisAxisLabelMargin',
      path: 'xAxis.axisLabel.margin',
      schemaType: 'number',
      min: 0,
      step: 1
    },
    {
      label: '标签文字颜色',
      key: 'xAxisAxisLabelColor',
      path: 'xAxis.axisLabel.color',
      schemaType: 'color'
    },
    {
      label: '标签文字大小',
      key: 'xAxisAxisLabelFontSize',
      path: 'xAxis.axisLabel.fontSize',
      schemaType: 'number',
      min: 8,
      max: 100,
      step: 1
    },
    {
      label: '标签文字粗细',
      key: 'xAxisAxisLabelFontWeight',
      path: 'xAxis.axisLabel.fontWeight',
      schemaType: 'select',
      options: FONT_WEIGHT_OPTIONS
    },
    // 轴线样式（基础）
    {
      label: '显示轴线',
      key: 'xAxisAxisLineShow',
      path: 'xAxis.axisLine.show',
      schemaType: 'select',
      options: ENABLE_OPTIONS
    },
    {
      label: '轴线颜色',
      key: 'xAxisAxisLineLineStyleColor',
      path: 'xAxis.axisLine.lineStyle.color',
      schemaType: 'color'
    },
    {
      label: '轴线宽度',
      key: 'xAxisAxisLineLineStyleWidth',
      path: 'xAxis.axisLine.lineStyle.width',
      schemaType: 'number',
      min: 0,
      step: 0.5
    },
    {
      label: '轴线类型',
      key: 'xAxisAxisLineLineStyleType',
      path: 'xAxis.axisLine.lineStyle.type',
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
      key: 'xAxisSplitLineShow',
      path: 'xAxis.splitLine.show',
      schemaType: 'select',
      options: ENABLE_OPTIONS
    },
    {
      label: '分割线颜色',
      key: 'xAxisSplitLineLineStyleColor',
      path: 'xAxis.splitLine.lineStyle.color',
      schemaType: 'color'
    },
    {
      label: '分割线宽度',
      key: 'xAxisSplitLineLineStyleWidth',
      path: 'xAxis.splitLine.lineStyle.width',
      schemaType: 'number',
      min: 0,
      step: 0.5
    },
    {
      label: '分割线类型',
      key: 'xAxisSplitLineLineStyleType',
      path: 'xAxis.splitLine.lineStyle.type',
      schemaType: 'select',
      options: [
        { label: '实线', val: 'solid' },
        { label: '虚线', val: 'dashed' },
        { label: '点线', val: 'dotted' }
      ]
    }
  ]
};

