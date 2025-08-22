import { Component } from '@angular/core';
import { RefreshConfig, REFRESH_CONFIG, CONTROL_BIND_FIELDS } from '../../../../../core';
import { AccordionModule } from 'primeng/accordion';
import { Tooltip } from 'primeng/tooltip';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { DatePicker } from 'primeng/datepicker';
import { EditorBaseComponent } from '../base/editor-base.component';
import { AsyncPipe } from '@angular/common';
import { MultiSelect } from 'primeng/multiselect';
import { updateFieldChildrenStream } from '../../../../utils';

@Component({
	selector: 'imm-bi-refresh-editor',
	standalone: true,
	imports: [AccordionModule, Tooltip, FormsModule, InputNumber, Select, DatePicker, AsyncPipe, MultiSelect],
	templateUrl: './refresh-editor.component.html',
	styleUrl: './refresh-editor.component.scss',
})
export class RefreshEditorComponent extends EditorBaseComponent<RefreshConfig> {

	protected setFields(): void {
		this.sections = [
			...REFRESH_CONFIG,
			updateFieldChildrenStream(CONTROL_BIND_FIELDS, {
				controlIds: this.controlsService.availableControlOptions$,
			}),
		];
	}
}
