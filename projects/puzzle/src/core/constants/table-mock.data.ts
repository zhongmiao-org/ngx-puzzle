import { Is, TableTypesEnum } from '../enums';

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
      filename: 'https://cdn.webdatarocks.com/data/data.json'
    },
    slice: {
      rows: [
        {
          uniqueName: 'Country',
          caption: '国家'
        }
      ],
      columns: [
        {
          uniqueName: 'Color'
        },
        {
          uniqueName: 'Measures'
        }
      ],
      measures: [
        {
          uniqueName: 'Price',
          aggregation: 'sum',
          format: 'currency'
        },
        {
          uniqueName: 'Discount',
          aggregation: 'sum',
          format: 'currency'
        }
      ]
    },
    options: {
      grid: {
        showGrandTotals: 'off'
      }
    },
    conditions: [
      {
        formula: '#value > 350000',
        format: {
          backgroundColor: '#0598df',
          color: '#FFFFFF'
        }
      },
      {
        formula: 'AND(#value > 1000, #value < 3000)',
        format: {
          backgroundColor: '#f45328',
          color: '#FFFFFF'
        }
      }
    ],
    formats: [
      {
        name: 'currency',
        thousandsSeparator: ',',
        decimalPlaces: 2,
        currencySymbol: '$',
        currencySymbolAlign: 'left'
      }
    ],
    tableSizes: {
      columns: [
        {
          tuple: ['Color.blue'],
          measure: 'Price',
          width: 200
        }
      ],
      rows: [
        {
          idx: 4,
          height: 80
        }
      ]
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
