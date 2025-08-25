import { EditorChartField, ENABLE_OPTIONS } from 'ngx-puzzle/core';

export const CHART_GRID: EditorChartField = {
  label: '网格设置',
  key: 'grid',
  schemaType: 'group',
  children: [
    {
      label: '显示网格',
      key: 'gridShow',
      path: 'grid.show',
      schemaType: 'select',
      options: ENABLE_OPTIONS,
      description: '是否显示直角坐标系网格',
    },
    {
      label: '网格层级',
      key: 'gridZlevel',
      path: 'grid.zlevel',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '所有图形的 zlevel 值，用于 Canvas 分层',
    },
    {
      label: '网格层次',
      key: 'gridZ',
      path: 'grid.z',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '组件的所有图形的z值，控制图形的前后顺序',
    },
    // 位置和尺寸设置
    {
      label: '左侧距离',
      key: 'gridLeft',
      path: 'grid.left',
      schemaType: 'text',
      description: '组件离容器左侧的距离，支持像素值、百分比或 left/center/right',
    },
    {
      label: '顶部距离',
      key: 'gridTop',
      path: 'grid.top',
      schemaType: 'text',
      description: '组件离容器上侧的距离，支持像素值、百分比或 top/middle/bottom',
    },
    {
      label: '右侧距离',
      key: 'gridRight',
      path: 'grid.right',
      schemaType: 'text',
      description: '组件离容器右侧的距离，支持像素值、百分比',
    },
    {
      label: '底部距离',
      key: 'gridBottom',
      path: 'grid.bottom',
      schemaType: 'text',
      description: '组件离容器下侧的距离，支持像素值、百分比',
    },
    {
      label: '网格宽度',
      key: 'gridWidth',
      path: 'grid.width',
      schemaType: 'text',
      description: '直角坐标系组件的宽度，支持像素值、百分比或 auto',
    },
    {
      label: '网格高度',
      key: 'gridHeight',
      path: 'grid.height',
      schemaType: 'text',
      description: '直角坐标系组件的高度，支持像素值、百分比或 auto',
    },
    // 布局控制（已弃用，但保留向后兼容）
    {
      label: '包含标签',
      key: 'gridContainLabel',
      path: 'grid.containLabel',
      schemaType: 'select',
      options: ENABLE_OPTIONS,
      description: '【已弃用】grid 区域是否包含坐标轴的刻度标签',
    },
    // 外边界模式（v6.0.0+）
    {
      label: '外边界模式',
      key: 'gridOuterBoundsMode',
      path: 'grid.outerBoundsMode',
      schemaType: 'select',
      options: [
        { label: '自动', val: 'auto' },
        { label: '相同', val: 'same' },
        { label: '无限制', val: 'none' }
      ],
      description: '外边界的确定策略',
    },
    {
      label: '外边界包含内容',
      key: 'gridOuterBoundsContain',
      path: 'grid.outerBoundsContain',
      schemaType: 'select',
      options: [
        { label: '自动', val: 'auto' },
        { label: '全部', val: 'all' },
        { label: '仅轴标签', val: 'axisLabel' }
      ],
      description: '外边界限制的内容范围',
    },
    {
      label: '外边界最小宽度',
      key: 'gridOuterBoundsClampWidth',
      path: 'grid.outerBoundsClampWidth',
      schemaType: 'text',
      description: '外边界收缩时的最小宽度限制，支持像素值或百分比',
    },
    {
      label: '外边界最小高度',
      key: 'gridOuterBoundsClampHeight',
      path: 'grid.outerBoundsClampHeight',
      schemaType: 'text',
      description: '外边界收缩时的最小高度限制，支持像素值或百分比',
    },
    // 外边界位置设置
    {
      label: '外边界左侧距离',
      key: 'gridOuterBoundsLeft',
      path: 'grid.outerBounds.left',
      schemaType: 'text',
      description: '外边界离容器左侧的距离',
    },
    {
      label: '外边界顶部距离',
      key: 'gridOuterBoundsTop',
      path: 'grid.outerBounds.top',
      schemaType: 'text',
      description: '外边界离容器上侧的距离',
    },
    {
      label: '外边界右侧距离',
      key: 'gridOuterBoundsRight',
      path: 'grid.outerBounds.right',
      schemaType: 'text',
      description: '外边界离容器右侧的距离',
    },
    {
      label: '外边界底部距离',
      key: 'gridOuterBoundsBottom',
      path: 'grid.outerBounds.bottom',
      schemaType: 'text',
      description: '外边界离容器下侧的距离',
    },
    {
      label: '外边界宽度',
      key: 'gridOuterBoundsWidth',
      path: 'grid.outerBounds.width',
      schemaType: 'text',
      description: '外边界的宽度',
    },
    {
      label: '外边界高度',
      key: 'gridOuterBoundsHeight',
      path: 'grid.outerBounds.height',
      schemaType: 'text',
      description: '外边界的高度',
    },
    // 外观样式
    {
      label: '背景颜色',
      key: 'gridBackgroundColor',
      path: 'grid.backgroundColor',
      schemaType: 'color',
      description: '直角坐标系背景色',
    },
    {
      label: '边框颜色',
      key: 'gridBorderColor',
      path: 'grid.borderColor',
      schemaType: 'color',
      description: '直角坐标系的边框颜色',
    },
    {
      label: '边框宽度',
      key: 'gridBorderWidth',
      path: 'grid.borderWidth',
      schemaType: 'number',
      min: 0,
      step: 0.5,
      description: '直角坐标系的边框线宽',
    },
    // 阴影效果
    {
      label: '阴影模糊大小',
      key: 'gridShadowBlur',
      path: 'grid.shadowBlur',
      schemaType: 'number',
      min: 0,
      step: 1,
      description: '图形阴影的模糊大小',
    },
    {
      label: '阴影颜色',
      key: 'gridShadowColor',
      path: 'grid.shadowColor',
      schemaType: 'color',
      description: '阴影颜色',
    },
    {
      label: '阴影水平偏移',
      key: 'gridShadowOffsetX',
      path: 'grid.shadowOffsetX',
      schemaType: 'number',
      step: 1,
      description: '阴影水平方向上的偏移距离',
    },
    {
      label: '阴影垂直偏移',
      key: 'gridShadowOffsetY',
      path: 'grid.shadowOffsetY',
      schemaType: 'number',
      step: 1,
      description: '阴影垂直方向上的偏移距离',
    },
    // 坐标系设置
    {
      label: '坐标系',
      key: 'gridCoordinateSystem',
      path: 'grid.coordinateSystem',
      schemaType: 'select',
      options: [
        { label: '无', val: 'none' },
        { label: '日历坐标系', val: 'calendar' },
        { label: '矩阵坐标系', val: 'matrix' }
      ],
      description: '指定另一个坐标系组件，本 grid 布局在那个坐标系中',
    }
  ],
};
