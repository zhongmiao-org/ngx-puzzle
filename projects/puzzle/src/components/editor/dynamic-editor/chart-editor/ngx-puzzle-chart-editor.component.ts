import { Component, effect, HostBinding, input, output } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import { EditorChartArraySchema, EditorChartData, EditorChartField } from 'ngx-puzzle/core/interfaces';
import {
  AREA_SERIES,
  BAR_SERIES,
  BOX_PLOT_SERIES,
  BUBBLE_SERIES,
  CANDLESTICK_SERIES,
  CHART_AXES,
  CHART_BUBBLE_AXES,
  CHART_CANDLESTICK_AXES,
  CHART_CONE_FUNNEL_AXES,
  CHART_DATA,
  CHART_FOOTNOTE,
  CHART_FUNNEL_AXES,
  CHART_HEATMAP_AXES,
  CHART_LEGEND,
  CHART_NIGHTINGALE_AXES,
  CHART_OHLC_AXES,
  CHART_RADAR_AREA_AXES,
  CHART_RADAR_LINE_AXES,
  CHART_RADIAL_BAR_AXES,
  CHART_RADIAL_COLUMN_AXES,
  CHART_RANGE_AREA_AXES,
  CHART_RANGE_BAR_AXES,
  CHART_SCATTER_AXES,
  CHART_SUBTITLE,
  CHART_THEME,
  CHART_TITLE,
  CHORD_SERIES,
  COMBINATION_SERIES,
  CONE_FUNNEL_SERIES,
  DONUT_SERIES,
  FUNNEL_SERIES,
  GRADIENT_LEGEND,
  HEATMAP_SERIES,
  HISTOGRAM_SERIES,
  LINE_SERIES,
  NIGHTINGALE_SERIES,
  OHLC_SERIES,
  PIE_SERIES,
  PYRAMID_SERIES,
  RADAR_AREA_SERIES,
  RADAR_LINE_SERIES,
  RADIAL_BAR_SERIES,
  RADIAL_COLUMN_SERIES,
  RANGE_AREA_SERIES,
  RANGE_BAR_SERIES,
  SANKEY_SERIES,
  SCATTER_SERIES,
  SUNBURST_SERIES,
  TREEMAP_SERIES,
  WATERFALL_SERIES
} from 'ngx-puzzle/core/constants/chart-editor-fields-map';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import {
  ClientSideRowModelApiModule,
  ClientSideRowModelModule,
  ColDef,
  GridOptions,
  ModuleRegistry,
  NumberEditorModule,
  TextEditorModule,
  ValidationModule
} from 'ag-grid-community';
import { ChartTypesEnum, Is } from 'ngx-puzzle/core/enums';
import { AgScatterSeriesOptions } from 'ag-charts-enterprise';
import { cloneDeep } from 'lodash';
import { convertFormDataToOptions, convertOptionsToFormData, updateFormData } from 'ngx-puzzle/utils';
import { ThyCollapseModule } from 'ngx-tethys/collapse';
import { ThyCardModule } from 'ngx-tethys/card';
import { ThyButtonIcon, ThyButtonModule } from 'ngx-tethys/button';
import { ThyLayout } from 'ngx-tethys/layout';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { JsonPipe, NgStyle } from '@angular/common';
import { ThyInputNumber } from 'ngx-tethys/input-number';
import { FormsModule } from '@angular/forms';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyColorPickerDirective } from 'ngx-tethys/color-picker';
import { ThyOption } from 'ngx-tethys/shared';
import { ThySelect } from 'ngx-tethys/select';

ModuleRegistry.registerModules([
  NumberEditorModule,
  TextEditorModule,
  ClientSideRowModelApiModule,
  ClientSideRowModelModule,
  ValidationModule
]);

