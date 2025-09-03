import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThyCollapseModule } from 'ngx-tethys/collapse';
import { ThyInputNumber } from 'ngx-tethys/input-number';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyOption } from 'ngx-tethys/shared';
import { ThySelect } from 'ngx-tethys/select';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyLayoutModule } from 'ngx-tethys/layout';

import { EditorBaseComponent } from 'ngx-puzzle/components/editor/dynamic-editor/base/editor-base.component';
import { REFRESH_CONFIG } from 'ngx-puzzle/core/constants/refresh-fields-config';
import { RefreshConfig } from 'ngx-puzzle/core/interfaces/refresh.interface';
import { CONTROL_BIND_FIELDS, SafeAny, updateFieldChildrenStream } from 'ngx-puzzle/core';
import {
  PuzzleFormRendererComponent
} from 'ngx-puzzle/components/primitives/puzzle-form-renderer/puzzle-form-renderer.component';

@Component({
  selector: 'ngx-puzzle-refresh-editor, puzzle-refresh-editor',
  standalone: true,
  imports: [
    ThyCollapseModule,
    ThyInputNumber,
    ReactiveFormsModule,
    ThyInputDirective,
    FormsModule,
    ThyOption,
    ThySelect,
    ThyDatePickerModule,
    ThyTooltipModule,
    ThyGridModule,
    ThyLayoutModule,
    PuzzleFormRendererComponent
  ],
  templateUrl: './ngx-puzzle-refresh-editor.component.html',
  styleUrl: './ngx-puzzle-refresh-editor.component.scss'
})
export class NgxPuzzleRefreshEditorComponent extends EditorBaseComponent<RefreshConfig> {
  protected setFields(): void {
    this.sections = [
      ...REFRESH_CONFIG,
      updateFieldChildrenStream(CONTROL_BIND_FIELDS, {
        controlIds: this.controlsService.availableControlOptions$
      })
    ];
  }

  protected getComponentType(): string {
    return 'refresh';
  }

  /**
   * 处理表单字段变化
   */
  onFieldChange(event: { key: string; value: SafeAny; parentKey?: string; index?: number }): void {
    this.onFormFieldChange(event.key, event.value, event.parentKey, event.index);
  }
}
