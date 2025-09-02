import {
  ComponentBaseProps,
  ComponentConfig,
  ControlFilterCondition,
  DataRequestConfig,
  NgxPuzzleDataBindingResponse
} from 'ngx-puzzle/core/interfaces';
import { Component, inject, OnDestroy } from '@angular/core';
import { mainTypes } from 'ngx-puzzle/core/types';
import { SafeAny } from 'ngx-tethys/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ControlsService } from 'ngx-puzzle/core/services/internal/controls.service';
import { DEFAULT_INTERVAL_MULTIPLIERS, PuzzleCanvasMediatorService, RefreshIntervalUnitEnum } from 'ngx-puzzle/core';
import { NgxPuzzleDataBindingService } from 'ngx-puzzle/core/services/external/ngx-puzzle-data-binding.service';

@Component({
  template: ``
})
export abstract class NgxPuzzleCanvasBaseComponent<TConfigProps extends ComponentBaseProps = ComponentBaseProps, TSubType = string>
  implements OnDestroy
{
  private refreshTimer: SafeAny | null = null;
  private currentControlFilters: ControlFilterCondition[] = [];
  private currentDataStreamsHash: string[] = []; // 存储数据流的 hash

  protected controlsService = inject(ControlsService);
  protected dataBindingService = inject(NgxPuzzleDataBindingService);

  protected abstract get dataKey(): mainTypes;

  protected _config!: ComponentConfig<TConfigProps, TSubType>;
  protected _isEdit: boolean = false;
  protected readonly destroy$ = new Subject<void>();

  protected set isEdit(value: boolean) {
    this._isEdit = value;
  }

  protected get isEdit(): boolean {
    return this._isEdit;
  }

  protected constructor(public mediator: PuzzleCanvasMediatorService<TConfigProps, TSubType>) {
    this.setupObservables();
  }

  protected abstract getDefaultOptions(subType: TSubType): SafeAny;
  protected abstract updateData(requestData: DataRequestConfig): void;

  protected setBaseDataRequest(): void {}
  protected afterUpdateConfig(): void {}

  initConfig(config: ComponentConfig<TConfigProps, TSubType>): void {
    this._config = config;
    this.setBaseProps();
    this.setBaseDataRequest();
    this.afterUpdateConfig();
  }

  updateProps(props: TConfigProps): void {
    if (this.destroy$.closed) return;

    this._config.props = props;
    this.afterUpdateConfig();
  }

  setBaseProps(): void {
    if (!this._config.props?.[this.dataKey]) {
      this._config = {
        ...this._config,
        props: {
          ...this._config.props,
          [this.dataKey]: this.getDefaultOptions(this._config.subType)
        }
      };
      this.mediator.updateComponentData(this._config);
    }
  }

  protected setupObservables() {
    // 监听组件属性更新
    this.mediator.componentUpdateProps$.pipe(takeUntil(this.destroy$)).subscribe(({ id, props }) => {
      if (id === this._config.id) {
        console.log(`componentUpdateProps$`, { id, props });
        this.updateProps(props);
      }
    });

    // 监听数据请求更新
    this.mediator.dataRequest$.pipe(takeUntil(this.destroy$)).subscribe(({ id, dataRequest }) => {
      if (id === this._config.id) {
        this._config.dataRequest = dataRequest;
        this.updateDataWithStreamCheck(dataRequest);
      }
    });

    // 监听控件值变化 - 只通知外部，不处理业务逻辑
    this.controlsService.controlValueChange$.pipe(takeUntil(this.destroy$)).subscribe(({ controlId, controlFilters }) => {
      if (this._config.type === 'control') return;
      this.handleControlValueChange(controlId, controlFilters);
    });

    // 监听数据绑定响应
    this.dataBindingService.bindingResponse$.pipe(takeUntil(this.destroy$)).subscribe((response) => {
      if (response.componentId === this._config.id) {
        this.handleBindingResponse(response);
      }
    });

    // 监听系列绑定删除事件
    this.dataBindingService.bindingDelete$.pipe(takeUntil(this.destroy$)).subscribe(({ componentId, seriesIndex }) => {
      if (componentId === this._config.id) {
        this.handleSeriesBindingDelete(seriesIndex);
      }
    });
  }

  /**
   * 处理控件值变化 - 只通知外部
   */
  private handleControlValueChange(controlId: string, controlFilters: SafeAny): void {
    console.log(`[组件-${this._config.id}] 控件值变化:`, { controlId, controlFilters });

    // 检查当前组件是否需要响应这个控件变化
    if (this._config.refreshConfig?.controlIds?.includes(controlId)) {
      console.log(`[组件-${this._config.id}] 通知外部控件变化`);

      // 更新当前的控件过滤条件
      this.currentControlFilters = this._config.refreshConfig.controlIds.map((id) => controlFilters[id]).filter(Boolean);

      // 通知外部控件变化，让外部处理业务逻辑
      this.dataBindingService.notifyControlChange(this._config.id, controlId, this.currentControlFilters);
    }
  }

  /**
   * 处理数据绑定响应
   */
  private handleBindingResponse(response: NgxPuzzleDataBindingResponse): void {
    console.log(`[组件-${this._config.id}] 收到数据绑定响应:`, response);

    // 更新数据请求配置
    this.mediator.updateDataRequest(this._config.id, response.dataRequest);
  }

  /**
   * 带流检查的数据更新
   */
  private updateDataWithStreamCheck(dataRequest: DataRequestConfig): void {
    const { apiSources } = dataRequest;

    if (this.isEdit) {
      // 编辑模式：仅对比 URL/方法/参数是否变化
      const hasChanged = this.hasApiSourcesChanged(apiSources || []);
      if (hasChanged) {
        console.log(`[组件-${this._config.id}] 数据源已变化，执行更新`);
        this.updateData(dataRequest);
        this.updateApiSourcesHash(apiSources || []);
      } else {
        console.log(`[组件-${this._config.id}] 数据源未变化，跳过更新`);
      }
    } else {
      // 预览模式：直接更新
      this.updateData(dataRequest);
      this.updateApiSourcesHash(apiSources || []);
    }
  }

  /**
   * 检查数据源是否变化（仅比较 url/method/params 的 JSON 序列化结果）
   */
  private hasApiSourcesChanged(dataStreams: { url: string; method: string; params?: Record<string, SafeAny> }[]): boolean {
    const serialize = (s: { url: string; method: string; params?: Record<string, SafeAny> }) =>
      `${s?.method || ''}|${s?.url || ''}|${JSON.stringify(s?.params || {})}`;
    const newHashes = dataStreams.map(serialize);

    if (this.currentDataStreamsHash.length !== newHashes.length) {
      return true;
    }

    return !newHashes.every((hash, index) => hash === this.currentDataStreamsHash[index]);
  }

  /**
   * 更新数据源 hash
   */
  private updateApiSourcesHash(dataStreams: { url: string; method: string; params?: Record<string, SafeAny> }[]): void {
    const serialize = (s: { url: string; method: string; params?: Record<string, SafeAny> }) =>
      `${s?.method || ''}|${s?.url || ''}|${JSON.stringify(s?.params || {})}`;
    this.currentDataStreamsHash = dataStreams.map(serialize);
  }

  /**
   * 处理系列绑定删除 - 子类可重写
   */
  protected handleSeriesBindingDelete(seriesIndex: number): void {
    console.log(`[组件-${this._config.id}] 系列绑定已删除:`, seriesIndex);
  }

  // ==================== 定时刷新逻辑 ====================

  private setupRefreshTimer(): void {
    this.clearRefreshTimer();

    const refreshConfig = this._config.refreshConfig;
    if (!refreshConfig?.enabled || this.isEdit) {
      return;
    }

    const intervalMs = this.getIntervalInMilliseconds(refreshConfig.interval, refreshConfig.intervalUnit);
    console.log(`[组件-${this._config.id}] 启动定时刷新，间隔: ${refreshConfig.interval}${refreshConfig.intervalUnit}`);

    this.refreshTimer = setInterval(() => {
      this.handleScheduledRefresh();
    }, intervalMs);
  }

  private handleScheduledRefresh(): void {
    if (!this.shouldContinueRefresh()) {
      this.clearRefreshTimer();
      return;
    }

    console.log(`[组件-${this._config.id}] 执行定时刷新`);
    this.executeRefresh();
  }

  private shouldContinueRefresh(): boolean {
    const refreshConfig = this._config.refreshConfig;
    if (!refreshConfig) return false;

    if (!refreshConfig.enabled) {
      console.log(`[组件-${this._config.id}] 定时刷新已禁用，停止刷新`);
      return false;
    }

    if (
      refreshConfig.maxRefreshCount &&
      refreshConfig.currentRefreshCount &&
      refreshConfig.currentRefreshCount >= refreshConfig.maxRefreshCount
    ) {
      console.log(`[组件-${this._config.id}] 达到最大刷新次数，停止刷新`);
      return false;
    }

    return true;
  }

  private executeRefresh(): void {
    this.updateRefreshStats();

    const dataRequest = this._config.dataRequest;
    if (dataRequest) {
      // 简单地直接执行刷新，外部负责提供新的数据流
      console.log(`[组件-${this._config.id}] 执行刷新，数据请求:`, dataRequest);
      this.updateData(dataRequest);
    }
  }

  private updateRefreshStats(): void {
    if (this._config.refreshConfig) {
      this._config.refreshConfig.currentRefreshCount = (this._config.refreshConfig.currentRefreshCount || 0) + 1;
      this._config.refreshConfig.lastRefreshTime = new Date();
    }
  }

  private clearRefreshTimer(): void {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
      console.log(`[组件-${this._config.id}] 清除定时器`);
    }
  }

  private getIntervalInMilliseconds(interval: number, unit: RefreshIntervalUnitEnum): number {
    const multiplier = DEFAULT_INTERVAL_MULTIPLIERS[unit] || DEFAULT_INTERVAL_MULTIPLIERS[RefreshIntervalUnitEnum.minutes];
    return interval * multiplier;
  }

  public restartRefreshTimer(): void {
    this.setupRefreshTimer();
  }

  ngOnDestroy(): void {
    this.clearRefreshTimer();

    if (this._config?.id) {
      this.dataBindingService.removeComponentDataRequest(this._config.id);
    }

    this.destroy$.next();
    this.destroy$.complete();
  }
}
