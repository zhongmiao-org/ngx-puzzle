import { inject, Injectable } from '@angular/core';
import {
  AbstractComponentFactory,
  NgxPuzzleControlFactoryService,
  NgxPuzzleTableFactoryService,
  NgxPuzzleTextFactoryService,
  NgxPuzzleChartFactoryService
} from 'ngx-puzzle/core/factories';
import { ComponentBaseProps, ComponentConfig, DataRequestConfig, Position, Size } from 'ngx-puzzle/core';

import { mainTypes } from '../../types';
import { INIT_SETTINGS_CONFIG } from '../../constants';

@Injectable({ providedIn: 'root' })
export class ComponentRegistryService<TConfigProps extends ComponentBaseProps = ComponentBaseProps, TSubType = string> {
  private chartFactory = inject(NgxPuzzleChartFactoryService);
  private tableFactory = inject(NgxPuzzleTableFactoryService);
  private textFactory = inject(NgxPuzzleTextFactoryService);
  private controlFactory = inject(NgxPuzzleControlFactoryService);

  private factories: Partial<{ [key in mainTypes]: AbstractComponentFactory }> = {};
  private components: Map<string, ComponentConfig<TConfigProps, TSubType>> = new Map<string, ComponentConfig<TConfigProps, TSubType>>();

  constructor() {
    this.initializeDefaultComponents();
  }

  private initializeDefaultComponents(): void {
    this.components.set('canvas', structuredClone(INIT_SETTINGS_CONFIG['canvas'] as ComponentConfig<TConfigProps, TSubType>));
    this.factories['chart'] = this.chartFactory;
    this.factories['table'] = this.tableFactory;
    this.factories['text'] = this.textFactory;
    this.factories['control'] = this.controlFactory;
  }

  getFactory(type: mainTypes): AbstractComponentFactory {
    return this.factories[type]!;
  }

  register(config: ComponentConfig<TConfigProps, TSubType>): void {
    this.components.set(config.id, structuredClone(config));
  }

  update(config: ComponentConfig<TConfigProps, TSubType>): void {
    const { id } = config;
    const existing = this.components.get(id);
    if (!existing) return;

    const updated: ComponentConfig<TConfigProps, TSubType> = {
      ...existing,
      ...config,
      props: { ...existing.props, ...config.props }
    };
    this.components.set(id, structuredClone(updated));
  }

  updateProps(id: string, props: TConfigProps): void {
    const existing = this.components.get(id);
    if (!existing) return;
    const updated: ComponentConfig<TConfigProps, TSubType> = {
      ...existing,
      props: {
        ...existing.props,
        ...props
      }
    };
    this.components.set(id, structuredClone(updated));
  }

  updatePosition(id: string, pos: Position): void {
    const existing = this.components.get(id);
    if (!existing) return;

    const updated: ComponentConfig<TConfigProps, TSubType> = {
      ...existing,
      position: pos
    };

    this.components.set(id, structuredClone(updated));
  }

  updateSize(id: string, size: Size, position: Position): void {
    const existing = this.components.get(id);
    if (!existing) return;
    const updated: ComponentConfig<TConfigProps, TSubType> = {
      ...existing,
      size,
      position
    };

    this.components.set(id, structuredClone(updated));
  }

  updateDataRequest(id: string, dataRequest: DataRequestConfig): void {
    const existing = this.components.get(id);
    if (!existing) return;
    const updated: ComponentConfig<TConfigProps, TSubType> = {
      ...existing,
      dataRequest
    };
    this.components.set(id, structuredClone(updated));
  }

  // updateControls(id: string, controls: Record<controlType, ControlConfig>): void {
  // 	const existing = this.components.get(id);
  // 	if (!existing) return;
  // 	const updated: ComponentConfig<TConfigProps, TSubType> = {
  // 		...existing,
  // 		controls,
  // 	};
  // 	this.components.set(id, structuredClone(updated));
  // }

  getAll(): ComponentConfig<TConfigProps, TSubType>[] {
    return Array.from(this.components.values());
  }

  getById(id: string): ComponentConfig<TConfigProps, TSubType> | undefined {
    return this.components.get(id);
  }

  getPropsById(id: string): TConfigProps | undefined {
    const config = this.getById(id);
    return config?.props;
  }

  remove(id: string): void {
    if (this.components.has(id)) {
      this.components.delete(id);
    }
  }

  /**
   * 清理所有组件配置，重新初始化为默认状态
   */
  clearAll(): void {
    console.log('[注册表] 开始清理所有组件');

    // 获取需要清理的组件列表
    const componentIds = Array.from(this.components.keys());
    console.log('[注册表] 待清理的组件:', componentIds);

    // 清空所有组件
    this.components.clear();

    // 重新初始化默认组件（如canvas）
    this.initializeDefaultComponents();

    console.log('[注册表] 所有组件已清理完成，默认组件已恢复');
  }

  /**
   * 重置到初始状态，保留工厂但清空组件
   */
  reset(): void {
    this.clearAll();
  }

  /**
   * 获取组件数量，用于调试
   */
  getComponentCount(): number {
    return this.components.size;
  }

  /**
   * 检查是否有指定ID的组件
   */
  hasComponent(id: string): boolean {
    return this.components.has(id);
  }
}
