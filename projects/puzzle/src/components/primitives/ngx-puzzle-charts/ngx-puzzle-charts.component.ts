import { AfterViewInit, Component, effect, ElementRef, inject, input, OnDestroy, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { EChartsType, EChartsOption } from 'echarts';

// type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'bi-ngx-puzzle-charts',
  standalone: true,
  imports: [],
  templateUrl: './ngx-puzzle-charts.component.html',
  styleUrl: './ngx-puzzle-charts.component.scss'
})
export class NgxPuzzleChartsComponent implements OnInit, AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private chartInstance!: EChartsType;

  options = input<EChartsOption>(); // 接收 ECharts 配置
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

  }

  ngOnInit(): void {
    if (this.autoResize()) {
      window.addEventListener('resize', this.resizeChart);
    }
  }

  ngAfterViewInit() {
    this.initChart();
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
    console.log('initChart', this.options(), this.theme());
    const el = this.el.nativeElement.querySelector('.echarts-container');
    console.log('el', el);
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
