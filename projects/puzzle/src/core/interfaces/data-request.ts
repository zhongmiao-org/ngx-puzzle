import { SafeAny } from '../types';
import { Search } from 'imm-element-ui';

export interface DataRequestConfig {
	paramSearch?: Search[];
	aggregations?: string[];
	allFields?: SafeAny[];
	props?: Record<string, SafeAny>;
}

export interface Rfd {
	modelName?: string;
	labelField?: string;
	valueField?: string;
	whereField?: string;
	type?: string;
	fiter?: any;
	data?: any;
}
