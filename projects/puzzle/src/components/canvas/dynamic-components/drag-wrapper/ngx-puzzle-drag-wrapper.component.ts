import { AfterViewInit, Component, effect, inject, input, model, OnDestroy, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StylesFormatPipe } from '../../../../pipes';
import { CdkDrag } from '@angular/cdk/drag-drop';
import {
  ComponentBaseProps,
  ComponentConfig,
  Position,
  Size,
  mainTypes,
  PuzzleCanvasMediatorService,
  ZoomScaleService
} from '../../../../core';
import { SafeAny } from 'ngx-tethys/types';
import { Subject, takeUntil } from 'rxjs';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
  selector: 'puzzle-drag-wrapper',
  standalone: true,
  imports: [CommonModule, StylesFormatPipe, CdkDrag, ThyIcon],
  templateUrl: './ngx-puzzle-drag-wrapper.component.html',
  styleUrl: './ngx-puzzle-drag-wrapper.component.scss'
})
export class NgxPuzzleDragWrapperComponent<TConfigProps extends ComponentBaseProps = ComponentBaseProps, TSubType = string>
  implements AfterViewInit, OnDestroy
{
  @ViewChild(CdkDrag, { static: false }) private dragRef!: CdkDrag;

  private mediator = inject(PuzzleCanvasMediatorService<TConfigProps, TSubType>);
  private zoom = inject(ZoomScaleService);
  private destroy$ = new Subject<void>();

  readonly componentId = input<string>('');
  readonly isEdit = input<boolean>(false);
  readonly styles = input<Record<string, SafeAny>>({});
  readonly mainType = input<mainTypes>();
  readonly zIndex = input<number>(0);

  reverseZoom = signal<number>(1); // 逆向缩放比例 (用于图表组件)
  forwardScale = signal<number>(1); // 正向缩放比例 (用于尺寸调整)

  size = model<Size>({ width: 0, height: 0 });
  position = model<Position>({ x: 0, y: 0 });

  private isMoving: boolean = false;
  private currentResizeDir: string | null = null;
  private resizing = false;
  private startX = 0;
  private startY = 0;
  private startWidth = 0;
  private startHeight = 0;
  private startLeft = 0;
  private startTop = 0;

  public isSelected = signal<boolean>(false);

  public directions = [
    { className: 'top-left', direction: 'nw' },
    { className: 'top', direction: 'n' },
    { className: 'top-right', direction: 'ne' },
    { className: 'right', direction: 'e' },
    { className: 'bottom-right', direction: 'se' },
    { className: 'bottom', direction: 's' },
    { className: 'bottom-left', direction: 'sw' },
    { className: 'left', direction: 'w' }
  ];

  get hasDragRef() {
    return !!this?.dragRef;
  }

  get wrapperClassMap() {
    return {
      'drag-wrapper-component': true,
      edit: this.isEdit(),
      disabled: !this.isEdit(),
      'chart-wrapper': this.mainType() === 'chart',
      'table-wrapper': this.mainType() === 'table',
      'text-wrapper': this.mainType() === 'text',
      'control-wrapper': this.mainType() === 'control'
    };
  }

  constructor() {
    effect(
      () => {
        const zoom = this.zoom.scale();
        if (this.mainType() === 'chart') {
          this.reverseZoom.set(1 / zoom);
          this.forwardScale.set(zoom);
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngAfterViewInit(): void {
    this.setupObservables();
  }

  private setupObservables() {
    // 使用 takeUntil 确保在组件销毁时自动取消订阅
    this.mediator.componentMoving$.pipe(takeUntil(this.destroy$)).subscribe(({ id, position }) => {
      if (!this.isMoving && !this.resizing && id === this.componentId()) {
        this.position.set(position);
        this.updatePosition();
      }
    });

    this.mediator.componentResize$.pipe(takeUntil(this.destroy$)).subscribe(({ id, position, size }) => {
      if (!this.isMoving && !this.resizing && id === this.componentId()) {
        this.size.set(size);
        this.position.set(position);
        this.updatePosition();
      }
    });

    this.mediator.componentSelect$.pipe(takeUntil(this.destroy$)).subscribe((config: ComponentConfig<TConfigProps, TSubType>) => {
      this.isSelected.set(config.id === this.componentId());
    });
  }

  private getDragPosition(drag: CdkDrag): Position {
    const { x, y } = drag.getFreeDragPosition();
    return {
      x: Math.round(x) | 0,
      y: Math.round(y) | 0
    };
  }

  // 进行缩放 - 过程中不记录历史
  private onResizeMove = (event: MouseEvent) => {
    if (!this.resizing || !this.currentResizeDir) return;

    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;

    let newWidth = this.startWidth;
    let newHeight = this.startHeight;
    let newX = this.startLeft;
    let newY = this.startTop;

    const dir = this.currentResizeDir;

    if (dir.includes('e')) newWidth += dx;
    if (dir.includes('s')) newHeight += dy;
    if (dir.includes('w')) {
      newWidth -= dx;
      newX += dx;
    }
    if (dir.includes('n')) {
      newHeight -= dy;
      newY += dy;
    }

    if (newWidth < 20 || newHeight < 20) return;
    const size = { width: newWidth, height: newHeight };
    const position = { x: newX, y: newY };
    this.size.set(size);
    this.position.set(position);

    // 实时更新但不记录历史
    if (!this.destroy$.closed) {
      this.mediator.resizeComponent(this.componentId(), size, position, false);
    }
  };

  // 停止缩放 - 防抖记录历史
  private stopResize = () => {
    if (!this.destroy$.closed) {
      const currentSize = this.size();
      const currentPosition = this.position();

      // 使用防抖记录历史
      this.mediator.resizeComponent(this.componentId(), currentSize, currentPosition);
    }

    this.resizing = false;
    this.currentResizeDir = null;
    this.detachResizeListeners();
  };

  private detachResizeListeners() {
    document.removeEventListener('mousemove', this.onResizeMove);
    document.removeEventListener('mouseup', this.stopResize);
  }

  private updatePosition() {
    if (this.hasDragRef) {
      this.dragRef.setFreeDragPosition(this.position());
    }
  }

  /**
   * 选取
   * @param event
   */
  componentHandleSelect(event: MouseEvent): void {
    if (!this.hasDragRef || this.destroy$.closed) return;
    this.mediator.selectComponent(this.componentId());
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * 拖拽过程中
   */
  componentHandleDrag() {
    if (!this.hasDragRef || this.destroy$.closed) return;
    this.isMoving = true;
    const position = this.getDragPosition(this.dragRef);
    // 拖拽过程中不记录历史
    this.mediator.movingComponent(this.componentId(), position, false);
  }

  /**
   * 拖拽结束
   */
  componentHandleDragEnd() {
    if (!this.hasDragRef || this.destroy$.closed) return;
    this.isMoving = false;
    const position = this.getDragPosition(this.dragRef);
    // 拖拽结束时防抖记录历史
    this.mediator.movingComponent(this.componentId(), position);
  }

  /**
   * 移除
   * @param event
   * @param id
   */
  componentHandleRemove(event: MouseEvent, id: string) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.destroy$.closed) {
      this.mediator.removeComponent(id);
    }
  }

  // 启动缩放
  startResize(event: MouseEvent, direction: string): void {
    if (this.destroy$.closed) return;

    event.preventDefault();
    event.stopPropagation();

    this.currentResizeDir = direction;
    this.resizing = true;

    this.mediator.selectComponent(this.componentId());

    this.startX = event.clientX;
    this.startY = event.clientY;
    this.startWidth = this.size().width;
    this.startHeight = this.size().height;
    this.startLeft = this.position().x;
    this.startTop = this.position().y;

    document.addEventListener('mousemove', this.onResizeMove);
    document.addEventListener('mouseup', this.stopResize);
  }

  // 禁止冒泡
  mouseDownStopPropagation(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  ngOnDestroy() {
    // 发送销毁信号，取消所有订阅
    this.destroy$.next();
    this.destroy$.complete();

    // 清理事件监听器
    this.detachResizeListeners();

    // 重置状态
    this.isMoving = false;
    this.resizing = false;
  }
}
