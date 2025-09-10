import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { NgxPuzzleCanvasBaseComponent } from '../base/ngx-puzzle-canvas-base.component';
import {
  PuzzleCanvasMediatorService,
  ComponentConfig,
  ComponentControlProps,
  ControlConfig,
  ControlTypesEnum,
  DataRequestConfig,
  mainTypes,
  SafeAny,
  CONTROL_MOCK_DATA,
  ControlsService,
  Debounce,
  convertStringToDate
} from '../../../../core';
import { NgxPuzzleDragWrapperComponent } from '../drag-wrapper/ngx-puzzle-drag-wrapper.component';
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { StylesFormatPipe } from '../../../../pipes';
import { FormsModule } from '@angular/forms';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { PuzzleDatetimeComponent } from '../../../primitives';

@Component({
  selector: 'puzzle-control',
  standalone: true,
  imports: [
    NgxPuzzleDragWrapperComponent,
    NgStyle,
    StylesFormatPipe,
    FormsModule,
    ThyDatePickerModule,
    NgTemplateOutlet,
    ThySelectModule,
    ThyInputModule,
    PuzzleDatetimeComponent,
    ThyTooltipModule
  ],
  templateUrl: './ngx-puzzle-control.component.html',
  styleUrls: ['./ngx-puzzle-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxPuzzleControlComponent extends NgxPuzzleCanvasBaseComponent<ComponentControlProps, ControlTypesEnum> {
  private controlService = inject(ControlsService);

  zIndex = signal(0);

  dataKey: mainTypes = 'control';

  set config(config: ComponentConfig<ComponentControlProps, ControlTypesEnum>) {
    this.initConfig(config);
  }

  get config() {
    return this._config;
  }

  get control(): ControlConfig {
    return this.config.props.control;
  }

  controlValue: SafeAny;

  constructor(mediator: PuzzleCanvasMediatorService<ComponentControlProps, ControlTypesEnum>) {
    super(mediator);
  }

  updateData(requestData: DataRequestConfig) {}

  @Debounce(1000)
  controlValueChange() {
    this.panelOnShow(false);
    this.controlService.notifyControlValueChange(this.config.id, this.controlValue);
  }

  initControlValue() {
    if (this.config.subType === ControlTypesEnum.datePick) {
      this.controlValue = convertStringToDate(this.config.props.control.defaultValue);
    } else {
      this.controlValue = this.config.props.control.defaultValue;
    }
  }

  protected override afterUpdateConfig() {
    if (this.config.subType === ControlTypesEnum.dateTime) return;
    this.controlService.setControl(this.config.props.control);
    this.initControlValue();
  }

  protected override getDefaultOptions(subType: ControlTypesEnum) {
    return {
      ...CONTROL_MOCK_DATA[subType],
      controlId: this.config.id
    };
  }

  panelOnShow(event: boolean) {
    if (event) {
      this.zIndex.set(99);
    } else {
      this.zIndex.set(0);
    }
  }
}
