import { EditorBaseField } from '../../../interfaces';

export const TEXT_CONTENT_FIELDS: EditorBaseField = {
  label: '文本内容',
  key: 'textContent',
  path: 'textContent',
  schemaType: 'group',
  children: [
    {
      label: '文本内容',
      key: 'content',
      path: 'content',
      schemaType: 'textarea'
    }
  ]
};
