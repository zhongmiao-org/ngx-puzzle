import { fieldComponentTypes, editorTabTypes, SafeAny } from '../types';
import { ChartAxesTypesEnum } from '../enums';
import { Observable } from 'rxjs';

export interface EditorBaseField<TEditorField extends EditorBaseField = SafeAny> {
  label: string;
  key: string;
  schemaType: fieldComponentTypes;
  defaultValue?: string | number | boolean | SafeAny[] | null;
  path?: string;
  description?: string;
  children?: EditorBaseField<TEditorField>[];
  className?: string[];
  options?: BaseSelectOption[];
  optionsStream?: Observable<BaseSelectOption[]>;
  // number
  step?: number;
  min?: number;
  max?: number;
  limit?: number;
  suffix?: string;
  placeholder?: string;

  skipConversion?: boolean;
  visibleWhen?: (values: any) => boolean; // 显隐条件

  [key: string]: SafeAny;
}

// 图表组件字段
export interface EditorChartField extends EditorBaseField {
  // itemSchema?: EditorChartArraySchema[]; // 用于数组项字段
  children?: EditorChartField[]; // 分组字段，用于 UI 分层展示
  hasAdd?: boolean;
  belong?: SafeAny[];
  disabled?: boolean;
  removeActive?: boolean;
}

// 图表组件数组项
export interface EditorChartArraySchema extends EditorBaseField {
  schemaType: fieldComponentTypes;
  options?: BaseSelectOption[];
}

// 子组件
export interface ControlEditorField extends EditorBaseField {
  styles?: Record<string, SafeAny>;
  children?: ControlEditorField[];
  options?: BaseSelectOption[];
}

export interface BaseSelectOption<TValue = SafeAny> {
  label: string;
  val: TValue;
  className?: string[];
  disabled?: boolean;
  notRender?: boolean;
  [key: string]: any;
}

export interface ChartAxesTypeOption extends BaseSelectOption {
  val: ChartAxesTypesEnum;
}

export interface EditorFormData {
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  styles: Record<string, SafeAny>;
}

export interface EditorTab {
  title: string;
  value: editorTabTypes;
  icon: string;
}
