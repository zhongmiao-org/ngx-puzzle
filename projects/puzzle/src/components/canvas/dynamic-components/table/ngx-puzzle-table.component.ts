import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
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
  tableMockRows,
  adapterResultToObservable,
  getDataRequestSources,
  PuzzleDataSource
} from '../../../../core';
import { CommonModule } from '@angular/common';
import { Observable, takeUntil } from 'rxjs';
import { ThyTableModule } from 'ngx-tethys/table';
import { NgxPuzzleDragWrapperComponent } from '../drag-wrapper/ngx-puzzle-drag-wrapper.component';
import { PuzzleAdvancedTableComponent } from '../../../primitives';

@Component({
  selector: 'puzzle-table',
  standalone: true,
  imports: [CommonModule, NgxPuzzleDragWrapperComponent, ThyTableModule, PuzzleAdvancedTableComponent],
  templateUrl: './ngx-puzzle-table.component.html',
  styleUrls: ['./ngx-puzzle-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxPuzzleTableComponent extends NgxPuzzleCanvasBaseComponent<ComponentTableProps, TableTypesEnum> implements OnDestroy {
  dataKey: mainTypes = 'table';

  private _tableData$!: Observable<SafeAny>;
  private isInit = false;

  public columnDefs: { field: string; header?: string }[] = [];
  public rowData: SafeAny[] = [];

  set config(config: ComponentConfig<ComponentTableProps, TableTypesEnum>) {
    this.initConfig(config);
  }

  get config(): ComponentConfig<ComponentTableProps, TableTypesEnum> {
    return this._config;
  }

  constructor(mediator: PuzzleCanvasMediatorService<ComponentTableProps, TableTypesEnum>) {
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
    const { columns } = props.table as any;

    // New dataRequest apiSources flow
    this.updateData(dataRequest || ({} as DataRequestConfig));

    if (columns) {
      // map TableColumnDef[] to local light-weight columnDefs used by template rendering
      this.columnDefs = (columns as any[]).map((col: any) => ({ field: col.field, header: col.header || col.headerName || col.field }));
    }

    this.restartRefreshTimer();
  }

  private setColumnDefs(data: SafeAny[]): void {
    if (!data?.length) return;
    const firstRow = data[0];
    const columnDefs = Object.keys(firstRow).map((field) => ({ field, header: field }));
    this.columnDefs = columnDefs;
    // Persist to config as TableColumnDef[] using new 'columns' key
    (this.config.props.table as any).columns = columnDefs.map((col) => ({ field: col.field, header: col.field })) as SafeAny;
    if (!this.isInit) {
      this.mediator.updateComponentData(this.config);
      this.isInit = true;
    }
  }

  private extractTablePayload(raw: SafeAny): SafeAny[] {
    if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
      if (raw.success === false) return [];
      if (Array.isArray(raw.data)) return raw.data;
      if (Array.isArray(raw.rows)) return raw.rows;
      if (Array.isArray(raw.list)) return raw.list;
      if (Array.isArray(raw.values)) return raw.values;
    }
    return Array.isArray(raw) ? raw : [];
  }

  private handleIncomingData(data: SafeAny[]): void {
    if (!data || !data.length) {
      this.rowData = [];
      return;
    }
    if (!this.columnDefs?.length) {
      this.setColumnDefs(data);
    }
    this.rowData = data;
  }

  public updateData(requestData: DataRequestConfig) {
    const dataSources = getDataRequestSources(requestData || ({} as DataRequestConfig));
    const apiSource: PuzzleDataSource | undefined = dataSources?.[0];

    if (!apiSource) {
      // fallback to table mock data when no api source is configured
      this.handleIncomingData(tableMockRows as SafeAny[]);
      return;
    }

    const request$ = adapterResultToObservable(
      this.dataAdapter.executeSource({
        source: apiSource,
        componentConfig: this.config,
        dataRequest: this.config.dataRequest,
        seriesIndex: 0,
        isEdit: this.isEdit
      })
    );
    this._tableData$ = request$ as Observable<SafeAny>;
    this.loadData();
  }

  public getDefaultOptions(subType: TableTypesEnum) {
    return TABLE_DATA_OPTIONS[subType];
  }

  private loadData() {
    if (this._tableData$) {
      this._tableData$.pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => this.handleIncomingData(Array.isArray(data) ? data : this.extractTablePayload(data)),
        error: (err) => console.error('Failed to load table data:', err)
      });
    }
  }
}
