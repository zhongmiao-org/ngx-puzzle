import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { EditorBaseField, SafeAny, BaseSelectOption } from 'ngx-puzzle/core';
import { ThyCollapseModule } from 'ngx-tethys/collapse';
import { ThyInputDirective, ThyInputModule } from 'ngx-tethys/input';
import { ThyInputNumber } from 'ngx-tethys/input-number';
import { ThySelect, ThySelectModule } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyLayoutModule } from 'ngx-tethys/layout';
import { ThyColorPickerDirective } from 'ngx-tethys/color-picker';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';

@Component({
  selector: 'ngx-puzzle-form-renderer, puzzle-form-renderer',
  templateUrl: './puzzle-form-renderer.component.html',
  styleUrl: './puzzle-form-renderer.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgTemplateOutlet,
    ThyCollapseModule,
    ThyInputModule,
    ThyInputDirective,
    ThyInputNumber,
    ThySelectModule,
    ThySelect,
    ThyOption,
    ThyTooltipModule,
    ThyButtonModule,
    ThyGridModule,
    ThyLayoutModule,
    ThyColorPickerDirective,
    ThyDatePickerModule,
    NgStyle,
  ]
})
export class PuzzleFormRendererComponent {
  /**
   * 表单字段配置数组
   */
  sections = input.required<EditorBaseField[]>();

  /**
   * 表单数据对象
   */
  formData = input.required<SafeAny>();

  accordion = input<boolean>(true);

  /**
   * 表单字段值变化事件
   */
  fieldChange = output<{
    key: string;
    value: SafeAny;
    parentKey?: string;
    index?: number;
  }>();

  /**
   * 数组项添加事件
   */
  arrayItemAdd = output<{
    fieldKey: string;
    children: EditorBaseField[];
  }>();

  /**
   * 数组项删除事件
   */
  arrayItemRemove = output<{
    fieldKey: string;
    index: number;
  }>();

  /**
   * 按钮点击事件
   */
  buttonClick = output<{
    field: EditorBaseField;
    data: SafeAny;
  }>();

  /**
   * 日期变化事件（特殊处理）
   */
  dateChange = output<{
    key: string;
    value: SafeAny;
  }>();

  /**
   * 选项编辑事件
   */
  optionAdd = output<{ fieldKey: string }>();
  optionRemove = output<{ fieldKey: string; index: number }>();

  /**
   * 字段值变化处理
   */
  onFormFieldChange(key: string, value: SafeAny, parentKey?: string, index?: number): void {
    this.fieldChange.emit({ key, value, parentKey, index });
  }

  /**
   * 添加数组项
   */
  onAddArrayItem(fieldKey: string, children: EditorBaseField[] = []): void {
    this.arrayItemAdd.emit({ fieldKey, children });
  }

  /**
   * 删除数组项
   */
  onRemoveArrayItem(fieldKey: string, index: number): void {
    this.arrayItemRemove.emit({ fieldKey, index });
  }

  /**
   * 按钮点击处理
   */
  onButtonClick(field: EditorBaseField, data: SafeAny): void {
    this.buttonClick.emit({ field, data });
  }

  /**
   * 日期变化处理
   */
  onDateChange(key: string, value: SafeAny): void {
    this.dateChange.emit({ key, value });
  }

  /**
   * 添加选项
   */
  onAddOption(fieldKey: string): void {
    this.optionAdd.emit({ fieldKey });
  }

  /**
   * 删除选项
   */
  onRemoveOption(fieldKey: string, index: number): void {
    this.optionRemove.emit({ fieldKey, index });
  }

  /**
   * 检查字段是否可见
   */
  isFieldVisible(field: EditorBaseField): boolean {
    if (!field.visibleWhen) {
      return true;
    }
    return field.visibleWhen(this.formData());
  }

  /**
   * 获取字段的选项列表
   */
  getFieldOptions(field: EditorBaseField): BaseSelectOption[] {
    if (field.optionsStream) {
      // TODO: 处理流式选项，这里可能需要异步处理
      return field.options || [];
    }
    return field.options || [];
  }
}
