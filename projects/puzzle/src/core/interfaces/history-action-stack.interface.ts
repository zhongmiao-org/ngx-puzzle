import { actionTypes } from '../types';
import { ComponentBaseProps, ComponentConfig } from './component-config.interface';

export interface HistoryActionStack<TConfigProps extends ComponentBaseProps = ComponentBaseProps, TSubType = string> {
	type: actionTypes,
	config: ComponentConfig<TConfigProps, TSubType>,
	timestamp: number
}
