import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import { PuzzleCanvasMediatorService } from 'ngx-puzzle/core/mediator/puzzle-canvas-mediator.service';
import { ComponentConfig, ComponentTableProps } from 'ngx-puzzle/core/interfaces';
import { ChartTypesEnum, Is } from 'ngx-puzzle/core/enums';
import { TableTypesEnum } from 'ngx-puzzle/core/enums/table-types.enum';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { mainTypes, rowGroupingDisplayType, rowGroupPanelShowTypes, SafeAny } from 'ngx-puzzle/core/types';
import { TableService } from 'ngx-puzzle/core/services/table.service';
import { TABLE_DATA_OPTIONS } from 'ngx-puzzle/core/constants/table-mock.data';
import { GridApi, GridReadyEvent, SideBarDef } from 'ag-grid-enterprise';
import { DragWrapperComponent } from '../drag-wrapper/drag-wrapper.component';

@Component({
	selector: 'app-table',
	standalone: true,
	imports: [AgGridAngular, DragWrapperComponent],
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss',
})
export class TableComponent extends BaseComponent<ComponentTableProps, TableTypesEnum> {
	@ViewChild(CdkDrag, { static: false }) private dragRef!: CdkDrag;
	override dataKey: mainTypes = 'table';

	private gridApi!: GridApi<SafeAny>;
	private dataUrl!: string;
	private isInit: boolean = false;

	public columnDefs!: ColDef[];
	public defaultColDef!: ColDef;
	public autoGroupColumnDef!: ColDef;
	public rowGroupPanelShow!: rowGroupPanelShowTypes;
	public groupDefaultExpanded!: Is;
	public showOpenedGroup!: Is;
	public groupDisplayType: rowGroupingDisplayType = 'singleColumn';
	public sideBar: SideBarDef | string | string[] | boolean | null | undefined;
	public rowData!: SafeAny[];

	set config(config: ComponentConfig<ComponentTableProps, TableTypesEnum>) {
		this.update(config);
	}

	get config() {
		return this._config;
	}

	constructor(
		mediator: PuzzleCanvasMediatorService<ComponentTableProps, TableTypesEnum>,
		private tableService: TableService,
	) {
		super(mediator);
	}

	protected override afterUpdateConfig() {
		console.log(`table afterUpdateConfig`);
		const {
			rowDataUrl,
			columnDefs,
			autoGroupColumnDef,
			defaultColDef,
			groupDefaultExpanded,
			rowGroupPanelShow,
			showOpenedGroup,
			groupDisplayType,
			sideBar,
		} = this.config.props.table;
		this.dataUrl = rowDataUrl;
		if (columnDefs) {
			this.columnDefs = columnDefs;
		}
		this.autoGroupColumnDef = autoGroupColumnDef;
		this.defaultColDef = defaultColDef;
		this.groupDefaultExpanded = groupDefaultExpanded;
		this.rowGroupPanelShow = rowGroupPanelShow;
		this.showOpenedGroup = showOpenedGroup;
		this.groupDisplayType = groupDisplayType;
		this.sideBar = sideBar;
	}

	private setColumnDefs(): void {
		const firstRow = this.rowData[0];
		let columnDefs: ColDef[] = [];
		for (const field in firstRow) {
			columnDefs.push({
				field,
				rowGroup: false,
				hide: false,
			});
		}
		this.columnDefs = columnDefs;
		this.config.props['table']['columnDefs'] = columnDefs;
		if (!this.isInit) {
			this.mediator.updateComponentData(this.config);
			this.isInit = true;
		}
	}

	getDefaultOptions(subType: TableTypesEnum) {
		return TABLE_DATA_OPTIONS[subType];
	}

	onGridReady(params: GridReadyEvent<SafeAny>) {
		this.gridApi = params.api;

		if (!this.rowData) {
			this.tableService.getRowGroupingData(this.dataUrl).subscribe((data) => {
				this.rowData = data;
				if (this.isEdit) {
					this.setColumnDefs();
				}
			});
		}
	}
}
