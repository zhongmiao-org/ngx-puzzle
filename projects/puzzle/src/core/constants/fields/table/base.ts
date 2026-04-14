import { EditorBaseField } from '../../../interfaces';
import { BASE_POSITION_FIELDS, BASE_WIDTH_FIELDS } from '../base-style-fields';
import { ROW_GROUP_PANEL_OPTIONS, GROUP_DISPLAY_TYPE_OPTIONS } from '../../select-options.const';

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
      label: '分组展示',
      key: 'groupDisplayType',
      path: 'table.groupDisplayType',
      schemaType: 'select',
      options: GROUP_DISPLAY_TYPE_OPTIONS,
      defaultValue: 'singleColumn'
    }
  ]
}
