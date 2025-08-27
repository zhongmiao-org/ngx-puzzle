import { EditorChartField } from 'ngx-puzzle/core';

export const CHART_DATASET: EditorChartField = {
  label: '数据源设置',
  key: 'dataset',
  path: 'dataset',
  schemaType: 'array',
  hasAdd: false,
  removeActive: false,
  /**
   * todo 还需要改造,添加数据源之后,只单独循环这种的
   *       {
   *         id: 'male',
   *         fromDatasetId: 'raw',
   *         transform: {
   *           type: 'filter',
   *           config: {
   *             dimension: 'gender',
   *             '=': 'Male'
   *           }
   *         }
   *       }
   */
  children: [
    { label: '标识ID', key: 'id', path: 'id', schemaType: 'text' },
    { label: '来源数据集ID', key: 'fromDatasetId', path: 'fromDatasetId', schemaType: 'text' },
    { label: '转换类型', key: 'transformType', path: 'transform.type', schemaType: 'text' },
    // { label: '转换配置(JSON)', key: 'transformConfig', path: 'transform.config', schemaType: 'json' },
    { label: '维度(数组/逗号分隔)', key: 'dimensions', path: 'dimensions', schemaType: 'text' }
    // { label: '静态数据源(JSON)', key: 'source', path: 'source', schemaType: 'json' }
  ]
};
