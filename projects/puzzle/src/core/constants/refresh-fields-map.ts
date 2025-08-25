import { EditorBaseField } from '../interfaces';
import { ENABLE_OPTIONS, INTERVAL_UNIT_OPTIONS } from './select-options.const';


export const REFRESH_FIELDS: EditorBaseField = {
	label: '定时刷新设置',
	key: 'refreshConfig',
	path: 'refreshConfig',
	schemaType: 'group',
	children: [
		{
			label: '启用定时刷新',
			key: 'enabled',
			path: 'enabled',
			schemaType: 'select',
			options: ENABLE_OPTIONS,
			defaultValue: false,
		},
		{
			label: '刷新间隔',
			key: 'interval',
			path: 'interval',
			schemaType: 'number',
			min: 1,
			max: 9999,
			step: 1,
			defaultValue: 30,
		},
		{
			label: '时间单位',
			key: 'intervalUnit',
			path: 'intervalUnit',
			schemaType: 'select',
			defaultValue: 'minutes',
			options: INTERVAL_UNIT_OPTIONS,
		},
		{
			label: '最大刷新次数',
			key: 'maxRefreshCount',
			path: 'maxRefreshCount',
			schemaType: 'number',
			min: 1,
			max: 10000,
			step: 1,
			description: '达到此次数后停止自动刷新，留空则无限制',
		},
	],
}

export const CONTROL_BIND_FIELDS: EditorBaseField = {
	label: '控件绑定',
	key: 'refreshConfig',
	path: 'refreshConfig',
	schemaType: 'group',
	children: [
		{
			label: '绑定控件',
			key: 'controlIds',
			path: 'controlIds',
			schemaType: 'multiSelect',
			options: ENABLE_OPTIONS,
			defaultValue: [],
		},
	]
}
