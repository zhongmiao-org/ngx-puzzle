import { EditorChartField } from '../../../interfaces';
import { ENABLE_OPTIONS } from '../../select-options.const';

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
      options: ENABLE_OPTIONS
    },
    // 位置与尺寸（常用）
    {
      label: '左侧距离',
      key: 'gridLeft',
      path: 'grid.left',
      schemaType: 'text'
    },
    {
      label: '顶部距离',
      key: 'gridTop',
      path: 'grid.top',
      schemaType: 'text'
    },
    {
      label: '右侧距离',
      key: 'gridRight',
      path: 'grid.right',
      schemaType: 'text'
    },
    {
      label: '底部距离',
      key: 'gridBottom',
      path: 'grid.bottom',
      schemaType: 'text'
    },
    {
      label: '网格宽度',
      key: 'gridWidth',
      path: 'grid.width',
      schemaType: 'text'
    },
    {
      label: '网格高度',
      key: 'gridHeight',
      path: 'grid.height',
      schemaType: 'text'
    },
    {
      label: '包含标签',
      key: 'gridContainLabel',
      path: 'grid.containLabel',
      schemaType: 'select',
      options: ENABLE_OPTIONS
    },
    // 外观样式（基础）
    {
      label: '背景颜色',
      key: 'gridBackgroundColor',
      path: 'grid.backgroundColor',
      schemaType: 'color'
    },
    {
      label: '边框颜色',
      key: 'gridBorderColor',
      path: 'grid.borderColor',
      schemaType: 'color'
    },
    {
      label: '边框宽度',
      key: 'gridBorderWidth',
      path: 'grid.borderWidth',
      schemaType: 'number',
      min: 0,
      step: 0.5
    }
  ]
};
