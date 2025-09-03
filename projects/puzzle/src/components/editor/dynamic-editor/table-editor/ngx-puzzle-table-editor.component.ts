import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditorBaseComponent } from 'ngx-puzzle/components/editor/dynamic-editor/base/editor-base.component';
import { EditorTableField } from 'ngx-puzzle/core/interfaces/table-config.interface';
import { TableTypesEnum } from 'ngx-puzzle/core/enums';
import { TABLE_FIELDS_MAP } from 'ngx-puzzle/core/constants/field-configs/table-editor-fields-config';
import { SafeAny } from 'ngx-puzzle/core/types';
import { Report } from '@webdatarocks/webdatarocks';
import { convertFormDataToOptions } from 'ngx-puzzle/core';
import { PuzzleFormRendererComponent } from 'ngx-puzzle/components/primitives/puzzle-form-renderer/puzzle-form-renderer.component';

@Component({
  selector: 'ngx-puzzle-table-editor, puzzle-table-editor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, PuzzleFormRendererComponent],
  templateUrl: './ngx-puzzle-table-editor.component.html',
  styleUrl: './ngx-puzzle-table-editor.component.scss'
})
export class NgxPuzzleTableEditorComponent extends EditorBaseComponent<Report, TableTypesEnum, EditorTableField> {
  protected setFields(type?: TableTypesEnum): void {
    if (!type) return;
    this.sections = TABLE_FIELDS_MAP[type];
  }

  protected getComponentType(): string {
    return 'table';
  }

  protected override afterConfigUpdate(tableConfig?: Report): void {}

  /**
   * 添加数组项
   */
  addArrayItem(fieldKey: string, fieldChildren: any[]): void {
    if (!this.formData[fieldKey]) {
      this.formData[fieldKey] = [];
    }

    // 创建新项的默认值
    const newItem: Record<string, any> = {};
    for (const child of fieldChildren) {
      if (child.schemaType === 'group' && child.children) {
        // 递归处理 group 类型的默认值
        const groupDefaults = this.createGroupDefaults(child.children);
        Object.assign(newItem, groupDefaults);
      } else {
        newItem[child.key] = child.defaultValue;
      }
    }

    this.formData[fieldKey].push(newItem);
    const updated = convertFormDataToOptions(this.formData, structuredClone(this.options()), this.sections)!;
    this.onChange.emit(updated);
  }

  /**
   * 创建组字段的默认值
   */
  private createGroupDefaults(children: any[]): Record<string, any> {
    const defaults: Record<string, any> = {};
    for (const child of children) {
      if (child.schemaType === 'group' && child.children) {
        Object.assign(defaults, this.createGroupDefaults(child.children));
      } else {
        defaults[child.key] = child.defaultValue;
      }
    }
    return defaults;
  }

  /**
   * 处理表单字段变化
   */
  onFieldChange(event: { key: string; value: SafeAny; parentKey?: string; index?: number }): void {
    this.onFormFieldChange(event.key, event.value, event.parentKey, event.index);
  }

  /**
   * 处理数组项添加
   */
  onArrayItemAdd(event: { fieldKey: string; children: any[] }): void {
    this.addArrayItem(event.fieldKey, event.children);
  }

  /**
   * 处理数组项删除
   */
  onArrayItemRemove(event: { fieldKey: string; index: number }): void {
    this.removeArrayItem(event.fieldKey, event.index);
  }
}
