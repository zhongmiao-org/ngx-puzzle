// abstract-component-factory.ts

import { ComponentInstance, ComponentConfig } from '../interfaces';

export abstract class AbstractComponentFactory {
	abstract create(config: ComponentConfig): ComponentInstance;
}
