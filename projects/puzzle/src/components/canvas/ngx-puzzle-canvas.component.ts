import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject, NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
  signal,
  ViewChild,
  ViewContainerRef,
  WritableSignal
} from '@angular/core';

import { NgStyle } from '@angular/common';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { StylesFormatPipe } from 'ngx-puzzle/pipes/styles-format.pipe';
import { INIT_SETTINGS_CONFIG } from 'ngx-puzzle/core/constants';
import { ComponentBaseProps, ComponentConfig, Size, Tick, TooltipPosition } from 'ngx-puzzle/core/interfaces';
import { PuzzleComponentInjectorService } from 'ngx-puzzle/core/mediator/puzzle-component-inject.service';
import { PuzzleComponentRegistryService } from 'ngx-puzzle/core/services/puzzle-component-registry.service';
import { PuzzleCanvasMediatorService } from 'ngx-puzzle/core/mediator/puzzle-canvas-mediator.service';

@Component({
  selector: 'ngx-puzzle-canvas, puzzle-canvas',
  standalone: true,
  imports: [NgStyle, StylesFormatPipe],
  templateUrl: './ngx-puzzle-canvas.component.html',
  styleUrl: './ngx-puzzle-canvas.component.scss'
})
export class NgxPuzzleCanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('rulerHorizontal', { static: true }) hRuler!: ElementRef<HTMLElement>;
  @ViewChild('rulerVertical', { static: true }) vRuler!: ElementRef<HTMLElement>;
  @ViewChild('canvasContent', { read: ViewContainerRef, static: true }) canvasContent!: ViewContainerRef;
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef<HTMLElement>;

  private readonly injector = inject(PuzzleComponentInjectorService);
  private readonly registry = inject(PuzzleComponentRegistryService<ComponentBaseProps, string>);
  private readonly mediator = inject(PuzzleCanvasMediatorService<ComponentBaseProps, string>);
  private readonly renderer = inject(Renderer2);

  private destroy$ = new Subject<void>();
  private _config: ComponentConfig = INIT_SETTINGS_CONFIG['canvas'];
  private selectedId: string = 'canvas';

  set size(size: Size) {
    this._config = {
      ...this._config,
      size
    };
    console.log(`set size`)
    this.updateRulers();
  }

  set config(value: ComponentConfig) {
    this._config = value;
  }

  get config(): ComponentConfig {
    return this._config;
  }

  positionSignal: WritableSignal<TooltipPosition> = signal({ x: 0, y: 0, left: 0, top: 0, width: 0, height: 0 });
  showGuideSignal: WritableSignal<boolean> = signal(false);
  stylesSignal: WritableSignal<Record<string, string | number>> = signal({});

  public hTicks: Tick[] = [];
  public vTicks: Tick[] = [];

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // if (event.key === 'Delete' || event.key === 'Backspace') {
    // 	console.log('删除键被按下');
    // 	if (this.selectedId !== this.config.id) {
    // 		this.mediator.removeComponent(this.selectedId);
    // 	}
    // 	event.preventDefault(); // 如果需要阻止默认行为
    // }

    if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
      this.undoComponent();
      event.preventDefault();
    }
  }

	constructor(
		// private injector: ComponentInjectorService,
		// private registry: ComponentRegistryService,
		// private mediator: CanvasMediatorService,
		// private renderer: Renderer2,
	) {}

  ngOnInit() {
    this.updateRulers();
  }

  ngAfterViewInit(): void {
    this.injector.setContainerRef(this.canvasContent);
    this.renderAll();
    this.setupObservables();
    this.registry.register(this.config);
  }

  private setupObservables(): void {
    fromEvent(this.canvasContainer.nativeElement, 'scroll')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateRulerPosition());
    // 添加元素
    this.mediator.componentAdd$.subscribe((config) => {
      this.createComponent(config);
    });
    // 选中
    this.mediator.componentSelect$.pipe(takeUntil(this.destroy$)).subscribe((config) => {
      console.log(`componentSelect$`);
      if (config.id !== this.config.id) {
        this.showGuideSignal.set(true);
        this.positionSignal.set(this.covertPosition(config));
      } else {
        this.showGuideSignal.set(false);
      }
      this.selectedId = config.id;
    });
    // 移动
    this.mediator.componentMoving$.pipe(takeUntil(this.destroy$)).subscribe(({ position }) => {
      this.positionSignal.set({ ...this.positionSignal(), left: position.x, top: position.y });
    });
    // 缩放
    this.mediator.componentResize$.pipe(takeUntil(this.destroy$)).subscribe((config) => {
      if (config.id === this.config.id) {
        this.size = config.size;
      }
      this.positionSignal.set(this.covertPosition(config));
    });
    // 更新
    this.mediator.componentUpdate$.pipe(takeUntil(this.destroy$)).subscribe((config) => {
      console.log(`componentUpdate$`, config);
      if (config.id === this.config.id) {
        this.config = { ...config };
        const { size } = this.config;
        this.size = size;
        if (this.config.props?.['styles']) {
          this.stylesSignal.set(this.config.props?.['styles']);
        }
      } else {
        // 然后更新游标
        this.positionSignal.set(this.covertPosition(config));
      }
    });
    // 删除
    this.mediator.componentRemove$.pipe(takeUntil(this.destroy$)).subscribe((id) => {
      this.injector.destroyComponent(id);
      if (id === this.selectedId && id !== 'canvas') {
        this.showGuideSignal.set(false);
        this.mediator.selectComponent(this.config.id);
      }
    });
  }

  private updateRulers() {
    console.log(`updateRulers`, this.config.size);
    console.log(this.hTicks, this.vTicks);
    this.hTicks = this.generateTicks(this.config.size.width, 100);
    this.vTicks = this.generateTicks(this.config.size.height, 100);
  }

  private updateRulerPosition() {
    const { scrollLeft, scrollTop } = this.canvasContainer.nativeElement;
    this.renderer.setStyle(this.hRuler.nativeElement, 'transform', `translateX(-${scrollLeft}px)`);
    this.renderer.setStyle(this.vRuler.nativeElement, 'transform', `translateY(-${scrollTop}px)`);
  }

  private generateTicks(length: number, interval: number) {
    const ticks: Tick[] = [];
    for (let pos = 0; pos <= length; pos += interval) {
      ticks.push({
        position: pos,
        label: pos.toString()
      });
    }
    return ticks;
  }

  private renderAll(): void {
    this.canvasContent.clear();
    const allConfigs = this.registry.getAll();
    allConfigs.forEach((config) => {
      if (config.id !== 'canvas') {
        this.createComponent(config);
      }
    });
  }

  private createComponent(config: ComponentConfig) {
    const factory = this.registry.getFactory(config.type);
    const instance = factory.create(config);
    this.injector.createComponent(instance);
  }

  private covertPosition(config: ComponentConfig): TooltipPosition {
    return {
      width: config.size.width,
      height: config.size.height,
      x: config.position.x,
      y: config.position.y,
      left: config.position.x,
      top: config.position.y
    };
  }

  private undoComponent(): void {
    this.mediator.undoComponent();
  }

  public canvasHandleSelect(event: MouseEvent) {
    this.mediator.selectComponent(this.config.id);
    event.preventDefault();
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
