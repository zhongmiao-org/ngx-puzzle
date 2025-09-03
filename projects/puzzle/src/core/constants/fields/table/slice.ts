import { EditorTableField, ENABLE_OPTIONS } from 'ngx-puzzle/core';

// WebDataRocks slice editor configuration
// Covers: rows, columns, measures, reportFilters, drills, expands, sorting, flatOrder
export const TABLE_SLICE: EditorTableField = {
  label: '切片',
  key: 'slice',
  path: 'slice',
  schemaType: 'group',
  children: [
    {
      label: '行',
      key: 'rows',
      path: 'slice.rows',
      schemaType: 'array',
      children: [
        { label: '标题', key: 'caption', path: 'caption', schemaType: 'text' },
        { label: '维度名称', key: 'dimensionName', path: 'dimensionName', schemaType: 'text' },
        { label: '唯一名', key: 'uniqueName', path: 'uniqueName', schemaType: 'text' },
        {
          label: '排序',
          key: 'sort',
          path: 'sort',
          schemaType: 'select',
          options: [
            { label: '升序', val: 'asc' },
            { label: '降序', val: 'desc' },
            { label: '不排序', val: 'unsorted' }
          ]
        },
        // {
        //   label: '筛选',
        //   key: 'filter',
        //   path: 'filter',
        //   schemaType: 'group',
        //   children: [
        //     {
        //       label: '成员',
        //       key: 'members',
        //       path: 'filter.members',
        //       schemaType: 'multiSelect', // todo 这里未来在 editor 中自动识别生成,以共多选
        //       description: '字符串数组，如 ["Country.USA", "Country.Canada"]'
        //     },
        //     { label: '取反', key: 'negation', path: 'filter.negation', schemaType: 'select', options: ENABLE_OPTIONS },
        //     { label: '度量', key: 'measure', path: 'filter.measure', schemaType: 'text' },
        //     { label: '数量', key: 'quantity', path: 'filter.quantity', schemaType: 'number', min: 0, step: 1 },
        //     { label: '类型', key: 'type', path: 'filter.type', schemaType: 'text' }
        //   ]
        // }
      ]
    },
    {
      label: '列',
      key: 'columns',
      path: 'slice.columns',
      schemaType: 'array',
      children: [
        { label: '标题', key: 'caption', path: 'caption', schemaType: 'text' },
        { label: '维度名称', key: 'dimensionName', path: 'dimensionName', schemaType: 'text' },
        { label: '唯一名', key: 'uniqueName', path: 'uniqueName', schemaType: 'text' },
        {
          label: '排序',
          key: 'sort',
          path: 'sort',
          schemaType: 'select',
          options: [
            { label: '升序', val: 'asc' },
            { label: '降序', val: 'desc' },
            { label: '不排序', val: 'unsorted' }
          ]
        },
        {
          label: '筛选',
          key: 'filter',
          path: 'filter',
          schemaType: 'group',
          children: [
            {
              label: '成员',
              key: 'members',
              path: 'filter.members',
              schemaType: 'multiSelect', // todo 这里未来在 editor 中自动识别生成,以共多选
              description: '字符串数组，如 ["Color.blue", "Color.red"]'
            },
            { label: '取反', key: 'negation', path: 'filter.negation', schemaType: 'select', options: ENABLE_OPTIONS },
            { label: '度量（measure）', key: 'measure', path: 'filter.measure', schemaType: 'text' },
            { label: '数量（quantity）', key: 'quantity', path: 'filter.quantity', schemaType: 'number', min: 0, step: 1 },
            { label: '类型（type）', key: 'type', path: 'filter.type', schemaType: 'text' }
          ]
        }
      ]
    },
    {
      label: '度量（measures）',
      key: 'measures',
      path: 'slice.measures',
      schemaType: 'array',
      children: [
        { label: '唯一名（uniqueName）', key: 'uniqueName', path: 'uniqueName', schemaType: 'text' },
        { label: '启用（active）', key: 'active', path: 'active', schemaType: 'select', options: ENABLE_OPTIONS },
        { label: '聚合方式（aggregation）', key: 'aggregation', path: 'aggregation', schemaType: 'text' },
        {
          label: '可用聚合（availableAggregations）',
          key: 'availableAggregations',
          path: 'availableAggregations',
          schemaType: 'multiSelect', // todo 这里之后用枚举,生成下拉项
          description: '字符串数组，如 ["sum","avg"]'
        },
        { label: '标题（caption）', key: 'caption', path: 'caption', schemaType: 'text' },
        { label: '公式（formula）', key: 'formula', path: 'formula', schemaType: 'text' },
        { label: '格式（format）', key: 'format', path: 'format', schemaType: 'text' },
        { label: '总计标题（grandTotalCaption）', key: 'grandTotalCaption', path: 'grandTotalCaption', schemaType: 'text' }
      ]
    }
  ]
};
