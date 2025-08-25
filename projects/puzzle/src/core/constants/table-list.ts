import { BaseSelectOption } from '../interfaces';
import { TableTypesEnum } from '../enums/table-types.enum';

export const TABLE_TYPE_OPTIONS: BaseSelectOption<TableTypesEnum>[] = [
	{ label: '数据表格', val: TableTypesEnum.default },
	// { label: '行分组表格', val: TableTypesEnum.rowGrouping },
	// { label: '数据透视表', val: TableTypesEnum.pivoting },
];
