import { Component } from '@angular/core';
import { NgxPuzzleCanvasBaseComponent } from '../base/ngx-puzzle-canvas-base.component';
import { ComponentConfig, ComponentTextProps, DataRequestConfig } from 'ngx-puzzle/core/interfaces';
import { CommonModule } from '@angular/common';
import { TextTypesEnum } from 'ngx-puzzle/core/enums';
import { mainTypes } from 'ngx-puzzle/core/types';
import { NgxPuzzleDragWrapperComponent } from '../drag-wrapper/ngx-puzzle-drag-wrapper.component';
import { TEXT_DATA_OPTIONS } from 'ngx-puzzle/core/constants';
import { StylesFormatPipe } from 'ngx-puzzle/pipes/styles-format.pipe';
import { PuzzleCanvasMediatorService } from 'ngx-puzzle/core';

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
