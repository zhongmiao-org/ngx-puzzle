import { TableTypesEnum } from '../../enums';
import { SafeAny } from '../../types';
import { TABLE_CONDITIONS, TABLE_DATA_SOURCE, TABLE_FORMATS, TABLE_OPTIONS, TABLE_SIZES, TABLE_SLICE } from '../fields';

export const TABLE_FIELDS_MAP: Partial<Record<TableTypesEnum, SafeAny>> = {
  [TableTypesEnum.default]: [],
  [TableTypesEnum.pivotTable]: [TABLE_SLICE, TABLE_CONDITIONS,TABLE_FORMATS,TABLE_DATA_SOURCE,TABLE_OPTIONS,TABLE_SIZES
    //
  ]
};
