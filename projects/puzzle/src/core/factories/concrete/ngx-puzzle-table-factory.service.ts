import { AbstractComponentFactory } from '../abstract-component-factory';
import { ComponentConfig, ComponentInstance } from '../../interfaces';
import { Injectable } from '@angular/core';
import { NgxPuzzleTableComponent } from '../../../components';

@Injectable({ providedIn: 'root' })
export class NgxPuzzleTableFactoryService extends AbstractComponentFactory {
  create(config: ComponentConfig): ComponentInstance {
    return {
      component: NgxPuzzleTableComponent,
      config
    };
  }
}
