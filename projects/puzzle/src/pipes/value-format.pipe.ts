import { Pipe, PipeTransform } from '@angular/core';
import { BaseSelectOption } from 'app/core/interfaces';
import { fieldComponentTypes } from 'app/core/types';

@Pipe({
	name: 'valueFormat',
	standalone: true,
})
export class ValueFormatPipe implements PipeTransform {
	transform(val: string | number | boolean, options: BaseSelectOption[], schemaType: fieldComponentTypes): string {
		let label: string = '';
		if (schemaType === 'text') {
			return val as string;
		}
		for (const option of options) {
			if (val === option.val) {
				label = option.label;
				break;
			}
		}
		return label;
	}
}
