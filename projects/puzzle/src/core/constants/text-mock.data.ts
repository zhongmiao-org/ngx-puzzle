import { TextTypesEnum } from '../enums';
import { TextConfig } from '../interfaces';

export const TEXT_DATA_OPTIONS: Partial<{ [key in TextTypesEnum]: TextConfig }> = {
	[TextTypesEnum.headTitle]: {
		content: '标题',
		styles: {
			color: '#333333',
			fontSize: 18,
			fontWeight: '400',
			fontStyle: 'normal',
			textAlign: 'left',
			lineHeight: 25,
			letterSpacing: 0,
			textDecoration: 'none',
			whiteSpace: 'normal',
		},
	},
	[TextTypesEnum.text]: {
		content: '这是一段文本',
		styles: {
			color: '#333333',
			fontSize: 14,
			fontWeight: '400',
			fontStyle: 'normal',
			textAlign: 'left',
			lineHeight: 18,
			letterSpacing: 0,
			textDecoration: 'none',
			whiteSpace: 'normal',
		},
	},
};
