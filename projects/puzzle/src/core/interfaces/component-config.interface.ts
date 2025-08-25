import { mainTypes, SafeAny } from '../types';
import { RefreshConfig } from './refresh.interface';
import { DataRequestConfig } from './data-request';

export interface ComponentConfig<TConfigProps extends ComponentBaseProps = ComponentBaseProps, TSubType = string> {
	id: string;
	// 子类型
	type: mainTypes;
	subType: TSubType;
	// 定位
	position: Position;
	// 大小
	size: Size;
	// 特有配置参数
	props: TConfigProps;
	// 数据源配置
	dataRequest?: DataRequestConfig;
	// 定时器设置
	refreshConfig?: RefreshConfig;
}

export interface ComponentBaseProps {
	styles: Record<string, SafeAny>;
	[key: string]: SafeAny;
}

export interface Position {
	x: number;
	y: number;
}

export interface Size {
	width: number;
	height: number;
}
