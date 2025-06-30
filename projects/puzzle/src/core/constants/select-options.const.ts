import { BaseSelectOption } from '../interfaces';
import { rowGroupingDisplayType, rowGroupPanelShowTypes } from '../types';
import { Is } from '../enums';

/**
 * 图表
 */
export const ENABLE_OPTIONS: BaseSelectOption[] = [
	{ label: '启用', val: true },
	{ label: '禁用', val: false },
];

export const YES_OR_NO_OPTIONS: BaseSelectOption[] = [
	{ label: '是', val: true },
	{ label: '否', val: false },
];

export const IS_OPTIONS: BaseSelectOption<Is>[] = [
	{ label: '是', val: Is.yes },
	{ label: '否', val: Is.no },
];

export const FONT_WEIGHT_OPTIONS: BaseSelectOption[] = [
	{ label: '默认', val: 'normal' },
	{ label: '加粗', val: 'bold' },
];

export const AXIS_POSITION_OPTIONS: BaseSelectOption[] = [
	{ label: '底部', val: 'bottom' },
	{ label: '顶部', val: 'top' },
	{ label: '左侧', val: 'left' },
	{ label: '右侧', val: 'right' },
];

export const AGGREGATION_OPTIONS: BaseSelectOption[] = [
	{ label: '求和', val: 'sum' },
	{ label: '平均值', val: 'mean' },
	{ label: '计数', val: 'count' },
];

export const ORIENTATION_OPTIONS: BaseSelectOption[] = [
	{ label: '固定', val: 'fixed' },
	{ label: '平行', val: 'parallel' },
	{ label: '垂直', val: 'perpendicular' },
];

export const DIRECTION_OPTIONS: BaseSelectOption[] = [
	{ label: '水平排列', val: 'horizontal' },
	{ label: '垂直排列', val: 'vertical' },
];

export const POLAR_AXIS_SHAPE_OPTIONS: BaseSelectOption[] = [
	{ label: '多边形', val: 'polygon' },
	{ label: '圆形', val: 'circle' },
];

export const ROW_GROUP_PANEL_OPTIONS: BaseSelectOption<rowGroupPanelShowTypes>[] = [
	{ label: '总是', val: 'always' },
	{ label: '仅分组时', val: 'onlyWhenGrouping' },
	{ label: '从不', val: 'never' },
];

export const GROUP_DISPLAY_TYPE_OPTIONS: BaseSelectOption<rowGroupingDisplayType>[] = [
	{ label: '简单分组', val: 'singleColumn' },
	{ label: '多选列', val: 'multipleColumns' },
	{ label: '分组行', val: 'groupRows' },
];

