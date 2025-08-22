import { Component } from '@angular/core';
import { CONTROL_COMPONENT_FIELDS, ControlConfig, ControlTypesEnum, SafeAny } from '../../../../../core';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import { Tooltip } from 'primeng/tooltip';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { EditorBaseComponent } from '../base/editor-base.component';
import { convertDateToString } from '../../../../utils';
import { isArray } from 'lodash';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { ColorPicker } from 'primeng/colorpicker';

@Component({
	selector: 'imm-bi-control-editor',
	standalone: true,
	imports: [
		Accordion,
		AccordionHeader,
		AccordionPanel,
		AccordionContent,
		Tooltip,
		InputNumber,
		InputText,
		ReactiveFormsModule,
		Select,
		FormsModule,
		DatePickerModule,
		TableModule,
		Button,
		ColorPicker,
	],
	templateUrl: './control-editor.component.html',
	styleUrl: './control-editor.component.scss',
})
export class ControlEditorComponent extends EditorBaseComponent<ControlConfig, ControlTypesEnum> {
	protected setFields(subType: ControlTypesEnum): void {
		this.sections = CONTROL_COMPONENT_FIELDS[subType];
	}

	public dateChange(key: string, value: SafeAny) {
		let newValue;
		if (value instanceof Date || (isArray(value) && value.length > 0 && value[0] instanceof Date)) {
			newValue = convertDateToString(value);
		}
		this.onFormFieldChange(key, newValue || value);
	}

	addOption(fieldKey: string) {
		this.formData[fieldKey].push({ label: '', value: '' });
	}

	removeOption(fieldKey: string, index: number) {
		this.formData[fieldKey].splice(index, 1);
		this.onFormFieldChange(fieldKey, this.formData[fieldKey]);
	}

	tableEditComplete(fieldKey: string) {
		const newValue = structuredClone(this.formData[fieldKey]);
		this.onFormFieldChange(fieldKey, newValue);
	}
}
