import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThyCollapseModule } from 'ngx-tethys/collapse';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyLayoutModule } from 'ngx-tethys/layout';
import { CONTROL_BIND_FIELDS, SafeAny, updateFieldChildrenStream, REFRESH_CONFIG, RefreshConfig } from '../../../../core';

import { EditorBaseComponent } from '../base/editor-base.component';
import { PuzzleFormRendererComponent } from '../../../primitives/puzzle-form-renderer/puzzle-form-renderer.component';

@Component({
  selector: 'ngx-puzzle-refresh-editor, puzzle-refresh-editor',
  standalone: true,
  imports: [
    ThyCollapseModule,
    ReactiveFormsModule,
    FormsModule,
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