export const COLOR_OPTIONS: BaseSelectOption[] = [
	{ label: '纯白', val: '#FFFFFF' },
	{ label: '黑色', val: '#000000' },
	{ label: '红色', val: '#FF0000' },
	{ label: '深红', val: '#8B0000' },
	{ label: '玫瑰红', val: '#FF007F' },
	{ label: '番茄红', val: '#FF6347' },
	{ label: '珊瑚红', val: '#FF7F50' },
	{ label: '印度红', val: '#CD5C5C' },
	{ label: '栗色', val: '#800000' },
	{ label: '粉红', val: '#FFC0CB' },
	{ label: '亮粉', val: '#FF69B4' },
	{ label: '深粉', val: '#FF1493' },
	{ label: '紫红', val: '#C71585' },
	{ label: '薰衣草紫', val: '#E6E6FA' },
	{ label: '紫色', val: '#800080' },
	{ label: '深紫', val: '#9400D3' },
	{ label: '蓝紫', val: '#8A2BE2' },
	{ label: '靛蓝', val: '#4B0082' },
	{ label: '蓝色', val: '#0000FF' },
	{ label: '深蓝', val: '#00008B' },
	{ label: '天蓝', val: '#87CEEB' },
	{ label: '浅蓝', val: '#ADD8E6' },
	{ label: '钢蓝', val: '#4682B4' },
	{ label: '皇家蓝', val: '#4169E1' },
	{ label: '矢车菊蓝', val: '#6495ED' },
	{ label: '绿松石', val: '#40E0D0' },
	{ label: '青色', val: '#00FFFF' },
	{ label: '深青', val: '#008B8B' },
	{ label: '蓝绿', val: '#008080' },
	{ label: '绿色', val: '#00FF00' },
	{ label: '深绿', val: '#006400' },
	{ label: '黄绿', val: '#9ACD32' },
	{ label: '春绿', val: '#00FF7F' },
	{ label: '薄荷绿', val: '#98FF98' },
	{ label: '橄榄绿', val: '#808000' },
	{ label: '深橄榄', val: '#556B2F' },
	{ label: '柠檬绿', val: '#32CD32' },
	{ label: '酸橙绿', val: '#00FF00' },
	{ label: '黄色', val: '#FFFF00' },
	{ label: '金色', val: '#FFD700' },
	{ label: '浅黄', val: '#FFFFE0' },
	{ label: '卡其色', val: '#F0E68C' },
	{ label: '深卡其', val: '#BDB76B' },
	{ label: '橙色', val: '#FFA500' },
	{ label: '深橙', val: '#FF8C00' },
	{ label: '珊瑚橙', val: '#FF7F50' },
	{ label: '番茄橙', val: '#FF6347' },
	{ label: '巧克力色', val: '#D2691E' },
	{ label: '棕色', val: '#A52A2A' },
	{ label: '深棕', val: '#8B4513' },
	{ label: '红木色', val: '#CD853F' },
	{ label: '沙棕色', val: '#F4A460' },
	{ label: '玫瑰棕', val: '#BC8F8F' },
	{ label: '银灰色', val: '#C0C0C0' },
	{ label: '灰色', val: '#808080' },
	{ label: '深灰', val: '#A9A9A9' },
	{ label: '浅灰', val: '#D3D3D3' },
	{ label: '暗灰', val: '#696969' },
	{ label: '石板灰', val: '#708090' },
	{ label: '亮珊瑚', val: '#F08080' },
	{ label: '桃红色', val: '#FFDAB9' },
	{ label: '秘鲁色', val: '#CD853F' },
	{ label: '粉珊瑚', val: '#F08080' },
	{ label: '深粉红', val: '#FF1493' },
	{ label: '热粉红', val: '#FF69B4' },
	{ label: '兰花紫', val: '#DA70D6' },
	{ label: '紫罗兰', val: '#EE82EE' },
	{ label: '洋红', val: '#FF00FF' },
	{ label: '深洋红', val: '#8B008B' },
	{ label: '紫水晶', val: '#9966CC' },
	{ label: '中紫', val: '#9370DB' },
	{ label: '中蓝', val: '#0000CD' },
	{ label: '午夜蓝', val: '#191970' },
	{ label: '海军蓝', val: '#000080' },
	{ label: '道奇蓝', val: '#1E90FF' },
	{ label: '爱丽丝蓝', val: '#F0F8FF' },
	{ label: '天青蓝', val: '#00BFFF' },
	{ label: '淡蓝', val: '#B0E0E6' },
	{ label: '粉蓝', val: '#87CEFA' },
	{ label: '浅天蓝', val: '#87CEFA' },
	{ label: '孔雀蓝', val: '#33A1C9' },
	{ label: '宝石蓝', val: '#007BA7' },
	{ label: '深宝石蓝', val: '#0047AB' },
	{ label: '绿松石蓝', val: '#00CED1' },
	{ label: '中绿松石', val: '#48D1CC' },
	{ label: '暗绿松石', val: '#00CED1' },
	{ label: '浅海绿', val: '#20B2AA' },
	{ label: '中春绿', val: '#00FA9A' },
	{ label: '海洋绿', val: '#3CB371' },
	{ label: '浅海洋绿', val: '#20B2AA' },
	{ label: '深海洋绿', val: '#8FBC8F' },
	{ label: '淡绿', val: '#90EE90' },
	{ label: '黄绿色', val: '#ADFF2F' },
	{ label: '暗橄榄绿', val: '#556B2F' },
	{ label: '深黄绿', val: '#9ACD32' },
	{ label: '黄柠檬', val: '#FFFACD' },
	{ label: '浅金黄', val: '#FAFAD2' },
	{ label: '金菊黄', val: '#DAA520' },
	{ label: '暗金黄', val: '#B8860B' },
	{ label: '玫瑰金', val: '#E6BE8A' },
	{ label: '古铜色', val: '#CD7F32' },
	{ label: '铜色', val: '#B87333' },
	{ label: '浅铜', val: '#D2691E' },
	{ label: '赤陶色', val: '#CC4E5C' },
	{ label: '砖红色', val: '#B22222' },
	{ label: '深红木', val: '#E97451' },
	{ label: '印度红木', val: '#CD5C5C' },
	{ label: '鲑鱼红', val: '#FA8072' },
	{ label: '深鲑鱼', val: '#E9967A' },
	{ label: '浅鲑鱼', val: '#FFA07A' },
	{ label: '珊瑚粉', val: '#FF6F61' },
	{ label: '橙红色', val: '#FF4500' },
	{ label: '深橙红', val: '#FF8C00' },
	{ label: '霓虹橙', val: '#FF5F1F' },
	{ label: '琥珀色', val: '#FFBF00' },
	{ label: '蜂蜜色', val: '#F5B700' },
	{ label: '芥末黄', val: '#FFDB58' },
	{ label: '玉米黄', val: '#FFF380' },
	{ label: '松石绿', val: '#0FCDC0' },
	{ label: '翡翠绿', val: '#50C878' },
	{ label: '孔雀绿', val: '#00A693' },
	{ label: '薄荷蓝', val: '#B2F7EF' },
	{ label: '冰川蓝', val: '#78C7EB' },
	{ label: '钴蓝色', val: '#0047AB' },
	{ label: '电蓝色', val: '#7DF9FF' },
	{ label: '长春花蓝', val: '#CCCCFF' },
	{ label: '薰衣草灰', val: '#C4C3D0' },
	{ label: '紫藤色', val: '#B399D4' },
	{ label: '兰花色', val: '#E6CFE6' },
	{ label: '淡紫色', val: '#E0B0FF' },
	{ label: '紫水晶色', val: '#9966CC' },
	{ label: '深兰花紫', val: '#9932CC' },
	{ label: '深紫罗兰', val: '#9400D3' },
	{ label: '靛青色', val: '#4B0082' },
	{ label: '石板蓝', val: '#6A5ACD' },
	{ label: '中石板蓝', val: '#7B68EE' },
	{ label: '暗岩灰', val: '#2F4F4F' },
	{ label: '浅岩灰', val: '#778899' },
	{ label: '亮钢蓝', val: '#B0C4DE' },
	{ label: '淡钢蓝', val: '#4682B4' },
	{ label: '白烟色', val: '#F5F5F5' },
	{ label: '亮灰色', val: '#DCDCDC' },
	{ label: '浅灰色', val: '#D3D3D3' },
	{ label: '庚斯博罗灰', val: '#D3D3D3' },
	{ label: '暗灰色', val: '#A9A9A9' },
	{ label: '银白色', val: '#C0C0C0' },
	{ label: '亮银色', val: '#D3D3D3' },
	{ label: '枪灰色', val: '#818589' },
	{ label: '冷灰色', val: '#848482' },
	{ label: '石板黑', val: '#1C1C1C' },
	{ label: '暗石板灰', val: '#2F4F4F' },
	{ label: '深石板灰', val: '#708090' },
	{ label: '淡石板灰', val: '#778899' },
	{ label: '亮石板灰', val: '#B0C4DE' },
	{ label: '雪白色', val: '#FFFAFA' },
	{ label: '蜂蜜露', val: '#F0FFF0' },
	{ label: '薄荷霜', val: '#F5FFFA' },
	{ label: '天蓝色', val: '#F0FFFF' },
	{ label: '淡紫色', val: '#F8F8FF' },
	{ label: '幽灵白', val: '#F8F8FF' },
	{ label: '贝壳白', val: '#FFF5EE' },
	{ label: '亚麻色', val: '#FAF0E6' },
	{ label: '老花色', val: '#FDF5E6' },
	{ label: '花白色', val: '#FFFAF0' },
	{ label: '玉米丝色', val: '#FFF8DC' },
	{ label: '古董白', val: '#FAEBD7' },
	{ label: '米白色', val: '#F5F5DC' },
	{ label: '浅米色', val: '#FAF0BE' },
	{ label: '香槟金', val: '#F7E7CE' },
	{ label: '羊皮纸色', val: '#F1E9D2' },
	{ label: '奶油色', val: '#FFFDD0' },
	{ label: '柠檬绸', val: '#FFFACD' },
	{ label: '浅金黄', val: '#FAFAD2' },
	{ label: '浅黄色', val: '#FFFFE0' },
	{ label: '象牙色', val: '#FFFFF0' },
	{ label: '亮黄色', val: '#FFFF00' },
	{ label: '镉黄色', val: '#FFF600' },
	{ label: '金丝雀黄', val: '#FFEF00' },
	{ label: '香蕉黄', val: '#FFE135' },
	{ label: '鲜黄色', val: '#FFD700' },
	{ label: '校车黄', val: '#FFD800' },
	{ label: '霓虹黄', val: '#FFFF33' },
	{ label: '芒果黄', val: '#FFC324' },
	{ label: '火焰橙', val: '#FF7F49' },
	{ label: '南瓜橙', val: '#FF7518' },
	{ label: '万圣节橙', val: '#FF6700' },
	{ label: '深橙色', val: '#FF5800' },
	{ label: '国际橙', val: '#FF4F00' },
	{ label: '红橙色', val: '#FF4500' },
	{ label: '法拉利红', val: '#FF2800' },
	{ label: '胭脂红', val: '#960018' },
	{ label: '深红色', val: '#8B0000' },
	{ label: '火砖红', val: '#8E2323' },
	{ label: '栗色', val: '#800000' },
	{ label: '玫瑰木色', val: '#65000B' },
	{ label: '勃艮第红', val: '#900020' },
	{ label: '酒红色', val: '#722F37' },
	{ label: '深玫瑰红', val: '#C21E56' },
	{ label: '覆盆子红', val: '#E30B5D' },
	{ label: '宝石红', val: '#CC0000' },
	{ label: '石榴红', val: '#F34723' },
	{ label: '朱红色', val: '#FF4D00' },
	{ label: '猩红色', val: '#FF2400' },
];