@Component({
  selector: 'ngx-puzzle-chart-editor',
  standalone: true,
  imports: [AgGridModule, ThyCollapseModule, ThyCardModule, ThyButtonModule, ThyRowDirective, ThyColDirective, JsonPipe, ThyInputNumber, FormsModule, ThyInputDirective, ThyColorPickerDirective, NgStyle, ThyOption, ThySelect],
  templateUrl: './ngx-puzzle-chart-editor.component.html',
  styleUrl: './ngx-puzzle-chart-editor.component.scss'
})
export class NgxPuzzleChartEditorComponent {
  @HostBinding('class.editor-component') isEditorComponent = true;

  options = input<AgChartOptions>();
  subType = input<ChartTypesEnum | string>(ChartTypesEnum.bar);

  readonly onChange = output<AgChartOptions>();

  private rowBufferData!: any[];
  private bufferSeriesData = {
    is: Is.no,
    index: 0
  };
  private treeKey: string = '';
  private _options!: AgChartOptions;
  public chartType!: ChartTypesEnum;

  public chartFields: EditorChartField[] = [];
  public formData: Record<string, any> = {};
  public visible: boolean = false;
  public defaultColDef: ColDef = {
    editable: true
  };
  public rowData: any[] = [];
  public columnDefs: ColDef[] = [];

  public gridOptions: GridOptions = {
    treeData: true,
    animateRows: true,
    getDataPath: (data) => this.getDataPath(data),
    autoGroupColumnDef: undefined
  };

  get processedRowData() {
    return this.processTreeData(this._options.data!);
  }

  get isTreeData(): boolean {
    return this.chartType === ChartTypesEnum.sunburst || this.chartType === ChartTypesEnum.treemap;
  }

  constructor() {
    effect(() => {
      const opts = this.options() as AgChartOptions;
      const type = this.subType() as ChartTypesEnum;

      console.log(`effect`, opts, type);

      if (type) {
        this.setChartFields(type);
      }
      if (opts) {
        this._options = opts;
        this.formData = convertOptionsToFormData(opts, this.chartFields);
        console.log(`this.form---->`, this.formData)
      }
    });
  }

