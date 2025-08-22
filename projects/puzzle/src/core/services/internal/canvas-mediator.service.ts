import { inject, Injectable } from '@angular/core';
import {
	CanvasMediator,
	ComponentBaseProps,
	ComponentConfig,
	DataRequestConfig,
	ControlConfig,
	HistoryActionStack,
	Position,
	Size,
} from '../../interfaces';
import { ComponentRegistryService } from './component-registry.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { isEqual } from 'lodash';
import { actionTypes, controlType } from '../../types';
import { INIT_SETTINGS_CONFIG } from '../../constants';
import { DebounceUtil, isTargetInputElement } from '../../../shared';
import { OperationHistoryEnum } from '../../enums';

@Injectable({ providedIn: 'root' })
export class CanvasMediatorService<TConfigProps extends ComponentBaseProps = ComponentBaseProps, TSubType = string>
	implements CanvasMediator<TConfigProps, TSubType>
{
	private registry = inject(ComponentRegistryService<TConfigProps, TSubType>);

	private actionSnapshot: ComponentConfig<TConfigProps, TSubType> | null = null;

	// 操作记录
	private historyActionStacks: HistoryActionStack<TConfigProps, TSubType>[] = [];

	// 当前正在进行的操作类型
	private currentOperationType: OperationHistoryEnum = OperationHistoryEnum.null;

	private addComponentSubject: Subject<ComponentConfig<TConfigProps, TSubType>> = new Subject<ComponentConfig<TConfigProps, TSubType>>();
	public readonly componentAdd$: Observable<ComponentConfig<TConfigProps, TSubType>> = this.addComponentSubject.asObservable();

	private componentSelectSubject: Subject<ComponentConfig<TConfigProps, TSubType>> = new BehaviorSubject<
		ComponentConfig<TConfigProps, TSubType>
	>(INIT_SETTINGS_CONFIG['canvas'] as ComponentConfig<TConfigProps, TSubType>);
	public readonly componentSelect$: Observable<ComponentConfig<TConfigProps, TSubType>> = this.componentSelectSubject.asObservable();

	private updateComponentPropsSubject: Subject<{ id: string; props: TConfigProps }> = new Subject<{ id: string; props: TConfigProps }>();
	public readonly componentUpdateProps$: Observable<{ id: string; props: TConfigProps }> = this.updateComponentPropsSubject.asObservable();

	private updateComponentConfigSubject: Subject<ComponentConfig<TConfigProps, TSubType>> = new Subject<
		ComponentConfig<TConfigProps, TSubType>
	>();
	public readonly componentUpdateConfig$: Observable<ComponentConfig<TConfigProps, TSubType>> =
		this.updateComponentConfigSubject.asObservable();

	private movingComponentSubject: Subject<{ id: string; position: Position }> = new Subject<{ id: string; position: Position }>();
	public readonly componentMoving$: Observable<{ id: string; position: Position }> = this.movingComponentSubject.asObservable();

	private resizeComponentSubject: Subject<{ id: string; position: Position; size: Size }> = new Subject<{
		id: string;
		position: Position;
		size: Size;
	}>();
	public readonly componentResize$: Observable<{ id: string; position: Position; size: Size }> = this.resizeComponentSubject.asObservable();

	private removeComponentSubject: Subject<string> = new Subject<string>();
	public readonly componentRemove$: Observable<string> = this.removeComponentSubject.asObservable();

	// private UndoComponentSubject: Subject<void> = new Subject<void>();
	// public readonly componentUndo$: Observable<void> = this.UndoComponentSubject.asObservable();

	// 抽屉切换
	private drawerWideModeSubject = new BehaviorSubject<boolean>(false);
	public readonly drawerWideMode$ = this.drawerWideModeSubject.asObservable();

	// 数据参数
	private dataRequestSubject = new Subject<{ id: string; dataRequest: DataRequestConfig }>();
	public readonly dataRequest$ = this.dataRequestSubject.asObservable();

	// 控件
	private controlsSubject = new Subject<{ id: string; controls: Record<controlType, ControlConfig> }>();
	public readonly controls$ = this.controlsSubject.asObservable();

	private _currentSelectId!: string;

	constructor() {}

	/**
	 * 刷新指定操作类型的防抖历史记录
	 */
	private flushPendingHistory(excludeType?: OperationHistoryEnum): void {
		// 刷新所有其他类型的防抖历史记录
		if (excludeType !== OperationHistoryEnum.props) {
			DebounceUtil.flush(OperationHistoryEnum.props);
		}
		if (excludeType !== OperationHistoryEnum.move) {
			DebounceUtil.flush(OperationHistoryEnum.move);
		}
		if (excludeType !== OperationHistoryEnum.resize) {
			DebounceUtil.flush(OperationHistoryEnum.resize);
		}
	}

	/**
	 * 开始新操作前的准备工作
	 */
	private prepareForNewOperation(newOperationType: OperationHistoryEnum): void {
		// 如果切换到不同类型的操作，立即执行之前操作的防抖历史记录
		if (this.currentOperationType && this.currentOperationType !== newOperationType) {
			console.log(`[中介器] 操作类型切换: ${this.currentOperationType} -> ${newOperationType}，立即记录前一操作历史`);
			this.flushPendingHistory(newOperationType);
		}
		this.currentOperationType = newOperationType;
	}

	/**
	 * 防抖记录属性更新历史 - 使用 actionSnapshot 的快照
	 */
	private debouncedRecordPropsHistory = DebounceUtil.create(
		(id: string) => {
			// 使用选中时保存的快照来记录历史
			if (this.actionSnapshot && this.actionSnapshot.id === id) {
				this.recordHistory(this.actionSnapshot, 'update');
				console.log(`[中介器] 防抖记录属性历史: update`, {
					id,
					stackLength: this.historyActionStacks.length,
					actionSnapshot: this.actionSnapshot,
				});

				// 更新快照为当前状态，为下一次操作做准备
				const currentConfig = this.registry.getById(id);
				if (currentConfig) {
					this.actionSnapshot = structuredClone(currentConfig);
				}
			}
			this.currentOperationType = OperationHistoryEnum.null;
		},
		500,
		OperationHistoryEnum.props,
	);

	/**
	 * 防抖记录移动历史
	 */
	private debouncedRecordMoveHistory = DebounceUtil.create(
		(id: string) => {
			if (this.actionSnapshot && this.actionSnapshot.id === id) {
				this.recordHistory(this.actionSnapshot, 'move');
				console.log(`[中介器] 防抖记录移动历史: move`, {
					id,
					stackLength: this.historyActionStacks.length,
				});

				// 更新快照为当前状态
				const currentConfig = this.registry.getById(id);
				if (currentConfig) {
					this.actionSnapshot = structuredClone(currentConfig);
				}
			}
			this.currentOperationType = OperationHistoryEnum.null;
		},
		500,
		OperationHistoryEnum.move,
	);

	/**
	 * 防抖记录缩放历史
	 */
	private debouncedRecordResizeHistory = DebounceUtil.create(
		(id: string) => {
			if (this.actionSnapshot && this.actionSnapshot.id === id) {
				this.recordHistory(this.actionSnapshot, 'resize');
				console.log(`[中介器] 防抖记录缩放历史: resize`, {
					id,
					stackLength: this.historyActionStacks.length,
				});

				// 更新快照为当前状态
				const currentConfig = this.registry.getById(id);
				if (currentConfig) {
					this.actionSnapshot = structuredClone(currentConfig);
				}
			}
			this.currentOperationType = OperationHistoryEnum.null;
		},
		500,
		OperationHistoryEnum.resize,
	);

	getCurrentSelect(): ComponentConfig<TConfigProps, TSubType> {
		return this.registry.getById(this._currentSelectId)!;
	}

	addComponent(config: ComponentConfig<TConfigProps, TSubType>, recordHistory = true): void {
		this.registry.register(config);
		this.addComponentSubject.next(config);
		if (recordHistory) {
			this.recordHistory(config, 'add');
		}
	}

	/**
	 * 全量更新,慎用
	 * @param config
	 */
	updateComponentConfig(config: ComponentConfig<TConfigProps, TSubType>): void {
		this.registry.update(config);
		this.updateComponentConfigSubject.next(config);
	}

	/**
	 * 更新但不通知
	 * @param config
	 */
	updateComponentData(config: ComponentConfig<TConfigProps, TSubType>) {
		this.registry.update(config);
	}

	/**
	 * 主要用于右侧面板更新通知子组件
	 * @param id
	 * @param props
	 * @param recordHistory 更新历史记录
	 */
	updateComponentProps(id: string, props: TConfigProps, recordHistory = true): void {
		const prev = this.registry.getPropsById(id);
		if (!prev) return;
		const hasChanges = !isEqual(prev, props);
		if (!hasChanges) return;
		this.registry.updateProps(id, props);
		this.updateComponentPropsSubject.next({ id, props });

		if (recordHistory) {
			this.prepareForNewOperation(OperationHistoryEnum.props);
			this.debouncedRecordPropsHistory(id);
		}
	}

	selectComponent(id: string): void {
		if (this._currentSelectId === id && id !== 'canvas') return;
		this._currentSelectId = id;
		const config = this.registry.getById(id);

		if (!config) {
			console.warn(`[中介器] 组件 ${id} 不存在，无法选中`);
			return;
		}

		// 选中时立即刷新所有防抖历史记录
		this.flushPendingHistory();
		this.currentOperationType = OperationHistoryEnum.null;
		console.log(`selectComponent`, config)
		// 每次选中时更新快照
		this.actionSnapshot = structuredClone(config);
		this.componentSelectSubject.next(config);
		this.clearAllInputFocus();
		console.log(`[中介器] 组件选中，更新快照: ${id}`);
	}

	/**
	 * 移动结束时防抖记录历史
	 */
	movingComponent(id: string, position: Position, recordHistory = true): void {
		try {
			this.registry.updatePosition(id, position);
			this.movingComponentSubject.next({ id, position });
			// 使用防抖记录历史
			if (recordHistory) {
				this.prepareForNewOperation(OperationHistoryEnum.move);
				this.debouncedRecordMoveHistory(id);
			}
		} catch (error) {
			console.warn(`[中介器] 移动组件时出错: ${id}`, error);
		}
	}

	/**
	 * 缩放结束时防抖记录历史
	 */
	resizeComponent(id: string, size: Size, position: Position, recordHistory = true): void {
		try {
			this.registry.updateSize(id, size, position);
			this.resizeComponentSubject.next({ id, size, position });
			// 使用防抖记录历史
			if (recordHistory) {
				this.prepareForNewOperation(OperationHistoryEnum.resize);
				this.debouncedRecordResizeHistory(id);
			}
		} catch (error) {
			console.warn(`[中介器] 缩放组件时出错: ${id}`, error);
		}
	}

	// 移除
	removeComponent(id: string, recordHistory = true): void {
		// 检查组件是否存在
		const config = this.registry.getById(id);
		if (!config) {
			console.warn(`[中介器] 尝试删除不存在的组件: ${id}`);
			return;
		}

		// 删除前立即刷新所有防抖历史记录
		if (recordHistory) {
			this.flushPendingHistory();
			this.currentOperationType = OperationHistoryEnum.null;
			this.recordHistory(config, 'remove');
		}

		this.registry.remove(id);
		this.removeComponentSubject.next(id);

		// 如果删除的是当前选中的组件，需要重置选中状态
		if (this._currentSelectId === id) {
			this.selectComponent('canvas'); // 选中画布
		}
	}

	/**
	 * 处理删除键按下事件
	 */
	handleDeleteKeyPress(event: KeyboardEvent): void {
		const currentSelectedId = this.getCurrentSelectedId();

		if (!currentSelectedId || currentSelectedId === 'canvas') {
			console.log('[中介器] 没有选中的组件可以删除');
			return;
		}

		// 检查是否在输入元素中
		const isInputElement = isTargetInputElement(event.target as HTMLElement);

		if (isInputElement) {
			return;
		}

		this.removeComponent(currentSelectedId);

		event.preventDefault();
	}

	// 记录历史操作
	recordHistory(config: ComponentConfig<TConfigProps, TSubType>, activeType: actionTypes): void {
		this.historyActionStacks.push({
			type: activeType,
			config,
			timestamp: Date.now(),
		});
		console.log(`[中介器] 记录历史操作: ${activeType}`, { id: config.id, stackLength: this.historyActionStacks.length });
	}

	handleUndoKeyPress(event: KeyboardEvent): void {
		// 检查是否在输入元素中
		const isInputElement = isTargetInputElement(event.target as HTMLElement);
		if (isInputElement) {
			return;
		}

		this.undoComponent();
		event.preventDefault();
	}

	// 撤销 - 修改撤销逻辑，确保不会重复记录历史
	undoComponent(): void {
		if (this.historyActionStacks.length > 0) {
			// 撤销前先刷新所有防抖历史记录
			this.flushPendingHistory();
			this.currentOperationType = OperationHistoryEnum.null;

			const undoHistoryAction: HistoryActionStack<TConfigProps, TSubType> = this.historyActionStacks.pop()!;
			const { type, config } = undoHistoryAction;
			const { id, size, position, props } = config;

			console.log(`[中介器] 执行撤销操作: ${type}`, { id, stackLength: this.historyActionStacks.length });

			switch (type) {
				case 'add':
					this.removeComponent(id, false);
					break;
				case 'remove':
					this.addComponent(config, false);
					break;
				case 'resize':
					// 撤销时不记录历史
					this.resizeComponent(id, size, position, false);
					break;
				case 'move':
					// 移动操作撤销时也要避免记录历史
					this.movingComponent(id, position, false);
					break;
				case 'update':
					// 属性更新撤销
					this.updateComponentProps(id, props, false);
					break;
				default:
					break;
			}

			// 撤销后更新快照
			if (id === this._currentSelectId) {
				this.actionSnapshot = structuredClone(config);
			}
		} else {
			console.log(`[中介器] 没有可撤销的操作`);
		}
	}

	// set 抽屉状态
	setDrawerWideMode(isWide: boolean): void {
		this.drawerWideModeSubject.next(isWide);
	}

	updateDataRequest(id: string, dataRequest: DataRequestConfig) {
		this.registry.updateDataRequest(id, dataRequest);
		this.dataRequestSubject.next({ id, dataRequest });
	}

	// updateControls(id: string, controls: Record<controlType, ControlConfig>) {
	// 	this.registry.updateControls(id, controls);
	// 	this.controlsSubject.next({ id, controls });
	// }

	// 清除聚焦
	clearAllInputFocus() {
		const inputs = document.querySelectorAll('input');
		inputs.forEach((input) => input.blur());
	}

	/**
	 * 重置 mediator 到初始状态
	 */
	reset(): void {
		console.log('[中介器] 开始重置到初始状态');

		// 取消所有防抖
		DebounceUtil.clearAll();
		this.currentOperationType = OperationHistoryEnum.null;

		// 清空历史记录栈
		this.historyActionStacks = [];

		// 重置快照
		this.actionSnapshot = null;

		// 重置当前选中状态到默认（canvas）
		this._currentSelectId = 'canvas';

		// 重置抽屉状态
		this.drawerWideModeSubject.next(false);

		// 重新发送默认选中状态
		const canvasConfig = INIT_SETTINGS_CONFIG['canvas'] as ComponentConfig<TConfigProps, TSubType>;
		this.componentSelectSubject.next(canvasConfig);

		console.log('[中介器] 重置完成');
	}

	/**
	 * 清空历史记录栈
	 */
	clearHistory(): void {
		this.historyActionStacks = [];
		console.log('[中介器] 历史记录已清空');
	}

	/**
	 * 获取历史记录数量，用于调试
	 */
	getHistoryCount(): number {
		return this.historyActionStacks.length;
	}

	/**
	 * 获取当前选中的组件ID
	 */
	getCurrentSelectedId(): string {
		return this._currentSelectId;
	}
}
