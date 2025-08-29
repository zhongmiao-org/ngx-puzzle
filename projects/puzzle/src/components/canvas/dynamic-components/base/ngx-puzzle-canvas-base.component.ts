import { ComponentBaseProps, ComponentConfig, ControlFilterCondition, DataRequestConfig } from 'ngx-puzzle/core/interfaces';
import { Component, inject, OnDestroy } from '@angular/core';
import { mainTypes } from 'ngx-puzzle/core/types';
import { SafeAny } from 'ngx-tethys/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ControlsService } from 'ngx-puzzle/core/services/internal/controls.service';
import { DEFAULT_INTERVAL_MULTIPLIERS, PuzzleCanvasMediatorService, RefreshIntervalUnitEnum } from 'ngx-puzzle/core';

@Component({
  template: ``
})
export abstract class NgxPuzzleCanvasBaseComponent<TConfigProps extends ComponentBaseProps = ComponentBaseProps, TSubType = string>
  implements OnDestroy
{
  private refreshTimer: SafeAny | null = null;

  private currentControlFilters: ControlFilterCondition[] = [];

  protected controlsService = inject(ControlsService);

  protected abstract get dataKey(): mainTypes;

  protected _config!: ComponentConfig<TConfigProps, TSubType>;

  protected _isEdit: boolean = false;

  protected readonly destroy$ = new Subject<void>();

  protected controlFilter: SafeAny[] = [];

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
    // 添加组件销毁检查
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
    this.mediator.componentUpdateProps$.pipe(takeUntil(this.destroy$)).subscribe(({ id, props }) => {
      if (id === this._config.id) {
        console.log(`componentUpdateProps$`, { id, props });
        this.updateProps(props);
      }
    });

    this.mediator.dataRequest$.pipe(takeUntil(this.destroy$)).subscribe(({ id, dataRequest }) => {
      if (id === this._config.id) {
        this._config.dataRequest = dataRequest;
        this.updateData(dataRequest);
      }
    });

    this.controlsService.controlValueChange$.pipe(takeUntil(this.destroy$)).subscribe(({ controlId, controlFilters }) => {
      if (this._config.type === 'control') return;
      this.handleControlValueChange(controlId, controlFilters);
    });
  }

  private handleControlValueChange(controlId: string, controlFilters: SafeAny): void {
    console.log(`[组件-${this._config.id}] 控件值变化:`, { controlId, controlFilters });

    // 检查当前组件是否需要响应这个控件变化
    if (this._config.refreshConfig?.controlIds?.includes(controlId)) {
      console.log(`[组件-${this._config.id}] 响应控件变化，更新过滤条件`);

      // 更新当前的控件过滤条件 - 只取当前组件关联的控件
      this.currentControlFilters = this._config.refreshConfig.controlIds.map((id) => controlFilters[id]).filter(Boolean); // 过滤掉 undefined 的值

      console.log(`[组件-${this._config.id}] 执行刷新，过滤条件:`, this.currentControlFilters);
      this.executeRefresh();
    }
  }

  // 定时刷新逻辑
  private setupRefreshTimer(): void {
    this.clearRefreshTimer();

    const refreshConfig = this._config.refreshConfig;
    if (!refreshConfig?.enabled || this.isEdit) {
      return; // 编辑模式下不启动定时器
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

    // 检查是否启用定时刷新
    if (!refreshConfig.enabled) {
      console.log(`[组件-${this._config.id}] 定时刷新已禁用，停止刷新`);
      return false;
    }

    // 检查最大刷新次数
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
      const newRequestData = this.buildRequestDataWithFilters(dataRequest);
      console.log(`[组件-${this._config.id}] 执行刷新，合并后的请求数据:`, newRequestData);
      this.updateData(newRequestData);
    }
  }

  private updateRefreshStats(): void {
    if (this._config.refreshConfig) {
      this._config.refreshConfig.currentRefreshCount = (this._config.refreshConfig.currentRefreshCount || 0) + 1;
      this._config.refreshConfig.lastRefreshTime = new Date();
    }
  }

  private buildRequestDataWithFilters(dataRequest: DataRequestConfig): DataRequestConfig {
    return {
      ...dataRequest,
      paramSearch:
        dataRequest.paramSearch?.map((search) => ({
          ...search,
          columnFilters: [
            ...(Array.isArray(search?.columnFilters) ? search.columnFilters : []),
            ...(Array.isArray(this.currentControlFilters) ? this.currentControlFilters : [])
          ]
        })) || []
    };
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

  // 公共方法：重启定时器（配置更新后调用）
  public restartRefreshTimer(): void {
    this.setupRefreshTimer();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
