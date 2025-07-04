import { EditorFields, EditorStyleField, EditorTab } from '../interfaces';
import { mainTypes } from '../types';

// 通用样式设置
const BASE_STYLE_FIELDS: EditorStyleField[] = [
	{ label: '背景图片X轴偏移', key: 'backgroundPositionX', schemaType: 'number', suffix: '%' },
	{ label: '背景图片Y轴偏移', key: 'backgroundPositionY', schemaType: 'number', suffix: '%' },
	{ label: '背景图片缩放比例', key: 'backgroundSize', schemaType: 'number', suffix: '%' },
	{ label: '上内边距', key: 'paddingTop', schemaType: 'number' },
	{ label: '下内边距', key: 'paddingBottom', schemaType: 'number' },
	{ label: '左内边距', key: 'paddingLeft', schemaType: 'number' },
	{ label: '右内边距', key: 'paddingRight', schemaType: 'number' },
];

export const EDITOR_FIELDS_MAP: {
	[key in mainTypes]: {
		fields: EditorFields[]; // 通用字段
		styles: EditorStyleField[]; // 样式字段
	};
} = {
	canvas: {
		fields: [
			{ label: '宽度', key: 'width', schemaType: 'number' },
			{ label: '高度', key: 'height', schemaType: 'number' },
		],
		styles: [
			{ label: '背景颜色', key: 'backgroundColor', schemaType: 'color' },
			{ label: '背景颜色透明度', key: 'backgroundColorAlpha', schemaType: 'number', step: 0.1, min: 0.1, max: 1 },
			{
				label: '背景图片',
				key: 'backgroundImage',
				schemaType: 'select-image',
				options: [
					{
						val: `url("./image/background-images/background.png")`,
						label: `背景1`,
					},
					{
						val: `url("./image/background-images/bg1.png")`,
						label: `背景2`,
					},
					{
						val: `url("./image/background-images/bg2.png")`,
						label: `背景3`,
					},
					{
						val: `url("./image/bi/1/bg_02.jpg")`,
						label: `背景4`,
					},
				],
			},
		],
	},
	chart: {
		fields: [
			{ label: '宽度', key: 'width', schemaType: 'number' },
			{ label: '高度', key: 'height', schemaType: 'number' },
			{ label: 'X', key: 'positionX', schemaType: 'number' },
			{ label: 'Y', key: 'positionY', schemaType: 'number' },
		],
		styles: [
			{ label: '背景颜色', key: 'backgroundColor', schemaType: 'color' },
			{ label: '背景颜色透明度', key: 'backgroundColorAlpha', schemaType: 'number', step: 0.1, min: 0.1, max: 1 },
			{
				label: '背景图片',
				key: 'backgroundImage',
				schemaType: 'select-image',
				options: [
					{
						val: `url("./image/background-images/border-big.png")`,
						label: `背景1`,
					},
					{
						val: `url("./image/bi/1/mainl1-bg.png")`,
						label: `背景2`,
					},
				],
			},
			...BASE_STYLE_FIELDS,
		],
	},
	table: {
		fields: [
			{ label: '宽度', key: 'width', schemaType: 'number' },
			{ label: '高度', key: 'height', schemaType: 'number' },
			{ label: 'X', key: 'positionX', schemaType: 'number' },
			{ label: 'Y', key: 'positionY', schemaType: 'number' },
		],
		styles: [
			{ label: '背景颜色', key: 'backgroundColor', schemaType: 'color' },
			{ label: '背景颜色透明度', key: 'backgroundColorAlpha', schemaType: 'number', step: 0.1, min: 0.1, max: 1 },
			{
				label: '背景图片',
				key: 'backgroundImage',
				schemaType: 'select-image',
				options: [
					{
						val: `url("./image/background-images/border-big.png")`,
						label: `背景1`,
					},
					{
						val: `url("./image/bi/1/mainl1-bg.png")`,
						label: `背景2`,
					},
				],
			},
			...BASE_STYLE_FIELDS,
		],
	},
	text: {
		fields: [
			{ label: '宽度', key: 'width', schemaType: 'number' },
			{ label: '高度', key: 'height', schemaType: 'number' },
			{ label: 'X', key: 'positionX', schemaType: 'number' },
			{ label: 'Y', key: 'positionY', schemaType: 'number' },
		],
		styles: [
			{ label: '背景颜色', key: 'backgroundColor', schemaType: 'color' },
			{ label: '背景颜色透明度', key: 'backgroundColorAlpha', schemaType: 'number', step: 0.1, min: 0.1, max: 1 },
			{
				label: '背景图片',
				key: 'backgroundImage',
				schemaType: 'select-image',
				options: [
					{
						val: `url("./image/bi/1/mainl-12.png")`,
						label: `背景1`,
					},
					{
						val: `url("./image/bi/1/mainl-13.png")`,
						label: `背景2`,
					},
				],
			},
			...BASE_STYLE_FIELDS,
		],
	},
};

export const BASE_TAB: EditorTab = { title: '外观', value: 'appearance', icon: 'editor:appearance-settings' };

export const DATA_TAB: EditorTab = { title: '数据', value: 'advanced', icon: 'editor:advanced-settings' };

export const STYLE_TAB: EditorTab = { title: '样式', value: 'text', icon: 'editor:text-settings' };
