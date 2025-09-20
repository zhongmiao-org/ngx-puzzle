// MultiSelect 组件属性配置 - 基于 ngx-tethys thy-select multiple mode
import { EditorBaseField } from '../../../interfaces';
import { CONTROL_SIZE_OPTIONS, ENABLE_OPTIONS } from '../../select-options.const';

export const CONTROL_MULTISELECT_FIELDS: EditorBaseField = {
  label: '控件属性',
  key: 'props',
  path: 'props',
  schemaType: 'group',
  children: [
    {
      label: '占位符',
      key: 'placeholder',
      path: 'props.placeholder',
      schemaType: 'text',
      defaultValue: '请选择',
      description: '未选择时显示的提示文字'
    },
    {
      label: '禁用状态',
      key: 'disabled',
      path: 'props.disabled',
      schemaType: 'select',
      defaultValue: false,
      options: ENABLE_OPTIONS,
      description: '是否禁用多选控件'
    },
    {
      label: '最大标签显示数量',
      key: 'thyMaxTagCount',
      path: 'props.thyMaxTagCount',
      schemaType: 'number',
      min: 0,
      max: 20,
      step: 1,
      defaultValue: 1,
      description: '最多显示的标签数量，0表示不限制'
    },
    {
      label: '允许清空',
      key: 'thyAllowClear',
      path: 'props.thyAllowClear',
      schemaType: 'select',
      defaultValue: true,
      options: ENABLE_OPTIONS,
      description: '是否显示清空按钮'
    },
    {
      label: '无边框模式',
      key: 'thyBorderless',
      path: 'props.thyBorderless',
      schemaType: 'select',
      defaultValue: false,
      options: ENABLE_OPTIONS,
      description: '是否为无边框样式'
    },
    {
      label: '尺寸',
      key: 'thySize',
      path: 'props.thySize',
      schemaType: 'select',
      defaultValue: 'default',
      options: CONTROL_SIZE_OPTIONS,
      description: '控件尺寸'
    },
    {
      label: '服务端搜索',
      key: 'thyServerSearch',
      path: 'props.thyServerSearch',
      schemaType: 'select',
      defaultValue: false,
      options: ENABLE_OPTIONS,
      description: '是否为服务端搜索模式'
    },
    {
      label: '选项分组字段',
      key: 'optionGroupBy',
      path: 'props.optionGroupBy',
      schemaType: 'text',
      defaultValue: 'group',
      description: '选项分组的字段名'
    }
  ]
};
