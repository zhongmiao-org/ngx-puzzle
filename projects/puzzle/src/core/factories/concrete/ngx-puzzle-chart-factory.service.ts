import { Injectable } from '@angular/core';
import { AbstractComponentFactory } from '../abstract-component-factory';
import { ComponentConfig, ComponentInstance } from '../../interfaces';
import { NgxPuzzleChartComponent } from '../../../components/canvas/dynamic-components/chart/ngx-puzzle-chart.component';

@Injectable({ providedIn: 'root' })
export class NgxPuzzleChartFactoryService extends AbstractComponentFactory {
  create(config: ComponentConfig): ComponentInstance {
    return {
      component: NgxPuzzleChartComponent,
      config
    };
  }
}
