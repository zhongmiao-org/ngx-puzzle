import { Component } from '@angular/core';
import { NgxPuzzleCanvasBaseComponent } from '../base/ngx-puzzle-canvas-base.component';
import { CommonModule } from '@angular/common';
import {
  TextTypesEnum,
  ComponentConfig,
  ComponentTextProps,
  DataRequestConfig,
  mainTypes,
  TEXT_DATA_OPTIONS,
  PuzzleCanvasMediatorService
} from '../../../../core';
import { NgxPuzzleDragWrapperComponent } from '../drag-wrapper/ngx-puzzle-drag-wrapper.component';
import { StylesFormatPipe } from '../../../../pipes';

@Component({
  selector: 'puzzle-text',
  standalone: true,
  imports: [CommonModule, NgxPuzzleDragWrapperComponent, StylesFormatPipe],
  templateUrl: './ngx-puzzle-text.component.html',
  styleUrl: './ngx-puzzle-text.component.scss'
})
export class NgxPuzzleTextComponent extends NgxPuzzleCanvasBaseComponent<ComponentTextProps, TextTypesEnum> {
  override dataKey: mainTypes = 'text';

  set config(config: ComponentConfig<ComponentTextProps, TextTypesEnum>) {
    console.log('config', config);
    this.initConfig(config);
  }

  get config() {
    return this._config;
  }

  constructor(mediator: PuzzleCanvasMediatorService<ComponentTextProps, TextTypesEnum>) {
    super(mediator);
  }

  updateData(requestData: DataRequestConfig) {}

  getDefaultOptions(subType: TextTypesEnum) {
    return TEXT_DATA_OPTIONS[subType];
  }
}
