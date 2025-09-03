import { EditorTableField } from 'ngx-puzzle/core';

export const TABLE_CONDITIONS: EditorTableField = {
  label: '条件格式配置',
  key: 'conditionsGroup',
  schemaType: 'group',
  children: [
    {
      label: '条件格式',
      key: 'conditions',
      path: 'conditions',
      schemaType: 'array',
      description: '设置基于数值或公式的条件格式，自动高亮符合条件的单元格',
      children: [
        // ConditionalFormat 的 9 个字段
        {
          label: '公式',
          key: 'formula',
          path: 'formula',
          schemaType: 'textarea',
          description: '输入条件公式，如：#value > 1000 或 AND(#value > 1000, #value < 3000)'
        },
        {
          label: '行号',
          key: 'row',
          path: 'row',
          schemaType: 'number',
          min: 0,
          step: 1,
          description: '指定行号（从0开始）'
        },
        {
          label: '列号',
          key: 'column',
          path: 'column',
          schemaType: 'number',
          min: 0,
          step: 1,
          description: '指定列号（从0开始）'
        },
        {
          label: '度量值',
          key: 'measure',
          path: 'measure',
          schemaType: 'text',
          description: '指定度量值名称'
        },
        {
          label: '层级',
          key: 'hierarchy',
          path: 'hierarchy',
          schemaType: 'text',
          description: '指定层级名称'
        },
        {
          label: '成员',
          key: 'member',
          path: 'member',
          schemaType: 'text',
          description: '指定成员名称'
        },
        {
          label: '是否汇总行',
          key: 'isTotal',
          path: 'isTotal',
          schemaType: 'select',
          options: [
            { label: '所有单元格', val: 0 },
            { label: '仅汇总行', val: 1 },
            { label: '仅非汇总行', val: -1 }
          ],
          defaultValue: 0,
          description: '指定条件是否仅应用于汇总行'
        },

        // format 对象 - 简化为最常用的样式
        {
          label: '背景颜色',
          key: 'formatBackgroundColor',
          path: 'format.backgroundColor',
          schemaType: 'color',
          defaultValue: '#0598df',
          description: '设置符合条件单元格的背景颜色'
        },
        {
          label: '字体颜色',
          key: 'formatColor',
          path: 'format.color',
          schemaType: 'color',
          defaultValue: '#FFFFFF',
          description: '设置符合条件单元格的字体颜色'
        },

        // formatCSS 字符串
        {
          label: 'CSS 样式',
          key: 'formatCSS',
          path: 'formatCSS',
          schemaType: 'textarea',
          description: '直接输入 CSS 样式字符串，如：background-color: red; color: white;'
        }
      ]
    }
  ]
};
