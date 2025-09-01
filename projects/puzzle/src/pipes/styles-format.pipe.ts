import { Pipe, PipeTransform } from '@angular/core';
import { SafeAny } from 'ngx-puzzle/core/types';

@Pipe({
	name: 'stylesFormat',
	standalone: true,
})
export class StylesFormatPipe implements PipeTransform {
	transform(styles?: Record<string, SafeAny>): { [key: string]: any } {
    if (!styles) return {};
		let newStyles: { [key: string]: SafeAny } = {};
		for (const styleName in styles) {
			switch (styleName) {
				// case 'backgroundImage':
        //   console.log(`styles[styleName]`,styles, styleName, styles[styleName])
				// 	newStyles[styleName] = styles[styleName] !== null ? (styles[styleName] as { val: string }).val : null;
				// 	break;
				case 'backgroundPositionX':
				case 'backgroundPositionY':
				case 'backgroundSize':
					console.log(styleName, styles[styleName], styles[styleName] ? 0 : `${styles[styleName]}%`);
					newStyles[styleName] = `${styles[styleName]}%`;
					break;
				default:
					const value = typeof styles[styleName] === 'number' ? `${styles[styleName]}px` : styles[styleName];
					newStyles[styleName] = value;
					break;
			}
		}
		console.log(`newStyles`, newStyles);
		return newStyles;
	}
}

