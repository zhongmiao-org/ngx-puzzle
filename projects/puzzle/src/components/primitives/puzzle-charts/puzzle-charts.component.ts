import { AfterViewInit, Component, effect, ElementRef, inject, input, OnDestroy } from '@angular/core';
import * as echarts from 'echarts';
import { EChartsType, EChartsOption } from 'echarts';

@Component({
  selector: 'ngx-puzzle-charts,puzzle-charts',
  standalone: true,
  imports: [],
  templateUrl: './puzzle-charts.component.html',
  styleUrl: './puzzle-charts.component.scss'
})
export class PuzzleChartsComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private chartInstance!: EChartsType;
  private resizeObserver?: ResizeObserver;

  options = input<EChartsOption>(); // 接收 ECharts 配置
  theme = input<string>(); // 支持主题
  autoResize = input<boolean>(true); // 是否自动适应

  constructor() {
    effect(() => {
      const options = this.options();
      const theme = this.theme();

      if (this.chartInstance && options) {
        console.log('options', options);
        this.chartInstance.setOption(options, true);
      }

      if (this.chartInstance && theme) {
        this.chartInstance.setTheme(theme);
      }
    });
  }

  ngAfterViewInit() {
    this.initChart();
    if (this.autoResize()) {
      const container: HTMLElement = this.el.nativeElement.querySelector('.echarts-container') ?? this.el.nativeElement;
      this.resizeObserver = new ResizeObserver(() => {
        if (!this.chartInstance) return;
        this.chartInstance.resize();
      });
      this.resizeObserver.observe(container);
    }
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = undefined;
    }
  }

  private initChart(): void {
    const el = this.el.nativeElement.querySelector('.echarts-container');
    this.chartInstance = echarts.init(el, this.theme());
    if (this.options()) {
      this.chartInstance.setOption(this.options()!, { notMerge: true });
    }
  }
}
