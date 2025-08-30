import { AbstractComponentFactory } from 'ngx-puzzle/core/factories/abstract-component-factory';
import { ComponentConfig, ComponentInstance } from 'ngx-puzzle/core/interfaces';
import { Injectable } from '@angular/core';
import { NgxPuzzleTableComponent } from 'ngx-puzzle/components/canvas/dynamic-components/table/ngx-puzzle-table.component';

@Injectable({ providedIn: 'root' })
export class NgxPuzzleTableFactoryService extends AbstractComponentFactory {
  create(config: ComponentConfig): ComponentInstance {
    return {
      component: NgxPuzzleTableComponent,
      config
    };
  }
}
