import { EditorTab } from '../interfaces';
import { mainTypes } from '../types';

// 通用样式设置

export const BASE_TAB: EditorTab = { title: '外观', value: 'appearance', icon: 'table-column-equal-width' };

export const DATA_TAB: EditorTab = { title: '数据', value: 'advanced', icon: 'number' };

export const STYLE_TAB: EditorTab = { title: '样式', value: 'styles', icon: 'browser' };

export const REFRESH_TAB: EditorTab = { title: '自动化', value: 'refresh', icon: 'clock-circle-open' };

export const CONTROL_TAB: EditorTab = { title: '控件', value: 'control', icon: 'solution' };

export const EDITOR_TAB_MAP: Partial<Record<mainTypes, EditorTab[]>> = {
  chart: [BASE_TAB, DATA_TAB, REFRESH_TAB],
  table: [BASE_TAB, DATA_TAB, REFRESH_TAB],
  text: [BASE_TAB, STYLE_TAB],
  control: [BASE_TAB, CONTROL_TAB]
};
