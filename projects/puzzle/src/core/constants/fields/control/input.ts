// Input 组件属性配置
import { EditorBaseField } from '../../../interfaces';

export const CONTROL_INPUT_FIELDS: EditorBaseField = {
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
      defaultValue: '请输入内容'
    }
  ]
};