  private setChartFields(type: ChartTypesEnum) {
    if (this.chartType === type) return;
    this.chartType = type;
    switch (type) {
      case ChartTypesEnum.bar:
        this.chartFields = [CHART_THEME, CHART_AXES, BAR_SERIES, CHART_DATA, CHART_TITLE, CHART_SUBTITLE, CHART_FOOTNOTE, CHART_LEGEND];
        break;
      case ChartTypesEnum.line:
        this.chartFields = [CHART_THEME, CHART_AXES, LINE_SERIES, CHART_DATA, CHART_TITLE, CHART_SUBTITLE, CHART_FOOTNOTE, CHART_LEGEND];
        break;
      case ChartTypesEnum.area:
        this.chartFields = [CHART_THEME, CHART_AXES, AREA_SERIES, CHART_DATA, CHART_TITLE, CHART_SUBTITLE, CHART_FOOTNOTE, CHART_LEGEND];
        break;
      case ChartTypesEnum.scatter:
        this.chartFields = [CHART_THEME, CHART_SCATTER_AXES, SCATTER_SERIES, CHART_TITLE, CHART_SUBTITLE, CHART_FOOTNOTE, CHART_LEGEND];
        break;
      case ChartTypesEnum.bubble:
        this.chartFields = [CHART_THEME, CHART_BUBBLE_AXES, BUBBLE_SERIES, CHART_TITLE, CHART_SUBTITLE, CHART_FOOTNOTE, CHART_LEGEND];
        break;
      case ChartTypesEnum.pie:
        this.chartFields = [CHART_THEME, PIE_SERIES, CHART_DATA, CHART_TITLE, CHART_SUBTITLE, CHART_FOOTNOTE, CHART_LEGEND];
        break;
      case ChartTypesEnum.donut:
        this.chartFields = [CHART_THEME, DONUT_SERIES, CHART_DATA, CHART_TITLE, CHART_SUBTITLE, CHART_FOOTNOTE, CHART_LEGEND];
        break;
      case ChartTypesEnum.combination:
        this.chartFields = [
          CHART_THEME,
          CHART_AXES,
          COMBINATION_SERIES,
          CHART_DATA,
          CHART_TITLE,
          CHART_SUBTITLE,
          CHART_FOOTNOTE,
          CHART_LEGEND
        ];
        break;
      case ChartTypesEnum.boxPlot:
        this.chartFields = [
          CHART_THEME,
          CHART_AXES,
          BOX_PLOT_SERIES,
          CHART_DATA,
          CHART_TITLE,
          CHART_SUBTITLE,
          CHART_FOOTNOTE,
          CHART_LEGEND
        ];
        break;
      case ChartTypesEnum.candlestick:
        this.chartFields = [
          CHART_THEME,
          CHART_CANDLESTICK_AXES,
          CANDLESTICK_SERIES,
          CHART_DATA,
          CHART_TITLE,
          CHART_SUBTITLE,
          CHART_FOOTNOTE,
          CHART_LEGEND
        ];
        break;
      case ChartTypesEnum.ohlc:
        this.chartFields = [
          CHART_THEME,
          CHART_OHLC_AXES,
          OHLC_SERIES,
          CHART_DATA,
          CHART_TITLE,
          CHART_SUBTITLE,
          CHART_FOOTNOTE,
          CHART_LEGEND
        ];
        break;
      case ChartTypesEnum.heatmap:
        this.chartFields = [
          CHART_THEME,
          CHART_HEATMAP_AXES,
          HEATMAP_SERIES,
          CHART_DATA,
          CHART_TITLE,
          CHART_SUBTITLE,
          CHART_FOOTNOTE,
          GRADIENT_LEGEND
        ];
        break;
      case ChartTypesEnum.histogram:
        this.chartFields = [
          CHART_THEME,
          CHART_AXES,
          HISTOGRAM_SERIES,
          CHART_DATA,
          CHART_TITLE,
          CHART_SUBTITLE,
          CHART_FOOTNOTE,
          CHART_LEGEND
        ];
        break;
      case ChartTypesEnum.nightingale:
        this.chartFields = [
          CHART_THEME,
          CHART_NIGHTINGALE_AXES,
          NIGHTINGALE_SERIES,
          CHART_DATA,
          CHART_TITLE,
          CHART_SUBTITLE,
          CHART_FOOTNOTE,
          CHART_LEGEND
        ];
        break;
      case ChartTypesEnum.radarArea:
        this.chartFields = [
          CHART_THEME,
          CHART_RADAR_AREA_AXES,
          RADAR_AREA_SERIES,
          CHART_DATA,
          CHART_TITLE,
          CHART_SUBTITLE,
          CHART_FOOTNOTE,
          CHART_LEGEND
        ];
        break;
      case ChartTypesEnum.radarLine:
        this.chartFields = [
          CHART_THEME,
          CHART_RADAR_LINE_AXES,
          RADAR_LINE_SERIES,
          CHART_DATA,
          CHART_TITLE,
          CHART_SUBTITLE,
          CHART_FOOTNOTE,
          CHART_LEGEND
        ];
        break;
      case ChartTypesEnum.radialBar:
        this.chartFields = [
          CHART_THEME,
          CHART_RADIAL_BAR_AXES,
          RADIAL_BAR_SERIES,
          CHART_DATA,
          CHART_TITLE,
          CHART_SUBTITLE,
          CHART_FOOTNOTE,
          CHART_LEGEND
        ];
        break;
      case ChartTypesEnum.radialColumn:
        this.chartFields = [
          CHART_THEME,
          CHART_RADIAL_COLUMN_AXES,
          RADIAL_COLUMN_SERIES,
          CHART_DATA,
          CHART_TITLE,
          CHART_SUBTITLE,
          CHART_FOOTNOTE,
          CHART_LEGEND
        ];
        break;
      case ChartTypesEnum.rangeArea:
        this.chartFields = [
          CHART_THEME,
          CHART_RANGE_AREA_AXES,
          RANGE_AREA_SERIES,
          CHART_DATA,
          CHART_TITLE,
          CHART_SUBTITLE,
          CHART_FOOTNOTE,
          CHART_LEGEND
        ];
        break;
      case ChartTypesEnum.rangeBar:
        this.chartFields = [
          CHART_THEME,
          CHART_RANGE_BAR_AXES,
          RANGE_BAR_SERIES,
          CHART_DATA,
          CHART_TITLE,
          CHART_SUBTITLE,
          CHART_FOOTNOTE,
          CHART_LEGEND
        ];
        break;
      case ChartTypesEnum.waterfall:
        this.chartFields = [
          CHART_THEME,
          CHART_AXES,
          WATERFALL_SERIES,
          CHART_DATA,
          CHART_TITLE,
          CHART_SUBTITLE,
          CHART_FOOTNOTE,
          CHART_LEGEND
        ];
        break;
      case ChartTypesEnum.sunburst:
        this.chartFields = [CHART_THEME, SUNBURST_SERIES, CHART_DATA, CHART_TITLE, CHART_SUBTITLE, CHART_FOOTNOTE, GRADIENT_LEGEND];
        break;
      case ChartTypesEnum.treemap:
        this.chartFields = [CHART_THEME, TREEMAP_SERIES, CHART_DATA, CHART_TITLE, CHART_SUBTITLE, CHART_FOOTNOTE, CHART_LEGEND];
        break;
      case ChartTypesEnum.sankey:
        this.chartFields = [CHART_THEME, SANKEY_SERIES, CHART_DATA, CHART_TITLE, CHART_SUBTITLE, CHART_FOOTNOTE, CHART_LEGEND];
        break;
      case ChartTypesEnum.chord:
        this.chartFields = [CHART_THEME, CHORD_SERIES, CHART_DATA, CHART_TITLE, CHART_SUBTITLE, CHART_FOOTNOTE, CHART_LEGEND];
        break;
      case ChartTypesEnum.funnel:
        this.chartFields = [
          CHART_THEME,
          CHART_FUNNEL_AXES,
          FUNNEL_SERIES,
          CHART_DATA,
          CHART_TITLE,
          CHART_SUBTITLE,
          CHART_FOOTNOTE,
          CHART_LEGEND
        ];
        break;
      case ChartTypesEnum.coneFunnel:
        this.chartFields = [
          CHART_THEME,
          CHART_CONE_FUNNEL_AXES,
          CONE_FUNNEL_SERIES,
          CHART_DATA,
          CHART_TITLE,
          CHART_SUBTITLE,
          CHART_FOOTNOTE,
          CHART_LEGEND
        ];
        break;
      case ChartTypesEnum.pyramid:
        this.chartFields = [CHART_THEME, PYRAMID_SERIES, CHART_DATA, CHART_TITLE, CHART_SUBTITLE, CHART_FOOTNOTE, CHART_LEGEND];
        break;
    }
  }

