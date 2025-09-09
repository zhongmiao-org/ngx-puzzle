import { EditorTableField } from '../../../interfaces';

export const TABLE_FORMATS: EditorTableField = {
  label: '数据格式配置',
  key: 'formatsGroup',
  schemaType: 'group',
  children: [
    {
      label: '数据格式',
      key: 'formats',
      path: 'formats',
      schemaType: 'array',
      description: '定义数据的显示格式，包括货币、百分比、日期等格式规则',
      children: [
        {
          label: '格式名称',
          key: 'name',
          path: 'name',
          schemaType: 'text',
          description: '格式的唯一标识符，用于在度量值中引用此格式',
          defaultValue: 'custom_format'
        },

        {
          label: '格式类型',
          key: 'formatType',
          schemaType: 'select',
          defaultValue: 'number',
          options: [
            { label: '数值格式', val: 'number' },
            { label: '货币格式', val: 'currency' },
            { label: '百分比格式', val: 'percent' },
            { label: '日期格式', val: 'date' },
            { label: '时间格式', val: 'time' },
            { label: '自定义格式', val: 'custom' }
          ],
          description: '选择数据格式的类型'
        },

        // 数值格式配置
        {
          label: '数值配置',
          key: 'numberConfig',
          schemaType: 'group',
          visibleWhen: (values: any) => ['number', 'currency', 'percent'].includes(values.formatType),
          children: [
            {
              label: '小数位数',
              key: 'decimalPlaces',
              path: 'decimalPlaces',
              schemaType: 'number',
              min: 0,
              max: 10,
              step: 1,
              defaultValue: 2,
              description: '设置小数点后的位数'
            },

            {
              label: '千位分隔符',
              key: 'thousandsSeparator',
              path: 'thousandsSeparator',
              schemaType: 'select',
              options: [
                { label: '逗号 (,)', val: ',' },
                { label: '空格 ( )', val: ' ' },
                { label: '点号 (.)', val: '.' },
                { label: '无', val: '' }
              ],
              defaultValue: ',',
              description: '设置千位数分隔符'
            },

            {
              label: '小数分隔符',
              key: 'decimalSeparator',
              path: 'decimalSeparator',
              schemaType: 'select',
              options: [
                { label: '点号 (.)', val: '.' },
                { label: '逗号 (,)', val: ',' }
              ],
              defaultValue: '.',
              description: '设置小数点分隔符'
            },

            {
              label: '负数格式',
              key: 'negativeNumberFormat',
              path: 'negativeNumberFormat',
              schemaType: 'select',
              options: [
                { label: '-1234', val: 'minus' },
                { label: '(1234)', val: 'parentheses' },
                { label: '1234-', val: 'trailing_minus' },
                { label: '[1234]', val: 'brackets' }
              ],
              defaultValue: 'minus',
              description: '设置负数的显示格式'
            },

            {
              label: '零值显示',
              key: 'nullValue',
              path: 'nullValue',
              schemaType: 'text',
              defaultValue: '0',
              description: '设置零值或空值的显示文本'
            }
          ]
        },

        // 货币格式配置
        {
          label: '货币配置',
          key: 'currencyConfig',
          schemaType: 'group',
          visibleWhen: (values: any) => values.formatType === 'currency',
          children: [
            {
              label: '货币符号',
              key: 'currencySymbol',
              path: 'currencySymbol',
              schemaType: 'select',
              options: [
                { label: '美元 ($)', val: '$' },
                { label: '人民币 (¥)', val: '¥' },
                { label: '欧元 (€)', val: '€' },
                { label: '英镑 (£)', val: '£' },
                { label: '日元 (¥)', val: '¥' },
                { label: '韩元 (₩)', val: '₩' },
                { label: '自定义', val: 'custom' }
              ],
              defaultValue: '$',
              description: '选择货币符号'
            },

            {
              label: '自定义货币符号',
              key: 'customCurrencySymbol',
              schemaType: 'text',
              visibleWhen: (values: any) => values.currencySymbol === 'custom',
              description: '输入自定义的货币符号',
              defaultValue: '$'
            },

            {
              label: '货币符号位置',
              key: 'currencySymbolAlign',
              path: 'currencySymbolAlign',
              schemaType: 'select',
              options: [
                { label: '左侧', val: 'left' },
                { label: '右侧', val: 'right' }
              ],
              defaultValue: 'left',
              description: '设置货币符号的位置'
            },

            {
              label: '货币符号间距',
              key: 'currencySymbolSpace',
              schemaType: 'select',
              options: [
                { label: '无间距', val: 'none' },
                { label: '一个空格', val: 'space' },
                { label: '不换行空格', val: 'nbsp' }
              ],
              defaultValue: 'none',
              description: '设置货币符号与数值之间的间距'
            }
          ]
        },

        // 百分比格式配置
        {
          label: '百分比配置',
          key: 'percentConfig',
          schemaType: 'group',
          visibleWhen: (values: any) => values.formatType === 'percent',
          children: [
            {
              label: '乘数',
              key: 'multiplier',
              schemaType: 'number',
              defaultValue: 100,
              min: 1,
              max: 1000,
              step: 1,
              description: '将原始值乘以此数后再显示（通常为100）'
            },

            {
              label: '百分号位置',
              key: 'percentSymbolAlign',
              schemaType: 'select',
              options: [
                { label: '右侧', val: 'right' },
                { label: '左侧', val: 'left' }
              ],
              defaultValue: 'right',
              description: '设置百分号(%)的位置'
            }
          ]
        },

        // 日期时间格式配置
        {
          label: '日期时间配置',
          key: 'dateTimeConfig',
          schemaType: 'group',
          visibleWhen: (values: any) => ['date', 'time'].includes(values.formatType),
          children: [
            {
              label: '日期格式模板',
              key: 'datePattern',
              schemaType: 'select',
              visibleWhen: (values: any) => values.formatType === 'date',
              options: [
                { label: 'YYYY-MM-DD', val: 'YYYY-MM-DD' },
                { label: 'MM/DD/YYYY', val: 'MM/DD/YYYY' },
                { label: 'DD/MM/YYYY', val: 'DD/MM/YYYY' },
                { label: 'YYYY年MM月DD日', val: 'YYYY年MM月DD日' },
                { label: 'MM月DD日', val: 'MM月DD日' },
                { label: '自定义', val: 'custom' }
              ],
              defaultValue: 'YYYY-MM-DD',
              description: '选择日期显示格式'
            },

            {
              label: '时间格式模板',
              key: 'timePattern',
              schemaType: 'select',
              visibleWhen: (values: any) => values.formatType === 'time',
              options: [
                { label: 'HH:mm:ss', val: 'HH:mm:ss' },
                { label: 'HH:mm', val: 'HH:mm' },
                { label: 'hh:mm:ss A', val: 'hh:mm:ss A' },
                { label: 'hh:mm A', val: 'hh:mm A' },
                { label: '自定义', val: 'custom' }
              ],
              defaultValue: 'HH:mm:ss',
              description: '选择时间显示格式'
            },

            {
              label: '自定义模板',
              key: 'customPattern',
              schemaType: 'text',
              visibleWhen: (values: any) => values.datePattern === 'custom' || values.timePattern === 'custom',
              description: '输入自定义的日期时间格式模板',
              defaultValue: 'YYYY-MM-DD HH:mm:ss'
            }
          ]
        },

        // 自定义格式配置
        {
          label: '自定义格式',
          key: 'customFormatConfig',
          schemaType: 'group',
          visibleWhen: (values: any) => values.formatType === 'custom',
          children: [
            {
              label: '格式表达式',
              key: 'format',
              path: 'format',
              schemaType: 'text',
              description: '输入自定义格式表达式，如：#,##0.00',
              defaultValue: '#,##0.00'
            },

            {
              label: '正数格式',
              key: 'positiveFormat',
              schemaType: 'text',
              description: '正数的显示格式',
              defaultValue: '#,##0.00'
            },

            {
              label: '负数格式',
              key: 'negativeFormat',
              schemaType: 'text',
              description: '负数的显示格式',
              defaultValue: '-#,##0.00'
            },

            {
              label: '零值格式',
              key: 'zeroFormat',
              schemaType: 'text',
              description: '零值的显示格式',
              defaultValue: '0.00'
            }
          ]
        },

        // 高级选项
        {
          label: '高级选项',
          key: 'advancedOptions',
          schemaType: 'group',
          children: [
            {
              label: '格式条件',
              key: 'condition',
              schemaType: 'text',
              description: '设置应用此格式的条件表达式，如：#value > 1000',
            },

            {
              label: '格式优先级',
              key: 'priority',
              schemaType: 'number',
              min: 1,
              max: 100,
              defaultValue: 10,
              description: '当多个格式匹配时的优先级（数值越大优先级越高）'
            },

            {
              label: '启用格式',
              key: 'enabled',
              schemaType: 'select',
              options: [
                { label: '启用', val: true },
                { label: '禁用', val: false }
              ],
              defaultValue: true,
              description: '是否启用此格式配置'
            }
          ]
        }
      ]
    }
  ]
};

