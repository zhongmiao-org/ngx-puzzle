import { DATE_PICKER_SELECTION_MODE_OPTIONS, ENABLE_OPTIONS, FONT_WEIGHT_CSS_OPTIONS, SIZE_OPTIONS } from './select-options.const';
import { EditorBaseField } from '../interfaces';

// 基本配置
export const CONTROL_BASIC_FIELDS: EditorBaseField = {
	label: '基本配置',
	key: 'basicConfig',
	path: 'basicConfig',
	schemaType: 'group',
	children: [
		{
			label: '别名',
			key: 'alias',
			path: 'alias',
			schemaType: 'text',
			defaultValue: '测试时间选择器',
		},
		{
			label: '绑定字段',
			key: 'bindField',
			path: 'bindField',
			schemaType: 'text',
			defaultValue: 'testField',
		},
		{
			label: '启用控件',
			key: 'isActive',
			path: 'isActive',
			schemaType: 'select',
			defaultValue: true,
			options: ENABLE_OPTIONS,
		},
	],
};

// 标签配置
export const CONTROL_LABEL_FIELDS: EditorBaseField = {
	label: '标签配置',
	key: 'label',
	path: 'label',
	schemaType: 'group',
	children: [
		{
			label: '显示标签',
			key: 'labelEnable',
			path: 'label.enable',
			schemaType: 'select',
			defaultValue: true,
			options: ENABLE_OPTIONS,
		},
		{
			label: '标签文本',
			key: 'labelText',
			path: 'label.text',
			schemaType: 'text',
			defaultValue: '标签',
		},
		{
			label: '标签描述',
			key: 'labelDescription',
			path: 'label.description',
			schemaType: 'text',
			defaultValue: '这是一个标签',
		},
		{
			label: '标签宽度 (px)',
			key: 'labelWidth',
			path: 'label.styles.width',
			schemaType: 'number',
			min: 30,
			max: 300,
			step: 1,
			defaultValue: 80,
		},
		{
			label: '字体大小 (px)',
			key: 'labelFontSize',
			path: 'label.styles.fontSize',
			schemaType: 'number',
			min: 10,
			max: 48,
			step: 1,
			defaultValue: 14,
		},
		{
			label: '是否加粗',
			key: 'labelFontWeight',
			path: 'label.styles.fontWeight',
			schemaType: 'select',
			defaultValue: 'normal',
			options: FONT_WEIGHT_CSS_OPTIONS,
		},
		{
			label: '行高',
			key: 'labelLineHeight',
			path: 'label.styles.lineHeight',
			schemaType: 'number',
		},
		{
			label: '标签颜色',
			key: 'labelColor',
			path: 'label.styles.color',
			schemaType: 'color',
		},
	],
};

// 日期选择器属性配置
export const CONTROL_DATEPICKER_FIELDS: EditorBaseField = {
	label: '控件属性',
	key: 'props',
	path: 'props',
	schemaType: 'group',
	children: [
		{
			label: '选取模式',
			key: 'selectionMode',
			path: 'props.selectionMode',
			schemaType: 'select',
			defaultValue: 'range',
			options: DATE_PICKER_SELECTION_MODE_OPTIONS,
		},
		{
			label: '组件大小',
			key: 'size',
			path: 'props.size',
			schemaType: 'select',
			defaultValue: 'large',
			options: SIZE_OPTIONS,
		},
		{
			label: '日期格式',
			key: 'dateFormat',
			path: 'props.dateFormat',
			schemaType: 'text',
			defaultValue: 'yy-mm-dd',
		},
		{
			label: '显示时间',
			key: 'showTime',
			path: 'props.showTime',
			schemaType: 'select',
			defaultValue: false,
			options: ENABLE_OPTIONS,
		},
		{
			label: '显示秒',
			key: 'showSeconds',
			path: 'props.showSeconds',
			schemaType: 'select',
			defaultValue: false,
			options: ENABLE_OPTIONS,
		},
		{
			label: '占位符',
			key: 'placeholder',
			path: 'props.placeholder',
			schemaType: 'text',
			defaultValue: '请选择日期',
		},
		{
			label: '显示清除按钮',
			key: 'showButtonBar',
			path: 'props.showButtonBar',
			schemaType: 'select',
			defaultValue: false,
			options: ENABLE_OPTIONS,
		},
		{
			label: '最小日期',
			key: 'minDate',
			path: 'props.minDate',
			schemaType: 'date',
			defaultValue: null,
		},
		{
			label: '最大日期',
			key: 'maxDate',
			path: 'props.maxDate',
			schemaType: 'date',
			defaultValue: null,
		},
	],
};

