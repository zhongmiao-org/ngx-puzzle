import { EditorTableField } from '../interfaces';
import {
	ENABLE_OPTIONS,
	GROUP_DISPLAY_TYPE_OPTIONS,
	IS_OPTIONS,
	ROW_GROUP_PANEL_OPTIONS, TABLE_SIDE_BAR_OPTIONS,
	YES_OR_NO_OPTIONS,
} from '../constants/select-options.const';

// 表格列配置
export const TABLE_COLUMN_DEF: EditorTableField = {
	label: '表格列配置',
	key: 'columnDefs',
	path: 'columnDefs',
	schemaType: 'group',
	headerSetting: [
		{
			field: 'field',
			headerName: '映射字段',
			schemaType: 'text',
		},
		{
			field: 'headerName',
			headerName: '表头名称',
			schemaType: 'text',
		},
		{
			field: 'enableRowGroup',
			headerName: '拖拽分组',
			schemaType: 'select',
			options: ENABLE_OPTIONS,
		},
		{
			field: 'rowGroup',
			headerName: '启用分组',
			schemaType: 'select',
			options: ENABLE_OPTIONS,
		},
		{
			field: 'hide',
			headerName: '隐藏',
			schemaType: 'select',
			options: YES_OR_NO_OPTIONS,
		},
	],
	rowData: [],
};

// 默认列设置
export const TABLE_DEFAULT_COL_DEF: EditorTableField = {
	label: '通用列设置',
	key: 'defaultColDef',
	path: 'defaultColDef',
	schemaType: 'group',
	children: [
		{
			label: '栅格占位',
			key: 'flex',
			path: 'defaultColDef.flex',
			schemaType: 'number',
			min: 1,
			max: 100,
			step: 1,
		},
		{
			label: '最小宽度',
			key: 'minWidth',
			path: 'defaultColDef.minWidth',
			schemaType: 'number',
			min: 1,
			max: 9999,
			step: 1,
		},
		{
			label: '启用筛选器',
			key: 'filter',
			path: 'defaultColDef.filter',
			schemaType: 'select',
			options: ENABLE_OPTIONS,
		},
		{
			label: '启用浮动筛选器',
			key: 'floatingFilter',
			path: 'defaultColDef.floatingFilter',
			schemaType: 'select',
			options: ENABLE_OPTIONS,
		},
	],
};

// 面板配置
export const TABLE_PANEL_DEF: EditorTableField = {
	label: '面板配置',
	key: '',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '行面板展示',
			description: '只有当列分组后才会生效',
			key: 'rowGroupPanelShow',
			path: 'rowGroupPanelShow',
			schemaType: 'select',
			options: ROW_GROUP_PANEL_OPTIONS,
		},
		{
			label: '默认展开',
			key: 'groupDefaultExpanded',
			path: 'groupDefaultExpanded',
			schemaType: 'select',
			options: IS_OPTIONS,
		},
		{
			label: '显示父组值',
			key: 'showOpenedGroup',
			path: 'showOpenedGroup',
			schemaType: 'select',
			options: IS_OPTIONS,
		},
		{
			label: '分组样式',
			key: 'groupDisplayType',
			path: 'groupDisplayType',
			schemaType: 'select',
			options: GROUP_DISPLAY_TYPE_OPTIONS,
		},
	],
};

// 侧栏设置
export const TABLE_SIDE_BAR_DEF: EditorTableField = {
	label: '侧边栏设置',
	key: '',
	path: '',
	schemaType: 'group',
	children: [
		{
			label: '侧边栏',
			description: '选择【过滤器侧栏】时，请在【通用列设置】中启用【筛选器】',
			key: 'sideBar',
			path: 'sideBar',
			schemaType: 'select',
			options: TABLE_SIDE_BAR_OPTIONS,
		},
	]
}
