import { AfterViewInit, Component, ElementRef, OnDestroy, computed, effect, inject, input, output, type EffectRef } from '@angular/core';
import WebDataRocks, { CellBuilder, CellData, Params, Pivot, Report } from '@webdatarocks/webdatarocks';

@Component({
  selector: 'ngx-puzzle-pivot-table, puzzle-pivot-table',
  standalone: true,
  imports: [],
  templateUrl: './puzzle-pivot-table.component.html',
  styleUrl: './puzzle-pivot-table.component.scss'
})
export class PuzzlePivotTableComponent implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);

  // Effects refs for cleanup
  private widthHeightEffect?: EffectRef;
  private reportEffect?: EffectRef;
  private localization = 'https://cdn.webdatarocks.com/loc/zh.json';

  // Configuration signals (use input() instead of @Input)
  toolbar = input<boolean>(true);
  width = input<string | number>('100%');
  height = input<string | number>('100%');
  report = input<Report | string | undefined>(undefined);
  global = input<Report | undefined>({
    localization: this.localization
  });
  customizeCell = input<((cell: CellBuilder, data: CellData) => void) | undefined>(undefined);

  // Outputs (use output() instead of @Output)
  readonly cellClick = output<CellData>();
  readonly cellDoubleClick = output<CellData>();
  readonly dataError = output<object>();
  readonly dataFileCancelled = output<void>();
  readonly dataLoaded = output<void>();
  readonly dataChanged = output<object>();
  readonly fieldsListClose = output<void>();
  readonly fieldsListOpen = output<void>();
  readonly filterOpen = output<void>();
  readonly fullScreen = output<void>();
  readonly loadingData = output<void>();
  readonly loadingLocalization = output<void>();
  readonly loadingReportFile = output<void>();
  readonly localizationError = output<void>();
  readonly localizationLoaded = output<void>();
  readonly openingReportFile = output<void>();
  readonly queryComplete = output<void>();
  readonly queryError = output<void>();
  readonly ready = output<Pivot>();
  readonly reportChange = output<void>();
  readonly reportComplete = output<void>();
  readonly reportFileCancelled = output<void>();
  readonly reportFileError = output<void>();
  readonly reportFileLoaded = output<void>();
  readonly runningQuery = output<void>();
  readonly update = output<void>();
  readonly beforeToolbarCreated = output<object>();
  readonly afterGridDraw = output<object>();
  readonly beforeGridDraw = output<object>();
  readonly exportComplete = output<void>();
  readonly exportStart = output<void>();
  readonly filterClose = output<void>();
  readonly loadingOlapStructure = output<void>();
  readonly printComplete = output<void>();
  readonly printStart = output<void>();

  private instance: Pivot | null = null;

  private containerEl = computed<HTMLElement | null>(() => {
    const root = this.el.nativeElement;
    return root.querySelector('.wbr-ng-wrapper');
  });

  constructor() {
    effect(() => {
      const rpt = this.report();
      if (this.instance && rpt) {
        try {
          this.instance.setReport?.(rpt as Report);
        } catch {
          // ignore if not supported
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.instance = new WebDataRocks({
      container: this.containerEl(),
      width: this.width(),
      height: this.height(),
      toolbar: this.toolbar(),
      report: this.report(),
      global: this.global(),
      customizeCell: this.customizeCell(),
      cellclick: (cell: CellData) => this.cellClick.emit(cell),
      celldoubleclick: (cell: CellData) => this.cellDoubleClick.emit(cell),
      dataerror: (event: object) => this.dataError.emit(event),
      datafilecancelled: () => this.dataFileCancelled.emit(),
      dataloaded: () => this.dataLoaded.emit(),
      datachanged: (event: object) => this.dataChanged.emit(event),
      fieldslistclose: () => this.fieldsListClose.emit(),
      fieldslistopen: () => this.fieldsListOpen.emit(),
      filteropen: () => this.filterOpen.emit(),
      loadingdata: () => this.loadingData.emit(),
      loadinglocalization: () => this.loadingLocalization.emit(),
      loadingreportfile: () => this.loadingReportFile.emit(),
      localizationerror: () => this.localizationError.emit(),
      localizationloaded: () => this.localizationLoaded.emit(),
      openingreportfile: () => this.openingReportFile.emit(),
      querycomplete: () => this.queryComplete.emit(),
      queryerror: () => this.queryError.emit(),
      ready: () => this.ready.emit(this.instance!),
      reportchange: () => this.reportChange.emit(),
      reportcomplete: () => this.reportComplete.emit(),
      reportfilecancelled: () => this.reportFileCancelled.emit(),
      reportfileerror: () => this.reportFileError.emit(),
      reportfileloaded: () => this.reportFileLoaded.emit(),
      runningquery: () => this.runningQuery.emit(),
      update: () => this.update.emit(),
      beforetoolbarcreated: (toolbar: object) => this.beforeToolbarCreated.emit(toolbar),
      aftergriddraw: (event: object) => this.afterGridDraw.emit(event),
      beforegriddraw: (event: object) => this.beforeGridDraw.emit(event),
      exportcomplete: () => this.exportComplete.emit(),
      exportstart: () => this.exportStart.emit(),
      filterclose: () => this.filterClose.emit(),
      loadingolapstructure: () => this.loadingOlapStructure.emit(),
      printcomplete: () => this.printComplete.emit(),
      printstart: () => this.printStart.emit()
    } as Params);
  }

  ngOnDestroy(): void {
    // destroy effects
    this.widthHeightEffect?.destroy();
    this.reportEffect?.destroy();

    if (this.instance) {
      try {
        this.instance.dispose?.();
      } catch {
        // ignore
      }
      this.instance = null;
    }
  }
}
