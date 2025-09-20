import { BaseSelectOption } from '../interfaces';
import { datePickSelectionType } from '../types';
import { Is, RefreshIntervalUnitEnum } from '../enums';
import { SelectControlSize } from 'ngx-tethys/shared';

/**
 * 图表
 */
export const ENABLE_OPTIONS: BaseSelectOption<boolean>[] = [
  { label: '启用', val: true },
  { label: '禁用', val: false }
];

export const YES_OR_NO_OPTIONS: BaseSelectOption<boolean>[] = [
  { label: '是', val: true },
  { label: '否', val: false }
];

export const IS_OPTIONS: BaseSelectOption<Is>[] = [
  { label: '是', val: Is.yes },
  { label: '否', val: Is.no }
];

export const FONT_WEIGHT_OPTIONS: BaseSelectOption[] = [
  { label: '默认', val: 'normal' },
  { label: '加粗', val: 'bold' }
];

export const FONT_WEIGHT_CSS_OPTIONS: BaseSelectOption[] = [
  { label: '正常', val: 'normal' },
  { label: '加粗', val: 'bold' },
  { label: '细体', val: '300' },
  { label: '中等', val: '500' },
  { label: '粗体', val: '600' },
  { label: '特粗', val: '700' }
];

/**
 * 文本样式选项
 */

export const TEXT_FONT_WEIGHT_OPTIONS: BaseSelectOption[] = [
  { label: '细体', val: '100' },
  { label: '正常', val: '400' },
  { label: '加粗', val: '700' },
  { label: '特粗', val: '900' }
];

export const TEXT_FONT_STYLE_OPTIONS: BaseSelectOption[] = [
  { label: '正常', val: 'normal' },
  { label: '斜体', val: 'italic' },
  { label: '倾斜', val: 'oblique' }
];

export const TEXT_ALIGN_OPTIONS: BaseSelectOption[] = [
  { label: '左对齐', val: 'left' },
  { label: '居中', val: 'center' },
  { label: '右对齐', val: 'right' },
  { label: '两端对齐', val: 'justify' }
];

export const TEXT_DECORATIONS_OPTIONS: BaseSelectOption[] = [
  { label: '无', val: 'none' },
  { label: '下划线', val: 'underline' },
  { label: '上划线', val: 'overline' },
  { label: '删除线', val: 'line-through' }
];

export const TEXT_WHITE_SPACE_OPTIONS: BaseSelectOption[] = [
  { label: '正常', val: 'normal' },
  { label: '不换行', val: 'nowrap' },
  { label: '预格式', val: 'pre' },
  { label: '预格式换行', val: 'pre-wrap' },
  { label: '保留空格', val: 'pre-line' }
];

/**
 * 自定义组件
 */

export const DATE_PICKER_SELECTION_MODE_OPTIONS: BaseSelectOption<datePickSelectionType>[] = [
  {
    label: `日期单选`,
    val: `single`
  },
  {
    label: `日期区间`,
    val: `range`
  }
];

export const SIZE_OPTIONS: BaseSelectOption[] = [
  {
    label: `小号`,
    val: `small`
  },
  {
    label: `默认`,
    val: `normal`
  },
  {
    label: `大号`,
    val: `large`
  }
];

export const VIEW_OPTIONS = [
  { label: '日期', val: 'date' },
  { label: '月份', val: 'month' },
  { label: '年份', val: 'year' }
];

// 刷新
export const INTERVAL_UNIT_OPTIONS: BaseSelectOption<RefreshIntervalUnitEnum>[] = [
  { label: '秒', val: RefreshIntervalUnitEnum.seconds },
  { label: '分钟', val: RefreshIntervalUnitEnum.minutes },
  { label: '小时', val: RefreshIntervalUnitEnum.hours },
  { label: '天', val: RefreshIntervalUnitEnum.days }
];

// 通用 size
export const CONTROL_SIZE_OPTIONS: BaseSelectOption<SelectControlSize>[] = [
  { label: '极小', val: 'xs' },
  { label: '小', val: 'sm' },
  { label: '中', val: 'md' },
  { label: '默认', val: '' },
  { label: '大', val: 'lg' }
];
