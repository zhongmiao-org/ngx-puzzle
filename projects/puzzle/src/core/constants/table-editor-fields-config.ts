import { TableTypesEnum } from '../enums';
import { SafeAny } from '../types';
import { TABLE_SLICE } from './fields';

export const TABLE_FIELDS_MAP: Partial<Record<TableTypesEnum, SafeAny>> = {
  [TableTypesEnum.default]: [],
  [TableTypesEnum.pivotTable]: [TABLE_SLICE]
};
