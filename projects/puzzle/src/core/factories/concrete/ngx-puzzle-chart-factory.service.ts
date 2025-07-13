import { Injectable } from '@angular/core';
import { AbstractComponentFactory } from 'ngx-puzzle/core/factories/abstract-component-factory';
import { ComponentConfig, ComponentInstance } from 'ngx-puzzle/core/interfaces';
import { NgxPuzzleChartComponent } from 'ngx-puzzle/components/canvas/dynamic-components/chart/ngx-puzzle-chart.component';

@Injectable({ providedIn: 'root' })
export class NgxPuzzleChartFactoryService extends AbstractComponentFactory {
  create(config: ComponentConfig): ComponentInstance {
    return {
      component: NgxPuzzleChartComponent,
      config
    };
  }
}
