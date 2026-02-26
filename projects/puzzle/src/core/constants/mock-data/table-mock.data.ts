import { Is, TableTypesEnum } from '../../enums';

export const TABLE_DATA_OPTIONS: Partial<{ [key in TableTypesEnum]: object }> = {
  [TableTypesEnum.default]: {
    rowDataUrl: 'https://www.ag-grid.com/example-assets/olympic-winners.json',
    defaultColDef: {
      flex: 1,
      minWidth: 100,
      filter: false,
      floatingFilter: false
      // editable: false,
    },
    autoGroupColumnDef: {
      minWidth: 200
    },
    pivotMode: false,
    pivotPanelShow: 'never',
    rowGroupPanelShow: 'onlyWhenGrouping',
    groupDefaultExpanded: Is.no,
    showOpenedGroup: Is.yes,
    groupDisplayType: 'singleColumn'
  },
  [TableTypesEnum.pivotTable]: {
    dataSource: {
      dataSourceType: 'json',
      filename: 'https://www.ag-grid.com/example-assets/olympic-winners.json'
    },
    theme: {
      accentColor: '#0b6efd',
      backgroundColor: '#ffffff',
      foregroundColor: '#2b2f36',
      headerBackgroundColor: '#f8f9fa',
      headerTextColor: '#2b2f36',
      oddRowBackgroundColor: '#fcfcfc'
    }
  }
  // [TableTypesEnum.pivoting]: {
  // 	rowDataUrl: 'https://www.ag-grid.com/example-assets/olympic-winners.json',
  // 	defaultColDef: {
  // 		flex: 1,
  // 		minWidth: 150,
  // 		filter: false,
  // 		floatingFilter: false,
  // 		editable: false,
  // 	},
  // 	autoGroupColumnDef: {
  // 		minWidth: 200,
  // 	},
  // 	groupDefaultExpanded: Is.yes,
  // 	showOpenedGroup: Is.yes,
  // 	groupDisplayType: 'singleColumn',
  // },
};
