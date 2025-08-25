import { Component, inject, signal } from '@angular/core';
import { CanvasBaseComponent } from '../base/canvas-base.component';
import {
	CanvasMediatorService,
	ComponentConfig,
	ComponentControlProps,
	ControlConfig,
	ControlTypesEnum,
	DataRequestConfig,
	mainTypes,
	SafeAny,
	CONTROL_MOCK_DATA,
	ControlsService,
} from '../../../../../core';
import { DragWrapperComponent } from '../../drag-wrapper/drag-wrapper.component';
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { StylesFormatPipe } from '../../../../pipes/styles-format.pipe';
import { Tooltip } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { DateParsePipe } from '../../../../pipes/date-parse.pipe';
import { convertStringToDate, Debounce } from '../../../../utils';
import { Select } from 'primeng/select';
import { MultiSelect } from 'primeng/multiselect';
import { InputText } from 'primeng/inputtext';
import { DatetimeComponent } from '../../../../primitives/datetime/datetime.component';

@Component({
	selector: 'imm-bi-control',
	standalone: true,
	imports: [
		DragWrapperComponent,
		NgStyle,
		StylesFormatPipe,
		Tooltip,
		FormsModule,
		DatePicker,
		NgTemplateOutlet,
		DateParsePipe,
		Select,
		MultiSelect,
		InputText,
		DatetimeComponent,
	],
	templateUrl: './control.component.html',
	styleUrl: './control.component.scss',
})
export class ControlComponent extends CanvasBaseComponent<ComponentControlProps, ControlTypesEnum> {
	private controlService = inject(ControlsService);

	zIndex = signal(0);

	dataKey: mainTypes = 'control';

	set config(config: ComponentConfig<ComponentControlProps, ControlTypesEnum>) {
		this.initConfig(config);
	}

	get config() {
		return this._config;
	}

	get control(): ControlConfig {
		// console.log(`control`, this.config.props.control)
		return this.config.props.control;
	}

	controlValue: SafeAny;

	constructor(mediator: CanvasMediatorService<ComponentControlProps, ControlTypesEnum>) {
		super(mediator);
	}

	updateData(requestData: DataRequestConfig) {}

	@Debounce(1000)
	controlValueChange() {
		this.panelOnShow(false);
		this.controlService.notifyControlValueChange(this.config.id, this.controlValue);
	}

	initControlValue() {
		console.log(`initControlValue`, this.config.subType);
		if (this.config.subType === ControlTypesEnum.datePick) {
			this.controlValue = convertStringToDate(this.config.props.control.defaultValue);
		} else {
			this.controlValue = this.config.props.control.defaultValue;
		}
	}

	protected override afterUpdateConfig() {
		console.log(`afterUpdateConfig`);
		// 时间控件不参与交互
		if (this.config.subType === ControlTypesEnum.dateTime) return;
		this.controlService.setControl(this.config.props.control);
		this.initControlValue();
	}

	protected override getDefaultOptions(subType: ControlTypesEnum) {
		return {
			...CONTROL_MOCK_DATA[subType],
			controlId: this.config.id,
		};
	}

	panelOnShow(event: boolean) {
		console.log(`panelOnShow`, event);
		if (event) {
			this.zIndex.set(99)
		} else {
			this.zIndex.set(0)
		}
	}

}
