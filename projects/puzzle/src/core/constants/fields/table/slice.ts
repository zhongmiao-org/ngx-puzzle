import { EditorTableField, ENABLE_OPTIONS } from 'ngx-puzzle/core';

export const TABLE_SLICE: EditorTableField = {
  label: '切片',
  key: 'slice',
  path: 'slice',
  schemaType: 'group',
  children: [
    {
      label: '行',
      key: 'sliceRows', // slice.rows -> sliceRows
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
        }
      ]
    },
    {
      label: '列',
      key: 'sliceColumns', // slice.columns -> sliceColumns
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
              key: 'filterMembers', // filter.members -> filterMembers
              path: 'filter.members',
              schemaType: 'multiSelect', // todo 这里未来在 editor 中自动识别生成,以共多选
              description: '字符串数组，如 ["Color.blue", "Color.red"]'
            },
            { label: '取反', key: 'filterNegation', path: 'filter.negation', schemaType: 'select', options: ENABLE_OPTIONS },
            { label: '度量', key: 'filterMeasure', path: 'filter.measure', schemaType: 'text' },
            { label: '数量', key: 'filterQuantity', path: 'filter.quantity', schemaType: 'number', min: 0, step: 1 },
            { label: '类型', key: 'filterType', path: 'filter.type', schemaType: 'text' }
          ]
        }
      ]
    },
    {
      label: '度量',
      key: 'sliceMeasures', // slice.measures -> sliceMeasures
      path: 'slice.measures',
      schemaType: 'array',
      children: [
        { label: '唯一名', key: 'uniqueName', path: 'uniqueName', schemaType: 'text' },
        { label: '启用', key: 'active', path: 'active', schemaType: 'select', options: ENABLE_OPTIONS },
        {
          label: '聚合方式',
          key: 'aggregation',
          path: 'aggregation',
          schemaType: 'select',
          options: [
            { label: '求和', val: 'sum' },
            { label: '平均值', val: 'avg' },
            { label: '计数', val: 'count' },
            { label: '最小值', val: 'min' },
            { label: '最大值', val: 'max' },
            { label: '第一个', val: 'first' },
            { label: '最后一个', val: 'last' }
          ]
        },
        { label: '标题', key: 'caption', path: 'caption', schemaType: 'text' },
        { label: '公式', key: 'formula', path: 'formula', schemaType: 'text' },
        { label: '格式', key: 'format', path: 'format', schemaType: 'text' },
        { label: '总计标题', key: 'grandTotalCaption', path: 'grandTotalCaption', schemaType: 'text' }
      ]
    }
  ]
};
