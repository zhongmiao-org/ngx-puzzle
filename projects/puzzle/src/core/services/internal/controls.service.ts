import { Injectable } from '@angular/core';
import { BaseSelectOption, ControlConfig, ControlFilterCondition } from '../../interfaces';
import { BehaviorSubject, Observable, Subject, auditTime, shareReplay } from 'rxjs';
import { SafeAny } from '../../types';
import { map } from 'rxjs/operators';
import { convertControlsToFilters } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {
  private _controlMap = new Map<string, ControlConfig>();
  private pendingControlValues = new Map<string, SafeAny>();
  private buffering = false;
  private lastChangedControlId: string | null = null;

  private controlsSubject = new BehaviorSubject<ControlConfig[]>([]);
  public controls$ = this.controlsSubject.asObservable();

  public fullscreenChanged = new BehaviorSubject<boolean>(false);
  public fullscreen$ = this.fullscreenChanged.asObservable();

  private controlChangeTrigger = new Subject<void>();
  public controlValueChange$ = this.controlChangeTrigger.pipe(
    auditTime(0),
    map(() => ({
      controlId: this.lastChangedControlId || '',
      controlFilters: convertControlsToFilters(Array.from(this._controlMap.values()))
    })),
    shareReplay(1)
  );

  public availableControlOptions$: Observable<BaseSelectOption[]> = this.controls$.pipe(
    map((controls) => {
      return controls
        .filter((control) => control?.isActive)
        .map((control) => ({
          label: control?.alias || `控件_${control.controlId.slice(-4)}`,
          val: control.controlId
        }));
    }),
    shareReplay(1)
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

      if (this.buffering) {
        this.pendingControlValues.set(controlId, value);
      } else {
        this.lastChangedControlId = controlId;
        this.controlChangeTrigger.next();
      }

      // 更新响应式流
      this.emitControlsUpdate();
    }
  }

  beginBuffering(): void {
    this.buffering = true;
  }

  flushBuffered(): void {
    if (!this.buffering) return;

    this.buffering = false;

    this.pendingControlValues.forEach((value, controlId) => {
      const control = this._controlMap.get(controlId);
      if (control) {
        this._controlMap.set(controlId, { ...control, defaultValue: value });
      }
    });

    this.lastChangedControlId = Array.from(this.pendingControlValues.keys()).pop() || null;
    this.controlChangeTrigger.next();
    this.pendingControlValues.clear();
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
    this.pendingControlValues.clear();
    this.lastChangedControlId = null;
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
