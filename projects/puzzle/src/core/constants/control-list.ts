import { BaseSelectOption } from '../interfaces';
import { ControlTypesEnum } from '../enums';

export const CONTROL_TYPE_OPTIONS: BaseSelectOption<ControlTypesEnum>[] = [
	{
		label: '时间选择',
		val: ControlTypesEnum.datePick,
	},
	{
		label: '单选',
		val: ControlTypesEnum.select,
	},
	{
		label: '多选',
		val: ControlTypesEnum.multiSelect,
	},
	{
		label: '输入',
		val: ControlTypesEnum.input,
	},
	{
		label: '时间',
		val: ControlTypesEnum.dateTime,
	}
];