export const CONTROL_SELECT_FIELDS: EditorBaseField = {
	label: '控件属性',
	key: 'props',
	path: 'props',
	schemaType: 'group',
	children: [
		{
			label: '占位符',
			key: 'placeholder',
			path: 'props.placeholder',
			schemaType: 'text',
			defaultValue: '请选择',
		},
		{
			label: '显示清除按钮',
			key: 'showClear',
			path: 'props.showClear',
			schemaType: 'select',
			defaultValue: false,
			options: ENABLE_OPTIONS,
		},
		{
			label: '可过滤',
			key: 'filter',
			path: 'props.filter',
			schemaType: 'select',
			defaultValue: false,
			options: ENABLE_OPTIONS,
		},
		{
			label: '过滤占位符',
			key: 'filterPlaceholder',
			path: 'props.filterPlaceholder',
			schemaType: 'text',
			defaultValue: '搜索选项',
		},
		{
			label: '禁用状态',
			key: 'disabled',
			path: 'props.disabled',
			schemaType: 'select',
			defaultValue: false,
			options: ENABLE_OPTIONS,
		},
		{
			label: '选项标签字段',
			key: 'optionLabel',
			path: 'props.optionLabel',
			schemaType: 'text',
			defaultValue: 'label',
		},
		{
			label: '选项值字段',
			key: 'optionValue',
			path: 'props.optionValue',
			schemaType: 'text',
			defaultValue: 'value',
		},
		{
			label: '选项',
			key: 'propsOptions',
			path: 'props.options',
			schemaType: 'options-editor',
			defaultValue: [],
		},
	],
};

// MultiSelect 组件属性配置
export const CONTROL_MULTISELECT_FIELDS: EditorBaseField = {
	label: '控件属性',
	key: 'props',
	path: 'props',
	schemaType: 'group',
	children: [
		{
			label: '占位符',
			key: 'placeholder',
			path: 'props.placeholder',
			schemaType: 'text',
			defaultValue: '请选择',
		},
		{
			label: '显示清除按钮',
			key: 'showClear',
			path: 'props.showClear',
			schemaType: 'select',
			defaultValue: false,
			options: ENABLE_OPTIONS,
		},
		{
			label: '可过滤',
			key: 'filter',
			path: 'props.filter',
			schemaType: 'select',
			defaultValue: false,
			options: ENABLE_OPTIONS,
		},
		{
			label: '过滤占位符',
			key: 'filterPlaceholder',
			path: 'props.filterPlaceholder',
			schemaType: 'text',
			defaultValue: '搜索选项',
		},
		{
			label: '显示方式',
			key: 'display',
			path: 'props.display',
			schemaType: 'select',
			defaultValue: 'comma',
			options: [
				{ label: '逗号分隔', val: 'comma' },
				{ label: '标签显示', val: 'chip' },
			],
		},
		{
			label: '最大显示标签数',
			key: 'maxSelectedLabels',
			path: 'props.maxSelectedLabels',
			schemaType: 'number',
			min: 1,
			max: 10,
			step: 1,
			defaultValue: 3,
		},
		{
			label: '禁用状态',
			key: 'disabled',
			path: 'props.disabled',
			schemaType: 'select',
			defaultValue: false,
			options: ENABLE_OPTIONS,
		},
		{
			label: '选项标签字段',
			key: 'optionLabel',
			path: 'props.optionLabel',
			schemaType: 'text',
			defaultValue: 'label',
		},
		{
			label: '选项值字段',
			key: 'optionValue',
			path: 'props.optionValue',
			schemaType: 'text',
			defaultValue: 'value',
		},
		{
			label: '关闭图标',
			key: 'showToggleAll',
			path: 'props.showToggleAll',
			schemaType: 'select',
			defaultValue: true,
			options: ENABLE_OPTIONS,
		},
		{
			label: '选项',
			key: 'propsOptions',
			path: 'props.options',
			schemaType: 'options-editor',
			defaultValue: [],
		},
	],
};

