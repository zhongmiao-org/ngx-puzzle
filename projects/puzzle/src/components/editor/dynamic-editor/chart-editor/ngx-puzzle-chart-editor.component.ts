import { Component, HostBinding } from '@angular/core';
import { DataRequestConfig, EditorChartArraySchema, EditorChartField } from 'ngx-puzzle/core/interfaces';
import { ChartTypesEnum } from 'ngx-puzzle/core/enums';
import { ThyCollapseModule } from 'ngx-tethys/collapse';
import { ThyCardModule } from 'ngx-tethys/card';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { NgStyle } from '@angular/common';
import { ThyInputNumber } from 'ngx-tethys/input-number';
import { FormsModule } from '@angular/forms';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyColorPickerDirective } from 'ngx-tethys/color-picker';
import { ThyOption } from 'ngx-tethys/shared';
import { ThySelect } from 'ngx-tethys/select';
import { EditorBaseComponent } from 'ngx-puzzle/components/editor/dynamic-editor/base/editor-base.component';
import { CHART_FIELDS_MAP, SafeAny } from 'ngx-puzzle/core';

@Component({
  selector: 'ngx-puzzle-chart-editor',
  standalone: true,
  imports: [
    ThyCollapseModule,
    ThyCardModule,
    ThyButtonModule,
    ThyRowDirective,
    ThyColDirective,
    ThyInputNumber,
    FormsModule,
    ThyInputDirective,
    ThyColorPickerDirective,
    NgStyle,
    ThyOption,
    ThySelect
  ],
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

  // 移除聚合函数相关的代码，简化编辑器
  protected override afterConfigUpdate(opts?: SafeAny, requestOptions?: DataRequestConfig): void {
    // 简化后不需要处理聚合函数
  }

  addArrayItem(key: string, schema: EditorChartArraySchema[]) {
    const defaultType = schema[0]?.options?.[0].val as string;
    const item: any = {};
    for (const field of schema) {
      item[field.key] = '';
    }
    item['type'] = defaultType;
  }
}
