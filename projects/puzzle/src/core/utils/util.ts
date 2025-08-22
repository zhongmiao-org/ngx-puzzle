import { Search } from 'imm-element-ui';
import { isEqual } from 'lodash';
import { SafeAny } from '../../core';

export function validationEnum<T extends Record<string | number, string | number>>(enumObj: T, value: unknown): boolean {
	const enumValues = Object.values(enumObj);

	return enumValues.includes(value as any);
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
	if (!hex) return { r: 0, g: 0, b: 0 };

	// 去掉 # 号
	hex = hex.replace('#', '');

	// 处理 3 位和 6 位十六进制颜色
	if (hex.length === 3) {
		hex = hex
			.split('')
			.map((char) => char + char)
			.join('');
	}

	const r = parseInt(hex.substr(0, 2), 16);
	const g = parseInt(hex.substr(2, 2), 16);
	const b = parseInt(hex.substr(4, 2), 16);

	return { r, g, b };
}

/**
 * 将十六进制颜色转换为 RGB 字符串
 */
export function hexToRgbString(hex: string): string {
	const { r, g, b } = hexToRgb(hex);
	return `${r},${g},${b}`;
}

/**
 * 获取两个数组中发生变化的元素在新数组中的索引
 * @param oldParams 旧 params 数组
 * @param newParams 新 params 数组
 * @returns 排序后的索引数组
 */
export function getChangedIndexes<T extends Array<SafeAny>>(oldParams: T, newParams: T): number[] {
	const changedIndexes: number[] = [];

	// 以 newParams 的长度为主进行遍历
	for (let i = 0; i < newParams.length; i++) {
		// 如果索引超出了旧数组的长度，或者值不相等，则认为发生了变化
		if (i >= oldParams.length || !isEqual(oldParams[i], newParams[i])) {
			changedIndexes.push(i);
		}
	}

	return changedIndexes;
}
