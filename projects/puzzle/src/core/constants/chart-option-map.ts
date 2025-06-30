import { LabelFormatterEnum } from '../enums';
import { AgAxisLabelFormatterParams } from 'ag-charts-enterprise';

export const scatterChartOptionMap: Record<LabelFormatterEnum, (params: AgAxisLabelFormatterParams) => string> = {
	default: (params: AgAxisLabelFormatterParams) => {
		return `${params.value}`;
	},
	lengthCm: (params: AgAxisLabelFormatterParams) => {
		return `${params.value}(cm)`;
	},
	lengthM: (params: AgAxisLabelFormatterParams) => {
		return `${params.value}(m)`;
	},
	massKg: (params: AgAxisLabelFormatterParams) => {
		return `${params.value}(kg)`;
	},
	percentage: (params: AgAxisLabelFormatterParams) => {
		return `${params.value}%`;
	},
};
