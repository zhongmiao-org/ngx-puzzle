import { Component, effect, ElementRef, inject, input, OnDestroy, OnInit } from '@angular/core';
import * as echarts from 'echarts/core';
import { ECBasicOption, EChartsType } from 'echarts/types/dist/shared';
import { ComposeOption } from 'echarts';
import { SafeAny } from 'ngx-puzzle/core';

@Component({
  selector: 'bi-ngx-puzzle-charts',
  standalone: true,
  imports: [],
  templateUrl: './ngx-puzzle-charts.component.html',
  styleUrl: './ngx-puzzle-charts.component.scss'
})
export class NgxPuzzleChartsComponent implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private chartInstance!: EChartsType;

  options = input<ComposeOption<SafeAny>>(); // 接收 ECharts 配置
  theme = input<string>(); // 支持主题
  autoResize = input<boolean>(true); // 是否自动适应

  constructor() {
    effect(() => {
      const options = this.options();
      const theme = this.theme();
      if (this.chartInstance && options) {
        this.chartInstance.setOption(options, true);
      }
      if (theme) {
        this.chartInstance.setTheme(theme);
      }
    });

    const option: ECBasicOption = {

    }
  }

  ngOnInit(): void {
    this.initChart();
    if (this.autoResize()) {
      window.addEventListener('resize', this.resizeChart);
    }
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
    if (this.autoResize()) {
      window.removeEventListener('resize', this.resizeChart);
    }
  }

  private initChart(): void {
    const el = this.el.nativeElement.querySelector('.echarts-container');
    this.chartInstance = echarts.init(el, this.theme);
    if (this.options()) {
      this.chartInstance.setOption(this.options()!);
    }
  }

  private resizeChart = (): void => {
    if (this.chartInstance) {
      this.chartInstance.resize();
    }
  };
}
