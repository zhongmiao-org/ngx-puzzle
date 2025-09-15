import { Component, effect, input, output, model, OnDestroy, inject, signal } from '@angular/core';
import { Subject } from 'rxjs';
import {
  DataRequestConfig,
  SafeAny,
  EditorBaseField,
  NgxPuzzleDataBindingRequest,
  convertFormDataToOptions,
  convertOptionsToFormData,
  updateFormData,
  ControlsService,
  NgxPuzzleDataBindingService
} from '../../../../core';
import { isEqual } from 'lodash';

/**
 * 编辑器基类，提供通用的编辑器功能
 * @template TConfig 具体的配置对象类型
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
  protected dataBindingService = inject(NgxPuzzleDataBindingService);

  // 通用输入属性
  componentId = input<string>();
  options = model<TConfig>();
  subType = input<string>();
  requestOptions = input<DataRequestConfig>({ apiSources: [] });

  // 通用输出事件
  readonly onChange = output<TConfig>();
  readonly requestOptionsChange = output<DataRequestConfig>();

  // 统一的字段属性名
  public sections: TSection[] = [];

  // 通用公共属性
  public formData = signal<Record<string, SafeAny>>({});

  // 生命周期管理
  protected destroy$ = new Subject<void>();

  constructor() {
    effect(() => {
      const dataRequest = this.requestOptions();
      console.log(`EditorBaseComponent dataRequest`, dataRequest);
    });
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
    }, { allowSignalWrites: true });
  }

  /**
   * 抽象方法：设置字段配置 - 子类必须实现
   */
  protected abstract setFields(type?: TSubType): void;

  /**
   * 获取组件类型 - 子类需要实现
   */
  protected abstract getComponentType(): string;

  /**
   * 更新表单数据 - 子类可重写
   */
  protected updateFormData(config?: TConfig): void {
    // 先转换新的 formData
    const newFormData = convertOptionsToFormData(config, this.sections);
    console.log(`updateFormData`, newFormData);
    if (!isEqual(this.formData, newFormData)) {
      this.formData.set(newFormData);
      console.log(`updateFormData`, this.formData);
    }
  }

  /**
   * 配置更新后的钩子方法 - 子类可重写
   */
  protected afterConfigUpdate(config?: TConfig, requestOptions?: DataRequestConfig): void {
    // 子类可重写此方法
  }

  /**
   * 表单字段变更处理 - 子类可重写
   */
  onFormFieldChange(key: string, value: SafeAny, parentKey?: string, index?: number): void {
    this.formData.set(updateFormData(this.formData, key, value, parentKey, index));
    console.log(`onFormFieldChange`, this.formData());
    const updated = convertFormDataToOptions(this.formData(), structuredClone(this.options()), this.sections)!;
    this.onChange.emit(updated);
  }

  /**
   * 删除数组项 - 支持数据绑定同步
   */
  protected removeArrayItem(key: string, index: number): void {
    this.formData.set(this.formData()[key].splice(index, 1));
    this.options.set(convertFormDataToOptions(this.formData(), this.options(), this.sections));
    console.log(`removeArrayItem`, this.options());
    this.onChange.emit(this.options()!);

    // 如果删除的是系列数据，同步删除数据绑定
    if (key === 'series' && this.componentId()) {
      this.dataBindingService.removeSeriesBinding(this.componentId()!, index);
    }
  }

  onDataBtnClick<T extends EditorBaseField>(field: T, i: number) {
    console.log(`onDataBtnClick`, field, i);

    // 简化的数据绑定请求，只传递必要信息
    const request: NgxPuzzleDataBindingRequest = {
      componentId: this.componentId() || '',
      componentType: this.getComponentType(),
      seriesIndex: i,
      apiSource: this.requestOptions()?.apiSources?.[i]
    };

    // 发起数据绑定请求
    this.dataBindingService.requestBinding(request);
  }

  ngOnDestroy(): void {
    // 清理组件的数据绑定
    if (this.componentId()) {
      this.dataBindingService.removeComponentDataRequest(this.componentId()!);
    }

    this.destroy$.next();
    this.destroy$.complete();
  }
}
