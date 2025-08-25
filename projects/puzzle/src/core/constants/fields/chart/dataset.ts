import { EditorChartField } from 'ngx-puzzle/core';

export const CHART_DATASET: EditorChartField = {
  label: '数据源设置',
  key: 'dataset',
  path: 'dataset',
  schemaType: 'group',
  skipConversion: true,
  children: [
    {
      label: '数据源',
      key: 'button',
      path: 'button',
      schemaType: 'button',
      skipConversion: true
    },
    {
      label: '聚合函数',
      key: 'aggregation',
      path: 'aggregation',
      schemaType: 'code',
      skipConversion: true,
      description: `  聚合函数说明：

  可用的聚合方法：
  - sum(data, field?)      - 求和，支持指定字段
  - avg(data, field?)      - 平均值，支持指定字段
  - count(data)            - 计数
  - max(data, field?)      - 最大值，支持指定字段
  - min(data, field?)      - 最小值，支持指定字段
  - filter(data, predicate) - 过滤数据
  - map(data, mapper)      - 映射转换
  - groupBy(data, field)   - 按字段分组
  - sortBy(data, field, 'asc'|'desc') - 排序
  - unique(data, field?)   - 去重
  - take(data, count)      - 取前N项
  - skip(data, count)      - 跳过N项
  - groupSum(data, groupField, sumField) - 分组求和
  - groupAvg(data, groupField, avgField) - 分组平均

  示例用法：
  return sum(data, 'amount');          // 对amount字段求和
  return groupBy(data, 'category');    // 按category分组
  return filter(data, item => item.value > 100); // 过滤数据
`,
      config: {
        codeMirrorProps: {
          language: 'javascript',
          minHeight: '280px'
        }
      }
    }
  ]
};
