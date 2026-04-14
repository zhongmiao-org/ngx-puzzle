import { BaseSelectOption } from '../interfaces';
import { TableTypesEnum } from '../enums';

export const TABLE_TYPE_OPTIONS: BaseSelectOption<TableTypesEnum>[] = [
  { label: '普通表格', val: TableTypesEnum.default },
  { label: '高级表格', val: TableTypesEnum.advancedTable }
];
