import { ComponentBaseProps } from 'ngx-puzzle/core';
import { SafeAny } from '../types';
import { ControlTypesEnum } from '../enums';

export interface ComponentControlProps extends ComponentBaseProps {
  control: ControlConfig;
}

export interface ControlConfig<TValue = SafeAny, TControlProps extends BaseControlProps = BaseControlProps> {
  controlId: string;

  controlType: ControlTypesEnum;
  /**别名**/
  alias: string;

  /** 控件属性配置 */
  props: TControlProps;

  /**标签设置**/
  label?: ControlLabelConfig;

  /** 数据绑定字段 */
  bindField?: string;

  /** 默认值 */
  defaultValue?: TValue;

  isActive: boolean;
}

export interface BaseControlProps {
  [key: string]: SafeAny;
  styles?: Record<string, SafeAny>;
}

export interface ControlLabelConfig {
  enable?: boolean;
  text?: string;
  description?: string;
  styles?: Record<string, SafeAny>;
}

export interface DatePickerControlProps extends BaseControlProps {
  selectionMode?: 'single' | 'range' | 'multiple';
  size?: 'small' | 'large';
  dateFormat?: string;
  showTime?: boolean;
  showSeconds?: boolean;
  placeholder?: string;
  showButtonBar?: boolean;
  minDate?: Date | string;
  maxDate?: Date | string;
}

export interface ControlFilterCondition {
  columnField?: string;
  type?: string;
  fiter?: any;
  from?: string | number;
  to?: string | number;
}