  onFormFieldChange(key: string, value: any, parentKey?: string, index?: number): void {
    if (value['originalEvent'] instanceof PointerEvent) {
      value = value?.['value'];
    }
    // 更新本地 formData
    this.formData = updateFormData(this.formData, key, value, parentKey, index);
    // 转换为 _options
    this._options = convertFormDataToOptions(this.formData, this._options, this.chartFields);
    console.log(this._options)
    // 触发变更
    this.onChange.emit(this._options);
  }

  addArrayItem(key: string, schema: EditorChartArraySchema[]) {
    console.log(schema);
    const defaultType = schema[0]?.options?.[0].val as string;
    const item: any = {};
    for (const field of schema) {
      item[field.key] = '';
    }
    this.formData[key] = this.formData[key] || [];
    item['type'] = defaultType;
    this.formData[key].push(item);
  }

  openData() {
    if (this.isTreeData) {
      this.visible = true;
      const fieldKey = this.formData['series'][0]['labelKey'];
      this.treeKey = fieldKey;
      this.columnDefs = this.generateColumnDefs(this._options.data!, fieldKey);
    } else {
      this.columnDefs = this.getCols(this._options.data?.[0]);
      this.rowData = this._options.data!;
      this.rowBufferData = cloneDeep(this.rowData);
      this.visible = true;
    }
  }

