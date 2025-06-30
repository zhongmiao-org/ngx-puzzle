import { ComponentBaseProps, ComponentConfig, Position, Size } from '../interfaces';
import { actionTypes } from '../types';

export interface CanvasMediator<TConfigProps extends ComponentBaseProps = ComponentBaseProps, TSubType = string> {
	addComponent(config: ComponentConfig<TConfigProps, TSubType>): void;
	updateComponent(config: ComponentConfig<TConfigProps, TSubType>): void;
	selectComponent(id: string): void;
	movingComponent(id: string, position: Position): void;
	resizeComponent(id: string, size: Size, position: Position): void;
	removeComponent(id: string): void;
	recordHistory(config: ComponentConfig<TConfigProps, TSubType>, activeType: actionTypes): void
}
