import { BaseSelectOption } from '../interfaces';
import { TableTypesEnum } from 'ngx-puzzle/core';

export const TABLE_TYPE_OPTIONS: BaseSelectOption<TableTypesEnum>[] = [
  { label: '普通表格', val: TableTypesEnum.default },
  { label: '聚合分组', val: TableTypesEnum.pivotTable },
  // { label: '行分组表格', val: TableTypesEnum.rowGrouping },
  // { label: '数据透视表', val: TableTypesEnum.pivoting },
];
