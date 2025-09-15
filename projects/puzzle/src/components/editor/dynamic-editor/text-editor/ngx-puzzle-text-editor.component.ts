import { Component } from '@angular/core';
import { EditorBaseComponent } from '../base/editor-base.component';
import { TEXT_FIELDS_MAP, TextConfig, TextTypesEnum, SafeAny } from '../../../../core';
import { PuzzleFormRendererComponent } from '../../../primitives';

@Component({
  selector: 'ngx-puzzle-text-editor, puzzle-text-editor',
  standalone: true,
  imports: [
    PuzzleFormRendererComponent
  ],
  templateUrl: './ngx-puzzle-text-editor.component.html',
  styleUrl: './ngx-puzzle-text-editor.component.scss'
})
export class NgxPuzzleTextEditorComponent extends EditorBaseComponent<TextConfig, TextTypesEnum> {
  protected setFields(type?: TextTypesEnum): void {
    if (!type) return;
    this.sections = TEXT_FIELDS_MAP[type];
  }

  protected getComponentType(): string {
    return 'text';
  }

  /**
   * 处理表单字段变化
   */
  onFieldChange(event: { key: string; value: SafeAny; parentKey?: string; index?: number }): void {
    this.onFormFieldChange(event.key, event.value, event.parentKey, event.index);
  }
}
