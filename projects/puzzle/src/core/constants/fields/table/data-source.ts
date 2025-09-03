import { EditorTableField } from 'ngx-puzzle/core';

export const TABLE_DATA_SOURCE: EditorTableField = {
  label: '数据源配置',
  key: 'dataSourceGroup',
  schemaType: 'group',
  children: [
    {
      label: '数据源',
      key: 'dataSource',
      path: 'dataSource',
      schemaType: 'group',
      description: '配置表格数据源，支持多种数据格式和来源',
      children: [
        {
          label: '数据源类型',
          key: 'dataSourceType',
          path: 'dataSourceType',
          schemaType: 'select',
          defaultValue: 'json',
          options: [
            { label: 'JSON 数据', val: 'json' },
            { label: 'CSV 文件', val: 'csv' },
            { label: 'Excel 文件', val: 'excel' },
            { label: '本地数组数据', val: 'array' }
          ],
          description: '选择数据源的格式类型'
        },

        // 文件相关配置
        {
          label: '文件路径/URL',
          key: 'filename',
          path: 'filename',
          schemaType: 'text',
          visibleWhen: (values: any) => ['csv', 'json', 'excel'].includes(values.dataSourceType),
          description: '输入数据文件的完整 URL 或相对路径',
          defaultValue: 'https://cdn.webdatarocks.com/data/data.json'
        },

        {
          label: '启用文件浏览器',
          key: 'browseForFile',
          path: 'browseForFile',
          schemaType: 'select',
          visibleWhen: (values: any) => ['csv', 'json', 'excel'].includes(values.dataSourceType),
          options: [
            { label: '禁用', val: false },
            { label: '启用', val: true }
          ],
          defaultValue: false,
          description: '是否启用文件浏览器选择本地文件'
        },

        // CSV 特有配置
        {
          label: 'CSV 解析配置',
          key: 'csvConfig',
          schemaType: 'group',
          visibleWhen: (values: any) => values.dataSourceType === 'csv',
          children: [
            {
              label: '字段分隔符',
              key: 'fieldSeparator',
              path: 'fieldSeparator',
              schemaType: 'select',
              options: [
                { label: '逗号 (,)', val: ',' },
                { label: '分号 (;)', val: ';' },
                { label: '制表符 (Tab)', val: '\t' },
                { label: '竖线 (|)', val: '|' },
                { label: '自定义', val: 'custom' }
              ],
              defaultValue: ',',
              description: '设置 CSV 文件的字段分隔符'
            },

            {
              label: '自定义分隔符',
              key: 'customFieldSeparator',
              schemaType: 'text',
              visibleWhen: (values: any) => values.fieldSeparator === 'custom',
              description: '输入自定义的字段分隔符',
              defaultValue: ','
            },

            {
              label: '记录分隔符',
              key: 'recordsetDelimiter',
              path: 'recordsetDelimiter',
              schemaType: 'select',
              options: [
                { label: '换行符 (\\n)', val: '\n' },
                { label: '回车换行 (\\r\\n)', val: '\r\n' },
                { label: '回车符 (\\r)', val: '\r' },
                { label: '自定义', val: 'custom' }
              ],
              defaultValue: '\n',
              description: '设置记录（行）之间的分隔符'
            },

            {
              label: '自定义记录分隔符',
              key: 'customRecordsetDelimiter',
              schemaType: 'text',
              visibleWhen: (values: any) => values.recordsetDelimiter === 'custom',
              description: '输入自定义的记录分隔符',
              defaultValue: '\n'
            },

            {
              label: '忽略引号内换行',
              key: 'ignoreQuotedLineBreaks',
              path: 'ignoreQuotedLineBreaks',
              schemaType: 'select',
              options: [
                { label: '否', val: false },
                { label: '是', val: true }
              ],
              defaultValue: true,
              description: '是否忽略被引号包围的字段内的换行符'
            }
          ]
        },

        // 本地数组数据配置
        {
          label: '数组数据',
          key: 'data',
          path: 'data',
          schemaType: 'code',
          visibleWhen: (values: any) => values.dataSourceType === 'array',
          description: '输入 JSON 格式的数组数据',
          defaultValue: JSON.stringify([
            { "Country": "Australia", "Color": "red", "Price": 1000 },
            { "Country": "Australia", "Color": "blue", "Price": 2000 },
            { "Country": "United States", "Color": "red", "Price": 3000 }
          ], null, 2)
        },
        // 高级选项
        {
          label: '高级选项',
          key: 'advancedOptions',
          schemaType: 'group',
          children: [
            {
              label: '请求头设置',
              key: 'requestHeaders',
              schemaType: 'code',
              visibleWhen: (values: any) => ['csv', 'json', 'excel'].includes(values.dataSourceType),
              description: '设置请求数据源时的 HTTP 头部信息（JSON 格式）',
              defaultValue: JSON.stringify({
                "Content-Type": "application/json",
                "Accept": "application/json"
              }, null, 2)
            },

            {
              label: '请求方法',
              key: 'requestMethod',
              schemaType: 'select',
              visibleWhen: (values: any) => ['csv', 'json', 'excel'].includes(values.dataSourceType),
              options: [
                { label: 'GET', val: 'GET' },
                { label: 'POST', val: 'POST' }
              ],
              defaultValue: 'GET',
              description: '设置请求数据源的 HTTP 方法'
            },

            {
              label: '请求体数据',
              key: 'requestBody',
              schemaType: 'textarea',
              visibleWhen: (values: any) => values.requestMethod === 'POST',
              description: '设置 POST 请求的请求体数据'
            },

            {
              label: '超时时间',
              key: 'timeout',
              schemaType: 'number',
              visibleWhen: (values: any) => ['csv', 'json', 'excel'].includes(values.dataSourceType),
              min: 1000,
              max: 300000,
              step: 1000,
              suffix: 'ms',
              defaultValue: 30000,
              description: '设置请求超时时间（毫秒）'
            },

            {
              label: '缓存策略',
              key: 'cacheStrategy',
              schemaType: 'select',
              options: [
                { label: '不缓存', val: 'no-cache' },
                { label: '浏览器缓存', val: 'default' },
                { label: '强制缓存', val: 'force-cache' },
                { label: '仅缓存', val: 'only-if-cached' }
              ],
              defaultValue: 'default',
              description: '设置数据请求的缓存策略'
            }
          ]
        }
      ]
    }
  ]
};
