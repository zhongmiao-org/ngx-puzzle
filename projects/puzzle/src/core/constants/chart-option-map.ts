import { LabelFormatterEnum } from '../enums';
import { SafeAny } from 'ngx-puzzle/core';

export const scatterChartOptionMap: Record<LabelFormatterEnum, (params: SafeAny) => string> = {
	default: (params: SafeAny) => {
		return `${params.value}`;
	},
	lengthCm: (params: SafeAny) => {
		return `${params.value}(cm)`;
	},
	lengthM: (params: SafeAny) => {
		return `${params.value}(m)`;
	},
	massKg: (params: SafeAny) => {
		return `${params.value}(kg)`;
	},
	percentage: (params: SafeAny) => {
		return `${params.value}%`;
	},
};
