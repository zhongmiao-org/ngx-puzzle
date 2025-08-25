import { Component, inject, OnDestroy, HostListener } from '@angular/core';
import { Panel } from 'primeng/panel';
import { Button } from 'primeng/button';
import { PanelComponent } from '../../shared/components/panel/panel.component';
import { CanvasComponent } from '../../shared/components/canvas/canvas.component';
import { EditorComponent } from '../../shared/components/editor/editor.component';
import { CanvasMediatorService } from '../../core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'imm-bi-editor',
	standalone: true,
	imports: [Panel, Button, PanelComponent, CanvasComponent, EditorComponent],
	templateUrl: './bi-editor.component.html',
	styleUrl: './bi-editor.component.scss',
})
export class BiEditorComponent implements OnDestroy {
	private mediator = inject(CanvasMediatorService);
	private destroy$ = new Subject<void>();

	public isDrawerWide = false;
	public leftCollapsed = false;
	public rightCollapsed = false;

	constructor() {
		this.setupDrawerStateSubscription();
	}

	@HostListener('window:keydown', ['$event'])
	handleKeyDown(event: KeyboardEvent) {
		// 撤销功能 (Ctrl+Z 或 Cmd+Z)
		if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
			this.mediator.handleUndoKeyPress(event);
		}

		// 删除功能 (Delete 键 或 Backspace 键) - 委托给中介者处理
		if (event.key === 'Delete' || event.key === 'Backspace') {
			this.mediator.handleDeleteKeyPress(event);
		}
	}

	private setupDrawerStateSubscription(): void {
		this.mediator.drawerWideMode$.pipe(takeUntil(this.destroy$)).subscribe((isWide) => {
			this.isDrawerWide = isWide;
		});
	}

	toggleLeft() {
		this.leftCollapsed = !this.leftCollapsed;
	}

	toggleRight() {
		this.rightCollapsed = !this.rightCollapsed;
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
