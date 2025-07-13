import { basicTypes, fieldComponentTypes, editorTabTypes, SafeAny } from '../types';
import { ChartAxesTypesEnum } from '../enums';

export interface EditorBaseField<TField extends EditorBaseField = SafeAny> {
	label: string;
	key: string;
	schemaType: fieldComponentTypes;
	path?: string;
	description?: string;
  fields?: TField[];
  options?: BaseSelectOption[];
	// number
	step?: number;
	min?: number;
	max?: number;
	limit?: number;
	suffix?: string;
}

export interface EditorFields extends EditorBaseField {
	key: basicTypes;
}

// 图表组件字段
export interface EditorChartField extends EditorBaseField<EditorChartArraySchema> {
	hasAdd?: boolean;
	removeActive?: boolean;
}

// 图表组件数组项
export interface EditorChartArraySchema extends EditorBaseField {
	disabled?: boolean;
	belong?: ChartAxesTypesEnum[];
}

// 表格组件字段
export interface EditorTableField<TData = any> extends EditorBaseField<EditorTableField> {
	headerSetting?: EditorTableHeader[];
	rowData?: TData[];
	options?: BaseSelectOption[];
}

// 文本样式
export interface EditorTextField extends EditorBaseField<EditorTextField> {
}

export interface EditorTableHeader {
	field: string;
	headerName: string;
	schemaType: fieldComponentTypes;
	options?: BaseSelectOption[];
}

// 其他样式字段
export interface EditorStyleField extends EditorBaseField {
	key: string;
	options?: EditorImageOption[];
}

export interface BaseSelectOption<TValue = SafeAny> {
	label: string;
	val: TValue;
	disabled?: boolean;
	[key: string]: any;
}

export interface ChartAxesTypeOption extends BaseSelectOption {
	val: ChartAxesTypesEnum;
}

export interface EditorImageOption extends BaseSelectOption {
	// href: string;
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

export interface EditorChartData {
	[key: string]: string | number;
}
