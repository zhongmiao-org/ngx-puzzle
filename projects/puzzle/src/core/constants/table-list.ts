import { BaseSelectOption } from '../interfaces';
import { TableTypesEnum } from '../enums/table-types.enum';

export const TABLE_TYPE_OPTIONS: BaseSelectOption<TableTypesEnum>[] = [
	{ label: '行分组表格', val: TableTypesEnum.rowGrouping }
];
