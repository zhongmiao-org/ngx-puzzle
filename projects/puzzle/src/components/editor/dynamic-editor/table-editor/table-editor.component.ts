// import { Component, HostBinding, input, output, effect } from '@angular/core';
// import { AccordionModule } from 'primeng/accordion';
// import { CommonModule } from '@angular/common';
// import { TableModule } from 'primeng/table';
// import { InputTextModule } from 'primeng/inputtext';
// import { FormsModule } from '@angular/forms';
// import { SelectModule } from 'primeng/select';
// import { TooltipModule } from 'primeng/tooltip';
// import { InputNumber } from 'primeng/inputnumber';
//
// import { EditorTableField, TableConfig } from 'ngx-puzzle/core/interfaces';
// import { ColDef } from 'ag-grid-community';
// import { rowGroupPanelShowTypes, SafeAny } from 'ngx-puzzle/core/types';
// import { Is, TableTypesEnum } from 'ngx-puzzle/core/enums';
// import { TABLE_DEFAULT_COL_DEF, TABLE_COLUMN_DEF, TABLE_PANEL_DEF, TABLE_SIDE_BAR_DEF } from 'ngx-puzzle/core/constants';
// import { convertFormDataToOptions, convertOptionsToFormData, updateFormData } from 'app/utils';
// import { ValueFormatPipe } from 'app/pipes/value-format.pipe';
//
// @Component({
// 	selector: 'app-table-editor',
// 	standalone: true,
// 	imports: [
// 		CommonModule,
// 		AccordionModule,
// 		TableModule,
// 		InputTextModule,
// 		FormsModule,
// 		SelectModule,
// 		ValueFormatPipe,
// 		TooltipModule,
// 		InputNumber,
// 	],
// 	templateUrl: './table-editor.component.html',
// 	styleUrl: './table-editor.component.scss',
// })
// export class TableEditorComponent {
// 	@HostBinding('class.table-editor-component') isEditorComponent = true;
//
// 	// ✅ 拆分后的 input signals
// 	options = input<TableConfig>();
// 	subType = input<TableTypesEnum | string>(TableTypesEnum.rowGrouping);
//
// 	readonly onChange = output<TableConfig>();
//
// 	public columnDefsData!: ColDef[];
// 	public defaultColDefData!: ColDef;
// 	public autoGroupColumnDefData!: ColDef;
// 	public rowGroupPanelShowData!: rowGroupPanelShowTypes;
// 	public groupDefaultExpandedData!: Is;
// 	public rowData!: SafeAny[];
//
// 	public tableFields: EditorTableField[] = [];
// 	public formData: Record<string, any> = {};
//
// 	// ✅ 本地缓存用于比较变更（非响应式）
// 	// private lastOptionsJson = '';
//
// 	constructor() {
// 		effect(() => {
// 			const opts = this.options() as TableConfig;
// 			const type = this.subType() as TableTypesEnum;
// 			console.log(`effect`, opts, type);
// 			if (type) {
// 				this.setTableFields(type);
// 			}
// 			if (opts) {
// 				this.updateConfig(opts);
// 				this.formData = convertOptionsToFormData(opts, this.tableFields);
// 				console.log(`formData ---->`, this.formData);
// 			}
// 		});
// 	}
//
// 	private setTableFields(type: TableTypesEnum) {
// 		switch (type) {
// 			case TableTypesEnum.rowGrouping:
// 				this.tableFields = [TABLE_COLUMN_DEF, TABLE_DEFAULT_COL_DEF, TABLE_SIDE_BAR_DEF, TABLE_PANEL_DEF];
// 				break;
// 		}
// 		console.log(`setTableFields`, this.tableFields);
// 	}
//
// 	private updateConfig(tableConfig: TableConfig) {
// 		this.columnDefsData = tableConfig.columnDefs!;
// 		this.defaultColDefData = tableConfig.defaultColDef!;
// 		this.autoGroupColumnDefData = tableConfig.autoGroupColumnDef!;
// 		this.rowGroupPanelShowData = tableConfig.rowGroupPanelShow!;
// 		this.groupDefaultExpandedData = tableConfig.groupDefaultExpanded!;
// 		this.rowData = this.rowData!;
//
// 		for (const tableField of this.tableFields) {
// 			if (tableField.key === 'columnDefs') {
// 				(tableField as any).rowData = tableConfig.columnDefs!;
// 			}
// 		}
// 		console.log(this.tableFields);
// 	}
//
// 	editComplete(tableName: string) {
// 		const updated = structuredClone(this.options())!;
// 		if (tableName === 'columnDefs') {
// 			updated['columnDefs'] = this.columnDefsData;
// 		}
// 		this.onChange.emit(updated);
// 	}
//
// 	onFormFieldChange(key: string, value: any, parentKey?: string, index?: number) {
// 		this.formData = updateFormData(this.formData, key, value, parentKey, index);
// 		const updated = convertFormDataToOptions(this.formData, structuredClone(this.options()), this.tableFields)!;
// 		this.onChange.emit(updated);
// 	}
// }
