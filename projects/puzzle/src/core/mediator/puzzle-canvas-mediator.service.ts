import { Injectable } from '@angular/core';
import { PuzzleCanvasMediator } from './puzzle-canvas-mediator.interface';
import { ComponentBaseProps, ComponentConfig, HistoryActionStack, Position, Size } from '../interfaces';
import { PuzzleComponentRegistryService } from '../services/puzzle-component-registry.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { cloneDeep, isEqual } from 'lodash';
import { actionTypes } from '../types';
import { INIT_SETTINGS_CONFIG } from '../constants';

@Injectable({ providedIn: 'root' })
export class PuzzleCanvasMediatorService<TConfigProps extends ComponentBaseProps = ComponentBaseProps, TSubType = string>
	implements PuzzleCanvasMediator<TConfigProps, TSubType>
{
	private actionSnapshot: ComponentConfig<TConfigProps, TSubType> | null = null;

	// 操作记录
	private historyActionStacks: HistoryActionStack<TConfigProps, TSubType>[] = [];

	private addComponentSubject: Subject<ComponentConfig<TConfigProps, TSubType>> = new Subject<ComponentConfig<TConfigProps, TSubType>>();
	public componentAdd$: Observable<ComponentConfig<TConfigProps, TSubType>> = this.addComponentSubject.asObservable();

	private componentSelectSubject: Subject<ComponentConfig<TConfigProps, TSubType>> = new BehaviorSubject<ComponentConfig<TConfigProps, TSubType>>(INIT_SETTINGS_CONFIG['canvas'] as ComponentConfig<TConfigProps, TSubType>);
	public componentSelect$: Observable<ComponentConfig<TConfigProps, TSubType>> = this.componentSelectSubject.asObservable();

	private updateComponentSubject: Subject<ComponentConfig<TConfigProps, TSubType>> = new Subject<ComponentConfig<TConfigProps, TSubType>>();
	public componentUpdate$: Observable<ComponentConfig<TConfigProps, TSubType>> = this.updateComponentSubject.asObservable();

	private movingComponentSubject: Subject<{id: string, position: Position}> = new Subject<{id: string, position: Position}>();
	public componentMoving$: Observable<{id: string, position: Position}> = this.movingComponentSubject.asObservable();

	private resizeComponentSubject: Subject<ComponentConfig<TConfigProps, TSubType>> = new Subject<ComponentConfig<TConfigProps, TSubType>>();
	public componentResize$: Observable<ComponentConfig<TConfigProps, TSubType>> = this.resizeComponentSubject.asObservable();

	private removeComponentSubject: Subject<string> = new Subject<string>();
	public componentRemove$: Observable<string> = this.removeComponentSubject.asObservable();

	private UndoComponentSubject: Subject<void> = new Subject<void>();
	public componentUndo$: Observable<void> = this.UndoComponentSubject.asObservable();

	private _currentSelectId!: string;

	constructor(private registry: PuzzleComponentRegistryService<TConfigProps, TSubType>) {}

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
	 * 主要用于右侧面板更新通知子组件
	 * @param config
	 * @param recordHistory 更新历史记录
	 */
	updateComponent(config: ComponentConfig<TConfigProps, TSubType>, recordHistory = true): void {
		const { id } = config;
		const prev = this.registry.getById(id);
		if (!prev) return;
		const hasChanges = !isEqual(prev, config);
		if (!hasChanges) return;

		this.registry.update(id, cloneDeep(config));
		this.updateComponentSubject.next(cloneDeep(config));

		// todo 其他属性暂时先不管
		// if (recordHistory) {
		// 	this.recordHistory(prev, 'update');
		// }
	}

	/**
	 * 更新但不通知
	 * @param config
	 */
	updateComponentData(config: ComponentConfig<TConfigProps, TSubType>) {
		const { id } = config;

		this.registry.update(id, cloneDeep(config));
	}

	selectComponent(id: string): void {
		if (this._currentSelectId === id) return;
		this._currentSelectId = id;
		const config = this.registry.getById(id)!;
		this.actionSnapshot = cloneDeep(config);
		this.componentSelectSubject.next(config);
		this.clearAllInputFocus();
	}

	// 移动
	movingComponent(id: string, position: Position): void {
		if (this.actionSnapshot) {
			this.recordHistory(this.actionSnapshot, 'move');
			this.actionSnapshot = null;
		}
		this.registry.updatePosition(id, position);
		this.movingComponentSubject.next({ id, position });
	}

	// 缩放
	resizeComponent(id: string, size: Size, position: Position): void {
		console.log(`resizeComponent`);
		if (this.actionSnapshot) {
			this.recordHistory(this.actionSnapshot, 'resize');
			this.actionSnapshot = null;
		}
		this.registry.updateSize(id, size, position);
		const config = this.registry.getById(id)!;
		console.log(`resizeComponent config`, config);
		this.resizeComponentSubject.next(config);
	}

	// 移除
	removeComponent(id: string, recordHistory = true): void {
		if (recordHistory) {
			const config = this.registry.getById(id)!;
			this.recordHistory(config, 'remove');
		}
		this.registry.remove(id);
		this.removeComponentSubject.next(id);
	}

	// 记录历史操作
	recordHistory(config: ComponentConfig<TConfigProps, TSubType>, activeType: actionTypes): void {
		this.historyActionStacks.push({
			type: activeType,
			config,
			timestamp: Date.now(),
		});
	}

	// 撤銷
	undoComponent(): void {
		if (this.historyActionStacks.length > 0) {
			const undoHistoryAction: HistoryActionStack<TConfigProps, TSubType> = this.historyActionStacks.pop()!;
			const { type, config } = undoHistoryAction;
			const { id, size, position } = config;
			switch (type) {
				case 'add':
					this.removeComponent(id, false);
					break;
				case 'remove':
					this.addComponent(config, false); // 重新注册 + 渲染
					break;
				case 'resize':
					this.resizeComponent(id, size, position);
					// 撤销之后要更新偏移量
					// this.movingComponent(config);
					break;
				case 'move':
					this.movingComponent(id, position);
					break;
				// case 'update':
				// 	this.updateComponent(config as ComponentConfig<TConfigProps, TSubType>, false);
				// 	break;
				default:
					break;
			}
		}
	}

	// 清除聚焦
	clearAllInputFocus() {
		const inputs = document.querySelectorAll('input');
		inputs.forEach((input) => input.blur());
	}
}