// Input 组件属性配置
export const CONTROL_INPUT_FIELDS: EditorBaseField = {
	label: '控件属性',
	key: 'props',
	path: 'props',
	schemaType: 'group',
	children: [
		{
			label: '占位符',
			key: 'placeholder',
			path: 'props.placeholder',
			schemaType: 'text',
			defaultValue: '请输入内容',
		},
	],
};

// 默认值配置
export const CONTROL_VALUE_FIELDS: EditorBaseField = {
	label: '值配置',
	key: 'valueConfig',
	path: 'valueConfig',
	schemaType: 'group',
	children: [
		{
			label: '默认值',
			key: 'defaultValue',
			path: 'defaultValue',
			schemaType: 'date',
			defaultValue: null,
		},
	],
};

// DateTime 拆分为多个分组，保持字段 path 不变，便于分栏折叠
export const CONTROL_DATETIME_FIELDS_DISPLAY: EditorBaseField = {
	label: '显示与顺序',
	key: 'props',
	path: 'props',
	schemaType: 'group',
	children: [
		{ label: '显示日期', key: 'showDate', path: 'props.show.date', schemaType: 'select', defaultValue: true, options: ENABLE_OPTIONS },
		{ label: '显示时间', key: 'showTime', path: 'props.show.time', schemaType: 'select', defaultValue: true, options: ENABLE_OPTIONS },
		{
			label: '显示星期',
			key: 'showWeekday',
			path: 'props.show.weekday',
			schemaType: 'select',
			defaultValue: false,
			options: ENABLE_OPTIONS,
		},
		{
			label: '排列顺序',
			key: 'order',
			path: 'props.order',
			schemaType: 'select',
			defaultValue: 'date-time',
			options: [
				{ label: '日期在前', val: 'date-time' },
				{ label: '时间在前', val: 'time-date' },
			],
		},
		{
			label: '显示布局',
			key: 'layout',
			path: 'props.layout',
			schemaType: 'select',
			defaultValue: 'single',
			options: [
				{ label: '同一行', val: 'single' },
				{ label: '分别占行', val: 'separate' },
				{ label: '日期+星期同一行, 时间下一行', val: 'date-week-same-time-next' },
			],
		},
	],
};

