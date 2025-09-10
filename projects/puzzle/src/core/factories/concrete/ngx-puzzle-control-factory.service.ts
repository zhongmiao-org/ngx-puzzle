import { Injectable } from '@angular/core';
import { AbstractComponentFactory } from '../abstract-component-factory';
import { ComponentConfig, ComponentInstance } from '../../interfaces';
import { NgxPuzzleControlComponent } from '../../../components/canvas/dynamic-components/control/ngx-puzzle-control.component';

@Injectable({ providedIn: 'root' })
export class NgxPuzzleControlFactoryService extends AbstractComponentFactory {
  create(config: ComponentConfig): ComponentInstance {
    return {
      component: NgxPuzzleControlComponent,
      config
    };
  }
}
