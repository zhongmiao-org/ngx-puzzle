import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThyCollapseModule } from 'ngx-tethys/collapse';
import { ThyInputNumber } from 'ngx-tethys/input-number';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyOption } from 'ngx-tethys/shared';
import { ThySelect } from 'ngx-tethys/select';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThyColorPickerDirective } from 'ngx-tethys/color-picker';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyLayoutModule } from 'ngx-tethys/layout';

import { EditorBaseComponent } from 'ngx-puzzle/components/editor/dynamic-editor/base/editor-base.component';
import { TEXT_FIELDS_MAP } from 'ngx-puzzle/core/constants/text-editor-fields-config';
import { TextConfig } from 'ngx-puzzle/core/interfaces/text-config.interface';
import { TextTypesEnum } from 'ngx-puzzle/core/enums/text-types.enum';

@Component({
  selector: 'ngx-puzzle-text-editor, puzzle-text-editor',
  standalone: true,
  imports: [
    ThyCollapseModule,
    ThyInputNumber,
    ReactiveFormsModule,
    ThyInputDirective,
    FormsModule,
    ThyOption,
    ThySelect,
    ThyTooltipModule,
    ThyColorPickerDirective,
    NgStyle,
    ThyGridModule,
    ThyLayoutModule
  ],
  templateUrl: './ngx-puzzle-text-editor.component.html',
  styleUrl: './ngx-puzzle-text-editor.component.scss'
})
export class NgxPuzzleTextEditorComponent extends EditorBaseComponent<TextConfig, TextTypesEnum> {
  protected setFields(type?: TextTypesEnum): void {
    if (!type) return;
    this.sections = TEXT_FIELDS_MAP[type] as any;
  }

  protected getComponentType(): string {
    return 'text';
  }
}
