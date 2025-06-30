import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ComponentConfig, ComponentTextProps } from 'ngx-puzzle/core/interfaces';
import { CanvasMediatorService } from 'ngx-puzzle/core/mediator/canvas-mediator.service';
import { CommonModule } from '@angular/common';
import { TextTypesEnum } from 'ngx-puzzle/core/enums';
import { mainTypes } from 'ngx-puzzle/core/types';
import { DragWrapperComponent } from '../drag-wrapper/drag-wrapper.component';
import { TEXT_DATA_OPTIONS } from 'ngx-puzzle/core/constants';
import { StylesFormatPipe } from 'ngx-puzzle/pipes/styles-format.pipe';

@Component({
	selector: 'app-text',
	standalone: true,
	imports: [CommonModule, DragWrapperComponent, StylesFormatPipe],
	templateUrl: './text.component.html',
	styleUrl: './text.component.scss',
})
export class TextComponent extends BaseComponent<ComponentTextProps, TextTypesEnum> {
	override dataKey: mainTypes = 'text';

	set config(config: ComponentConfig<ComponentTextProps, TextTypesEnum>) {
		console.log('config', config);
		this.update(config);
	}

	get config() {
		return this._config;
	}

	constructor(mediator: CanvasMediatorService<ComponentTextProps, TextTypesEnum>) {
		super(mediator);
	}

	getDefaultOptions(subType: TextTypesEnum) {
		return TEXT_DATA_OPTIONS[subType];
	}
}
