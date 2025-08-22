import { Injectable } from '@angular/core';
import { AbstractComponentFactory } from '../abstract-component-factory';
import { ComponentConfig, ComponentInstance } from '../../interfaces';
import { TableComponent } from '../../../shared/components/canvas/dynamic-components/table/table.component';

@Injectable({ providedIn: 'root' })
export class TableFactoryService extends AbstractComponentFactory {
	create(config: ComponentConfig): ComponentInstance {
		return {
			component: TableComponent,
			config,
		};
	}
}
