import { EditorChartField, ENABLE_OPTIONS, FONT_WEIGHT_OPTIONS } from 'ngx-puzzle/core';

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
      label: '显示内容',
      key: 'tooltipShowContent',
      path: 'tooltip.showContent',
      schemaType: 'select',
      options: ENABLE_OPTIONS,
      description: '是否显示提示框浮层'
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
      label: '触发条件',
      key: 'tooltipTriggerOn',
      path: 'tooltip.triggerOn',
      schemaType: 'select',
      options: [
        { label: '鼠标移动时触发', val: 'mousemove' },
        { label: '鼠标点击时触发', val: 'click' },
        { label: '同时支持点击和移动', val: 'mousemove|click' },
        { label: '不触发', val: 'none' }
      ]
    },
    {
      label: '渲染模式',
      key: 'tooltipRenderMode',
      path: 'tooltip.renderMode',
      schemaType: 'select',
      options: [
        { label: '自动', val: 'auto' },
        { label: 'HTML', val: 'html' },
        { label: '富文本', val: 'richText' }
      ],
      description: '提示框的渲染模式'
    },
    {
      label: '始终显示',
      key: 'tooltipAlwaysShowContent',
      path: 'tooltip.alwaysShowContent',
      schemaType: 'select',
      options: ENABLE_OPTIONS,
      description: '是否不自动隐藏提示框内容'
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
    {
      label: '位置',
      key: 'tooltipPosition',
      path: 'tooltip.position',
      schemaType: 'select',
      options: [
        { label: '自动', val: 'auto' },
        { label: '内部', val: 'inside' },
        { label: '顶部', val: 'top' },
        { label: '左侧', val: 'left' },
        { label: '右侧', val: 'right' },
        { label: '底部', val: 'bottom' }
      ],
      description: '提示框浮层的位置'
    },
    {
      label: '限制在图表区域内',
      key: 'tooltipConfine',
      path: 'tooltip.confine',
      schemaType: 'select',
      options: ENABLE_OPTIONS,
      description: '是否将 tooltip 框限制在图表的区域内'
    },
    {
      label: '水平对齐',
      key: 'tooltipAlign',
      path: 'tooltip.align',
      schemaType: 'select',
      options: [
        { label: '左对齐', val: 'left' },
        { label: '居中', val: 'center' },
        { label: '右对齐', val: 'right' }
      ]
    },
    {
      label: '垂直对齐',
      key: 'tooltipVerticalAlign',
      path: 'tooltip.verticalAlign',
      schemaType: 'select',
      options: [
        { label: '顶部', val: 'top' },
        { label: '中间', val: 'middle' },
        { label: '底部', val: 'bottom' }
      ]
    },
    {
      label: '显示延迟',
      key: 'tooltipShowDelay',
      path: 'tooltip.showDelay',
      schemaType: 'number',
      min: 0,
      step: 10,
      description: '浮层显示的延迟，单位为 ms'
    },
    {
      label: '隐藏延迟',
      key: 'tooltipHideDelay',
      path: 'tooltip.hideDelay',
      schemaType: 'number',
      min: 0,
      step: 10,
      description: '浮层隐藏的延迟，单位为 ms'
    },
    {
      label: '过渡动画时长',
      key: 'tooltipTransitionDuration',
      path: 'tooltip.transitionDuration',
      schemaType: 'number',
      min: 0,
      step: 10,
      description: '提示框浮层的移动动画过渡时间，单位是 ms'
    },
    {
      label: '鼠标可进入',
      key: 'tooltipEnterable',
      path: 'tooltip.enterable',
      schemaType: 'select',
      options: ENABLE_OPTIONS,
      description: '鼠标是否可进入提示框浮层中'
    },
    {
      label: '显示过渡动画',
      key: 'tooltipDisplayTransition',
      path: 'tooltip.displayTransition',
      schemaType: 'select',
      options: ENABLE_OPTIONS,
      description: '是否开启显示/隐藏的过渡动画'
    },
    {
      label: '自定义类名',
      key: 'tooltipClassName',
      path: 'tooltip.className',
      schemaType: 'text',
      description: '指定 tooltip 的 DOM 类名（仅在 HTML 模式下有效）'
    },
    {
      label: '默认边框颜色',
      key: 'tooltipDefaultBorderColor',
      path: 'tooltip.defaultBorderColor',
      schemaType: 'color',
      description: '多系列时的默认边框颜色'
    },
    {
      label: '排序方式',
      key: 'tooltipOrder',
      path: 'tooltip.order',
      schemaType: 'select',
      options: [
        { label: '系列声明顺序', val: 'seriesAsc' },
        { label: '系列声明倒序', val: 'seriesDesc' },
        { label: '数值升序', val: 'valueAsc' },
        { label: '数值降序', val: 'valueDesc' }
      ],
      description: '多系列提示框浮层中数据的排序方式'
    },
    // 外观样式
    {
      label: '背景颜色',
      key: 'tooltipBackgroundColor',
      path: 'tooltip.backgroundColor',
      schemaType: 'color'
    },
    {
      label: '边框颜色',
      key: 'tooltipBorderColor',
      path: 'tooltip.borderColor',
      schemaType: 'color'
    },
    {
      label: '边框圆角',
      key: 'tooltipBorderRadius',
      path: 'tooltip.borderRadius',
      schemaType: 'number',
      min: 0,
      step: 1
    },
    {
      label: '边框宽度',
      key: 'tooltipBorderWidth',
      path: 'tooltip.borderWidth',
      schemaType: 'number',
      min: 0,
      step: 0.5
    },
    {
      label: '内边距',
      key: 'tooltipPadding',
      path: 'tooltip.padding',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '提示框浮层内边距，支持数组 [上, 右, 下, 左]'
    },
    // 阴影效果
    {
      label: '阴影模糊大小',
      key: 'tooltipShadowBlur',
      path: 'tooltip.shadowBlur',
      schemaType: 'number',
      min: 0,
      step: 1
    },
    {
      label: '阴影颜色',
      key: 'tooltipShadowColor',
      path: 'tooltip.shadowColor',
      schemaType: 'color'
    },
    {
      label: '阴影水平偏移',
      key: 'tooltipShadowOffsetX',
      path: 'tooltip.shadowOffsetX',
      schemaType: 'number',
      step: 1
    },
    {
      label: '阴影垂直偏移',
      key: 'tooltipShadowOffsetY',
      path: 'tooltip.shadowOffsetY',
      schemaType: 'number',
      step: 1
    },
    {
      label: '额外CSS样式',
      key: 'tooltipExtraCssText',
      path: 'tooltip.extraCssText',
      schemaType: 'text',
      description: '额外附加到浮层的 css 样式（仅在 HTML 模式下有效）'
    },
    // 文字样式
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
    {
      label: '文字样式',
      key: 'tooltipTextStyleFontStyle',
      path: 'tooltip.textStyle.fontStyle',
      schemaType: 'select',
      options: [
        { label: '正常', val: 'normal' },
        { label: '斜体', val: 'italic' },
        { label: '倾斜', val: 'oblique' }
      ]
    },
    {
      label: '字体系列',
      key: 'tooltipTextStyleFontFamily',
      path: 'tooltip.textStyle.fontFamily',
      schemaType: 'text'
    },
    {
      label: '行高',
      key: 'tooltipTextStyleLineHeight',
      path: 'tooltip.textStyle.lineHeight',
      schemaType: 'number',
      min: 0,
      step: 0.1
    },
    {
      label: '文字装饰',
      key: 'tooltipTextStyleDecoration',
      path: 'tooltip.textStyle.decoration',
      schemaType: 'select',
      options: [
        { label: '无', val: 'none' },
        { label: '下划线', val: 'underline' },
        { label: '上划线', val: 'overline' },
        { label: '删除线', val: 'line-through' }
      ]
    },
    {
      label: '文字描边颜色',
      key: 'tooltipTextStyleTextBorderColor',
      path: 'tooltip.textStyle.textBorderColor',
      schemaType: 'color'
    },
    {
      label: '文字描边宽度',
      key: 'tooltipTextStyleTextBorderWidth',
      path: 'tooltip.textStyle.textBorderWidth',
      schemaType: 'number',
      min: 0,
      step: 0.5
    },
    {
      label: '文字阴影颜色',
      key: 'tooltipTextStyleTextShadowColor',
      path: 'tooltip.textStyle.textShadowColor',
      schemaType: 'color'
    },
    {
      label: '文字阴影模糊',
      key: 'tooltipTextStyleTextShadowBlur',
      path: 'tooltip.textStyle.textShadowBlur',
      schemaType: 'number',
      min: 0,
      step: 1
    },
    {
      label: '文字阴影偏移X',
      key: 'tooltipTextStyleTextShadowOffsetX',
      path: 'tooltip.textStyle.textShadowOffsetX',
      schemaType: 'number',
      step: 1
    },
    {
      label: '文字阴影偏移Y',
      key: 'tooltipTextStyleTextShadowOffsetY',
      path: 'tooltip.textStyle.textShadowOffsetY',
      schemaType: 'number',
      step: 1
    },
    // 轴指示器设置
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
      ],
      description: '指示器类型'
    },
    {
      label: '指示器坐标轴',
      key: 'tooltipAxisPointerAxis',
      path: 'tooltip.axisPointer.axis',
      schemaType: 'select',
      options: [
        { label: '自动', val: 'auto' },
        { label: 'X轴', val: 'x' },
        { label: 'Y轴', val: 'y' },
        { label: '角度轴', val: 'angle' },
        { label: '半径轴', val: 'radius' }
      ],
      description: '指示器的坐标轴'
    },
    {
      label: '指示器线条颜色',
      key: 'tooltipAxisPointerLineStyleColor',
      path: 'tooltip.axisPointer.lineStyle.color',
      schemaType: 'color',
      description: 'axisPointer 线的颜色'
    },
    {
      label: '指示器线条宽度',
      key: 'tooltipAxisPointerLineStyleWidth',
      path: 'tooltip.axisPointer.lineStyle.width',
      schemaType: 'number',
      min: 0,
      step: 0.5,
      description: 'axisPointer 线的宽度'
    },
    {
      label: '指示器线条类型',
      key: 'tooltipAxisPointerLineStyleType',
      path: 'tooltip.axisPointer.lineStyle.type',
      schemaType: 'select',
      options: [
        { label: '实线', val: 'solid' },
        { label: '虚线', val: 'dashed' },
        { label: '点线', val: 'dotted' }
      ],
      description: 'axisPointer 线的类型'
    },
    {
      label: '十字准星标签背景色',
      key: 'tooltipAxisPointerCrossStyleTextStyleBackgroundColor',
      path: 'tooltip.axisPointer.crossStyle.textStyle.backgroundColor',
      schemaType: 'color',
      description: '十字准星标签的背景色'
    }
  ]
};
