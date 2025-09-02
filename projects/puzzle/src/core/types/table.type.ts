export type rowGroupPanelShowTypes = 'always' | 'onlyWhenGrouping' | 'never';

export type pivotingPanelShowTypes = 'always' | 'onlyWhenPivoting' | 'never';

export type pivotingAggregationTypes = 'sum' | 'first' | 'last' | 'min' | 'max' | 'count' | 'avg';

export type tableConfigSettingTypes =
  | 'columnDefs'
  | 'defaultColDef'
  | 'autoGroupColumnDef'
  | 'rowGroupPanelShow'
  | 'groupDefaultExpanded'
  | 'rowData';

export type rowGroupingDisplayType = 'singleColumn' | 'multipleColumns' | 'groupRows';
