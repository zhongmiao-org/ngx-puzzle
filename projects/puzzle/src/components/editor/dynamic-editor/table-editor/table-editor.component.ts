// import { Component, HostBinding } from '@angular/core';
// import { AccordionModule } from 'primeng/accordion';
// import { CommonModule } from '@angular/common';
// import { TableModule } from 'primeng/table';
// import { InputTextModule } from 'primeng/inputtext';
// import { FormsModule } from '@angular/forms';
// import { SelectModule } from 'primeng/select';
// import { TooltipModule } from 'primeng/tooltip';
// import { InputNumber } from 'primeng/inputnumber';
// import { ColorPicker } from 'primeng/colorpicker';
// import { Button } from 'primeng/button';
// import { DataSourceDialogComponent } from '../../data-source-dialog/data-source-dialog.component';
//
// import {
// 	EditorTableField,
// 	TableConfig,
// 	DataRequestConfig,
// 	TableTypesEnum,
// 	rowGroupPanelShowTypes,
// 	SafeAny,
// 	Is,
// 	TABLE_FIELDS_MAP,
// } from '../../../../../core';
// import { ColDef } from 'ag-grid-community';
// import { ValueFormatPipe } from '../../../../pipes/value-format.pipe';
// import { cloneDeep, findIndex } from 'lodash';
// import { EditorBaseComponent } from '../base/editor-base.component';
//
// @Component({
// 	selector: 'imm-bi-table-editor',
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
// 		ColorPicker,
// 		Button,
// 		DataSourceDialogComponent,
// 	],
// 	templateUrl: './table-editor.component.html',
// 	styleUrl: './table-editor.component.scss',
// })
// export class TableEditorComponent extends EditorBaseComponent<TableConfig, TableTypesEnum, EditorTableField> {
// 	@HostBinding('class.table-editor-component') isEditorComponent = true;
//
// 	// TableEditor 特有的属性
// 	private editingColumnDefs!: ColDef[];
//
// 	public columnDefsData!: ColDef[];
// 	public defaultColDefData!: ColDef;
// 	public autoGroupColumnDefData!: ColDef;
// 	public rowGroupPanelShowData!: rowGroupPanelShowTypes;
// 	public groupDefaultExpandedData!: Is;
// 	public rowData!: SafeAny[];
//
// 	protected override setFields(type: TableTypesEnum): void {
// 		this.sections = TABLE_FIELDS_MAP[type];
// 	}
//
// 	protected override afterConfigUpdate(tableConfig?: TableConfig): void {
// 		if (tableConfig) {
// 			this.updateConfig(tableConfig);
// 		}
// 	}
//
// 	private updateConfig(tableConfig: TableConfig) {
// 		this.columnDefsData = tableConfig.columnDefs!;
// 		this.editingColumnDefs = cloneDeep(this.columnDefsData);
//
// 		this.defaultColDefData = tableConfig.defaultColDef!;
// 		this.autoGroupColumnDefData = tableConfig.autoGroupColumnDef!;
// 		this.rowGroupPanelShowData = tableConfig.rowGroupPanelShow!;
// 		this.groupDefaultExpandedData = tableConfig.groupDefaultExpanded!;
// 		this.rowData = this.rowData!;
//
// 		// 使用统一的 fields 属性
// 		for (const field of this.sections) {
// 			if (field.key === 'columnDefs') {
// 				(field as any).rowData = this.editingColumnDefs;
// 			}
// 		}
// 	}
//
// 	editTableComplete(fieldValue: string, fieldKey: string) {
// 		console.log(`fieldValue`, fieldValue, `fieldKey`, fieldKey);
//
// 		// 使用 lodash findIndex 根据 field 找到列索引
// 		const index = findIndex(this.editingColumnDefs, { field: fieldValue });
//
// 		if (index !== -1) {
// 			// 如果是 rowGroup 字段变化，处理 rowGroupIndex
// 			if (fieldKey === 'rowGroup') {
// 				console.log(`处理 rowGroup，列索引: ${index}`);
// 				this.handleRowGroupIndex(index);
// 			}
//
// 			// 如果是 pivot 字段变化，处理 pivotIndex
// 			if (fieldKey === 'pivot') {
// 				console.log(`处理 pivot，列索引: ${index}`);
// 				this.handlePivotIndex(index);
// 			}
// 		}
//
// 		const updated = cloneDeep(this.options())!;
// 		updated['columnDefs'] = cloneDeep(this.editingColumnDefs);
// 		this.onChange.emit(updated);
// 	}
//
// 	/**
// 	 * 处理 rowGroupIndex 逻辑
// 	 * @param index 列索引
// 	 */
// 	private handleRowGroupIndex(index: number): void {
// 		const column = this.editingColumnDefs[index];
//
// 		if (column.rowGroup === true) {
// 			// 设置为分组，分配新的 rowGroupIndex
// 			const groupedColumns = this.editingColumnDefs.filter((col) => col.rowGroup && typeof col.rowGroupIndex === 'number');
//
// 			if (groupedColumns.length === 0) {
// 				// 如果没有任何列有 rowGroupIndex，则从 0 开始
// 				column['rowGroupIndex'] = 0;
// 			} else {
// 				// 如果已有分组列，则取最大值 + 1
// 				const maxIndex = Math.max(...groupedColumns.map((col) => col.rowGroupIndex!));
// 				column['rowGroupIndex'] = maxIndex + 1;
// 			}
// 		} else {
// 			// 取消分组，删除 rowGroupIndex
// 			delete column.rowGroupIndex;
// 		}
// 		console.log(this.editingColumnDefs);
// 	}
//
// 	/**
// 	 * 处理 pivotIndex 逻辑
// 	 * @param index 列索引
// 	 */
// 	private handlePivotIndex(index: number): void {
// 		const column = this.editingColumnDefs[index];
// 		console.log(`处理前的列 pivot:`, column);
//
// 		if (column.pivot === true) {
// 			// 设置为透视，分配新的 pivotIndex
// 			const pivotColumns = this.editingColumnDefs.filter((col) => col.pivot && typeof col.pivotIndex === 'number');
// 			console.log(`已有透视列:`, pivotColumns);
//
// 			if (pivotColumns.length === 0) {
// 				// 如果没有任何列有 pivotIndex，则从 0 开始
// 				console.log(`设置第一个透视列 pivotIndex = 0`);
// 				column.pivotIndex = 0;
// 			} else {
// 				// 如果已有透视列，则取最大值 + 1
// 				const maxIndex = Math.max(...pivotColumns.map((col) => col.pivotIndex!));
// 				console.log(`已有最大透视索引: ${maxIndex}，设置新索引: ${maxIndex + 1}`);
// 				column.pivotIndex = maxIndex + 1;
// 			}
// 		} else {
// 			// 取消透视，删除 pivotIndex
// 			console.log(`取消透视，删除 pivotIndex`);
// 			delete column.pivotIndex;
// 		}
//
// 		console.log(`处理后的列 pivot:`, column);
// 	}
//
// 	override onDataSourceConfirm(updatedRequestOptions: DataRequestConfig) {
// 		if (updatedRequestOptions?.props?.['tableHeader']) {
// 			const updated = cloneDeep(this.options())!;
// 			updated.columnDefs = updatedRequestOptions.props['tableHeader'].map((col: ColDef) => {
// 				return {
// 					...col,
// 					rowGroup: false,
// 					enableRowGroup: false,
// 					pivot: false,
// 					enablePivot: false,
// 					hide: false,
// 				};
// 			});
// 			this.onChange.emit(updated);
// 		}
// 		super.onDataSourceConfirm(updatedRequestOptions);
// 	}
// }
