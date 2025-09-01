import { Pipe, PipeTransform } from '@angular/core';
import { BaseSelectOption, fieldComponentTypes } from 'ngx-puzzle/core';

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
