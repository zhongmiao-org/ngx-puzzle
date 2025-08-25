import { Injectable } from '@angular/core';
import { BaseSelectOption, ControlConfig, ControlFilterCondition } from '../../interfaces';
import { BehaviorSubject, Observable, shareReplay, Subject } from 'rxjs';
import { SafeAny } from '../../types';
import { map } from 'rxjs/operators';
import { convertControlsToFilters } from 'ngx-puzzle/core/utils';

@Injectable({
	providedIn: 'root',
})
export class ControlsService {
	private _controlMap = new Map<string, ControlConfig>();

	private controlsSubject = new BehaviorSubject<ControlConfig[]>([]);
	public controls$ = this.controlsSubject.asObservable();

	private controlValueChangeSubject = new Subject<{ controlId: string; controlFilters: { [controlId: string]: ControlFilterCondition } }>();
	public controlValueChange$ = this.controlValueChangeSubject.asObservable();

	public availableControlOptions$: Observable<BaseSelectOption[]> = this.controls$.pipe(
		map((controls) => {
			return controls
				.filter((control) => control?.isActive)
				.map((control) => ({
					label: control?.alias || `控件_${control.controlId.slice(-4)}`,
					val: control.controlId,
				}));
		}),
		shareReplay(1),
	);

	constructor() {}

	/**
	 * 添加或更新控件
	 */
	setControl(control: ControlConfig): void {
		// console.log(`添加或更新控件`, control);
		this._controlMap.set(control.controlId, control);
		this.emitControlsUpdate();
	}

	/**
	 * 控件值变化通知
	 */
	notifyControlValueChange(controlId: string, value: SafeAny): void {
		const control = this._controlMap.get(controlId);
		if (control) {
			// 更新控件值
			const updatedControl = { ...control, defaultValue: value };
			this._controlMap.set(control.controlId, updatedControl);

			// 多播控件值变化 - 传递全量的过滤条件对象
			this.controlValueChangeSubject.next({
				controlId,
				controlFilters: convertControlsToFilters(Array.from(this._controlMap.values())),
			});
			// 更新响应式流
			this.emitControlsUpdate();
		}
	}

	/**
	 * 获取当前所有过滤条件
	 */
	getCurrentControlFilters(): { [controlId: string]: ControlFilterCondition } {
		return convertControlsToFilters(Array.from(this._controlMap.values()));
	}

	/**
	 * 获取单个控件
	 */
	getControl(controlId: string): ControlConfig | undefined {
		return this._controlMap.get(controlId);
	}

	/**
	 * 获取控件当前值
	 */
	getControlValue(controlId: string): SafeAny {
		return this._controlMap.get(controlId)?.defaultValue || null;
	}

	/**
	 * 删除控件
	 * @param controlId
	 */
	deleteControlByControlId(controlId: string): void {
		this._controlMap.delete(controlId);
		this.emitControlsUpdate();
	}

	/**
	 * 清理所有控件（页面切换时使用）
	 */
	clearAll(): void {
		this._controlMap.clear();
		this.emitControlsUpdate();
	}

	// ===== 私有方法 =====

	/**
	 * 更新响应式流
	 */
	private emitControlsUpdate(): void {
		const controlsArray = Array.from(this._controlMap.values());
		this.controlsSubject.next(controlsArray);
	}
}
