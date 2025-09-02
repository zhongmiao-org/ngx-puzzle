import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThyCollapseModule } from 'ngx-tethys/collapse';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyLayoutModule } from 'ngx-tethys/layout';
import { ThyInputDirective, ThyInputModule } from 'ngx-tethys/input';
import { ThyInputNumber } from 'ngx-tethys/input-number';
import { ThySelect, ThySelectModule } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThyTableModule } from 'ngx-tethys/table';
import { ThyButtonModule } from 'ngx-tethys/button';

import { EditorBaseComponent } from 'ngx-puzzle/components/editor/dynamic-editor/base/editor-base.component';
import { EditorTableField, TableConfig } from 'ngx-puzzle/core/interfaces/table-config.interface';
import { TableTypesEnum } from 'ngx-puzzle/core/enums';
import { TABLE_FIELDS_MAP } from 'ngx-puzzle/core/constants/table-editor-fields-config';
import { SafeAny } from 'ngx-puzzle/core/types';
import { cloneDeep, findIndex } from 'lodash';

@Component({
  selector: 'ngx-puzzle-table-editor, puzzle-table-editor',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThyCollapseModule,
    ThyGridModule,
    ThyLayoutModule,
    ThyInputModule,
    ThyInputDirective,
    ThyInputNumber,
    ThySelectModule,
    ThySelect,
    ThyOption,
    ThyTooltipModule,
    ThyTableModule,
    ThyButtonModule
  ],
  templateUrl: './ngx-puzzle-table-editor.component.html',
  styleUrl: './ngx-puzzle-table-editor.component.scss'
})
export class NgxPuzzleTableEditorComponent extends EditorBaseComponent<TableConfig, TableTypesEnum, EditorTableField> {
  private editingColumnDefs!: SafeAny[];

  protected setFields(type?: TableTypesEnum): void {
    if (!type) return;
    this.sections = TABLE_FIELDS_MAP[type];
  }

  protected getComponentType(): string {
    return 'table';
  }

  protected override afterConfigUpdate(tableConfig?: TableConfig): void {
    if (tableConfig?.columns) {
      this.editingColumnDefs = cloneDeep(tableConfig.columns);
      for (const field of this.sections) {
        if (field.key === 'columns') {
          (field as any).rowData = this.editingColumnDefs;
        }
      }
    }
  }

  editTableComplete(fieldValue: string) {
    if (!this.editingColumnDefs) return;
    const index = findIndex(this.editingColumnDefs, { field: fieldValue });
    if (index !== -1) {
      // no special handling for ngx-tethys columns
    }
    const updated = cloneDeep(this.options())!;
    updated['columns'] = cloneDeep(this.editingColumnDefs);
    this.onChange.emit(updated);
  }
}
