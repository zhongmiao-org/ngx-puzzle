import { TableTypesEnum } from '../enums';
import { SafeAny } from '../types';
import {
	AG_GRID_STYLE_FIELDS,
	TABLE_COLUMN_DEF,
	TABLE_DATA,
	TABLE_DEFAULT_COL_DEF,
	TABLE_ROW_GROUPING_PANEL_DEF,
	TABLE_SIDE_BAR_DEF,
} from './table-editor-fields-map';

export const TABLE_FIELDS_MAP: Partial<Record<TableTypesEnum, SafeAny>> = {
	[TableTypesEnum.default]: [
		TABLE_COLUMN_DEF,
		TABLE_DEFAULT_COL_DEF,
		TABLE_SIDE_BAR_DEF,
		TABLE_ROW_GROUPING_PANEL_DEF,
		TABLE_DATA,
		AG_GRID_STYLE_FIELDS,
	],
};
