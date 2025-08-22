// text 配置
import { SafeAny } from '../types';
import { ComponentBaseProps } from './component-config.interface';

export interface ComponentTextProps extends ComponentBaseProps {
	text: TextConfig;
}

export interface TextConfig {
	content?: string;
	styles: Record<string, SafeAny>;
}