/**
 * 表格
 */
export const TABLE_SIDE_BAR_OPTIONS: BaseSelectOption<undefined | string>[] = [
	{ label: '禁用', val: undefined },
	{ label: '列侧栏', val: 'columns' },
	{ label: '过滤器侧栏', val: 'filters' },
];

/**
 * 文本样式选项
 */

export const TEXT_FONT_WEIGHT_OPTIONS: BaseSelectOption[] = [
	{ label: '细体', val: '100' },
	{ label: '正常', val: '400' },
	{ label: '加粗', val: '700' },
	{ label: '特粗', val: '900' },
];

export const TEXT_FONT_STYLE_OPTIONS: BaseSelectOption[] = [
	{ label: '正常', val: 'normal' },
	{ label: '斜体', val: 'italic' },
	{ label: '倾斜', val: 'oblique' },
];

export const TEXT_ALIGN_OPTIONS: BaseSelectOption[] = [
	{ label: '左对齐', val: 'left' },
	{ label: '居中', val: 'center' },
	{ label: '右对齐', val: 'right' },
	{ label: '两端对齐', val: 'justify' },
];

export const TEXT_DECORATIONS_OPTIONS: BaseSelectOption[] = [
	{ label: '无', val: 'none' },
	{ label: '下划线', val: 'underline' },
	{ label: '上划线', val: 'overline' },
	{ label: '删除线', val: 'line-through' },
];

export const TEXT_WHITE_SPACE_OPTIONS: BaseSelectOption[] = [
	{ label: '正常', val: 'normal' },
	{ label: '不换行', val: 'nowrap' },
	{ label: '预格式', val: 'pre' },
	{ label: '预格式换行', val: 'pre-wrap' },
	{ label: '保留空格', val: 'pre-line' },
];
