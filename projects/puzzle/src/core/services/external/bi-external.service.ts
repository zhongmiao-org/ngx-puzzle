import { Injectable, inject } from '@angular/core';
import { ComponentConfig } from '../../interfaces';
import { ComponentRegistryService, SessionIndexedDbService, ComponentInjectorService, CanvasMediatorService } from '../internal';
import { generateUUID } from 'ngx-puzzle/utils';
// import { generateUniqueId } from 'imm-element-ui';
// import { parseDate } from '../../../shared';

/**
 * 向其他模块暴露BI功能的外部服务
 */
@Injectable({
	providedIn: 'root',
})
export class BiExternalService {
	private registry = inject(ComponentRegistryService);
	private sessionService = inject(SessionIndexedDbService);
	private injector = inject(ComponentInjectorService);
	private mediator = inject(CanvasMediatorService);

	/**
	 * 获取所有当前组件配置
	 * @returns 组件配置数组
	 */
	public getAllConfigs(): ComponentConfig[] {
		return this.registry.getAll();
	}

	/**
	 * 使用给定配置初始化组件
	 * @param configs 组件配置数组或单个组件配置
	 */
	public initializeComponent(configs: ComponentConfig[] | ComponentConfig): void {
		this.resetAllComponents();

		// 处理单个配置的情况
		if (!Array.isArray(configs)) {
			configs = [configs];
		}

		// 处理配置数组
		configs.forEach((config) => {
			if (config.type === 'canvas') {
				// 对于canvas类型组件，使用mediator更新配置
				this.mediator.updateComponentConfig(config);
				console.log(`[BI服务] 初始化canvas组件`, config);
				// 延迟选择组件
				setTimeout(() => {
					this.mediator.selectComponent('canvas');
				}, 200);
			} else {
				// 对于其他类型组件，使用标准创建方法
				this.createComponent(config);
			}
		});
	}

	/**
	 * 创建单个组件
	 * @param config 组件配置
	 * @private
	 */
	private createComponent(config: ComponentConfig): void {
		const factory = this.registry.getFactory(config.type);
		if (!factory) {
			console.error(`[BI服务] 未找到组件类型的工厂: ${config.type}`);
			return;
		}

		const instance = factory.create(config);
		this.registry.register(config);
		this.injector.createComponent(instance, true);
	}

	/**
	 * 生成预览ID并存储当前组件配置
	 * @param ttl 可选的生存时间（毫秒）
	 * @returns 包含生成的预览ID的Promise
	 */
	public async generatePreviewId(ttl?: number): Promise<string> {
		const allConfigs = this.registry.getAll();
		const uuid = generateUUID();

		await this.sessionService.setItem(uuid, allConfigs, ttl);

		return uuid;
	}

	/**
	 * 通过预览ID获取组件配置
	 * @param previewId 预览ID
	 * @returns 包含组件配置的Promise，如果未找到则为null
	 */
	public async getConfigsByPreviewId(previewId: string): Promise<ComponentConfig[] | null> {
		return this.sessionService.getItem(previewId);
	}

	/**
	 * 通过清除注册表、注入器和中介者状态来重置所有组件
	 * 此方法可用于将BI编辑器初始化为干净状态
	 */
	public resetAllComponents(): void {
		console.log('[BI服务] 开始重置所有组件');

		// 清除组件注册表
		this.registry.clearAll();

		// 清除注入的组件
		this.injector.clearAll();

		// 重置中介者状态
		this.mediator.reset();

		console.log('[BI服务] 所有组件重置成功');
	}

	// private initializeConfigData(config: ComponentConfig): ComponentConfig {
	// 	if (!config?.controls?.datePick) {
	// 		return config;
	// 	}
	//
	// 	const datePickControl = config.controls.datePick;
	//
	// 	config.controls.datePick = {
	// 		...datePickControl,
	// 		props: {
	// 			...datePickControl.props,
	// 			minDate: parseDate(datePickControl.props?.minDate),
	// 			maxDate: parseDate(datePickControl.props?.maxDate),
	// 		},
	// 		defaultValue: parseDate(datePickControl.defaultValue),
	// 	};
	//
	// 	return config;
	// }
}
