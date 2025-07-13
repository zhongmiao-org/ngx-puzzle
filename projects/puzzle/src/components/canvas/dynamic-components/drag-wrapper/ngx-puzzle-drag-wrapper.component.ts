import { AfterViewInit, Component, input, model, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StylesFormatPipe } from 'ngx-puzzle/pipes/styles-format.pipe';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { ComponentBaseProps, ComponentConfig, Position, Size } from 'ngx-puzzle/core/interfaces';
import { SafeAny } from 'ngx-tethys/types';
import { PuzzleCanvasMediatorService } from 'ngx-puzzle/core/mediator/puzzle-canvas-mediator.service';


@Component({
	selector: 'app-drag-wrapper',
	standalone: true,
	imports: [CommonModule, StylesFormatPipe, CdkDrag],
	templateUrl: './ngx-puzzle-drag-wrapper.component.html',
	styleUrl: './ngx-puzzle-drag-wrapper.component.scss',
})
export class NgxPuzzleDragWrapperComponent<TConfigProps extends ComponentBaseProps = ComponentBaseProps, TSubType = string>
	implements AfterViewInit, OnDestroy
{
	@ViewChild(CdkDrag, { static: false }) private dragRef!: CdkDrag;

	readonly componentId = model<string>('');
	readonly isEdit = model<boolean>(false);
	readonly styles = input<Record<string, SafeAny>>({});
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

	public isSelected = false;

	public directions = [
		{ className: 'top-left', direction: 'nw' },
		{ className: 'top', direction: 'n' },
		{ className: 'top-right', direction: 'ne' },
		{ className: 'right', direction: 'e' },
		{ className: 'bottom-right', direction: 'se' },
		{ className: 'bottom', direction: 's' },
		{ className: 'bottom-left', direction: 'sw' },
		{ className: 'left', direction: 'w' },
	];

	get hasDragRef() {
		return !!this?.dragRef;
	}

	constructor(private mediator: PuzzleCanvasMediatorService<TConfigProps, TSubType>) {}

	ngAfterViewInit(): void {
		this.setupObservables();
	}

	private setupObservables() {
		this.mediator.componentMoving$.subscribe(({id, position}) => {
			if (!this.isMoving && id === this.componentId()) {
        console.log(`componentMoving$`, position);
				this.position.set(position);
        // todo 这里就很神奇，在其他版本就可以正常触发
        this.updatePosition();
			}
		});

		this.mediator.componentResize$.subscribe((config: ComponentConfig<TConfigProps, TSubType>) => {
			if (!this.isMoving && config.id === this.componentId()) {
				this.size.set(config.size);
				this.position.set(config.position);
        // todo 这里就很神奇，在其他版本就可以正常触发
        this.updatePosition();
			}
		});

		this.mediator.componentSelect$.subscribe((config: ComponentConfig<TConfigProps, TSubType>) => {
			this.isSelected = config.id === this.componentId();
		});
	}

	private updatePosition(): void {
		if (this.hasDragRef) {
			this.dragRef.setFreeDragPosition(this.position());
		}
	}

	private getDragPosition(drag: CdkDrag): Position {
		const { x, y } = drag.getFreeDragPosition();
		return {
			x: Math.round(x) | 0,
			y: Math.round(y) | 0,
		};
	}
	// 进行缩放
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

		this.mediator.resizeComponent(this.componentId(), size, position);
	};

	// 停止缩放
	private stopResize = () => {
		this.resizing = false;
		this.currentResizeDir = null;
		// 停止缩放之后要更新偏移量
		this.mediator.movingComponent(this.componentId(), this.position());
		this.detachResizeListeners();
	};

	private detachResizeListeners() {
		document.removeEventListener('mousemove', this.onResizeMove);
		document.removeEventListener('mouseup', this.stopResize);
	}

	/**
	 * 选取
	 * @param event
	 */
	componentHandleSelect(event: MouseEvent): void {
		console.log(`componentHandleSelect`);
		if (!this.hasDragRef) return;
		this.mediator.selectComponent(this.componentId());
		event.preventDefault();
		event.stopPropagation();
	}

	/**
	 * 拖拽
	 */
	componentHandleDrag() {
		if (!this.hasDragRef) return;
		this.isMoving = true;
		const position = this.getDragPosition(this.dragRef);
		this.mediator.movingComponent(this.componentId(), position);
	}

	/**
	 * 拖拽结束
	 */
	componentHandleDragEnd() {
		if (!this.hasDragRef) return;
		this.isMoving = false;
		const position = this.getDragPosition(this.dragRef);
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
		this.mediator.removeComponent(id);
	}

	// 启动缩放
	startResize(event: MouseEvent, direction: string): void {
		event.preventDefault();
		event.stopPropagation();

		// 启动缩放时，激活选中

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
		this.detachResizeListeners();
	}
}
