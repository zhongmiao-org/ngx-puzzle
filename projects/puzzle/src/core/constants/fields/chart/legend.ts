import { EditorChartField, ENABLE_OPTIONS, FONT_WEIGHT_OPTIONS } from 'ngx-puzzle/core';

// 图例设置 - 基于 ECharts v6 LegendOption 接口
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
      options: ENABLE_OPTIONS,
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
      label: '右侧距离',
      key: 'legendRight',
      path: 'legend.right',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '距离右侧的像素值',
    },
    {
      label: '底部距离',
      key: 'legendBottom',
      path: 'legend.bottom',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '距离底部的像素值',
    },
    {
      label: '图例宽度',
      key: 'legendWidth',
      path: 'legend.width',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '图例组件的宽度',
    },
    {
      label: '图例高度',
      key: 'legendHeight',
      path: 'legend.height',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '图例组件的高度',
    },
    {
      label: '背景颜色',
      key: 'legendBackgroundColor',
      path: 'legend.backgroundColor',
      schemaType: 'color',
    },
    {
      label: '边框颜色',
      key: 'legendBorderColor',
      path: 'legend.borderColor',
      schemaType: 'color',
    },
    {
      label: '边框宽度',
      key: 'legendBorderWidth',
      path: 'legend.borderWidth',
      schemaType: 'number',
      min: 0,
      step: 1,
    },
    {
      label: '边框圆角',
      key: 'legendBorderRadius',
      path: 'legend.borderRadius',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '背景边框的圆角半径',
    },
    {
      label: '内边距',
      key: 'legendPadding',
      path: 'legend.padding',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '图例内边距，也可设置为数组 [上, 右, 下, 左]',
    },
    {
      label: '图例项间距',
      key: 'legendItemGap',
      path: 'legend.itemGap',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '各个图例项之间的间距',
    },
    {
      label: '图例标记宽度',
      key: 'legendItemWidth',
      path: 'legend.itemWidth',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '图例标记的图形宽度',
    },
    {
      label: '图例标记高度',
      key: 'legendItemHeight',
      path: 'legend.itemHeight',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '图例标记的图形高度',
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
      ],
      description: '图例选择的模式',
    },
    {
      label: '显示选择器',
      key: 'legendSelector',
      path: 'legend.selector',
      schemaType: 'select',
      options: [
        { label: '不显示', val: false },
        { label: '显示', val: true }
      ],
      description: '是否显示全选/反选按钮',
    },
    {
      label: '选择器位置',
      key: 'legendSelectorPosition',
      path: 'legend.selectorPosition',
      schemaType: 'select',
      options: [
        { label: '自动', val: 'auto' },
        { label: '开始', val: 'start' },
        { label: '结束', val: 'end' }
      ],
      description: '选择器按钮的位置',
    },
    {
      label: '选择器按钮间距',
      key: 'legendSelectorItemGap',
      path: 'legend.selectorItemGap',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '选择器按钮之间的间距',
    },
    {
      label: '选择器与图例间距',
      key: 'legendSelectorButtonGap',
      path: 'legend.selectorButtonGap',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '选择器按钮组与图例项之间的间距',
    },
    {
      label: '触发事件',
      key: 'legendTriggerEvent',
      path: 'legend.triggerEvent',
      schemaType: 'select',
      options: ENABLE_OPTIONS,
      description: '是否触发鼠标或触摸事件',
    },
    // 图例文字样式设置
    {
      label: '图例文字颜色',
      key: 'legendTextStyleColor',
      path: 'legend.textStyle.color',
      schemaType: 'color',
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
      options: FONT_WEIGHT_OPTIONS,
    },
    {
      label: '图例文字样式',
      key: 'legendTextStyleFontStyle',
      path: 'legend.textStyle.fontStyle',
      schemaType: 'select',
      options: [
        { label: '正常', val: 'normal' },
        { label: '斜体', val: 'italic' },
        { label: '倾斜', val: 'oblique' }
      ]
    },
    {
      label: '图例文字字体',
      key: 'legendTextStyleFontFamily',
      path: 'legend.textStyle.fontFamily',
      schemaType: 'text',
      description: '字体系列，如 "Microsoft YaHei", Arial, sans-serif',
    },
    {
      label: '图例文字行高',
      key: 'legendTextStyleLineHeight',
      path: 'legend.textStyle.lineHeight',
      schemaType: 'number',
      min: 0,
      step: 0.1,
    },
    // 选择器标签样式设置
    {
      label: '选择器文字颜色',
      key: 'legendSelectorLabelColor',
      path: 'legend.selectorLabel.color',
      schemaType: 'color',
    },
    {
      label: '选择器文字大小',
      key: 'legendSelectorLabelFontSize',
      path: 'legend.selectorLabel.fontSize',
      schemaType: 'number',
      min: 8,
      max: 100,
      step: 1
    },
    {
      label: '选择器文字粗细',
      key: 'legendSelectorLabelFontWeight',
      path: 'legend.selectorLabel.fontWeight',
      schemaType: 'select',
      options: FONT_WEIGHT_OPTIONS,
    },
    {
      label: '选择器文字字体',
      key: 'legendSelectorLabelFontFamily',
      path: 'legend.selectorLabel.fontFamily',
      schemaType: 'text',
      description: '选择器按钮的字体系列',
    },
    // 选择器高亮状态样式
    {
      label: '选择器高亮文字颜色',
      key: 'legendEmphasisSelectorLabelColor',
      path: 'legend.emphasis.selectorLabel.color',
      schemaType: 'color',
    },
    {
      label: '选择器高亮文字大小',
      key: 'legendEmphasisSelectorLabelFontSize',
      path: 'legend.emphasis.selectorLabel.fontSize',
      schemaType: 'number',
      min: 8,
      max: 100,
      step: 1
    },
    {
      label: '选择器高亮文字粗细',
      key: 'legendEmphasisSelectorLabelFontWeight',
      path: 'legend.emphasis.selectorLabel.fontWeight',
      schemaType: 'select',
      options: FONT_WEIGHT_OPTIONS,
    },
    // 可滚动图例特有配置
    {
      label: '滚动数据索引',
      key: 'legendScrollDataIndex',
      path: 'legend.scrollDataIndex',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '图例当前最左上显示项的 dataIndex',
    },
    {
      label: '翻页按钮间距',
      key: 'legendPageButtonItemGap',
      path: 'legend.pageButtonItemGap',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '各个翻页按钮之间的间距',
    },
    {
      label: '翻页按钮与图例间距',
      key: 'legendPageButtonGap',
      path: 'legend.pageButtonGap',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '翻页按钮组与图例项之间的间距',
    },
    {
      label: '翻页按钮位置',
      key: 'legendPageButtonPosition',
      path: 'legend.pageButtonPosition',
      schemaType: 'select',
      options: [
        { label: '开始', val: 'start' },
        { label: '结束', val: 'end' }
      ],
      description: '翻页按钮的位置',
    },
    {
      label: '页面格式化器',
      key: 'legendPageFormatter',
      path: 'legend.pageFormatter',
      schemaType: 'text',
      description: '页面格式化函数，支持 {current} 和 {total} 变量',
    },
    {
      label: '翻页图标颜色',
      key: 'legendPageIconColor',
      path: 'legend.pageIconColor',
      schemaType: 'color',
      description: '翻页按钮的颜色',
    },
    {
      label: '翻页图标禁用颜色',
      key: 'legendPageIconInactiveColor',
      path: 'legend.pageIconInactiveColor',
      schemaType: 'color',
      description: '翻页按钮不激活时（即翻页到头时）的颜色',
    },
    {
      label: '翻页图标大小',
      key: 'legendPageIconSize',
      path: 'legend.pageIconSize',
      schemaType: 'number',
      min: 8,
      max: 50,
      step: 1,
      description: '翻页按钮的大小',
    },
    {
      label: '翻页文字颜色',
      key: 'legendPageTextStyleColor',
      path: 'legend.pageTextStyle.color',
      schemaType: 'color',
      description: '翻页信息的文字样式',
    },
    {
      label: '翻页文字大小',
      key: 'legendPageTextStyleFontSize',
      path: 'legend.pageTextStyle.fontSize',
      schemaType: 'number',
      min: 8,
      max: 100,
      step: 1,
    },
    {
      label: '翻页文字粗细',
      key: 'legendPageTextStyleFontWeight',
      path: 'legend.pageTextStyle.fontWeight',
      schemaType: 'select',
      options: FONT_WEIGHT_OPTIONS,
    },
    {
      label: '翻页动画时长',
      key: 'legendAnimationDurationUpdate',
      path: 'legend.animationDurationUpdate',
      schemaType: 'number',
      min: 0,
      step: 100,
      description: '翻页时的动画时长',
    }
  ],
};

