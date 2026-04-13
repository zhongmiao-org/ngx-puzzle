import { AfterViewInit, Component, OnDestroy, computed, effect, input, output, signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, CellDoubleClickedEvent, ColDef, GridApi, GridOptions, GridReadyEvent, themeQuartz } from 'ag-grid-community';

interface PivotDataSource {
  data?: any[];
  filename?: string;
  [key: string]: any;
}

export interface PivotReportConfig {
  dataSource?: PivotDataSource;
  columnDefs?: ColDef[];
  gridOptions?: GridOptions;
  theme?: Parameters<typeof themeQuartz.withParams>[0];
  [key: string]: any;
}

@Component({
  selector: 'ngx-puzzle-pivot-table, puzzle-pivot-table',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './puzzle-pivot-table.component.html',
  styleUrl: './puzzle-pivot-table.component.scss'
})
export class PuzzlePivotTableComponent implements AfterViewInit, OnDestroy {
  width = input<string | number>('100%');
  height = input<string | number>('100%');
  report = input<PivotReportConfig>();
  rowData = input<any[] | undefined>(undefined);
  columnDefsInput = input<ColDef[] | undefined>(undefined);
  gridOptions = input<GridOptions | undefined>(undefined);

  readonly cellClick = output<any>();
  readonly cellDoubleClick = output<any>();
  readonly dataError = output<object>();
  readonly dataLoaded = output<void>();
  readonly ready = output<GridApi>();

  gridRowData = signal<any[]>([]);
  gridColumnDefs = signal<ColDef[]>([]);

  readonly defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: false
  };

  baseTheme = themeQuartz;

  normalizedWidth = computed(() => (typeof this.width() === 'number' ? `${this.width()}px` : this.width() || '100%'));
  normalizedHeight = computed(() => (typeof this.height() === 'number' ? `${this.height()}px` : this.height() || '100%'));

  private gridApi: GridApi | null = null;
  private destroyed = false;

  constructor() {
    effect(() => {
      const manualColumns = this.columnDefsInput();
      if (manualColumns?.length) {
        this.gridColumnDefs.set(manualColumns);
      }
    });

    effect(() => {
      const manualRows = this.rowData();
      if (manualRows) {
        this.applyData(manualRows);
      }
    });

    effect(() => {
      const rpt = this.report();
      if (rpt) {
        void this.loadFromReport(rpt);
        if (rpt.theme) {
          this.baseTheme = themeQuartz.withParams(rpt.theme);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.gridRowData().length && this.report()) {
      void this.loadFromReport(this.report()!);
    }
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.gridApi = null;
  }

  private applyData(data: any[]) {
    if (!Array.isArray(data)) return;
    this.gridRowData.set(data);
    if (!this.gridColumnDefs().length && data.length) {
      const firstRow = data[0];
      const columns = Object.keys(firstRow).map((field) => ({ field }));
      this.gridColumnDefs.set(columns);
    }
  }

  private async loadFromReport(rpt: PivotReportConfig) {
    if (!rpt) return;
    try {
      let data: any[] | undefined = rpt.dataSource?.data;

      if (!data && rpt.dataSource?.filename) {
        const response = await fetch(rpt.dataSource.filename);
        data = await response.json();
      }

      if (Array.isArray(data)) {
        this.applyData(data);
        if (rpt.columnDefs?.length) {
          this.gridColumnDefs.set(rpt.columnDefs);
        }
        this.dataLoaded.emit();
      }
    } catch (err) {
      this.dataError.emit(err as object);
    }
  }

  onGridReady(event: GridReadyEvent<any>) {
    this.gridApi = event.api;
    this.ready.emit(event.api);
  }

  onCellClicked(event: CellClickedEvent<any>) {
    this.cellClick.emit(event.data);
  }

  onCellDoubleClicked(event: CellDoubleClickedEvent<any>) {
    this.cellDoubleClick.emit(event.data);
  }
}
