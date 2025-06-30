import { mainTypes, rowGroupingDisplayType, rowGroupPanelShowTypes, SafeAny } from '../types';
import { AgChartOptions } from 'ag-charts-community';
import { ColDef } from 'ag-grid-community';
import { Is } from '../enums';
import { SideBarDef } from 'ag-grid-enterprise';

export interface ChartData {
	[key: string]: string | number;
}

export interface ComponentConfig<TConfigProps extends ComponentBaseProps = ComponentBaseProps, TSubType = string> {
	id: string;
	type: mainTypes;
	subType: TSubType;
	position: Position;
	size: Size;
	props: TConfigProps; // 特有配置参数
}

export interface ComponentBaseProps {
	styles: Record<string, SafeAny>;
	[key: string]: SafeAny;
}

// chart 配置
export interface ComponentChartProps extends ComponentBaseProps {
	chart: AgChartOptions;
}

// table 配置
export interface ComponentTableProps<TData = SafeAny> extends ComponentBaseProps {
	table: TableConfig<TData>;
}

// text 配置
export interface ComponentTextProps extends ComponentBaseProps {
	text: TextConfig
}

export interface TableConfig<TData = SafeAny> {
	rowDataUrl: string;
	columnDefs?: ColDef[];
	defaultColDef: ColDef;
	autoGroupColumnDef: ColDef;
	rowGroupPanelShow: rowGroupPanelShowTypes;
	groupDefaultExpanded: Is;
	showOpenedGroup: Is;
	groupDisplayType: rowGroupingDisplayType;
	sideBar: SideBarDef | string | string[] | boolean | null | undefined;
	rowData?: TData[];
}

export interface TextConfig {
	content: string;
	styles: Record<string, SafeAny>;
}

export interface Position {
	x: number;
	y: number;
}

export interface Size {
	width: number;
	height: number;
}
