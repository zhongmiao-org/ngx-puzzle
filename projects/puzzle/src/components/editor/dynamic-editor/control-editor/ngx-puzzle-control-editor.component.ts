import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { isArray } from 'lodash';
import { ThyCollapseModule } from 'ngx-tethys/collapse';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyLayoutModule } from 'ngx-tethys/layout';

import { EditorBaseComponent } from '../base/editor-base.component';
import { CONTROL_COMPONENT_FIELDS, ControlConfig, ControlTypesEnum, SafeAny, convertDateToString } from '../../../../core';
import { PuzzleFormRendererComponent } from '../../../primitives';

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
  styleUrl: './ngx-puzzle-control-editor.component.scss'
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
    const currentData = this.formData();
    const fieldArray = currentData[fieldKey] || [];
    fieldArray.push({ label: '', value: '' });
    this.onFormFieldChange(fieldKey, structuredClone(fieldArray));
  }

  removeOption(fieldKey: string, index: number) {
    const currentData = this.formData();
    const fieldArray = [...(currentData[fieldKey] || [])];
    fieldArray.splice(index, 1);
    this.onFormFieldChange(fieldKey, fieldArray);
  }

  tableEditComplete(fieldKey: string) {
    const currentData = this.formData();
    const newValue = structuredClone(currentData[fieldKey]);
    this.onFormFieldChange(fieldKey, newValue);
  }
}
