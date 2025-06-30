import { Pipe, PipeTransform } from '@angular/core';
import { SafeAny } from 'app/core/types';

@Pipe({
	name: 'stylesFormat',
	standalone: true,
})
export class StylesFormatPipe implements PipeTransform {
	transform(styles: Record<string, SafeAny>): { [key: string]: any } {
		let newStyles: { [key: string]: SafeAny } = {};
		for (const styleName in styles) {
			switch (styleName) {
				case 'backgroundImage':
					newStyles[styleName] = styles[styleName] !== null ? (styles[styleName] as { val: string }).val : null;
					break;
				case 'backgroundColor':
					if (!!styles[styleName]) {
						// hex 转 rgb ，另外还需要 alpha
						const rgb = hexToRgb(styles[styleName]);
						newStyles[styleName] =
							`rgba(${rgb?.r}, ${rgb?.g}, ${rgb?.b}, ${!!styles['backgroundColorAlpha'] ? styles['backgroundColorAlpha'] : 1})`;
					} else {
						newStyles[styleName] = 'transparent';
					}
					break;
				case 'backgroundColorAlpha':
					break;
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

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
	// 去除 # 号，兼容 3 位或 6 位 HEX
	const sanitizedHex = hex.replace(/^#/, '');

	// 检查 HEX 格式是否合法
	if (!/^(?:[0-9a-fA-F]{3}){1,2}$/.test(sanitizedHex)) {
		return null;
	}

	// 处理 3 位 HEX（如 #RGB → RRGGBB）
	let formattedHex = sanitizedHex;
	if (sanitizedHex.length === 3) {
		formattedHex = sanitizedHex
			.split('')
			.map((c) => c + c)
			.join('');
	}

	// 解析为 R, G, B
	const num = parseInt(formattedHex, 16);
	const r = (num >> 16) & 255;
	const g = (num >> 8) & 255;
	const b = num & 255;

	return { r, g, b };
}
