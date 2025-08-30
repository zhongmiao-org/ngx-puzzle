import { Component, inject, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { NgxPuzzleCanvasBaseComponent } from '../base/ngx-puzzle-canvas-base.component';
import {
	ComponentConfig,
	DataRequestConfig,
	ComponentTableProps,
	mainTypes,
	SafeAny,
	TableTypesEnum,
	PuzzleCanvasMediatorService,
	TABLE_DATA_OPTIONS,
	ApiSource,
	NgxPuzzleHttpService
} from 'ngx-puzzle/core';
import { tableMockRows } from 'ngx-puzzle/core/services/mock-data/table-data';
import { CommonModule } from '@angular/common';
import { Observable, takeUntil } from 'rxjs';
import { ThyTableModule } from 'ngx-tethys/table';
import {
  NgxPuzzleDragWrapperComponent
} from 'ngx-puzzle/components/canvas/dynamic-components/drag-wrapper/ngx-puzzle-drag-wrapper.component';

@Component({
 selector: 'puzzle-table',
	standalone: true,
	imports: [CommonModule, NgxPuzzleDragWrapperComponent, ThyTableModule],
	templateUrl: './ngx-puzzle-table.component.html',
	styleUrls: ['./ngx-puzzle-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxPuzzleTableComponent extends NgxPuzzleCanvasBaseComponent<ComponentTableProps, TableTypesEnum> implements OnDestroy {
	dataKey: mainTypes = 'table';

	private httpService = inject(NgxPuzzleHttpService);
	private _tableData$!: Observable<SafeAny>;
	private isInit = false;

	public columnDefs!: { field: string }[];
	public rowData!: SafeAny[];

	set config(config: ComponentConfig<ComponentTableProps, TableTypesEnum>) {
		this.initConfig(config);
	}

	get config() {
		return this._config;
	}

	constructor(
		mediator: PuzzleCanvasMediatorService<ComponentTableProps, TableTypesEnum>,
	) {
		super(mediator);
	}

	override ngOnDestroy(): void {
		super.ngOnDestroy?.();
	}

 override setBaseDataRequest(): void {
 		const dataRequest = this.config.dataRequest || {};
 		this.mediator.updateDataRequest(this.config.id, dataRequest);
 	}

 	override afterUpdateConfig() {
		const { dataRequest, props } = this.config;
		const { columnDefs } = props.table;

		// New dataRequest apiSources flow
		this.updateData(dataRequest || {} as DataRequestConfig);

		if (columnDefs) {
			this.columnDefs = columnDefs as { field: string }[];
		}

		this.restartRefreshTimer();
	}

	private setColumnDefs(data: SafeAny[]): void {
		if (!data?.length) return;
		const firstRow = data[0];
		const columnDefs = Object.keys(firstRow).map((field) => ({ field }));
		this.columnDefs = columnDefs;
		this.config.props.table.columnDefs = columnDefs as SafeAny;
		if (!this.isInit) {
			this.mediator.updateComponentData(this.config);
			this.isInit = true;
		}
	}

	private extractTablePayload(raw: SafeAny): SafeAny[] {
		if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
			if (raw.success === false) return [];
			if (Array.isArray((raw as any).data)) return (raw as any).data;
			if (Array.isArray((raw as any).rows)) return (raw as any).rows;
			if (Array.isArray((raw as any).list)) return (raw as any).list;
			if (Array.isArray((raw as any).values)) return (raw as any).values;
		}
		return Array.isArray(raw) ? raw : [];
	}

	private handleIncomingData(data: SafeAny[]): void {
		if (!data || !data.length) {
			this.rowData = [];
			return;
		}
		if (this.isEdit && !this.columnDefs?.length) {
			this.setColumnDefs(data);
		}
		this.rowData = data
	}

	public updateData(requestData: DataRequestConfig) {
		const { apiSources } = requestData || {} as DataRequestConfig;
		const apiSource: ApiSource | undefined = apiSources?.[0];

		if (!apiSource) {
			// fallback to table mock data when no api source is configured
			this.handleIncomingData(tableMockRows as SafeAny[]);
			return;
		}

		const request$ = this.httpService.request(apiSource);
		this._tableData$ = request$ as unknown as Observable<SafeAny>;
		this.loadData();
	}

	public getDefaultOptions(subType: TableTypesEnum) {
		return TABLE_DATA_OPTIONS[subType];
	}

	private loadData() {
		if (this._tableData$) {
			this._tableData$
				.pipe(takeUntil(this.destroy$))
				.subscribe({
					next: (data) => this.handleIncomingData(Array.isArray(data) ? data : this.extractTablePayload(data)),
					error: (err) => console.error('Failed to load table data:', err),
				});
		}
	}
}
