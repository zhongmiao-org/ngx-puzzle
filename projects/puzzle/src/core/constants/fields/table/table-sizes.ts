import { EditorTableField } from '../../../interfaces';

export const TABLE_SIZES: EditorTableField = {
  label: '表格尺寸配置',
  key: 'tableSizesGroup',
  schemaType: 'group',
  children: [
    {
      label: '表格尺寸',
      key: 'tableSizes',
      path: 'tableSizes',
      schemaType: 'group',
      description: '配置透视表中行和列的自定义尺寸',
      children: [
        // 列宽配置
        {
          label: '列宽设置',
          key: 'columns',
          path: 'columns',
          schemaType: 'array',
          description: '为特定列设置自定义宽度',
          children: [
            {
              label: '匹配类型',
              key: 'matchType',
              schemaType: 'select',
              defaultValue: 'tuple',
              options: [
                { label: '元组匹配', val: 'tuple' },
                { label: '度量值匹配', val: 'measure' },
                { label: '层级匹配', val: 'hierarchy' },
                { label: '索引匹配', val: 'index' }
              ],
              description: '选择列匹配的方式'
            },

            // 元组匹配配置
            {
              label: '元组配置',
              key: 'tupleConfig',
              schemaType: 'group',
              visibleWhen: (values: any) => values.matchType === 'tuple',
              children: [
                {
                  label: '元组值',
                  key: 'tuple',
                  path: 'tuple',
                  schemaType: 'textarea',
                  description: '输入元组数组，如：["Color.blue", "Country.USA"]',
                  defaultValue: JSON.stringify(['Color.blue'], null, 2)
                },

                {
                  label: '关联度量值',
                  key: 'measure',
                  path: 'measure',
                  schemaType: 'text',
                  description: '指定关联的度量值名称（可选）',
                  defaultValue: 'Price'
                }
              ]
            },

            // 度量值匹配配置
            {
              label: '度量值名称',
              key: 'measureName',
              path: 'measure',
              schemaType: 'text',
              visibleWhen: (values: any) => values.matchType === 'measure',
              description: '指定度量值名称',
              defaultValue: 'Price'
            },

            // 层级匹配配置
            {
              label: '层级配置',
              key: 'hierarchyConfig',
              schemaType: 'group',
              visibleWhen: (values: any) => values.matchType === 'hierarchy',
              children: [
                {
                  label: '层级名称',
                  key: 'hierarchy',
                  path: 'hierarchy',
                  schemaType: 'text',
                  description: '指定层级名称',
                  defaultValue: 'Country'
                },

                {
                  label: '成员值',
                  key: 'member',
                  path: 'member',
                  schemaType: 'text',
                  description: '指定层级成员值（可选）'
                }
              ]
            },

            // 索引匹配配置
            {
              label: '列索引',
              key: 'columnIndex',
              path: 'idx',
              schemaType: 'number',
              visibleWhen: (values: any) => values.matchType === 'index',
              min: 0,
              step: 1,
              description: '指定列的索引位置（从0开始）',
              defaultValue: 0
            },

            // 通用宽度设置
            {
              label: '列宽',
              key: 'width',
              path: 'width',
              schemaType: 'number',
              min: 50,
              max: 1000,
              step: 10,
              suffix: 'px',
              defaultValue: 150,
              description: '设置列的宽度（像素）'
            },

            // 高级选项
            {
              label: '高级选项',
              key: 'columnAdvanced',
              schemaType: 'group',
              children: [
                {
                  label: '最小宽度',
                  key: 'minWidth',
                  path: 'minWidth',
                  schemaType: 'number',
                  min: 30,
                  max: 500,
                  step: 5,
                  suffix: 'px',
                  description: '设置列的最小宽度'
                },

                {
                  label: '最大宽度',
                  key: 'maxWidth',
                  path: 'maxWidth',
                  schemaType: 'number',
                  min: 100,
                  max: 2000,
                  step: 10,
                  suffix: 'px',
                  description: '设置列的最大宽度'
                },

                {
                  label: '自动调整',
                  key: 'autoResize',
                  path: 'autoResize',
                  schemaType: 'select',
                  options: [
                    { label: '启用', val: true },
                    { label: '禁用', val: false }
                  ],
                  defaultValue: false,
                  description: '是否根据内容自动调整宽度'
                },

                {
                  label: '可调整大小',
                  key: 'resizable',
                  path: 'resizable',
                  schemaType: 'select',
                  options: [
                    { label: '允许', val: true },
                    { label: '禁止', val: false }
                  ],
                  defaultValue: true,
                  description: '用户是否可以手动调整列宽'
                }
              ]
            }
          ]
        },

        // 行高配置
        {
          label: '行高设置',
          key: 'rows',
          path: 'rows',
          schemaType: 'array',
          description: '为特定行设置自定义高度',
          children: [
            {
              label: '行匹配类型',
              key: 'rowMatchType',
              schemaType: 'select',
              defaultValue: 'index',
              options: [
                { label: '索引匹配', val: 'index' },
                { label: '元组匹配', val: 'tuple' },
                { label: '层级匹配', val: 'hierarchy' },
                { label: '范围匹配', val: 'range' }
              ],
              description: '选择行匹配的方式'
            },

            // 索引匹配配置
            {
              label: '行索引',
              key: 'idx',
              path: 'idx',
              schemaType: 'number',
              visibleWhen: (values: any) => values.rowMatchType === 'index',
              min: 0,
              step: 1,
              description: '指定行的索引位置（从0开始）',
              defaultValue: 0
            },

            // 元组匹配配置
            {
              label: '行元组值',
              key: 'rowTuple',
              path: 'tuple',
              schemaType: 'textarea',
              visibleWhen: (values: any) => values.rowMatchType === 'tuple',
              description: '输入行元组数组，如：["Country.USA", "Year.2023"]',
              defaultValue: JSON.stringify(['Country.USA'], null, 2)
            },

            // 层级匹配配置
            {
              label: '行层级配置',
              key: 'rowHierarchyConfig',
              schemaType: 'group',
              visibleWhen: (values: any) => values.rowMatchType === 'hierarchy',
              children: [
                {
                  label: '层级名称',
                  key: 'rowHierarchy',
                  path: 'hierarchy',
                  schemaType: 'text',
                  description: '指定行层级名称',
                  defaultValue: 'Country'
                },

                {
                  label: '成员值',
                  key: 'rowMember',
                  path: 'member',
                  schemaType: 'text',
                  description: '指定层级成员值（可选）'
                }
              ]
            },

            // 范围匹配配置
            {
              label: '行范围配置',
              key: 'rowRangeConfig',
              schemaType: 'group',
              visibleWhen: (values: any) => values.rowMatchType === 'range',
              children: [
                {
                  label: '起始行',
                  key: 'startIdx',
                  path: 'startIdx',
                  schemaType: 'number',
                  min: 0,
                  step: 1,
                  description: '范围起始行索引',
                  defaultValue: 0
                },

                {
                  label: '结束行',
                  key: 'endIdx',
                  path: 'endIdx',
                  schemaType: 'number',
                  min: 0,
                  step: 1,
                  description: '范围结束行索引',
                  defaultValue: 10
                }
              ]
            },

            // 通用行高设置
            {
              label: '行高',
              key: 'height',
              path: 'height',
              schemaType: 'number',
              min: 20,
              max: 500,
              step: 5,
              suffix: 'px',
              defaultValue: 35,
              description: '设置行的高度（像素）'
            },

            // 高级选项
            {
              label: '行高级选项',
              key: 'rowAdvanced',
              schemaType: 'group',
              children: [
                {
                  label: '最小行高',
                  key: 'minHeight',
                  path: 'minHeight',
                  schemaType: 'number',
                  min: 15,
                  max: 200,
                  step: 5,
                  suffix: 'px',
                  description: '设置行的最小高度'
                },

                {
                  label: '最大行高',
                  key: 'maxHeight',
                  path: 'maxHeight',
                  schemaType: 'number',
                  min: 30,
                  max: 1000,
                  step: 5,
                  suffix: 'px',
                  description: '设置行的最大高度'
                },

                {
                  label: '自动高度',
                  key: 'autoHeight',
                  path: 'autoHeight',
                  schemaType: 'select',
                  options: [
                    { label: '启用', val: true },
                    { label: '禁用', val: false }
                  ],
                  defaultValue: false,
                  description: '是否根据内容自动调整行高'
                },

                {
                  label: '可调整高度',
                  key: 'heightResizable',
                  path: 'resizable',
                  schemaType: 'select',
                  options: [
                    { label: '允许', val: true },
                    { label: '禁止', val: false }
                  ],
                  defaultValue: true,
                  description: '用户是否可以手动调整行高'
                }
              ]
            }
          ]
        },

        // 全局尺寸设置
        {
          label: '全局尺寸设置',
          key: 'globalSizes',
          schemaType: 'group',
          children: [
            {
              label: '默认列宽',
              key: 'defaultColumnWidth',
              schemaType: 'number',
              min: 50,
              max: 500,
              step: 10,
              suffix: 'px',
              defaultValue: 120,
              description: '设置所有列的默认宽度'
            },

            {
              label: '默认行高',
              key: 'defaultRowHeight',
              schemaType: 'number',
              min: 20,
              max: 200,
              step: 5,
              suffix: 'px',
              defaultValue: 28,
              description: '设置所有行的默认高度'
            },

            {
              label: '表头行高',
              key: 'headerRowHeight',
              schemaType: 'number',
              min: 25,
              max: 150,
              step: 5,
              suffix: 'px',
              defaultValue: 35,
              description: '设置表头行的高度'
            },

            {
              label: '汇总行高',
              key: 'totalRowHeight',
              schemaType: 'number',
              min: 25,
              max: 150,
              step: 5,
              suffix: 'px',
              defaultValue: 32,
              description: '设置汇总行的高度'
            },

            {
              label: '统一列宽',
              key: 'uniformColumnWidth',
              schemaType: 'select',
              options: [
                { label: '启用', val: true },
                { label: '禁用', val: false }
              ],
              defaultValue: false,
              description: '是否让所有列保持相同宽度'
            },

            {
              label: '统一行高',
              key: 'uniformRowHeight',
              schemaType: 'select',
              options: [
                { label: '启用', val: true },
                { label: '禁用', val: false }
              ],
              defaultValue: true,
              description: '是否让所有行保持相同高度'
            }
          ]
        },

      ]
    }
  ]
};
