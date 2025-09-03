import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { isArray } from 'lodash';
import { ThyCollapseModule } from 'ngx-tethys/collapse';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyLayoutModule } from 'ngx-tethys/layout';

import { EditorBaseComponent } from 'ngx-puzzle/components/editor/dynamic-editor/base/editor-base.component';
import { CONTROL_COMPONENT_FIELDS } from 'ngx-puzzle/core/constants/field-configs/control-editor-fields-config';
import { ControlConfig } from 'ngx-puzzle/core/interfaces/control-config.interface';
import { ControlTypesEnum } from 'ngx-puzzle/core/enums/control-types.enum';
import { SafeAny } from 'ngx-puzzle/core/types';
import { convertDateToString } from 'ngx-puzzle/core/utils/controls.util';
import {
  PuzzleFormRendererComponent
} from 'ngx-puzzle/components/primitives/puzzle-form-renderer/puzzle-form-renderer.component';

@Component({
  selector: 'ngx-puzzle-control-editor, puzzle-control-editor',
  standalone: true,
  imports: [
    ThyCollapseModule,
    ThyButtonModule,
    ReactiveFormsModule,
    FormsModule,
    ThyDatePickerModule,
    ThyTooltipModule,
    ThyGridModule,
    ThyLayoutModule,
    PuzzleFormRendererComponent
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

  /**
   * 处理表单字段变化
   */
  onFieldChange(event: { key: string; value: SafeAny; parentKey?: string; index?: number }): void {
    this.onFormFieldChange(event.key, event.value, event.parentKey, event.index);
  }

  /**
   * 处理日期变化
   */
  onDateChange(event: { key: string; value: SafeAny }): void {
    this.dateChange(event.key, event.value);
  }

  /**
   * 处理选项添加
   */
  onOptionAdd(event: { fieldKey: string }): void {
    this.addOption(event.fieldKey);
  }

  /**
   * 处理选项删除
   */
  onOptionRemove(event: { fieldKey: string; index: number }): void {
    this.removeOption(event.fieldKey, event.index);
  }

  /**
   * 处理表格编辑完成
   */
  onTableEditComplete(event: { fieldKey: string }): void {
    this.tableEditComplete(event.fieldKey);
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
