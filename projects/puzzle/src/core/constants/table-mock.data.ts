import { Is, TableTypesEnum } from '../enums';

export const TABLE_DATA_OPTIONS: Partial<{ [key in TableTypesEnum]: object }> = {
	[TableTypesEnum.rowGrouping]: {
		rowDataUrl: 'https://www.ag-grid.com/example-assets/olympic-winners.json',
		defaultColDef: {
			flex: 1,
			minWidth: 100,
			filter: false,
			floatingFilter: false,
			// editable: false,
		},
		autoGroupColumnDef: {
			minWidth: 200,
		},
		rowGroupPanelShow: 'onlyWhenGrouping',
		groupDefaultExpanded: Is.yes,
		showOpenedGroup: Is.yes,
		groupDisplayType: 'singleColumn',
	},
};
