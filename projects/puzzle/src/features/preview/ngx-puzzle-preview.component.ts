import {
  AfterViewInit,
  Component,
  inject,
  signal,
  ViewChild,
  ViewContainerRef,
  WritableSignal,
  OnDestroy,
  HostListener,
  ChangeDetectorRef,
  input,
  effect,
  model,
  ElementRef
} from '@angular/core';
import { NgStyle } from '@angular/common';
import {
  ComponentConfig,
  ComponentInjectorService,
  ComponentRegistryService,
  Debounce,
  previewType,
  SessionIndexedDbService,
  ZoomScaleService
} from '../../core';
import { isEqual } from 'lodash';
import { StylesFormatPipe } from 'ngx-puzzle/pipes/styles-format.pipe';

@Component({
  selector: 'ngx-puzzle-preview, puzzle-preview',
  standalone: true,
  imports: [NgStyle, StylesFormatPipe],
  templateUrl: './ngx-puzzle-preview.component.html',
  styleUrl: './ngx-puzzle-preview.component.scss'
})
export class NgxPuzzlePreviewComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContent', { read: ViewContainerRef, static: true }) canvasContent!: ViewContainerRef;
  @ViewChild('canvasWrapper', { static: true }) canvasWrapperRef!: ElementRef<HTMLElement>;

  private zoom = inject(ZoomScaleService);

  private ele = inject(ElementRef);
  private injector = inject(ComponentInjectorService);
  private registry = inject(ComponentRegistryService);
  private sessionService = inject(SessionIndexedDbService);
  private cdr = inject(ChangeDetectorRef);

  /**
   * 控制是否启用缩放功能的输入信号
   * true: 启用缩放，内容按比例缩放适应窗口宽度，智能控制纵向滚动
   * false: 禁用缩放，显示原始尺寸，释放横纵滚动条
   */
  enableZoom = model<boolean>(true);

  /**
   * 用于确定缩放按钮功能是否启用。
   * 设置为 true 时，缩放按钮处于活动状态，并允许用户与其交互。
   * 设置为 false 时，缩放按钮处于禁用状态，无法使用。
   */
  enableZoomBtn = input<boolean>(false);

  /**
   * 是否启用全屏按钮
   */
  enableFullscreenBtn = input<boolean>(true);

  /**
   * 预览ID输入信号（仅编辑模式使用）
   */
  previewId = input<string>();

  /**
   * 预览模式输入信号
   * normal: 正常预览模式，只接受传入的 config
   * edit: 编辑预览模式，使用 sessionService 处理临时数据
   */
  previewMode = input<previewType>('normal');

  /**
   * 传入的配置数据（正常预览模式使用）
   */
  passedConfig = input<ComponentConfig[]>();

  allConfigs: WritableSignal<ComponentConfig[]> = signal([]);
  config!: ComponentConfig;
  previousConfigs: ComponentConfig[] = [];

  scaleRatio: number = 1;
  canvasWidth: number = 2000; // 默认画布宽度
  canvasHeight: number = 2000; // 默认画布高度

  private componentsLoaded = false;
  private containerRefReady = false; // 标记容器是否已准备好
  private fullscreenActive = false;

  constructor() {
    // 监听配置变化，并在容器准备好后生成画布
    effect(() => {
      const configs = this.allConfigs();
      if (configs && configs.length > 0 && this.containerRefReady && !isEqual(configs, this.previousConfigs)) {
        this.previousConfigs = structuredClone(configs);
        this.generateCanvas();
      }
    });

    // 处理输入参数变化
    effect(
      () => {
        const enableZoomValue = this.enableZoom();
        const previewId = this.previewId();
        const mode = this.previewMode();
        const passedConfig = this.passedConfig();

        // 当缩放模式改变且组件已加载时，更新缩放状态
        if (this.componentsLoaded) {
          this.updateZoomState(enableZoomValue);
        }

        // 根据预览模式决定如何加载配置
        if (mode === 'edit') {
          // 编辑预览模式：使用 sessionService 处理临时数据
          if (previewId) {
            this.loadConfigsFromSession(previewId);
          }
        } else {
          // 正常预览模式：只接受传入的配置
          if (passedConfig && passedConfig.length > 0) {
            this.allConfigs.set(passedConfig);
          } else {
            console.warn('[预览组件] 正常预览模式但未提供配置数据');
            this.allConfigs.set([]);
          }
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngAfterViewInit() {
    // 设置容器引用
    this.injector.setContainerRef(this.canvasContent);
    this.containerRefReady = true;
  }

  ngOnDestroy() {
    // 组件销毁时的清理工作
    this.injector.clearAll();
  }

  @HostListener('document:fullscreenchange')
  onFullscreenChange() {
    this.fullscreenActive = !!document.fullscreenElement;
    this.cdr.detectChanges();
  }

  // 兼容性处理（部分浏览器）
  @HostListener('document:webkitfullscreenchange')
  onWebkitFullscreenChange() {
    this.fullscreenActive = !!(document as any).webkitFullscreenElement || !!document.fullscreenElement;
    this.cdr.detectChanges();
  }

  @HostListener('window:resize', ['$event'])
  @Debounce(500)
  onWindowResize() {
    if (this.componentsLoaded) {
      this.calculateScale();
    }
  }

  /**
   * 从 SessionService 加载配置数据（编辑预览模式）
   */
  private async loadConfigsFromSession(previewId: string) {
    try {
      const response = await this.sessionService.getItem(previewId);

      if (response && response.length > 0) {
        this.allConfigs.set(response);
      } else {
        console.warn('[预览组件] session 中未找到配置数据');
        this.allConfigs.set([]);
      }
    } catch (error) {
      console.error('[预览组件] 从 session 加载配置失败:', error);
      this.allConfigs.set([]);
    }
  }

  /**
   * 根据缩放状态更新视图
   */
  private updateZoomState(enableZoom: boolean): void {
    if (enableZoom) {
      this.calculateScale();
    }
  }

  /**
   * 生成画布并创建组件
   */
  generateCanvas() {
    // 使用当前的配置数据
    const configs = this.allConfigs();
    if (!configs || configs.length === 0) {
      console.warn('[预览组件] 没有配置数据可用于生成画布');
      return;
    }

    this.processConfigs(configs);
  }

  /**
   * 处理配置数据并创建组件
   */
  private processConfigs(configs: ComponentConfig[]): void {
    // 设置画布配置
    this.config = configs.find((config) => config.id === 'canvas')!;
    if (this.config) {
      this.canvasWidth = this.config.size?.width || 2000;
      this.canvasHeight = this.config.size?.height || 2000;
    }

    // 创建子组件
    const childComponents = configs.filter((config) => config.type !== 'canvas');

    // 创建组件并设置缩放
    const setupComponents = () => {
      if (childComponents.length > 0) {
        this.createAllComponents(childComponents);
      }

      this.componentsLoaded = true;

      // 等待下一个事件循环，确保所有组件都已渲染到DOM
      setTimeout(() => {
        this.updateZoomState(this.enableZoom());
      }, 300);
    };

    setupComponents();
  }

  /**
   * 创建所有子组件
   */
  createAllComponents(configs: ComponentConfig[]) {
    configs.map((config) => this.createComponent(config));
  }

  /**
   * 创建单个组件
   */
  private createComponent(config: ComponentConfig): Promise<void> {
    return new Promise((resolve) => {
      try {
        const factory = this.registry.getFactory(config.type);
        const instance = factory.create(config);
        this.injector.createComponent(instance, false);

        // 根据组件类型设置不同的延迟时间
        const delay = this.isAsyncComponent(config.type) ? 200 : 50;
        setTimeout(resolve, delay);
      } catch (error) {
        console.error('组件创建失败:', error);
        resolve();
      }
    });
  }

  /**
   * 判断是否为异步渲染的组件类型
   */
  private isAsyncComponent(type: string): boolean {
    return ['chart', 'table'].includes(type.toLowerCase());
  }

  /**
   * 计算缩放比例
   */
  private calculateScale() {
    // 只在启用缩放时计算缩放比例
    if (!this.enableZoom()) {
      return;
    }

    // 获取浏览器可视区域尺寸并计算缩放比例
    const windowWidth = window.innerWidth;
    const availableWidth = windowWidth - 20; // 预留20px用于滚动条和边距
    const scaleX = availableWidth / this.canvasWidth;

    // 缩放比例不超过1（即不放大）
    this.scaleRatio = Math.min(scaleX, 1);
    this.zoom.setScale(this.scaleRatio);

    this.cdr.detectChanges();
  }

  /**
   * 切换缩放模式
   */
  toggleZoomMode() {
    const newValue = !this.enableZoom();
    if (!newValue) {
      this.zoom.setScale(1);
    }
    this.enableZoom.set(newValue);
    // 缩放状态会通过 effect 自动更新
  }

  // 全屏相关
  isFullscreen(): boolean {
    return this.fullscreenActive;
  }

  async toggleFullscreen() {
    if (this.isFullscreen()) {
      await this.exitFullscreen();
    } else {
      this.enterFullscreen();
    }
  }

  private enterFullscreen() {
    try {
      // 使用组件宿主元素作为全屏目标，这样控制按钮也在全屏范围内可见
      const el = (this.ele?.nativeElement || document.documentElement) as any;
      if (el?.requestFullscreen) {
        el.requestFullscreen();
      } else if (el?.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      }
    } catch (e) {
      console.warn('进入全屏失败:', e);
    }
  }

  private async exitFullscreen() {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    } catch (e) {
      console.warn('退出全屏失败:', e);
    }
  }
}
