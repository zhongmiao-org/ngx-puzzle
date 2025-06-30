// import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
// import { NgClass, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { CanvasMediatorService } from 'ngx-puzzle/core/mediator/canvas-mediator.service';
// import {
// 	ComponentConfig,
// 	EditorFields,
// 	EditorFormData,
// 	EditorImageOption,
// 	EditorStyleField,
// 	EditorTab,
// 	Position,
// 	Size,
// 	TableConfig,
// 	TextConfig,
// } from 'ngx-puzzle/core/interfaces';
// import { basicTypes, mainTypes } from 'ngx-puzzle/core/types';
//
// // PrimeNG
// import { Tabs, TabsModule } from 'primeng/tabs';
// import { InputNumber } from 'primeng/inputnumber';
// import { InputTextModule } from 'primeng/inputtext';
// import { Subject, takeUntil } from 'rxjs';
// import { BASE_TAB, DATA_TAB, EDITOR_FIELDS_MAP, STYLE_TAB } from 'ngx-puzzle/core/constants';
// import { ColorPicker } from 'primeng/colorpicker';
// import { Select } from 'primeng/select';
// import { ChartEditorComponent } from 'app/components/editor/dynamic-editor/chart-editor/chart-editor.component';
// import { AgChartOptions } from 'ag-charts-community';
// import { cloneDeep } from 'lodash';
// import { TableEditorComponent } from 'app/components/editor/dynamic-editor/table-editor/table-editor.component';
// import { TextEditorComponent } from 'app/components/editor/dynamic-editor/text-editor/text-editor.component';
//
// @Component({
// 	selector: 'app-editor',
// 	standalone: true,
// 	imports: [
// 		FormsModule,
// 		TabsModule,
// 		InputNumber,
// 		InputTextModule,
// 		NgClass,
// 		NgSwitchCase,
// 		NgSwitch,
// 		NgSwitchDefault,
// 		ColorPicker,
// 		Select,
// 		ChartEditorComponent,
// 		TableEditorComponent,
// 		TextEditorComponent,
// 	],
// 	templateUrl: './editor.component.html',
// 	styleUrl: './editor.component.scss',
// })
// export class EditorComponent implements AfterViewInit, OnDestroy {
// 	@ViewChild(Tabs) tabComponent!: Tabs;
//
// 	private destroy$: Subject<void> = new Subject<void>();
//
// 	public config!: ComponentConfig;
// 	public currentType: string = 'canvas';
//
// 	public fields: EditorFields[] = [];
// 	// 样式字段
// 	public styleFields: EditorStyleField[] = [];
//
// 	public formData: EditorFormData = {
// 		width: 0,
// 		height: 0,
// 		positionX: 0,
// 		positionY: 0,
// 		styles: {},
// 	};
//
// 	public tabs: EditorTab[] = [];
//
// 	constructor(private mediator: CanvasMediatorService) {}
//
// 	ngAfterViewInit(): void {
// 		const config = this.mediator.getCurrentSelect();
// 		console.log(`ngAfterViewInit`, config);
// 		if (!!config) {
// 			this.resetConfig(config);
// 		}
// 		this.setupObservables();
// 	}
//
// 	private setupTabs(config: ComponentConfig): void {
// 		console.log(`setupTabs`, config);
// 		// todo 根据类型不同，配置不同的 tab
// 		switch (config.type) {
// 			case 'chart':
// 				this.tabs = [BASE_TAB, DATA_TAB];
// 				break;
// 			case 'table':
// 				this.tabs = [BASE_TAB, DATA_TAB];
// 				break;
// 			case 'text':
// 				this.tabs = [BASE_TAB, STYLE_TAB];
// 				break;
// 			default:
// 				this.tabs = [BASE_TAB];
// 				break;
// 		}
// 		console.log(this.tabs);
// 		this.tabComponent.value.set(`appearance`);
// 	}
//
// 	private resetConfig(config: ComponentConfig): void {
// 		console.log(`resetConfig`, config, this.config, (this.config && this.config.id !== config.id) || !this.config);
// 		if ((this.config && this.config.id !== config.id) || !this.config) {
// 			this.setupTabs(config);
// 		}
// 		this.update(cloneDeep(config));
// 	}
//
// 	private setupObservables(): void {
// 		this.mediator.componentSelect$.pipe(takeUntil(this.destroy$)).subscribe((config: ComponentConfig) => {
// 			this.resetConfig(config);
// 		});
// 		this.mediator.componentUpdate$.pipe(takeUntil(this.destroy$)).subscribe((config: ComponentConfig) => {
// 			this.update(config);
// 		});
// 		this.mediator.componentMoving$.pipe(takeUntil(this.destroy$)).subscribe(({id, position}) => {
// 			if (id === this.config.id) {
// 				this.updatePosition(position);
// 			}
// 		});
// 		this.mediator.componentResize$.pipe(takeUntil(this.destroy$)).subscribe((config) => {
// 			const { id, size } = config;
// 			if (id === this.config.id) {
// 				this.updateSize(size);
// 			}
// 		});
// 	}
//
// 	private update(config: ComponentConfig): void {
// 		this.config = config;
// 		this.currentType = config.type;
//
// 		const typeFields = EDITOR_FIELDS_MAP[config.type];
// 		this.fields = typeFields?.fields || [];
// 		this.styleFields = typeFields?.styles || [];
//
// 		// 初始化基础数据
// 		this.formData = {
// 			...this.formData,
// 			width: config.size.width,
// 			height: config.size.height,
// 			positionX: config.position.x,
// 			positionY: config.position.y,
// 			styles: {
// 				...this.formData.styles,
// 				...config.props.styles,
// 			},
// 		};
// 	}
//
// 	private updatePosition(position: Position) {
// 		this.config = {
// 			...this.config,
// 			position,
// 		};
// 		this.formData.positionX = position.x;
// 		this.formData.positionY = position.y;
// 	}
//
// 	private updateSize(size: Size) {
// 		this.config = {
// 			...this.config,
// 			size,
// 		};
// 		this.formData.width = size.width;
// 		this.formData.height = size.height;
// 	}
//
// 	basicDataChange(val: number | string, field: basicTypes): void {
// 		const config = cloneDeep(this.config);
// 		let actionType: 'resize' | 'move' | null = null;
//
// 		switch (field) {
// 			case 'width':
// 				this.config.size.width = +val;
// 				actionType = 'resize';
// 				break;
// 			case 'height':
// 				this.config.size.height = +val;
// 				actionType = 'resize';
// 				break;
// 			case 'positionX':
// 				this.config.position.x = +val;
// 				actionType = 'move';
// 				break;
// 			case 'positionY':
// 				this.config.position.y = +val;
// 				actionType = 'move';
// 				break;
// 		}
//
// 		if (actionType) {
// 			this.mediator.recordHistory(config, actionType);
// 			console.log();
// 			const { id, size, position } = this.config;
// 			actionType === 'resize' ? this.mediator.resizeComponent(id, size, position) : this.mediator.movingComponent(id, position);
// 		}
// 	}
//
// 	styleDataChange(val: number | string | EditorImageOption, field: string): void {
// 		let changeValue = val;
// 		this.config.props.styles = {
// 			...this.config.props.styles,
// 			[field]: changeValue,
// 		};
// 		this.formData.styles = {
// 			...this.formData.styles,
// 			[field]: changeValue,
// 		};
// 		this.emitUpdate();
// 	}
//
// 	updateOptions(options: AgChartOptions | TableConfig | TextConfig, type: mainTypes): void {
// 		switch (type) {
// 			case 'chart':
// 				this.config = {
// 					...this.config,
// 					props: {
// 						...this.config.props,
// 						chart: options,
// 					},
// 				};
// 				break;
// 			case 'table':
// 				this.config = {
// 					...this.config,
// 					props: {
// 						...this.config.props,
// 						table: options,
// 					},
// 				};
// 				break;
// 			case 'text':
// 				this.config = {
// 					...this.config,
// 					props: {
// 						...this.config.props,
// 						text: options,
// 					},
// 				};
// 				break;
// 		}
// 		this.emitUpdate();
// 	}
//
// 	private emitUpdate(): void {
// 		const newConfig = cloneDeep(this.config);
//
// 		console.log(`emitUpdate`, newConfig);
// 		console.log(JSON.stringify(newConfig));
// 		this.mediator.updateComponent(newConfig);
// 	}
//
// 	ngOnDestroy(): void {
// 		this.destroy$.next();
// 		this.destroy$.complete();
// 	}
// }
