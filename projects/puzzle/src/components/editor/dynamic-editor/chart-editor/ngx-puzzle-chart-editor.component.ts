import { Component, HostBinding } from '@angular/core';
import { DataRequestConfig, EditorChartArraySchema, EditorChartField } from 'ngx-puzzle/core/interfaces';
import { ChartTypesEnum } from 'ngx-puzzle/core/enums';
import { convertFormDataToOptions, Debounce, updateFormData } from 'ngx-puzzle/core/utils';
import { ThyCollapseModule } from 'ngx-tethys/collapse';
import { ThyCardModule } from 'ngx-tethys/card';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { NgStyle } from '@angular/common';
import { ThyInputNumber } from 'ngx-tethys/input-number';
import { FormControl, FormsModule } from '@angular/forms';
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

  private _fieldCache = new Map<string, SafeAny>();
  private _isInternalUpdate = false;

  public chartType!: ChartTypesEnum;
  public aggregationControls: FormControl[] = [];

  protected setFields(type: ChartTypesEnum): void {
    if (this.chartType === type) return;
    this.chartType = type;
    this.sections = CHART_FIELDS_MAP[type]!;
  }

  // protected override updateFormData(config: SafeAny): void {
  //   console.log(`chart updateFormData`, config)
  //   this.options.set(config);
  //   this.formData = convertOptionsToFormData(config, this.sections);
  // }

  protected override afterConfigUpdate(opts?: SafeAny, requestOptions?: DataRequestConfig): void {
    if (!opts) return;

    const aggregations = requestOptions?.aggregations || [this.getDefaultAggregationValue()];

    if (!this._isInternalUpdate) {
      this.aggregationControls = aggregations.map((stringFn) => {
        const fieldControl = new FormControl();
        fieldControl.setValue(stringFn, { emitEvent: true });
        return fieldControl;
      });
      this.clearFieldCache();
    }

    this._isInternalUpdate = false;
  }

  // 重写表单字段变更处理以保持原始逻辑
  override onFormFieldChange(key: string, value: any, parentKey?: string, index?: number): void {
    if (value && value['originalEvent'] instanceof PointerEvent) {
      value = value?.['value'];
    }
    this.formData = updateFormData(this.formData, key, value, parentKey, index);

    this.options.set(convertFormDataToOptions(this.formData, this.options(), this.sections));
    this.onChange.emit(this.options()!);
  }

  protected override beforeOpenData(index: number): void {
    const currentAggregations = this.requestOptions()?.aggregations;
    if (!currentAggregations || currentAggregations.length === 0) {
      this.requestOptions.set({
        ...this.requestOptions(),
        aggregations: [this.getDefaultAggregationValue()]
      });
    }
  }

  private clearFieldCache(): void {
    this._fieldCache.clear();
  }

  addArrayItem(key: string, schema: EditorChartArraySchema[]) {
    const defaultType = schema[0]?.options?.[0].val as string;
    const item: any = {};
    for (const field of schema) {
      item[field.key] = '';
    }
    this.formData[key] = this.formData[key] || [];
    item['type'] = defaultType;
    this.formData[key].push(item);
  }

  @Debounce(500)
  onCoding(stringFn: string, index = 0) {
    const currentAggregations = this.requestOptions()?.aggregations ?? [];

    if (currentAggregations[index] === stringFn) {
      return;
    }

    this._isInternalUpdate = true;

    const aggregations = [...currentAggregations];
    aggregations[index] = stringFn;
    this.requestOptions.set({ ...this.requestOptions(), aggregations });
    this.requestOptionsChange.emit(this.requestOptions()!);
  }

  flattenTree(data: any[], parent: any = null): any[] {
    return data.flatMap((item) => {
      const node = { ...item, __parent: parent };
      const children = item.children ? this.flattenTree(item.children, node) : [];
      return [node, ...children];
    });
  }

  processTreeData(data: any[], parent: any = null): any[] {
    return data.flatMap((item) => {
      const node = { ...item, __parent: parent };
      return item.children ? [node, ...this.processTreeData(item.children, node)] : [node];
    });
  }

}
