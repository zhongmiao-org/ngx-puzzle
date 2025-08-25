import { Injectable } from '@angular/core';
import { AbstractComponentFactory } from '../abstract-component-factory';
import { ComponentConfig, ComponentInstance } from '../../interfaces';
import { TextComponent } from 'ngx-puzzle/components/canvas/dynamic-components/text/text.component';

@Injectable({ providedIn: 'root' })
export class TextFactoryService extends AbstractComponentFactory {
	override create(config: ComponentConfig): ComponentInstance {
		return {
			component: TextComponent,
			config
		};
	}
}