export const CONTROL_DATETIME_FIELDS_DATE: EditorBaseField = {
	label: '日期设置',
	key: 'props',
	path: 'props',
	schemaType: 'group',
	children: [
		// 年份
		{
			label: '两位年份',
			key: 'yearTwoDigits',
			path: 'props.year.twoDigits',
			schemaType: 'select',
			defaultValue: false,
			options: ENABLE_OPTIONS,
		},
		{ label: '年份前缀', key: 'yearPrefix', path: 'props.year.prefix', schemaType: 'text', defaultValue: '' },
		{ label: '年份后缀', key: 'yearSuffix', path: 'props.year.suffix', schemaType: 'text', defaultValue: '' },

		// 月份
		{
			label: '月份显示模式',
			key: 'monthMode',
			path: 'props.month.mode',
			schemaType: 'select',
			defaultValue: 'number',
			options: [
				{ label: '数字', val: 'number' },
				{ label: '英文', val: 'en' },
				{ label: '中文', val: 'zh' },
			],
		},
		{
			label: '月份补零(数字)',
			key: 'monthPadZero',
			path: 'props.month.padZero',
			schemaType: 'select',
			defaultValue: true,
			options: ENABLE_OPTIONS,
		},
		{
			label: '英文月份样式',
			key: 'monthEnglish',
			path: 'props.month.english',
			schemaType: 'select',
			defaultValue: 'long',
			options: [
				{ label: '全称', val: 'long' },
				{ label: '缩写', val: 'short' },
			],
		},

		// 日期
		{ label: '日期补零', key: 'dayPadZero', path: 'props.day.padZero', schemaType: 'select', defaultValue: true, options: ENABLE_OPTIONS },
		{ label: '日期后缀', key: 'daySuffix', path: 'props.day.suffix', schemaType: 'text', defaultValue: '' },

		// 星期
		{
			label: '星期语言',
			key: 'weekdayLang',
			path: 'props.weekday.lang',
			schemaType: 'select',
			defaultValue: 'zh',
			options: [
				{ label: '中文', val: 'zh' },
				{ label: '英文', val: 'en' },
				{ label: '数字', val: 'number' },
			],
		},
		{
			label: '中文星期样式',
			key: 'weekdayZhStyle',
			path: 'props.weekday.zhStyle',
			schemaType: 'select',
			defaultValue: '星期',
			options: [
				{ label: '星期', val: '星期' },
				{ label: '周', val: '周' },
				{ label: '仅数字', val: 'none' },
			],
		},
		{
			label: '英文星期样式',
			key: 'weekdayEnStyle',
			path: 'props.weekday.enStyle',
			schemaType: 'select',
			defaultValue: 'long',
			options: [
				{ label: '全称', val: 'long' },
				{ label: '缩写', val: 'short' },
				{ label: '首字母', val: 'narrow' },
			],
		},
		{
			label: '星期数字样式',
			key: 'weekdayNumberStyle',
			path: 'props.weekday.numberStyle',
			schemaType: 'select',
			defaultValue: 'mon-1-7',
			options: [
				{ label: '周一=1..周日=7', val: 'mon-1-7' },
				{ label: '周日=0..周六=6', val: 'sun-0-6' },
			],
		},
	],
};

export const CONTROL_DATETIME_FIELDS_TIME: EditorBaseField = {
	label: '时间设置',
	key: 'props',
	path: 'props',
	schemaType: 'group',
	children: [
		{
			label: '时制',
			key: 'hourCycle',
			path: 'props.hourCycle',
			schemaType: 'select',
			defaultValue: 24,
			options: [
				{ label: '24小时制', val: 24 },
				{ label: '12小时制', val: 12 },
			],
		},
		{
			label: '小时补零',
			key: 'hourPadZero',
			path: 'props.hour.padZero',
			schemaType: 'select',
			defaultValue: true,
			options: ENABLE_OPTIONS,
		},
		{ label: '显示分钟', key: 'minuteShow', path: 'props.minute.show', schemaType: 'select', defaultValue: true, options: ENABLE_OPTIONS },
		{
			label: '分钟补零',
			key: 'minutePadZero',
			path: 'props.minute.padZero',
			schemaType: 'select',
			defaultValue: true,
			options: ENABLE_OPTIONS,
		},
		{ label: '显示秒', key: 'secondShow', path: 'props.second.show', schemaType: 'select', defaultValue: true, options: ENABLE_OPTIONS },
		{
			label: '秒补零',
			key: 'secondPadZero',
			path: 'props.second.padZero',
			schemaType: 'select',
			defaultValue: true,
			options: ENABLE_OPTIONS,
		},
	],
};

