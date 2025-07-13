import { NgxPuzzleDragWrapperComponent } from '../drag-wrapper/ngx-puzzle-drag-wrapper.component';
import { Component, ViewChild } from '@angular/core';
import { NgxPuzzleCanvasBaseComponent } from '../base/ngx-puzzle-canvas-base.component';
import { ComponentChartProps, ComponentConfig } from 'ngx-puzzle/core/interfaces';
import { AgCharts } from 'ag-charts-angular';
import { mainTypes } from 'ngx-puzzle/core/types';
import { ChartTypesEnum } from 'ngx-puzzle/core/enums';
import { AgChartOptions } from 'ag-charts-community';
import { PuzzleCanvasMediatorService } from 'ngx-puzzle/core/mediator/puzzle-canvas-mediator.service';
import { updateCharts } from 'ngx-puzzle/utils';
import { CHART_DATA_OPTIONS } from 'ngx-puzzle/core/constants';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgxPuzzleDragWrapperComponent, AgCharts],
  templateUrl: './ngx-puzzle-chart.component.html',
  styleUrl: './ngx-puzzle-chart.component.scss'
})
export class NgxPuzzleChartComponent extends NgxPuzzleCanvasBaseComponent<ComponentChartProps, ChartTypesEnum> {
  @ViewChild(AgCharts, { static: false }) private charts!: AgCharts;
  override dataKey: mainTypes = 'chart';

  set config(config: ComponentConfig<ComponentChartProps, ChartTypesEnum>) {
    this.update(config);
  }

  get config(): ComponentConfig<ComponentChartProps, ChartTypesEnum> {
    return this._config;
  }

  public options!: AgChartOptions;

  constructor(mediator: PuzzleCanvasMediatorService<ComponentChartProps, ChartTypesEnum>) {
    super(mediator);
  }

  override afterUpdateConfig() {
    this.options = updateCharts(this.config.props.chart);
    if (this?.charts?.chart) {
      this.charts.chart.update(this.options);
    }
    console.log(this.options);
  }

  getDefaultOptions(subType: ChartTypesEnum) {
    console.log(`getDefaultOptions --->`, CHART_DATA_OPTIONS[subType])
    return CHART_DATA_OPTIONS[subType];
  }
}