  openSeriesData(data: EditorChartData[], index: number): void {
    this.bufferSeriesData.is = Is.yes;
    this.bufferSeriesData.index = index;
    this.columnDefs = this.getCols(data[0]);
    this.rowData = data;
    this.rowBufferData = cloneDeep(this.rowData);
    this.visible = true;
  }

  cancel(): void {
    if (this.isTreeData) {
      this.visible = false;
      return;
    }
    if (this.bufferSeriesData.is === Is.yes) {
      (this._options.series as AgScatterSeriesOptions[])[this.bufferSeriesData.index].data = this.rowBufferData;
      this.bufferSeriesData.is = Is.no;
    } else {
      this._options.data = this.rowBufferData;
    }
    this.rowBufferData = [];
    this.rowData = [];
    this.visible = false;
  }

  confirm(): void {
    if (this.isTreeData) {
      this.visible = false;
      return;
    }
    if (this.bufferSeriesData.is === Is.yes) {
      (this._options.series as AgScatterSeriesOptions[])[this.bufferSeriesData.index].data = this.rowData;
      this.formData['series'][this.bufferSeriesData.index]['data'] = this.rowData;
      this.bufferSeriesData.is = Is.no;
    } else {
      this._options.data = this.rowData;
    }
    this.rowBufferData = [];
    this.rowData = [];
    this.visible = false;
    setTimeout(() => {
      this.onChange.emit(this._options);
    });
  }

  getCols(data: EditorChartData): ColDef[] {
    let cols: ColDef[] = [];
    for (const key in data) {
      cols.push({
        field: key
      });
    }
    return cols;
  }

  /**
   * 自动根据数据生成 ag-Grid 的 columnDefs
   * @param data 任意一组数据（数组）
   * @param treeField 指定哪个字段作为树形分组字段，默认是 'name'
   */
  generateColumnDefs(data: any[], treeField = 'name'): ColDef[] {
    if (!data || data.length === 0) return [];

    const flat = this.flattenTree(data);
    const allKeys = new Set<string>();
    flat.forEach((item) => Object.keys(item).forEach((k) => allKeys.add(k)));

    const columnDefs: ColDef[] = [];
    allKeys.forEach((key) => {
      if (key === '__parent' || key === 'children') return;

      const colDef: ColDef = {
        field: key,
        headerName: key,
        flex: 1
      };

      columnDefs.push(colDef);
    });

    // 始终把 treeField 放第一列
    columnDefs.sort((a, b) => (a.field === treeField ? -1 : b.field === treeField ? 1 : 0));

    return columnDefs;
  }

  /**
   * 将嵌套树结构拍平成数组
   */
  flattenTree(data: any[], parent: any = null): any[] {
    return data.flatMap((item) => {
      const node = { ...item, __parent: parent };
      const children = item.children ? this.flattenTree(item.children, node) : [];
      return [node, ...children];
    });
  }

  getDataPath(data: any): string[] {
    const path: string[] = [];
    let current = data;
    while (current) {
      path.unshift(current[this.treeKey]);
      current = current.__parent;
    }
    return path;
  }

  processTreeData(data: any[], parent: any = null): any[] {
    return data.flatMap((item) => {
      const node = { ...item, __parent: parent };
      return item.children ? [node, ...this.processTreeData(item.children, node)] : [node];
    });
  }

  // 移除系列
  removeArrayItem(key: string, index: number): void {
    console.log(key, index);
    this.formData[key].splice(index, 1);
    console.log(this.formData);
    // 转换为 _options
    this._options = convertFormDataToOptions(this.formData, this._options, this.chartFields);
    // 触发变更
    this.onChange.emit(this._options);
  }

}
