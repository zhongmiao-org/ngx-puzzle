import { TableTypesEnum } from '../enums';
import { SafeAny } from '../types';
import { TABLE_COLUMN, TABLE_DATA } from './fields';

export const TABLE_FIELDS_MAP: Partial<Record<TableTypesEnum, SafeAny>> = {
  [TableTypesEnum.default]: [TABLE_COLUMN, TABLE_DATA]
};
