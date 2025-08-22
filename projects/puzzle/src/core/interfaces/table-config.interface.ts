// table 配置
import { fieldComponentTypes, pivotingPanelShowTypes, rowGroupingDisplayType, rowGroupPanelShowTypes, SafeAny } from '../types';
// import { ColDef } from 'ag-grid-community';
import { Is } from '../enums';
// import { SideBarDef } from 'ag-grid-enterprise';
import { ComponentBaseProps } from './component-config.interface';
import { BaseSelectOption, EditorBaseField } from './editor.interface';

export interface ComponentTableProps<TData = SafeAny> extends ComponentBaseProps {
	table: TableConfig<TData>;
}

export interface TableConfig<TData = SafeAny> {
	rowDataUrl: string;
	columnDefs?: SafeAny[];
	defaultColDef: SafeAny;
	autoGroupColumnDef: SafeAny;
	rowGroupPanelShow: rowGroupPanelShowTypes;
	groupDefaultExpanded: Is;
	showOpenedGroup: Is;
	groupDisplayType: rowGroupingDisplayType;
	pivotMode: boolean;
	pivotPanelShow: pivotingPanelShowTypes;
	sideBar: SafeAny | string | string[] | boolean | null | undefined;
	rowData?: TData[];
	tableStyles: Record<string, SafeAny>;
}

// 表格组件字段
export interface EditorTableField<TData = any> extends EditorBaseField {
	headerSetting?: EditorTableHeader[];
	rowData?: TData[];
	children?: EditorTableField[];
	options?: BaseSelectOption[];
}

export interface EditorTableHeader {
	field: string;
	headerName: string;
	schemaType: fieldComponentTypes;
	clearable?: boolean;
	options?: BaseSelectOption[];
}
