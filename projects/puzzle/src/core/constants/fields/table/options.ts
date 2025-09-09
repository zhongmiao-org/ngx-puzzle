import { EditorTableField } from '../../../interfaces';

export const TABLE_OPTIONS: EditorTableField = {
  label: '表格选项配置',
  key: 'optionsGroup',
  schemaType: 'group',
  children: [
    {
      label: '表格选项',
      key: 'options',
      path: 'options',
      schemaType: 'group',
      description: '配置透视表的显示选项和行为设置',
      children: [
        // grid 选项
        {
          label: '网格选项',
          key: 'optionsGrid',
          path: 'grid',
          schemaType: 'group',
          children: [
            {
              label: '显示过滤器',
              key: 'gridShowFilter',
              path: 'showFilter',
              schemaType: 'select',
              options: [
                { label: '显示', val: true },
                { label: '隐藏', val: false }
              ],
              defaultValue: true,
              description: '是否显示字段过滤器'
            },
            {
              label: '显示总计',
              key: 'gridShowGrandTotals',
              path: 'showGrandTotals',
              schemaType: 'select',
              options: [
                { label: '显示', val: 'on' },
                { label: '隐藏', val: 'off' },
                { label: '仅行总计', val: 'rows' },
                { label: '仅列总计', val: 'columns' },
                { label: '显示（布尔）', val: true },
                { label: '隐藏（布尔）', val: false }
              ],
              defaultValue: 'on',
              description: '控制总计行和总计列的显示'
            },
            {
              label: '显示表头',
              key: 'gridShowHeaders',
              path: 'showHeaders',
              schemaType: 'select',
              options: [
                { label: '显示', val: true },
                { label: '隐藏', val: false }
              ],
              defaultValue: true,
              description: '是否显示表头'
            },
            {
              label: '显示层级标题',
              key: 'gridShowHierarchies',
              path: 'showHierarchies',
              schemaType: 'select',
              options: [
                { label: '显示', val: true },
                { label: '隐藏', val: false }
              ],
              defaultValue: true,
              description: '是否显示层级字段的标题'
            },
            {
              label: '显示层级标题说明',
              key: 'gridShowHierarchyCaptions',
              path: 'showHierarchyCaptions',
              schemaType: 'select',
              options: [
                { label: '显示', val: true },
                { label: '隐藏', val: false }
              ],
              defaultValue: true,
              description: '是否显示层级标题说明'
            },
            {
              label: '显示报表过滤器区域',
              key: 'gridShowReportFiltersArea',
              path: 'showReportFiltersArea',
              schemaType: 'select',
              options: [
                { label: '显示', val: true },
                { label: '隐藏', val: false }
              ],
              defaultValue: true,
              description: '是否显示报表过滤器区域'
            },
            {
              label: '显示小计',
              key: 'gridShowTotals',
              path: 'showTotals',
              schemaType: 'select',
              options: [
                { label: '显示', val: 'on' },
                { label: '隐藏', val: 'off' },
                { label: '仅行小计', val: 'rows' },
                { label: '仅列小计', val: 'columns' },
                { label: '显示（布尔）', val: true },
                { label: '隐藏（布尔）', val: false }
              ],
              defaultValue: 'on',
              description: '控制小计行和小计列的显示'
            },
            {
              label: '表格标题',
              key: 'gridTitle',
              path: 'title',
              schemaType: 'text',
              description: '设置表格的标题'
            },
            {
              label: '网格布局类型',
              key: 'gridType',
              path: 'type',
              schemaType: 'select',
              options: [
                { label: '紧凑布局', val: 'compact' },
                { label: '经典布局', val: 'classic' },
                { label: '扁平布局', val: 'flat' }
              ],
              defaultValue: 'compact',
              description: '选择透视表的布局类型'
            }
          ]
        },

        // 其他选项
        {
          label: '配置器选项',
          key: 'configuratorActive',
          path: 'configuratorActive',
          schemaType: 'select',
          options: [
            { label: '启用', val: true },
            { label: '禁用', val: false }
          ],
          defaultValue: false,
          description: '是否启用配置器'
        },
        {
          label: '配置器按钮',
          key: 'configuratorButton',
          path: 'configuratorButton',
          schemaType: 'select',
          options: [
            { label: '显示', val: true },
            { label: '隐藏', val: false }
          ],
          defaultValue: true,
          description: '是否显示配置器按钮'
        },
        {
          label: '日期格式',
          key: 'datePattern',
          path: 'datePattern',
          schemaType: 'text',
          defaultValue: 'dd/MM/yyyy',
          description: '设置日期显示格式'
        },
        {
          label: '日期时间格式',
          key: 'dateTimePattern',
          path: 'dateTimePattern',
          schemaType: 'text',
          defaultValue: 'dd/MM/yyyy HH:mm:ss',
          description: '设置日期时间显示格式'
        },
        {
          label: '默认层级排序名',
          key: 'defaultHierarchySortName',
          path: 'defaultHierarchySortName',
          schemaType: 'text',
          description: '设置默认的层级排序字段名'
        },
        {
          label: '启用钻取',
          key: 'drillThrough',
          path: 'drillThrough',
          schemaType: 'select',
          options: [
            { label: '启用', val: true },
            { label: '禁用', val: false }
          ],
          defaultValue: true,
          description: '是否允许双击单元格查看明细数据'
        },
        {
          label: '启用编辑',
          key: 'editing',
          path: 'editing',
          schemaType: 'select',
          options: [
            { label: '启用', val: true },
            { label: '禁用', val: false }
          ],
          defaultValue: false,
          description: '是否允许编辑单元格'
        },
        {
          label: '选择空单元格',
          key: 'selectEmptyCells',
          path: 'selectEmptyCells',
          schemaType: 'select',
          options: [
            { label: '允许', val: true },
            { label: '不允许', val: false }
          ],
          defaultValue: true,
          description: '是否允许选择空单元格'
        },
        {
          label: '显示聚合函数',
          key: 'showAggregations',
          path: 'showAggregations',
          schemaType: 'select',
          options: [
            { label: '显示', val: true },
            { label: '隐藏', val: false }
          ],
          defaultValue: false,
          description: '是否显示聚合函数名称'
        },
        {
          label: '显示计算值按钮',
          key: 'showCalculatedValuesButton',
          path: 'showCalculatedValuesButton',
          schemaType: 'select',
          options: [
            { label: '显示', val: true },
            { label: '隐藏', val: false }
          ],
          defaultValue: true,
          description: '是否显示计算值按钮'
        },
        {
          label: '显示默认切片',
          key: 'showDefaultSlice',
          path: 'showDefaultSlice',
          schemaType: 'select',
          options: [
            { label: '显示', val: true },
            { label: '隐藏', val: false }
          ],
          defaultValue: true,
          description: '是否显示默认切片'
        },
        {
          label: '排序方式',
          key: 'sorting',
          path: 'sorting',
          schemaType: 'select',
          options: [
            { label: '启用', val: 'on' },
            { label: '禁用', val: 'off' }
          ],
          defaultValue: 'on',
          description: '设置排序方式'
        },
        {
          label: '显示聚合标签',
          key: 'showAggregationLabels',
          path: 'showAggregationLabels',
          schemaType: 'select',
          options: [
            { label: '显示', val: true },
            { label: '隐藏', val: false }
          ],
          defaultValue: true,
          description: '是否显示聚合函数标签'
        }
      ]
    }
  ]
};
