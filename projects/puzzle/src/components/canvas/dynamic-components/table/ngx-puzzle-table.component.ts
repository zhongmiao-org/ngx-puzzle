// import { Component, inject, OnDestroy } from '@angular/core';
// import { CanvasBaseComponent } from '../base/canvas-base.component';
// import {
// 	ComponentConfig,
// 	DataRequestConfig,
// 	ComponentTableProps,
// 	mainTypes,
// 	pivotingPanelShowTypes,
// 	rowGroupingDisplayType,
// 	rowGroupPanelShowTypes,
// 	SafeAny,
// 	Is,
// 	TableTypesEnum,
// 	TableService,
// 	DataSearchService,
// 	CanvasMediatorService,
// 	TABLE_DATA_OPTIONS,
// } from '../../../../core';
// import { DragWrapperComponent } from '../../drag-wrapper/drag-wrapper.component';
// import { NgStyle } from '@angular/common';
// import { AgGridStyleCache, formatDataWithLookupsAndDateTime } from '../../../../utils';
// import { forkJoin, Observable, of, switchMap, takeUntil } from 'rxjs';
// import { map } from 'rxjs/operators';
//
//
// @Component({
// 	selector: 'puzzle-table',
// 	standalone: true,
// 	imports: [AgGridAngular, DragWrapperComponent, NgStyle],
// 	templateUrl: './table.component.html',
// 	styleUrl: './table.component.scss',
// })
// export class TableComponent extends CanvasBaseComponent<ComponentTableProps, TableTypesEnum> implements OnDestroy {
// 	dataKey: mainTypes = 'table';
//
// 	private dataSearchService = inject(DataSearchService);
// 	private _styleCache = new AgGridStyleCache();
// 	private _tableData$!: Observable<SafeAny>;
//
// 	private gridApi!: GridApi<SafeAny>;
// 	private isInit: boolean = false;
//
// 	public columnDefs!: ColDef[];
// 	public defaultColDef!: ColDef;
// 	public autoGroupColumnDef!: ColDef;
// 	public rowGroupPanelShow!: rowGroupPanelShowTypes;
// 	public groupDefaultExpanded!: Is;
// 	public showOpenedGroup!: Is;
// 	public groupDisplayType!: rowGroupingDisplayType;
// 	public pivotMode!: boolean;
// 	public pivotPanelShow!: pivotingPanelShowTypes;
//
// 	public sideBar: SideBarDef | string | string[] | boolean | null | undefined;
//
// 	public rowData!: SafeAny[];
//
// 	set config(config: ComponentConfig<ComponentTableProps, TableTypesEnum>) {
// 		this._styleCache.clearCache();
// 		this.initConfig(config);
// 	}
//
// 	get config() {
// 		return this._config;
// 	}
//
// 	get dynamicStyles(): { [key: string]: string } {
// 		const styles = this.config.props.table.tableStyles || {};
// 		return this._styleCache.getStyles(styles);
// 	}
//
// 	constructor(
// 		mediator: CanvasMediatorService<ComponentTableProps, TableTypesEnum>,
// 		private tableService: TableService,
// 	) {
// 		super(mediator);
// 	}
//
// 	/**
// 	 * 组件销毁时清理资源
// 	 */
// 	override ngOnDestroy(): void {
// 		// 清除样式缓存
// 		this._styleCache.clearCache();
//
// 		// 调用父类的销毁方法
// 		super.ngOnDestroy?.();
// 	}
//
// 	/**
// 	 * 配置更新后的处理
// 	 */
// 	override afterUpdateConfig() {
// 		// 样式缓存已在 set config() 中清除，此处无需重复清除
// 		const { dataRequest, props } = this.config;
// 		const {
// 			rowDataUrl,
// 			columnDefs,
// 			autoGroupColumnDef,
// 			defaultColDef,
// 			groupDefaultExpanded,
// 			rowGroupPanelShow,
// 			showOpenedGroup,
// 			groupDisplayType,
// 			sideBar,
// 			pivotMode,
// 			pivotPanelShow,
// 		} = props.table;
//
// 		// 设置表格数据源
// 		if (dataRequest?.paramSearch?.length) {
// 			this._tableData$ = this.dataSearchService.webSearchMap(dataRequest.paramSearch[0]);
// 		} else if (rowDataUrl) {
// 			this._tableData$ = this.tableService.getRowGroupingData(rowDataUrl);
// 		}
//
// 		// 应用表格配置
// 		if (columnDefs) {
// 			this.columnDefs = columnDefs;
// 		}
//
// 		// 设置表格属性
// 		this.autoGroupColumnDef = autoGroupColumnDef;
// 		this.defaultColDef = defaultColDef;
// 		this.groupDefaultExpanded = groupDefaultExpanded;
// 		this.rowGroupPanelShow = rowGroupPanelShow;
// 		this.showOpenedGroup = showOpenedGroup;
// 		this.groupDisplayType = groupDisplayType;
// 		this.pivotMode = pivotMode;
// 		this.pivotPanelShow = pivotPanelShow;
// 		this.sideBar = sideBar;
//
// 		this.restartRefreshTimer();
// 	}
//
// 	/**
// 	 * 根据数据自动生成列定义
// 	 * @param data 表格数据
// 	 */
// 	private setColumnDefs(data: SafeAny[]): void {
// 		if (!data?.length) return;
//
// 		const firstRow = data[0];
// 		const columnDefs: ColDef[] = Object.keys(firstRow).map((field) => ({
// 			field,
// 			rowGroup: false,
// 			enableRowGroup: false,
// 			pivot: false,
// 			enablePivot: false,
// 			hide: false,
// 		}));
//
// 		this.columnDefs = columnDefs;
//
// 		// 更新表格列定义
// 		this.config.props.table.columnDefs = columnDefs;
//
// 		// 首次初始化时通知更新
// 		if (!this.isInit) {
// 			this.mediator.updateComponentData(this.config);
// 			this.isInit = true;
// 		}
// 	}
//
// 	private processOrgIds(data: SafeAny[]): Observable<SafeAny[]> {
// 		if (!data || data.length === 0) return of(data);
//
// 		// 提取唯一的 orgId
// 		const orgIds = [...new Set(data.map((row) => row.orgId).filter((id) => id != null))];
// 		if (orgIds.length === 0) return of(data);
//
// 		// 批量请求组织信息
// 		const requests = orgIds.map((id) => this.dataSearchService.rfd(id));
// 		return forkJoin(requests).pipe(
// 			map((orgNames) => {
// 				console.log(`orgNames`, orgNames);
// 				// 创建 orgId -> orgName 的映射
// 				const orgMap = new Map();
// 				orgIds.forEach((id, index) => {
// 					if (orgNames[index]) {
// 						orgMap.set(id, orgNames[index]);
// 					}
// 				});
//
// 				// 为数据添加 orgName 字段
// 				return data.map((row) => ({
// 					...row,
// 					...(row.orgId && orgMap.has(row.orgId) ? { orgId: orgMap.get(row.orgId) } : {}),
// 				}));
// 			}),
// 		);
// 	}
//
// 	/**
// 	 * 更新组件数据
// 	 * @param requestData 数据请求参数
// 	 */
// 	public updateData(requestData: DataRequestConfig) {
// 		const { paramSearch } = requestData;
// 		if (!paramSearch?.length) return;
//
// 		this._tableData$ = this.dataSearchService.webSearchMap(paramSearch[0]);
// 		this.onGridReady();
// 	}
//
// 	/**
// 	 * 获取默认选项
// 	 * @param subType 表格子类型
// 	 */
// 	public getDefaultOptions(subType: TableTypesEnum) {
// 		return TABLE_DATA_OPTIONS[subType];
// 	}
//
// 	/**
// 	 * 表格初始化完成时的处理
// 	 * @param params 表格初始化事件参数
// 	 */
// 	public onGridReady(params?: GridReadyEvent<SafeAny>) {
// 		// 保存表格API引用
// 		if (params) {
// 			this.gridApi = params.api;
// 		}
// 		if (this._tableData$) {
// 			this._tableData$
// 				.pipe(takeUntil(this.destroy$))
// 				.pipe(switchMap((data) => this.processOrgIds(data)))
// 				.subscribe({
// 					next: (data) => {
// 						if (!data || !data?.length) {
// 							this.rowData = [];
// 							return;
// 						}
//
// 						// 编辑模式下且没有列定义时，自动生成列定义
// 						if (this.isEdit && !this.columnDefs?.length) {
// 							this.setColumnDefs(data);
// 						}
// 						console.log(`this.columnDefs`, this.columnDefs);
// 						this.rowData = formatDataWithLookupsAndDateTime(data, this.columnDefs);
// 						console.log(this.rowData);
// 						// 确保gridApi存在再刷新单元格
// 						if (this.gridApi) {
// 							this.gridApi.refreshCells();
// 						}
// 					},
// 					error: (err) => console.error('Failed to load table data:', err),
// 				});
// 		}
// 	}
// }
