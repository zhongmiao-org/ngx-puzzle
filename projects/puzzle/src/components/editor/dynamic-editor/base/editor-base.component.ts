import { Component, effect, input, output, model, OnDestroy, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { DataRequestConfig, SafeAny, EditorBaseField } from '../../../../core';
import { convertFormDataToOptions, convertOptionsToFormData, updateFormData } from '../../../../core/utils';
import { isEqual } from 'lodash';
import { ControlsService } from 'ngx-puzzle/core/services/internal/controls.service';

/**
 * 编辑器基类，提供通用的编辑器功能
 * @template TConfig 具体的配置对象类型（如 AgChartOptions、TableConfig、TextConfig）
 * @template TSubType 子类型枚举
 * @template TField 字段类型，继承自 EditorBaseField
 */
@Component({
  template: ``
})
export abstract class EditorBaseComponent<
  TConfig extends Record<string, SafeAny> = Record<string, SafeAny>,
  TSubType extends string = string,
  TSection extends EditorBaseField = EditorBaseField
> implements OnDestroy
{
  protected controlsService = inject(ControlsService);

  // 通用输入属性
  componentId = input<string>();
  options = model<TConfig>();
  subType = input<string>();
  requestOptions = model<DataRequestConfig>({ paramSearch: [], aggregations: [] });

  // 通用输出事件
  readonly onChange = output<TConfig>();
  readonly requestOptionsChange = output<DataRequestConfig>();

  // 统一的字段属性名
  public sections: TSection[] = [];

  // 通用公共属性
  public formData: Record<string, SafeAny> = {};
  public visible: boolean = false;
  public bufferIndex: number = 0;

  // 生命周期管理
  protected destroy$ = new Subject<void>();

  constructor() {
    this.setupEffects();
  }

  /**
   * 设置 effect 监听
   */
  private setupEffects(): void {
    effect(() => {
      const opts = this.options();
      const type = this.subType();
      this.setFields(type as TSubType);

      this.updateFormData(opts);

      this.afterConfigUpdate(opts, this.requestOptions());
    });
  }

  /**
   * 抽象方法：设置字段配置 - 子类必须实现
   */
  protected abstract setFields(type?: TSubType): void;

  /**
   * 更新表单数据
   */
  protected updateFormData(config?: TConfig): void {
    // 先转换新的 formData
    const newFormData = convertOptionsToFormData(config, this.sections);
    // 比较新旧数据，只有不相等时才更新
    if (!isEqual(this.formData, newFormData)) {
      this.formData = newFormData;
    }
  }

  /**
   * 配置更新后的钩子方法 - 子类可重写
   */
  protected afterConfigUpdate(config?: TConfig, requestOptions?: DataRequestConfig): void {
    // 子类可重写此方法
  }

  /**
   * 表单字段变更处理
   */
  onFormFieldChange(key: string, value: SafeAny, parentKey?: string, index?: number): void {
    this.formData = updateFormData(this.formData, key, value, parentKey, index);
    const updated = convertFormDataToOptions(this.formData, structuredClone(this.options()), this.sections)!;
    this.onChange.emit(updated as TConfig);
  }

  /**
   * 打开数据源对话框
   */
  openData(index: number = 0): void {
    const currentRequestOptions = this.requestOptions();

    // 确保 requestOptions 存在基本结构
    if (!currentRequestOptions) {
      this.requestOptions.set({
        paramSearch: [],
        aggregations: []
      });
    }

    const updatedOptions = { ...this.requestOptions() };

    // 确保 paramSearch 数组有足够的长度
    if (!updatedOptions.paramSearch) {
      updatedOptions.paramSearch = [];
    }

    // 扩展 paramSearch 数组到所需长度
    while (updatedOptions.paramSearch.length <= index) {
      updatedOptions.paramSearch.push({});
    }

    // 确保 aggregations 数组有足够的长度
    if (!updatedOptions.aggregations) {
      updatedOptions.aggregations = [];
    }

    // 扩展 aggregations 数组到所需长度，使用默认聚合函数
    while (updatedOptions.aggregations.length <= index) {
      updatedOptions.aggregations.push(this.getDefaultAggregationValue());
    }

    // 更新 requestOptions
    this.requestOptions.set(updatedOptions);

    this.beforeOpenData(index);
    this.bufferIndex = index;
    this.visible = true;
  }

  getDefaultAggregationValue(): string {
    return `(data) => {
  if (!Array.isArray(data)) {
    return [];
  }
  return data;
}`;
  }

  /**
   * 打开数据源对话框前的钩子
   */
  protected beforeOpenData(index: number): void {
    // 子类可重写此方法
  }

  /**
   * 数据源确认处理
   */
  onDataSourceConfirm(updatedRequestOptions: DataRequestConfig): void {
    this.requestOptions.set(updatedRequestOptions);
    this.requestOptionsChange.emit(updatedRequestOptions);
  }

  /**
   * 数据源取消处理
   */
  onDataSourceCancel(): void {
    this.bufferIndex = 0;
  }

  protected removeArrayItem(key: string, index: number): void {
    this.formData[key].splice(index, 1);
    this.options.set(convertFormDataToOptions(this.formData, this.options(), this.sections));
    this.onChange.emit(this.options()!);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
