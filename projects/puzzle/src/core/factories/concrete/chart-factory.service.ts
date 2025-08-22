import { Injectable } from '@angular/core';
import { AbstractComponentFactory } from '../abstract-component-factory';
import { ComponentConfig, ComponentInstance } from '../../interfaces';
import { NgxPuzzleChartEditorComponent } from 'ngx-puzzle/components/editor/dynamic-editor/chart-editor/ngx-puzzle-chart-editor.component';

@Injectable({ providedIn: 'root' })
export class ChartFactoryService extends AbstractComponentFactory {
  create(config: ComponentConfig): ComponentInstance {
    return {
      component: NgxPuzzleChartEditorComponent,
      config
    };
  }
}
