// import { Component, effect, HostBinding, input, output } from '@angular/core';
// import { EditorTextField, TextConfig } from 'ngx-puzzle/core/interfaces';
// import { TextTypesEnum } from 'ngx-puzzle/core/enums';
// import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
// import { TEXT_CONTENT_FIELDS, TEXT_STYLE_FIELDS } from 'ngx-puzzle/core/constants/text-editor-fields-map';
// import { InputNumber } from 'primeng/inputnumber';
// import { InputText } from 'primeng/inputtext';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Select } from 'primeng/select';
// import { Tooltip } from 'primeng/tooltip';
// import { convertFormDataToOptions, convertOptionsToFormData, updateFormData } from 'app/utils';
// import { ColorPicker } from 'primeng/colorpicker';
// import { Textarea } from 'primeng/textarea';
//
// @Component({
// 	selector: 'app-text-editor',
// 	standalone: true,
// 	imports: [
// 		Accordion,
// 		AccordionPanel,
// 		AccordionHeader,
// 		AccordionContent,
// 		InputNumber,
// 		InputText,
// 		ReactiveFormsModule,
// 		Select,
// 		Tooltip,
// 		FormsModule,
// 		ColorPicker,
// 		Textarea,
// 	],
// 	templateUrl: './text-editor.component.html',
// 	styleUrl: './text-editor.component.scss',
// })
// export class TextEditorComponent {
// 	@HostBinding('class.text-editor-component') isEditorComponent = true;
//
// 	options = input<TextConfig>();
//
// 	subType = input<TextTypesEnum | string>(TextTypesEnum.headTitle);
//
// 	readonly onChange = output<TextConfig>();
//
// 	public textFields: EditorTextField[] = [];
// 	public formData: Record<string, any> = {};
//
// 	constructor() {
// 		effect(() => {
// 			const opts = this.options();
// 			const type = this.subType() as TextTypesEnum;
//
// 			console.log(`effect`, opts, type);
// 			if (type) {
// 				this.setTextFields(type);
// 			}
//
// 			if (opts) {
// 				this.formData = convertOptionsToFormData(opts, this.textFields);
// 				console.log(`formData ---->`, this.formData);
// 			}
// 		});
// 	}
//
// 	private setTextFields(type: TextTypesEnum) {
// 		switch (type) {
// 			case TextTypesEnum.headTitle:
// 			case TextTypesEnum.text:
// 				this.textFields = [TEXT_CONTENT_FIELDS, TEXT_STYLE_FIELDS];
// 				break;
// 		}
// 		console.log(`setTextFields`, this.textFields);
// 	}
//
// 	onFormFieldChange(key: string, value: any, parentKey?: string, index?: number) {
// 		this.formData = updateFormData(this.formData, key, value, parentKey, index);
// 		const updated = convertFormDataToOptions(this.formData, structuredClone(this.options()), this.textFields)!;
// 		console.log(`updated`, updated);
// 		this.onChange.emit(updated);
// 	}
// }
