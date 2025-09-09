import { Injectable } from '@angular/core';
import { AbstractComponentFactory } from '../abstract-component-factory';
import { ComponentConfig, ComponentInstance } from '../../interfaces';
import { NgxPuzzleTextComponent } from '../../../components/canvas/dynamic-components/text/ngx-puzzle-text.component';

@Injectable({ providedIn: 'root' })
export class NgxPuzzleTextFactoryService extends AbstractComponentFactory {
  override create(config: ComponentConfig): ComponentInstance {
    return {
      component: NgxPuzzleTextComponent,
      config
    };
  }
}