export const CONTROL_DATETIME_FIELDS_FORMAT: EditorBaseField = {
	label: '格式化',
	key: 'props',
	path: 'props',
	schemaType: 'group',
	children: [
		{ label: '自定义模板', key: 'customFormat', path: 'props.customFormat', schemaType: 'text', defaultValue: '' },
		{ label: '日期分隔符', key: 'dateSeparator', path: 'props.dateSeparator', schemaType: 'text', defaultValue: '-' },
		{ label: '时间分隔符', key: 'timeSeparator', path: 'props.timeSeparator', schemaType: 'text', defaultValue: ':' },
		{
			label: '中文日期样式',
			key: 'useChineseDate',
			path: 'props.useChineseDate',
			schemaType: 'select',
			defaultValue: false,
			options: ENABLE_OPTIONS,
		},
		{
			label: '中文时间样式',
			key: 'useChineseTime',
			path: 'props.useChineseTime',
			schemaType: 'select',
			defaultValue: false,
			options: ENABLE_OPTIONS,
		},
	],
};

export const CONTROL_DATETIME_FIELDS_UPDATE_TZ: EditorBaseField = {
	label: '自动更新与时区',
	key: 'props',
	path: 'props',
	schemaType: 'group',
	children: [
		{
			label: '启用自动更新',
			key: 'autoUpdateEnabled',
			path: 'props.autoUpdate.enabled',
			schemaType: 'select',
			defaultValue: true,
			options: ENABLE_OPTIONS,
		},
		{
			label: '更新间隔(秒)',
			key: 'autoUpdateIntervalSeconds',
			path: 'props.autoUpdate.intervalSeconds',
			schemaType: 'number',
			min: 1,
			max: 3600,
			step: 1,
			defaultValue: 1,
		},
		{
			label: '初始化即更新',
			key: 'updateOnLoad',
			path: 'props.updateOnLoad',
			schemaType: 'select',
			defaultValue: true,
			options: ENABLE_OPTIONS,
		},
		{
			label: '时区模式',
			key: 'timezoneMode',
			path: 'props.timezone.mode',
			schemaType: 'select',
			defaultValue: 'local',
			options: [
				{ label: '本地', val: 'local' },
				{ label: 'UTC', val: 'utc' },
				{ label: '自定义偏移', val: 'offset' },
			],
		},
		{
			label: '偏移(分钟)',
			key: 'timezoneOffsetMinutes',
			path: 'props.timezone.offsetMinutes',
			schemaType: 'number',
			min: -840,
			max: 840,
			step: 1,
			defaultValue: 0,
		},
	],
};

export const CONTROL_DATETIME_FIELDS_STYLES: EditorBaseField = {
	label: '样式',
	key: 'props',
	path: 'props',
	schemaType: 'group',
	children: [
		{ label: '颜色', key: 'color', path: 'props.styles.color', schemaType: 'color' },
		{ label: '字体大小(px)', key: 'fontSize', path: 'props.styles.fontSize', schemaType: 'number' },
		{
			label: '字重',
			key: 'fontWeight',
			path: 'props.styles.fontWeight',
			schemaType: 'select',
			defaultValue: 'normal',
			options: FONT_WEIGHT_CSS_OPTIONS,
		},
  { label: '字体', key: 'fontFamily', path: 'props.styles.fontFamily', schemaType: 'select', defaultValue: undefined, options: [
  			{ label: '默认项', val: undefined },
  			{ label: 'DS-Digital', val: 'DS-Digital' },
  			{ label: 'QTypeCond-Medium', val: 'QTypeCond-Medium' },
  			{ label: 'TitilliumWeb-Black', val: 'TitilliumWeb-Black' },
  		] },
		{
			label: '对齐',
			key: 'textAlign',
			path: 'props.styles.textAlign',
			schemaType: 'select',
			defaultValue: 'left',
			options: [
				{ label: '左对齐', val: 'left' },
				{ label: '居中', val: 'center' },
				{ label: '右对齐', val: 'right' },
			],
		},
		{ label: '背景色', key: 'backgroundColor', path: 'props.styles.backgroundColor', schemaType: 'color' },
		{ label: '边框粗细(px)', key: 'borderWidth', path: 'props.styles.borderWidth', schemaType: 'number' },
		{ label: '边框颜色', key: 'borderColor', path: 'props.styles.borderColor', schemaType: 'color' },
		{ label: '边框样式', key: 'borderStyle', path: 'props.styles.borderStyle', schemaType: 'select', defaultValue: 'solid', options: [
			{ label: '无', val: 'none' },
			{ label: '实线', val: 'solid' },
			{ label: '虚线', val: 'dashed' },
			{ label: '点线', val: 'dotted' },
			{ label: '双线', val: 'double' },
		]},
		{ label: '圆角', key: 'borderRadius', path: 'props.styles.borderRadius', schemaType: 'number' },
		{ label: '内边距', key: 'padding', path: 'props.styles.padding', schemaType: 'number' },
	],
};

