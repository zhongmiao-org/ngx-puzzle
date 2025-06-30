import { Type } from '@angular/core';
import { ComponentConfig } from './component-config.interface';

export interface ComponentInstance {
	component: Type<any>;
	config: ComponentConfig;
}
