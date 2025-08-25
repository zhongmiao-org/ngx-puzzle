import { Component } from '@angular/core';
import { CanvasBaseComponent } from '../base/canvas-base.component';
import {
	ComponentConfig,
	DataRequestConfig,
	ComponentTextProps,
	CanvasMediatorService,
	TextTypesEnum,
	mainTypes,
	TEXT_DATA_OPTIONS,
} from '../../../../core';
import { CommonModule } from '@angular/common';
import { DragWrapperComponent } from '../../drag-wrapper/drag-wrapper.component';
import { StylesFormatPipe } from '../../../../pipes/styles-format.pipe';

@Component({
	selector: 'imm-bi-text',
	standalone: true,
	imports: [CommonModule, DragWrapperComponent, StylesFormatPipe],
	templateUrl: './text.component.html',
	styleUrl: './text.component.scss',
})
export class TextComponent extends CanvasBaseComponent<ComponentTextProps, TextTypesEnum> {
	dataKey: mainTypes = 'text';

	set config(config: ComponentConfig<ComponentTextProps, TextTypesEnum>) {
		this.initConfig(config);
	}

	get config() {
		return this._config;
	}

	constructor(mediator: CanvasMediatorService<ComponentTextProps, TextTypesEnum>) {
		super(mediator);
	}

	updateData(requestData: DataRequestConfig) {}

	getDefaultOptions(subType: TextTypesEnum) {
		return TEXT_DATA_OPTIONS[subType];
	}
}
