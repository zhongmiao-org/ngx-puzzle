import { EditorBaseField } from '../../../interfaces';
import { BASE_POSITION_FIELDS, BASE_WIDTH_FIELDS } from '../base-style-fields';
import { ENABLE_OPTIONS, ROW_GROUP_PANEL_OPTIONS, PIVOTING_PANEL_OPTIONS, GROUP_DISPLAY_TYPE_OPTIONS, AGG_FUNC_OPTIONS } from '../../select-options.const';

export const TABLE_EDITOR_BASE_FIELD: EditorBaseField = {
  label: '基础属性',
  key: 'base',
  path: 'base',
  schemaType: 'group',
  children: [
    ...BASE_POSITION_FIELDS,
    ...BASE_WIDTH_FIELDS,
    {
      label: '行分组面板',
      key: 'rowGroupPanelShow',
      path: 'table.rowGroupPanelShow',
      schemaType: 'select',
      options: ROW_GROUP_PANEL_OPTIONS,
      defaultValue: 'onlyWhenGrouping'
    },
    {
      label: '透视面板',
      key: 'pivotPanelShow',
      path: 'table.pivotPanelShow',
      schemaType: 'select',
      options: PIVOTING_PANEL_OPTIONS,
      defaultValue: 'never'
    },
    {
      label: '分组展示',
      key: 'groupDisplayType',
      path: 'table.groupDisplayType',
      schemaType: 'select',
      options: GROUP_DISPLAY_TYPE_OPTIONS,
      defaultValue: 'singleColumn'
    },
    {
      label: '默认聚合',
      key: 'aggFunc',
      path: 'table.defaultAggFunc',
      schemaType: 'select',
      options: AGG_FUNC_OPTIONS,
      clearable: true
    },
    {
      label: '启用透视模式',
      key: 'pivotMode',
      path: 'table.pivotMode',
      schemaType: 'select',
      options: ENABLE_OPTIONS,
      defaultValue: false
    }
  ]
}
