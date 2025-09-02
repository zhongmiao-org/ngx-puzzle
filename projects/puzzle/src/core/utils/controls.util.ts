import { cloneDeep, isArray } from 'lodash';
import { ControlConfig, ControlFilterCondition, ControlTypesEnum, DatePickerControlProps, EditorBaseField, SafeAny } from '../../core';

/**
 * 格式化日期为 yyyy-MM-dd 格式
 * @param date Date对象
 * @returns 格式化后的日期字符串
 */
export function formatDateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function convertDateToString(value?: Date | Date[]) {
  if (!value) return null;

  if (isArray(value)) {
    return value.map((date) => {
      if (!date) return null;
      return formatDateToString(date);
    });
  }
  return formatDateToString(value);
}

export function convertStringToDate(value?: string | string[]): Date | Date[] | null {
  if (!value) return null;

  if (isArray(value)) {
    return value.map((dateStr) => new Date(dateStr));
  }

  return new Date(value);
}

/**
 * 更新字段配置中 children 的特定子字段
 * @param baseField 基础字段配置
 * @param childrenConfig 子字段配置更新对象，key为子字段的key，value为要更新的属性
 * @returns 更新后的字段配置
 */
export function updateFieldChildren(baseField: EditorBaseField, childrenConfig: Record<string, Partial<EditorBaseField>>): EditorBaseField {
  // 深度复制，避免修改原始配置
  const updatedField = cloneDeep(baseField);

  if (!updatedField.children || !Array.isArray(updatedField.children)) {
    return updatedField;
  }

  // 遍历子字段，根据 key 更新对应的配置
  updatedField.children = updatedField.children.map((child) => {
    const childKey = child.key;
    const childUpdates = childrenConfig[childKey];

    if (childUpdates) {
      return {
        ...child,
        ...childUpdates
      };
    }

    return child;
  });

  return updatedField;
}

/**
 * 便捷方法：专门用于更新 optionsStream
 */
export function updateFieldChildrenStream(baseField: EditorBaseField, streamConfig: Record<string, SafeAny>): EditorBaseField {
  const childrenConfig: Record<string, Partial<EditorBaseField>> = {};

  Object.keys(streamConfig).forEach((key) => {
    childrenConfig[key] = {
      optionsStream: streamConfig[key],
      // 清除 options，优先使用 optionsStream
      options: undefined
    };
  });

  return updateFieldChildren(baseField, childrenConfig);
}

/**
 * 检查控件的 defaultValue 是否为有效值
 * @param value 控件的 defaultValue
 * @returns 是否为有效值
 */
function isValidValue(value: SafeAny): boolean {
  // null 或 undefined - 无效
  if (value === null || value === undefined) {
    return false;
  }

  // 空字符串 - 无效
  if (value === '') {
    return false;
  }

  // 空数组 - 无效
  return !(Array.isArray(value) && value.length === 0);
}

/**
 * 过滤出有效的控件配置
 * @param controls 控件配置数组
 * @returns 有效的控件配置数组
 */
function filterValidControls(controls: ControlConfig[]): ControlConfig[] {
  return controls.filter((control) => {
    return control.isActive && control.bindField && isValidValue(control.defaultValue);
  });
}

/**
 * 检查是否为日期选择器控件
 * @param control 控件配置
 * @returns 是否为日期选择器控件
 */
function isDatePickerControl(control: ControlConfig): boolean {
  return control.controlType === ControlTypesEnum.datePick || (control.props && 'selectionMode' in control.props);
}

/**
 * 处理日期选择器控件的过滤条件
 * @param control 控件配置
 * @param baseFilter 基础过滤条件
 * @returns 日期过滤条件或null
 */
function createDatePickerFilter(control: ControlConfig, baseFilter: ControlFilterCondition): ControlFilterCondition | null {
  const dateProps = control.props as DatePickerControlProps;
  const value = control.defaultValue;

  // 区间选择模式
  if (dateProps.selectionMode === 'range' && Array.isArray(value) && value.length === 2) {
    const [startDate, endDate] = convertDateToString(value as Date[])!;
    return {
      ...baseFilter,
      type: 'inRange',
      from: startDate!,
      to: endDate!
    };
  }

  // 单选模式
  if (dateProps.selectionMode === 'single') {
    return {
      ...baseFilter,
      type: 'equals',
      fiter: convertDateToString(value as Date)!
    };
  }

  return null;
}

/**
 * 处理多选控件的过滤条件
 * @param control 控件配置
 * @param baseFilter 基础过滤条件
 * @returns 多选过滤条件
 */
function createMultiSelectFilter(control: ControlConfig, baseFilter: ControlFilterCondition): ControlFilterCondition {
  return {
    ...baseFilter,
    type: 'in',
    fiter: control.defaultValue
  };
}

/**
 * 处理单选控件的过滤条件
 * @param control 控件配置
 * @param baseFilter 基础过滤条件
 * @returns 单选过滤条件
 */
function createSelectFilter(control: ControlConfig, baseFilter: ControlFilterCondition): ControlFilterCondition {
  return {
    ...baseFilter,
    type: 'equals',
    fiter: control.defaultValue
  };
}

/**ss
 * 处理文本类控件的过滤条件
 * @param control 控件配置
 * @param baseFilter 基础过滤条件
 * @returns 文本过滤条件
 */
function createTextFilter(control: ControlConfig, baseFilter: ControlFilterCondition): ControlFilterCondition {
  return {
    ...baseFilter,
    type: 'contains',
    fiter: control.defaultValue
  };
}

/**
 * 根据控件类型创建相应的过滤条件
 * @param control 控件配置
 * @param baseFilter 基础过滤条件
 * @returns 过滤条件
 */
function createControlFilter(control: ControlConfig, baseFilter: ControlFilterCondition): ControlFilterCondition | null {
  // 日期选择器控件
  if (isDatePickerControl(control)) {
    return createDatePickerFilter(control, baseFilter);
  }

  // 多选控件
  if (control.controlType === ControlTypesEnum.multiSelect) {
    return createMultiSelectFilter(control, baseFilter);
  }

  // 单选控件
  if (control.controlType === ControlTypesEnum.select) {
    return createSelectFilter(control, baseFilter);
  }

  // 文本及其他类型控件
  return createTextFilter(control, baseFilter);
}

/**
 * 将控件配置数组转换为过滤条件对象
 * @param controls 控件配置数组
 * @returns 过滤条件对象 {[controlId: string]: ControlFilterCondition}
 */
export function convertControlsToFilters(controls: ControlConfig[]): { [controlId: string]: ControlFilterCondition } {
  const filterMap: { [controlId: string]: ControlFilterCondition } = {};
  const validControls = filterValidControls(controls);

  validControls.forEach((control) => {
    const baseFilter: ControlFilterCondition = {
      columnField: control.bindField
    };

    const controlFilter = createControlFilter(control, baseFilter);
    if (controlFilter) {
      filterMap[control.controlId] = controlFilter;
    }
  });

  return filterMap;
}
