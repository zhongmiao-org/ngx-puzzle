import { Injectable } from '@angular/core';
import { AbstractComponentFactory } from 'ngx-puzzle/core/factories/abstract-component-factory';
import { ComponentConfig, ComponentInstance } from 'ngx-puzzle/core/interfaces';
import { NgxPuzzleControlComponent } from 'ngx-puzzle/components/canvas/dynamic-components/control/ngx-puzzle-control.component';

@Injectable({ providedIn: 'root' })
export class NgxPuzzleControlFactoryService extends AbstractComponentFactory {
  create(config: ComponentConfig): ComponentInstance {
    return {
      component: NgxPuzzleControlComponent,
      config
    };
  }
}
