import { Injectable } from '@angular/core';
import { AbstractComponentFactory } from '../abstract-component-factory';
import { ComponentConfig, ComponentInstance } from '../../interfaces';
import { ControlComponent } from '../../../shared/components/canvas/dynamic-components/control/control.component';

@Injectable({ providedIn: 'root' })
export class ControlFactoryService extends AbstractComponentFactory {
	override create(config: ComponentConfig): ComponentInstance {
		return {
			component: ControlComponent,
			config
		};
	}
}
