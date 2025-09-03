import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  signal,
  ViewChild,
  ViewContainerRef,
  WritableSignal,
  computed
} from '@angular/core';

import { NgStyle } from '@angular/common';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { StylesFormatPipe } from 'ngx-puzzle/pipes/styles-format.pipe';
import { INIT_SETTINGS_CONFIG } from 'ngx-puzzle/core/constants';
import { ComponentBaseProps, ComponentConfig, Position, Size, Tick, TooltipPosition } from 'ngx-puzzle/core/interfaces';
import { ComponentInjectorService, ComponentRegistryService, PuzzleCanvasMediatorService } from 'ngx-puzzle/core';
import {
  PuzzleFormRendererComponent
} from 'ngx-puzzle/components/primitives/puzzle-form-renderer/puzzle-form-renderer.component';

@Component({
  selector: 'ngx-puzzle-canvas, puzzle-canvas',
  standalone: true,
  imports: [NgStyle, StylesFormatPipe, PuzzleFormRendererComponent],
  templateUrl: './ngx-puzzle-canvas.component.html',
  styleUrl: './ngx-puzzle-canvas.component.scss'
})
export class NgxPuzzleCanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('rulerHorizontal', { static: true }) hRuler!: ElementRef<HTMLElement>;
  @ViewChild('rulerVertical', { static: true }) vRuler!: ElementRef<HTMLElement>;
  @ViewChild('canvasContent', { read: ViewContainerRef, static: true }) canvasContent!: ViewContainerRef;
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef<HTMLElement>;

  private destroy$ = new Subject<void>();
  private _config: ComponentConfig = INIT_SETTINGS_CONFIG['canvas'];
  private selectedId: string = 'canvas';
  private injector = inject(ComponentInjectorService);
  private registry = inject(ComponentRegistryService);
  private mediator = inject(PuzzleCanvasMediatorService<ComponentBaseProps, string>);
  private renderer = inject(Renderer2);

  set size(size: Size) {
    this._config = {
      ...this._config,
      size
    };
    this.updateRulers();
  }

  set config(value: ComponentConfig) {
    this._config = value;
  }

  get config(): ComponentConfig {
    return this._config;
  }

  positionSignal: WritableSignal<TooltipPosition> = signal({ x: 0, y: 0, left: 0, top: 0, width: 0, height: 0 });

  horizontalCursorStyle = computed(() => {
    const pos = this.positionSignal();
    return {
      left: `${pos.left}px`,
      width: `${pos.width}px`
    };
  });

  verticalCursorStyle = computed(() => {
    const pos = this.positionSignal();
    return {
      top: `${pos.top}px`,
      height: `${pos.height}px`
    };
  });

  horizontalLabels = computed(() => {
    const pos = this.positionSignal();
    return {
      left: pos.left,
      right: pos.left + pos.width
    };
  });

  verticalLabels = computed(() => {
    const pos = this.positionSignal();
    return {
      top: pos.top,
      bottom: pos.top + pos.height
    };
  });

  showGuideSignal: WritableSignal<boolean> = signal(false);
  hTicks: WritableSignal<Tick[]> = signal<Tick[]>([]);
  vTicks: WritableSignal<Tick[]> = signal<Tick[]>([]);

  constructor() {} // private renderer: Renderer2 // private mediator: CanvasMediatorService, // private registry: ComponentRegistryService, // private injector: ComponentInjectorService,

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.injector.setContainerRef(this.canvasContent);
    this.renderAll();
    this.updateRulers();
    this.setupObservables();
  }

  private setupObservables(): void {
    fromEvent(this.canvasContainer.nativeElement, 'scroll')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateRulerPosition());

    // 全量更新 仅一次
    this.mediator.componentUpdateConfig$.subscribe((config) => {
      if (config.id === this.config.id) {
        this.config = config;
        this.updateRulers();
      }
    });

    // 添加元素
    this.mediator.componentAdd$.subscribe((config) => {
      console.log(`componentAdd$`, config);
      this.createComponent(config);
    });

    // 选中
    this.mediator.componentSelect$.pipe(takeUntil(this.destroy$)).subscribe((config) => {
      if (config.id !== this.config.id) {
        this.showGuideSignal.set(true);
        this.positionSignal.set(this.covertPosition(config.size, config.position));
        console.log(`canvas componentSelect$`);
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
    this.mediator.componentResize$.pipe(takeUntil(this.destroy$)).subscribe(({ id, position, size }) => {
      if (id === this.config.id) {
        this.size = size;
      }
      this.positionSignal.set(this.covertPosition(size, position));
    });

    // 更新
    this.mediator.componentUpdateProps$.pipe(takeUntil(this.destroy$)).subscribe((config) => {
      if (config.id === this.config.id) {
        this.config.props = {
          ...this.config.props,
          ...config.props
        };
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
    // 更新标尺刻度
    this.hTicks.set(this.generateTicks(this.config.size.width, 100));
    this.vTicks.set(this.generateTicks(this.config.size.height, 100));
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

  private covertPosition(size: Size, position: Position): TooltipPosition {
    return {
      width: size.width,
      height: size.height,
      x: position.x,
      y: position.y,
      left: position.x,
      top: position.y
    };
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
