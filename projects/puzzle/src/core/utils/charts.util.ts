import { scatterChartOptionMap } from '../../core/constants';
import { LabelFormatterEnum } from '../../core/enums';

export function updateCharts(option: any, delta: Record<string, any> = {}) {
	const newOption = structuredClone(option);
	for (const key in newOption) {
		// 轴设置需要格式化函数
		if (newOption.hasOwnProperty(key)) {
			if (key === 'axes') {
				(newOption['axes'] as any[]).forEach((axes: any, index: number) => {
					if (axes?.label?.formatter) {
						newOption['axes'][index].label.formatter = scatterChartOptionMap[axes.label.formatter as LabelFormatterEnum];
					}
				});
			} else if (delta.hasOwnProperty(key) && delta[key]) {
				newOption[key] = delta[key];
			}
		}
	}

	return newOption;
}
