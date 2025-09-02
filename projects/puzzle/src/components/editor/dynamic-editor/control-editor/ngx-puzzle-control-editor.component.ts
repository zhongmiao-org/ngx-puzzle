import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { isArray } from 'lodash';
import { ThyCollapseModule } from 'ngx-tethys/collapse';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyInputNumber } from 'ngx-tethys/input-number';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyOption } from 'ngx-tethys/shared';
import { ThySelect } from 'ngx-tethys/select';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThyColorPickerDirective } from 'ngx-tethys/color-picker';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyLayoutModule } from 'ngx-tethys/layout';

import { EditorBaseComponent } from 'ngx-puzzle/components/editor/dynamic-editor/base/editor-base.component';
import { CONTROL_COMPONENT_FIELDS } from 'ngx-puzzle/core/constants/control-editor-fields-config';
import { ControlConfig } from 'ngx-puzzle/core/interfaces/control-config.interface';
import { ControlTypesEnum } from 'ngx-puzzle/core/enums/control-types.enum';
import { SafeAny } from 'ngx-puzzle/core/types';
import { convertDateToString } from 'ngx-puzzle/core/utils/controls.util';

@Component({
  selector: 'ngx-puzzle-control-editor, puzzle-control-editor',
  standalone: true,
  imports: [
    ThyCollapseModule,
    ThyButtonModule,
    ThyInputNumber,
    ReactiveFormsModule,
    ThyInputDirective,
    ThyColorPickerDirective,
    FormsModule,
    ThyOption,
    ThySelect,
    ThyDatePickerModule,
    ThyTooltipModule,
    NgStyle,
    ThyGridModule,
    ThyLayoutModule
  ],
  templateUrl: './ngx-puzzle-control-editor.component.html',
  styleUrl: './ngx-puzzlecontrol-editor.component.scss'
})
export class NgxPuzzleControlEditorComponent extends EditorBaseComponent<ControlConfig, ControlTypesEnum> {
  protected setFields(subType?: ControlTypesEnum): void {
    if (!subType) return;
    this.sections = CONTROL_COMPONENT_FIELDS[subType];
  }

  protected getComponentType(): string {
    return 'control';
  }

  public dateChange(key: string, value: SafeAny) {
    let newValue: SafeAny | undefined;
    if (value instanceof Date || (isArray(value) && value.length > 0 && value[0] instanceof Date)) {
      newValue = convertDateToString(value as any);
    }
    this.onFormFieldChange(key, newValue ?? value);
  }

  addOption(fieldKey: string) {
    this.formData[fieldKey] = this.formData[fieldKey] || [];
    this.formData[fieldKey].push({ label: '', value: '' });
    this.onFormFieldChange(fieldKey, structuredClone(this.formData[fieldKey]));
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
