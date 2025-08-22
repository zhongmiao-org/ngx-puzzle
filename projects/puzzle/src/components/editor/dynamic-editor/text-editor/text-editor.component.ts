import { Component, HostBinding } from '@angular/core';
import { TEXT_FIELDS_MAP, TextConfig, TextTypesEnum } from '../../../../../core';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { Tooltip } from 'primeng/tooltip';
import { ColorPicker } from 'primeng/colorpicker';
import { Textarea } from 'primeng/textarea';
import { EditorBaseComponent } from '../base/editor-base.component';

@Component({
	selector: 'imm-bi-text-editor',
	standalone: true,
	imports: [
		Accordion,
		AccordionPanel,
		AccordionHeader,
		AccordionContent,
		InputNumber,
		InputText,
		ReactiveFormsModule,
		Select,
		Tooltip,
		FormsModule,
		ColorPicker,
		Textarea,
	],
	templateUrl: './text-editor.component.html',
	styleUrl: './text-editor.component.scss',
})
export class TextEditorComponent extends EditorBaseComponent<TextConfig, TextTypesEnum> {
	@HostBinding('class.text-editor-component') isEditorComponent = true;

	protected setFields(type: TextTypesEnum): void {
		this.sections = TEXT_FIELDS_MAP[type];
	}
}
