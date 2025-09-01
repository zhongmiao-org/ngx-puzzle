import { Pipe, PipeTransform } from '@angular/core';
import { ChartAxesTypesEnum, ChartTypesEnum } from 'ngx-puzzle/core/enums';
import { SafeAny } from 'ngx-puzzle/core';

@Pipe({
	name: 'optionFormat',
	standalone: true,
})
export class OptionFormatPipe implements PipeTransform {
	transform(value: SafeAny, type: ChartTypesEnum): SafeAny {
		if (type === ChartTypesEnum.candlestick) {
			value = convertDataForCandlestick(value);
		}
		return value;
	}
}

function convertDataForCandlestick(value: SafeAny) {
	const axes = 'axes' in value ? value.axes : [];
	let isDateAxe = false;
	for (const axe of axes!) {
		if (axe.type === ChartAxesTypesEnum.ordinalTime || axe.type === ChartAxesTypesEnum.time) {
			isDateAxe = true;
		}
	}
	if (isDateAxe) {
		const xKey: string = 'xKey' in value.series![0] ? (value.series?.[0].xKey as string) : 'date';
		value.data = value.data?.map((item: any) => {
			return {
				...item,
				[xKey]: new Date(item[xKey]),
			};
		});
	}
	return value;
}
