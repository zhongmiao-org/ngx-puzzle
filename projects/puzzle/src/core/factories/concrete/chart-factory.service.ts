import { Injectable } from '@angular/core';
import { AbstractComponentFactory } from '../abstract-component-factory';
import { ComponentConfig, ComponentInstance } from '../../interfaces';
import { ChartComponent } from '../../../shared/components/canvas/dynamic-components/chart/chart.component';

@Injectable({ providedIn: 'root' })
export class ChartFactoryService extends AbstractComponentFactory {
	create(config: ComponentConfig): ComponentInstance {
		return {
			component: ChartComponent,
			config,
		};
	}
}

