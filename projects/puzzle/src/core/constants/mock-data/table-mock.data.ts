import { TableTypesEnum } from '../../enums';

export const TABLE_DATA_OPTIONS: Partial<{ [key in TableTypesEnum]: object }> = {
  [TableTypesEnum.default]: {},
  [TableTypesEnum.advancedTable]: {
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
};