// 兼容旧引用：保留聚合版本（不再在 config 中使用）
export const CONTROL_DATETIME_FIELDS: EditorBaseField = {
	label: '控件属性',
	key: 'props',
	path: 'props',
	schemaType: 'group',
	children: [
		// 显示控制 & 排列
		{ label: '显示日期', key: 'showDate', path: 'props.show.date', schemaType: 'select', defaultValue: true, options: ENABLE_OPTIONS },
		{ label: '显示时间', key: 'showTime', path: 'props.show.time', schemaType: 'select', defaultValue: true, options: ENABLE_OPTIONS },
		{
			label: '显示星期',
			key: 'showWeekday',
			path: 'props.show.weekday',
			schemaType: 'select',
			defaultValue: false,
			options: ENABLE_OPTIONS,
		},
		{
			label: '排列顺序',
			key: 'order',
			path: 'props.order',
			schemaType: 'select',
			defaultValue: 'date-time',
			options: [
				{ label: '日期在前', val: 'date-time' },
				{ label: '时间在前', val: 'time-date' },
			],
		},

		// 年份
		{
			label: '两位年份',
			key: 'yearTwoDigits',
			path: 'props.year.twoDigits',
			schemaType: 'select',
			defaultValue: false,
			options: ENABLE_OPTIONS,
		},
		{ label: '年份前缀', key: 'yearPrefix', path: 'props.year.prefix', schemaType: 'text', defaultValue: '' },
		{ label: '年份后缀', key: 'yearSuffix', path: 'props.year.suffix', schemaType: 'text', defaultValue: '' },

		// 月份
		{
			label: '月份显示模式',
			key: 'monthMode',
			path: 'props.month.mode',
			schemaType: 'select',
			defaultValue: 'number',
			options: [
				{ label: '数字', val: 'number' },
				{ label: '英文', val: 'en' },
				{ label: '中文', val: 'zh' },
			],
		},
		{
			label: '月份补零(数字)',
			key: 'monthPadZero',
			path: 'props.month.padZero',
			schemaType: 'select',
			defaultValue: true,
			options: ENABLE_OPTIONS,
		},
		{
			label: '英文月份样式',
			key: 'monthEnglish',
			path: 'props.month.english',
			schemaType: 'select',
			defaultValue: 'long',
			options: [
				{ label: '全称', val: 'long' },
				{ label: '缩写', val: 'short' },
			],
		},

		// 日期
		{ label: '日期补零', key: 'dayPadZero', path: 'props.day.padZero', schemaType: 'select', defaultValue: true, options: ENABLE_OPTIONS },
		{ label: '日期后缀', key: 'daySuffix', path: 'props.day.suffix', schemaType: 'text', defaultValue: '' },

		// 星期
		{
			label: '显示星期',
			key: 'weekdayShow',
			path: 'props.weekday.show',
			schemaType: 'select',
			defaultValue: false,
			options: ENABLE_OPTIONS,
		},
		{
			label: '星期语言',
			key: 'weekdayLang',
			path: 'props.weekday.lang',
			schemaType: 'select',
			defaultValue: 'zh',
			options: [
				{ label: '中文', val: 'zh' },
				{ label: '英文', val: 'en' },
				{ label: '数字', val: 'number' },
			],
		},
		{
			label: '中文星期样式',
			key: 'weekdayZhStyle',
			path: 'props.weekday.zhStyle',
			schemaType: 'select',
			defaultValue: '星期',
			options: [
				{ label: '星期', val: '星期' },
				{ label: '周', val: '周' },
				{ label: '仅数字', val: 'none' },
			],
		},
		{
			label: '英文星期样式',
			key: 'weekdayEnStyle',
			path: 'props.weekday.enStyle',
			schemaType: 'select',
			defaultValue: 'long',
			options: [
				{ label: '全称', val: 'long' },
				{ label: '缩写', val: 'short' },
				{ label: '首字母', val: 'narrow' },
			],
		},
		{
			label: '星期数字样式',
			key: 'weekdayNumberStyle',
			path: 'props.weekday.numberStyle',
			schemaType: 'select',
			defaultValue: 'mon-1-7',
			options: [
				{ label: '周一=1..周日=7', val: 'mon-1-7' },
				{ label: '周日=0..周六=6', val: 'sun-0-6' },
			],
		},

		// 时间显示
		{
			label: '时制',
			key: 'hourCycle',
			path: 'props.hourCycle',
			schemaType: 'select',
			defaultValue: 24,
			options: [
				{ label: '24小时制', val: 24 },
				{ label: '12小时制', val: 12 },
			],
		},
		{
			label: '小时补零',
			key: 'hourPadZero',
			path: 'props.hour.padZero',
			schemaType: 'select',
			defaultValue: true,
			options: ENABLE_OPTIONS,
		},
		{ label: '显示分钟', key: 'minuteShow', path: 'props.minute.show', schemaType: 'select', defaultValue: true, options: ENABLE_OPTIONS },
		{
			label: '分钟补零',
			key: 'minutePadZero',
			path: 'props.minute.padZero',
			schemaType: 'select',
			defaultValue: true,
			options: ENABLE_OPTIONS,
		},
		{ label: '显示秒', key: 'secondShow', path: 'props.second.show', schemaType: 'select', defaultValue: true, options: ENABLE_OPTIONS },
		{
			label: '秒补零',
			key: 'secondPadZero',
			path: 'props.second.padZero',
			schemaType: 'select',
			defaultValue: true,
			options: ENABLE_OPTIONS,
		},

		// 格式化
		{ label: '自定义模板', key: 'customFormat', path: 'props.customFormat', schemaType: 'text', defaultValue: '' },
		{ label: '日期分隔符', key: 'dateSeparator', path: 'props.dateSeparator', schemaType: 'text', defaultValue: '-' },
		{ label: '时间分隔符', key: 'timeSeparator', path: 'props.timeSeparator', schemaType: 'text', defaultValue: ':' },
		{
			label: '中文日期样式',
			key: 'useChineseDate',
			path: 'props.useChineseDate',
			schemaType: 'select',
			defaultValue: false,
			options: ENABLE_OPTIONS,
		},
		{
			label: '中文时间样式',
			key: 'useChineseTime',
			path: 'props.useChineseTime',
			schemaType: 'select',
			defaultValue: false,
			options: ENABLE_OPTIONS,
		},

		// 自动更新 & 时区
		{
			label: '启用自动更新',
			key: 'autoUpdateEnabled',
			path: 'props.autoUpdate.enabled',
			schemaType: 'select',
			defaultValue: true,
			options: ENABLE_OPTIONS,
		},
		{
			label: '更新间隔(秒)',
			key: 'autoUpdateIntervalSeconds',
			path: 'props.autoUpdate.intervalSeconds',
			schemaType: 'number',
			min: 1,
			max: 3600,
			step: 1,
			defaultValue: 1,
		},
		{
			label: '初始化即更新',
			key: 'updateOnLoad',
			path: 'props.updateOnLoad',
			schemaType: 'select',
			defaultValue: true,
			options: ENABLE_OPTIONS,
		},
		{
			label: '时区模式',
			key: 'timezoneMode',
			path: 'props.timezone.mode',
			schemaType: 'select',
			defaultValue: 'local',
			options: [
				{ label: '本地', val: 'local' },
				{ label: 'UTC', val: 'utc' },
				{ label: '自定义偏移', val: 'offset' },
			],
		},
		{
			label: '偏移(分钟)',
			key: 'timezoneOffsetMinutes',
			path: 'props.timezone.offsetMinutes',
			schemaType: 'number',
			min: -840,
			max: 840,
			step: 1,
			defaultValue: 0,
		},

		// 样式
		{ label: '颜色', key: 'color', path: 'props.styles.color', schemaType: 'color' },
		{ label: '字体大小(px)', key: 'fontSize', path: 'props.styles.fontSize', schemaType: 'number' },
		{
			label: '字重',
			key: 'fontWeight',
			path: 'props.styles.fontWeight',
			schemaType: 'select',
			defaultValue: 'normal',
			options: FONT_WEIGHT_CSS_OPTIONS,
		},
  { label: '字体', key: 'fontFamily', path: 'props.styles.fontFamily', schemaType: 'select', defaultValue: undefined, options: [
  		{ label: '默认项', val: undefined },
  		{ label: 'DS-Digital', val: 'DS-Digital' },
  		{ label: 'QTypeCond-Medium', val: 'QTypeCond-Medium' },
  		{ label: 'TitilliumWeb-Black', val: 'TitilliumWeb-Black' },
  	] },
		{
			label: '对齐',
			key: 'textAlign',
			path: 'props.styles.textAlign',
			schemaType: 'select',
			defaultValue: 'left',
			options: [
				{ label: '左对齐', val: 'left' },
				{ label: '居中', val: 'center' },
				{ label: '右对齐', val: 'right' },
			],
		},
		{ label: '背景色', key: 'backgroundColor', path: 'props.styles.backgroundColor', schemaType: 'color' },
		{ label: '边框粗细(px)', key: 'borderWidth', path: 'props.styles.borderWidth', schemaType: 'number' },
		{ label: '边框颜色', key: 'borderColor', path: 'props.styles.borderColor', schemaType: 'color' },
		{ label: '边框样式', key: 'borderStyle', path: 'props.styles.borderStyle', schemaType: 'select', defaultValue: 'solid', options: [
			{ label: '无', val: 'none' },
			{ label: '实线', val: 'solid' },
			{ label: '虚线', val: 'dashed' },
			{ label: '点线', val: 'dotted' },
			{ label: '双线', val: 'double' },
		]},
		{ label: '圆角', key: 'borderRadius', path: 'props.styles.borderRadius', schemaType: 'number' },
		{ label: '内边距', key: 'padding', path: 'props.styles.padding', schemaType: 'number' },
	],
};

// function createControlBindFields(): EditorBaseField {
// 	const controlsService = inject(ControlsService);
//
// 	return {
// 		label: '控件绑定',
// 		key: 'refreshConfig',
// 		path: 'refreshConfig',
// 		schemaType: 'group',
// 		children: [
// 			{
// 				label: '绑定控件',
// 				key: 'controlIds',
// 				path: 'controlIds',
// 				schemaType: 'multiSelect',
// 				// 直接使用流作为选项源
// 				optionsStream: controlsService.availableControlOptions$,
// 				defaultValue: [],
// 			},
// 		]
// 	};
// }
