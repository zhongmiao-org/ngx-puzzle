import { EditorChartField, ENABLE_OPTIONS, FONT_WEIGHT_OPTIONS } from 'ngx-puzzle/core';

// 标题设置 - 轻量化: 仅保留常用选项
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
      label: '副标题文本',
      key: 'titleSubtext',
      path: 'title.subtext',
      schemaType: 'text'
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
    // 主标题样式
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
    // 副标题样式
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
    }
  ]
};
