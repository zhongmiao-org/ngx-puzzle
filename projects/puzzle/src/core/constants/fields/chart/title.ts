import { EditorChartField, ENABLE_OPTIONS, FONT_WEIGHT_OPTIONS } from 'ngx-puzzle/core';

// 标题设置 - 基于 ECharts v6 TitleOption 接口改造
export const CHART_TITLE: EditorChartField = {
  label: '标题设置',
  key: 'title',
  schemaType: 'group',
  children: [
    {
      label: '显示标题',
      key: 'titleShow',
      path: 'title.show',
      schemaType: 'select',
      options: ENABLE_OPTIONS
    },
    {
      label: '主标题文本',
      key: 'titleText',
      path: 'title.text',
      schemaType: 'text'
    },
    {
      label: '主标题链接',
      key: 'titleLink',
      path: 'title.link',
      schemaType: 'text',
      description: '点击标题跳转的链接地址'
    },
    {
      label: '链接打开方式',
      key: 'titleTarget',
      path: 'title.target',
      schemaType: 'select',
      options: [
        { label: '当前窗口', val: 'self' },
        { label: '新窗口', val: 'blank' }
      ]
    },
    {
      label: '副标题文本',
      key: 'titleSubtext',
      path: 'title.subtext',
      schemaType: 'text'
    },
    {
      label: '副标题链接',
      key: 'titleSublink',
      path: 'title.sublink',
      schemaType: 'text',
      description: '点击副标题跳转的链接地址'
    },
    {
      label: '副标题链接打开方式',
      key: 'titleSubtarget',
      path: 'title.subtarget',
      schemaType: 'select',
      options: [
        { label: '当前窗口', val: 'self' },
        { label: '新窗口', val: 'blank' }
      ]
    },
    {
      label: '水平对齐',
      key: 'titleTextAlign',
      path: 'title.textAlign',
      schemaType: 'select',
      options: [
        { label: '自动', val: 'auto' },
        { label: '左对齐', val: 'left' },
        { label: '居中', val: 'center' },
        { label: '右对齐', val: 'right' }
      ]
    },
    {
      label: '垂直对齐',
      key: 'titleTextVerticalAlign',
      path: 'title.textVerticalAlign',
      schemaType: 'select',
      options: [
        { label: '自动', val: 'auto' },
        { label: '顶部', val: 'top' },
        { label: '中间', val: 'middle' },
        { label: '底部', val: 'bottom' }
      ]
    },
    {
      label: '背景颜色',
      key: 'titleBackgroundColor',
      path: 'title.backgroundColor',
      schemaType: 'color'
    },
    {
      label: '内边距',
      key: 'titlePadding',
      path: 'title.padding',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '标题内边距，也可设置为数组 [上, 右, 下, 左]'
    },
    {
      label: '主副标题间距',
      key: 'titleItemGap',
      path: 'title.itemGap',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '主标题和副标题之间的间距'
    },
    {
      label: '边框圆角',
      key: 'titleBorderRadius',
      path: 'title.borderRadius',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '背景边框的圆角半径'
    },
    {
      label: '触发事件',
      key: 'titleTriggerEvent',
      path: 'title.triggerEvent',
      schemaType: 'select',
      options: ENABLE_OPTIONS,
      description: '是否触发鼠标或触摸事件'
    },
    // 主标题样式设置
    {
      label: '主标题字体颜色',
      key: 'titleTextStyleColor',
      path: 'title.textStyle.color',
      schemaType: 'color'
    },
    {
      label: '主标题字体大小',
      key: 'titleTextStyleFontSize',
      path: 'title.textStyle.fontSize',
      schemaType: 'number',
      min: 8,
      max: 100,
      step: 1
    },
    {
      label: '主标题字体粗细',
      key: 'titleTextStyleFontWeight',
      path: 'title.textStyle.fontWeight',
      schemaType: 'select',
      options: FONT_WEIGHT_OPTIONS
    },
    {
      label: '主标题字体系列',
      key: 'titleTextStyleFontFamily',
      path: 'title.textStyle.fontFamily',
      schemaType: 'text',
      description: '字体系列，如 "Microsoft YaHei", Arial, sans-serif'
    },
    {
      label: '主标题行高',
      key: 'titleTextStyleLineHeight',
      path: 'title.textStyle.lineHeight',
      schemaType: 'number',
      min: 0,
      step: 0.1
    },
    {
      label: '主标题描边颜色',
      key: 'titleTextStyleTextBorderColor',
      path: 'title.textStyle.textBorderColor',
      schemaType: 'color'
    },
    {
      label: '主标题描边宽度',
      key: 'titleTextStyleTextBorderWidth',
      path: 'title.textStyle.textBorderWidth',
      schemaType: 'number',
      min: 0,
      step: 0.5
    },
    {
      label: '主标题阴影颜色',
      key: 'titleTextStyleTextShadowColor',
      path: 'title.textStyle.textShadowColor',
      schemaType: 'color'
    },
    {
      label: '主标题阴影模糊',
      key: 'titleTextStyleTextShadowBlur',
      path: 'title.textStyle.textShadowBlur',
      schemaType: 'number',
      min: 0,
      step: 1
    },
    {
      label: '主标题阴影偏移X',
      key: 'titleTextStyleTextShadowOffsetX',
      path: 'title.textStyle.textShadowOffsetX',
      schemaType: 'number',
      step: 1
    },
    {
      label: '主标题阴影偏移Y',
      key: 'titleTextStyleTextShadowOffsetY',
      path: 'title.textStyle.textShadowOffsetY',
      schemaType: 'number',
      step: 1
    },
    // 副标题样式设置
    {
      label: '副标题字体颜色',
      key: 'titleSubtextStyleColor',
      path: 'title.subtextStyle.color',
      schemaType: 'color'
    },
    {
      label: '副标题字体大小',
      key: 'titleSubtextStyleFontSize',
      path: 'title.subtextStyle.fontSize',
      schemaType: 'number',
      min: 8,
      max: 100,
      step: 1
    },
    {
      label: '副标题字体粗细',
      key: 'titleSubtextStyleFontWeight',
      path: 'title.subtextStyle.fontWeight',
      schemaType: 'select',
      options: FONT_WEIGHT_OPTIONS
    },
    {
      label: '副标题字体系列',
      key: 'titleSubtextStyleFontFamily',
      path: 'title.subtextStyle.fontFamily',
      schemaType: 'text',
      description: '字体系列，如 "Microsoft YaHei", Arial, sans-serif'
    },
    {
      label: '副标题行高',
      key: 'titleSubtextStyleLineHeight',
      path: 'title.subtextStyle.lineHeight',
      schemaType: 'number',
      min: 0,
      step: 0.1
    },
    {
      label: '副标题描边颜色',
      key: 'titleSubtextStyleTextBorderColor',
      path: 'title.subtextStyle.textBorderColor',
      schemaType: 'color'
    },
    {
      label: '副标题描边宽度',
      key: 'titleSubtextStyleTextBorderWidth',
      path: 'title.subtextStyle.textBorderWidth',
      schemaType: 'number',
      min: 0,
      step: 0.5
    },
    {
      label: '副标题阴影颜色',
      key: 'titleSubtextStyleTextShadowColor',
      path: 'title.subtextStyle.textShadowColor',
      schemaType: 'color'
    },
    {
      label: '副标题阴影模糊',
      key: 'titleSubtextStyleTextShadowBlur',
      path: 'title.subtextStyle.textShadowBlur',
      schemaType: 'number',
      min: 0,
      step: 1
    },
    {
      label: '副标题阴影偏移X',
      key: 'titleSubtextStyleTextShadowOffsetX',
      path: 'title.subtextStyle.textShadowOffsetX',
      schemaType: 'number',
      step: 1
    },
    {
      label: '副标题阴影偏移Y',
      key: 'titleSubtextStyleTextShadowOffsetY',
      path: 'title.subtextStyle.textShadowOffsetY',
      schemaType: 'number',
      step: 1
    }
  ]
};
