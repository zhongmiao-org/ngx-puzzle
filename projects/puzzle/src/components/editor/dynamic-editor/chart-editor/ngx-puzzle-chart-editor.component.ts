import { Component, HostBinding } from '@angular/core';
import { EditorChartField, ChartTypesEnum, CHART_FIELDS_MAP, SafeAny } from '../../../../core';
import { ThyCollapseModule } from 'ngx-tethys/collapse';
import { ThyCardModule } from 'ngx-tethys/card';
import { ThyButtonModule } from 'ngx-tethys/button';
import { FormsModule } from '@angular/forms';
import { EditorBaseComponent } from '../base/editor-base.component';
import { PuzzleFormRendererComponent } from '../../../primitives/puzzle-form-renderer/puzzle-form-renderer.component';

@Component({
  selector: 'ngx-puzzle-chart-editor',
  standalone: true,
  imports: [ThyCollapseModule, ThyCardModule, ThyButtonModule, FormsModule, PuzzleFormRendererComponent],
  templateUrl: './ngx-puzzle-chart-editor.component.html',
  styleUrl: './ngx-puzzle-chart-editor.component.scss'
})
export class NgxPuzzleChartEditorComponent extends EditorBaseComponent<SafeAny, ChartTypesEnum, EditorChartField> {
  @HostBinding('class.chart-editor-component') isEditorComponent = true;

  public chartType!: ChartTypesEnum;

  protected setFields(type: ChartTypesEnum): void {
    if (this.chartType === type) return;
    this.chartType = type;
    this.sections = CHART_FIELDS_MAP[type]!;
  }

  protected getComponentType(): string {
    return 'chart';
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

  addArrayItem(key: string, schema: any[]) {
    if (!this.formData[key]) {
      this.formData[key] = [];
    }

    const defaultType = schema[0]?.options?.[0].val as string;
    const item: any = {};
    for (const field of schema) {
      item[field.key] = field.defaultValue || '';
    }
    item['type'] = defaultType;

    this.formData[key].push(item);
    this.onFormFieldChange(key, this.formData[key]);
  }

  // removeArrayItem(key: string, index: number) {
  //   if (this.formData[key] && Array.isArray(this.formData[key])) {
  //     this.formData[key].splice(index, 1);
  //     this.onFormFieldChange(key, this.formData[key]);
  //   }
  // }
}
