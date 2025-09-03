import { TableTypesEnum } from '../enums';
import { SafeAny } from '../types';
import { TABLE_COLUMN, TABLE_DATA, TABLE_SLICE } from './fields';

export const TABLE_FIELDS_MAP: Partial<Record<TableTypesEnum, SafeAny>> = {
  [TableTypesEnum.default]: [TABLE_COLUMN, TABLE_DATA],
  [TableTypesEnum.pivotTable]: [TABLE_SLICE]
};
