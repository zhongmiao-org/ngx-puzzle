import { TableTypesEnum } from '../../enums';
import { SafeAny } from '../../types';
import { TABLE_DATA_SOURCE } from '../fields';

export const TABLE_FIELDS_MAP: Partial<Record<TableTypesEnum, SafeAny>> = {
  [TableTypesEnum.default]: [],
  // 社区版配置：数据源 + 样式（主题）
  [TableTypesEnum.pivotTable]: [TABLE_DATA_SOURCE]
};
