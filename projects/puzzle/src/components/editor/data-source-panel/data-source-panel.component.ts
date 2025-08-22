import { Component, effect, inject, input, OnInit, output, signal, untracked, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { AgGridAngular } from 'ag-grid-angular';
import { AG_GRID_LOCALE_CN } from '@ag-grid-community/locale';
import { ColDef } from 'ag-grid-community';
import { FormComponent, AmComponent, FormOptions, ColumnFilter, Search, FormField } from 'imm-element-ui';
import { Button } from 'primeng/button';
import { map } from 'rxjs/operators';
import {
	DATE_OPER_OPTIONS,
	TEXT_OPER_OPTIONS,
	NUMBER_OPER_OPTIONS,
	AggregationService,
	SafeAny,
} from '../../../../core';

@Component({
	selector: 'imm-bi-data-source-panel',
	standalone: true,
	imports: [ReactiveFormsModule, FormComponent, AgGridAngular, Button],
	templateUrl: './data-source-panel.component.html',
	styleUrl: './data-source-panel.component.scss',
})
export class DataSourcePanelComponent extends AmComponent implements OnInit {
	@ViewChild('dataSourceForm') form!: FormComponent;

	readonly localeText = AG_GRID_LOCALE_CN;

	private aggregationService = inject(AggregationService);

	// 输入输出
	paramSearch = input<Search>();
	aggregationFn = input<string>();
	showAggPreviewBtn = input<boolean>(true);
	paramsOnChange = output<Search>();
	tableColumnsChange = output<ColDef[]>();

	// 表格数据
	rowData = [];
	defaultColDef: ColDef = {};
	columnDefs: ColDef[] = [];

	// 数据流
	dataSourceTreeNodes$ = new BehaviorSubject<SafeAny[]>([]);
	fieldOptions$ = new BehaviorSubject<SafeAny[]>([]);
	orgFieldOptions$ = new BehaviorSubject<string[]>([]);

	// 内部状态
	bufferIndex = 1;
	modelMap: SafeAny = {};
	model: SafeAny = {};
	columnFilters: ColumnFilter[] = [];
	bufferSearch!: Search;
	appId!: number;

	// 过滤器相关
	filterFormOptions = signal<FormOptions[]>([]);
	filterMoel: SafeAny[] = [];

	constructor() {
		super();
		this.modelName = 'Apps';
		// this.initializeUpsertParams();
		this.initializeEffects();
	}

	ngOnInit() {
		const { appId } = this.route.snapshot.params;
		this.appId = Number(appId);
		this.initializeComponent();
	}

	private initializeEffects() {
		effect(() => {
			const params = this.paramSearch();
			if (params) {
				this.handleParamsChange(params);
			}
		});
	}

	private initializeComponent() {
		this.generateTreeNodes();
		this.setFormOptions();
		this.getData();
	}

	// 参数变化处理
	private handleParamsChange(params: Search) {
		const { modelName, columnFilters, orgField } = params;

		const isModelChanged = this.model.modelName !== modelName;
		this.model = { modelName, orgField };

		// 立即更新 bufferSearch
		this.bufferSearch = {
			modelName: modelName,
			orgField: orgField,
			columnFilters: columnFilters || [],
			sorts: [{ field: 'CreatedAt', isAsc: false }],
		};

		// 立即向父组件发送更新的参数
		this.paramsOnChange.emit(this.bufferSearch);

		// 如果模型发生变化，需要获取字段信息
		if (isModelChanged && modelName) {
			this.dataSourceTreeNodes$.subscribe((nodes) => {
				if (nodes.length > 0) {
					const modelId = this.modelMap[modelName];
					if (modelId) {
						this.getFields(modelId);
					}
				}
			});
		}

		untracked(() => {
			this.updateFilterModel(columnFilters || []);
		});
	}

	// Hook 方法 - 绑定到组件实例
	dataSourceTreeNodesHook = (): Observable<(field?: FormField) => void> => {
		return new Observable((observer) => {
			this.dataSourceTreeNodes$.subscribe((nodes) => {
				observer.next((field?: FormField) => {
					if (field?.treeSelectProps) {
						field.treeSelectProps.options = nodes;
					}
				});
			});
		});
	};

	orgFieldOptionsHook = (): Observable<(field?: FormField) => void> => {
		return new Observable((observer) => {
			this.orgFieldOptions$.subscribe((options) => {
				observer.next((field?: FormField) => {
					if (field?.selectProps) {
						field.selectProps.options = options;
					}
				});
			});
		});
	};

	fieldOptionsHook = (): Observable<(field?: FormField) => void> => {
		return new Observable((observer) => {
			this.fieldOptions$.subscribe((options) => {
				observer.next((field?: FormField) => {
					if (field?.multiSelectProps) {
						field.multiSelectProps.options = options;
						if (field.key === 'showFields') {
							const allFieldValues = options.map((item) => item.field);
							Promise.resolve().then(() => {
								const fieldsControl = this.formOptions.form?.get(`showFields`);
								fieldsControl?.setValue(allFieldValues);
							});

							this.setColumnDefs(options);
							this.tableColumnsChange.emit(this.columnDefs);
						}
					} else if (field?.selectProps) {
						field.selectProps.options = options;
					}
				});
			});
		});
	};

	// 表单配置
	setFormOptions() {
		this.formOptions = {
			fields: [
				{
					groupClass: 'flex flex-row flex-wrap',
					group: [this.createTreeSelectField(), this.createOrgPermissionField(), this.createMultiSelectField()],
				},
			],
			form: new FormGroup({}),
		};
	}

	private createTreeSelectField(): FormField {
		return {
			class: 'basis-1/2',
			type: 'treeselect',
			key: 'modelName',
			treeSelectProps: {
				label: '数据源',
				display: 'comma',
				selectionMode: 'single',
				required: true,
				appendTo: 'body',
				onNodeSelect: (field: SafeAny, event: SafeAny) => {
					this.handleNodeSelect(event.node.id);
				},
			},
			hook: this.dataSourceTreeNodesHook(),
		} as FormField;
	}

	private createOrgPermissionField(): FormField {
		return {
			class: 'basis-1/2',
			type: 'select',
			key: 'orgField',
			selectProps: {
				label: '组织权限',
				options: [],
				showClear: true,
				onChange: (field: SafeAny, event: SafeAny) => {
					this.handleOrgFieldChange(event.value);
				},
			},
			hook: this.orgFieldOptionsHook(), // 使用专门的 hook
		};
	}

	private createMultiSelectField(): FormField {
		return {
			class: 'basis-full',
			type: 'multiselect',
			key: 'showFields',
			multiSelectProps: {
				optionLabel: 'label',
				optionValue: 'field',
				label: '预览字段',
				options: [],
				onChange: (field: SafeAny, event: SafeAny) => {
					this.handleFieldSelection(field, event);
				},
			},
			hook: this.fieldOptionsHook(),
		} as FormField;
	}

	// 事件处理
	private handleNodeSelect(nodeId: number) {
		// 清空所有联动数据
		this.clearCascadeData();

		this.getFields(nodeId);
		this.getModelData(nodeId);
		Promise.resolve().then(() => {
			// 确保 bufferSearch 包含正确的数据
			if (this.bufferSearch) {
				// 发送当前的搜索参数给父组件
				this.paramsOnChange.emit(this.bufferSearch);
			}
		});
	}

	private handleOrgFieldChange(orgField: SafeAny) {
		// 更新 bufferSearch 中的 orgField
		if (this.bufferSearch) {
			this.bufferSearch = {
				...this.bufferSearch,
				orgField,
			};

			console.log('[数据源面板] orgField 变更，更新搜索参数:', this.bufferSearch);

			// 向父组件发送更新的参数
			this.paramsOnChange.emit(this.bufferSearch);
		}
	}

	private handleFieldSelection(field: SafeAny, event: SafeAny) {
		const options = field.multiSelectProps?.options || [];
		const selectedFields = options.filter((v: SafeAny) => event.value.includes(v.field));
		this.setColumnDefs(selectedFields);
	}

	// 树节点相关
	public convertToTreeNodes(appData: SafeAny): TreeNode[] {
		if (!appData || !appData.modules) {
			return [];
		}

		// 直接处理 modules 数组，不再包装 app 层级
		return this.processModules(appData.modules);
	}

	private processModules(modules: SafeAny[]): TreeNode[] {
		return modules
			.sort((a, b) => (a.index || 0) - (b.index || 0)) // 按index排序
			.map((module) => this.createModuleNode(module));
	}

	private createModelNode(model: SafeAny): TreeNode & { id: number } {
		// 将模型数据添加到全局映射
		this.modelMap[model.modelName] = model.id;

		return {
			key: model.modelName,
			label: model.showName,
			data: { ...model, type: 'model' },
			expanded: false,
			selectable: true,
			children: [],
			id: model.id, // 添加id方便后续使用
		};
	}

	private createModuleNode(module: SafeAny): TreeNode {
		return {
			key: module.name,
			label: module.label,
			data: { ...module, type: 'module' },
			expanded: false,
			selectable: false,
			children: module.models ? this.processModels(module.models) : [],
		};
	}

	private processModels(models: SafeAny[]): TreeNode[] {
		return models.map((model) => this.createModelNode(model));
	}

	// 数据获取
	private generateTreeNodes() {
		this.web_get({
			id: this.appId,
			modelName: 'Apps',
			preloads: ['Modules', 'Modules.Models'],
		}).subscribe((data) => {
			const treeData = this.convertToTreeNodes(data);
			this.dataSourceTreeNodes$.next(treeData);
		});
	}

	getModelData(id: number) {
		this.modelName = 'ModelInfo';
		this.web_get({ id, preloads: ['Fields', 'Fields.Enum'] }).subscribe((res) => {
			this.fieldOptions$.next(res.fields);
		});
	}

	private setColumnDefs(fieldSelections: SafeAny[]) {
		console.log(`setColumnDefs`, fieldSelections);
		this.columnDefs = fieldSelections.map((item) => {
			// 基础列定义
			const colDef: ColDef = {
				headerName: item.label,
				field: item.field,
			};

			// 如果存在枚举值，处理成 reference 或 lookups
			if (item.enum && Array.isArray(item.enum) && item.enum.length > 0) {
				// 提取枚举值的 value 和 label，组成 lookups 对象
				const lookups: Record<string | number, string> = {};

				item.enum.forEach((enumItem: SafeAny) => {
					if (enumItem.value !== undefined && enumItem.label) {
						lookups[enumItem.value] = enumItem.label;
					}
				});

				if (Object.keys(lookups).length > 0) {
					(colDef as SafeAny).lookups = lookups;
				}
			}

			(colDef as SafeAny).fieldType = item.fieldType;

			return colDef;
		});
	}

	// 过滤器管理
	add() {
		const formOptions = this.createFilterFormOptions();
		this.filterMoel.push({ bufferIndex: this.bufferIndex++ });
		this.filterFormOptions.set([...this.filterFormOptions(), formOptions]);
	}

	private createFilterFormOptions(): FormOptions {
		const operationIndex = this.bufferIndex;
		const isFirstFilter = this.filterFormOptions().length === 0;

		return {
			fields: [
				{
					groupClass: 'flex flex-row flex-wrap',
					group: [
						this.createColumnFieldSelect(operationIndex, isFirstFilter),
						this.createOperatorSelect(operationIndex),
						// 创建多种类型的输入框，根据字段类型动态显示/隐藏
						this.createTextFilterInput(operationIndex),
						this.createNumberFilterInput(operationIndex),
						this.createDateFilterInput(operationIndex),
						this.createDateRangeFilterInput(operationIndex),
					],
				},
			],
			form: new FormGroup({}),
		};
	}

	private createColumnFieldSelect(index: number, isFirst: boolean): FormField {
		return {
			class: 'basis-1/3',
			type: 'select',
			key: `columnField${index}`,
			selectProps: {
				optionLabel: 'label',
				optionValue: 'field',
				label: isFirst ? '当' : '且',
				onChange: (field: SafeAny, event: SafeAny) => {
					const selectedFieldValue = event.value;
					const fieldOptions = this.fieldOptions$.value;
					const selectedOption = fieldOptions.find((option) => option.field === selectedFieldValue);

					console.log('选中的字段:', selectedOption);

					// 更新对应过滤器表单中操作符选项
					this.updateOperatorOptions(index, selectedOption?.fieldType);
					// 更新对应过滤器表单中其他字段的显示状态
					this.updateFilterInputsVisibility(index, selectedOption?.fieldType);

					Promise.resolve().then(() => this.updateSearch());
				},
			},
			hook: this.fieldOptionsHook(),
		} as FormField;
	}

	private createOperatorSelect(index: number) {
		return {
			class: 'basis-1/3',
			type: 'select',
			key: `type${index}`,
			selectProps: {
				optionLabel: 'label',
				optionValue: 'operator',
				options: [], // 初始为空，会根据字段类型动态更新
				onChange: (field: SafeAny, event: SafeAny) => {
					const selectedOperator = event.value;
					// 当操作符变化时，更新输入框的显示状态
					this.updateFilterInputsVisibilityByOperator(index, selectedOperator);
					Promise.resolve().then(() => this.updateSearch());
				},
			},
		} as FormField;
	}

	// 文本类型输入框 (VARCHAR, TEXT 等)
	private createTextFilterInput(index: number): FormField {
		return {
			class: 'basis-1/3',
			type: 'inputtext',
			key: `fiter${index}`,
			inputTextProps: {
				required: true,
				onModelChange: () => {
					Promise.resolve().then(() => this.updateSearch());
				},
			},
			hideExpression: (model: SafeAny) => {
				// 默认隐藏，只有在选择文本字段时显示
				const fieldType = this.getSelectedFieldType(index, model);
				const operator = model[`type${index}`];
				return (fieldType !== 'VARCHAR' && fieldType !== 'TEXT') || operator === 'inRange';
			},
		} as FormField;
	}

	// 数字类型输入框 (BIGINT, INT, DECIMAL 等)
	private createNumberFilterInput(index: number): FormField {
		return {
			class: 'basis-1/3',
			type: 'inputnumber',
			key: `fiter${index}`,
			inputNumberProps: {
				required: true,
				onModelChange: () => {
					Promise.resolve().then(() => this.updateSearch());
				},
			},
			hideExpression: (model: SafeAny) => {
				const fieldType = this.getSelectedFieldType(index, model);
				const operator = model[`type${index}`];
				return (
					(fieldType !== 'BIGINT' && fieldType !== 'INT' && fieldType !== 'DECIMAL' && fieldType !== 'NUMERIC') || operator === 'inRange'
				);
			},
		} as FormField;
	}

	// 日期类型输入框 (DATE, DATETIME, TIMESTAMP 等) - 单个日期选择
	private createDateFilterInput(index: number): FormField {
		return {
			class: 'basis-1/3',
			type: 'datepicker',
			key: `fiter${index}`,
			datePickerProps: {
				required: true,
				showIcon: true,
				onModelChange: () => {
					Promise.resolve().then(() => this.updateSearch());
				},
			},
			hideExpression: (model: SafeAny) => {
				const fieldType = this.getSelectedFieldType(index, model);
				const operator = model[`type${index}`];
				return (fieldType !== 'DATE' && fieldType !== 'DATETIME' && fieldType !== 'TIMESTAMP') || operator === 'inRange';
			},
		} as FormField;
	}

	// 日期范围输入框 - 专门用于处理 inRange 操作符
	private createDateRangeFilterInput(index: number): FormField {
		return {
			class: 'basis-1/3',
			type: 'datepicker',
			key: `fiter${index}`,
			datePickerProps: {
				required: true,
				showIcon: true,
				selectionMode: 'range',
				readonlyInput: true,
				onModelChange: () => {
					Promise.resolve().then(() => this.updateSearch());
				},
			},
			hideExpression: (model: SafeAny) => {
				const fieldType = this.getSelectedFieldType(index, model);
				const operator = model[`type${index}`];
				return (fieldType !== 'DATE' && fieldType !== 'DATETIME' && fieldType !== 'TIMESTAMP') || operator !== 'inRange';
			},
		} as FormField;
	}

	// 辅助方法：根据模型数据获取选中字段的类型
	private getSelectedFieldType(index: number, model: SafeAny): string | null {
		const selectedFieldValue = model[`columnField${index}`];
		if (!selectedFieldValue) return null;

		const fieldOptions = this.fieldOptions$.value;
		const selectedOption = fieldOptions.find((option) => option.field === selectedFieldValue);
		return selectedOption?.fieldType || null;
	}

	// 根据字段类型更新操作符选项
	private updateOperatorOptions(index: number, fieldType: string | undefined): void {
		if (!fieldType) return;

		let operatorOptions: any[] = [];

		// 根据字段类型选择对应的操作符
		if (fieldType === 'DATE' || fieldType === 'DATETIME' || fieldType === 'TIMESTAMP') {
			operatorOptions = DATE_OPER_OPTIONS;
		} else if (fieldType === 'VARCHAR' || fieldType === 'TEXT') {
			operatorOptions = TEXT_OPER_OPTIONS;
		} else if (fieldType === 'BIGINT' || fieldType === 'INT' || fieldType === 'DECIMAL' || fieldType === 'NUMERIC') {
			operatorOptions = NUMBER_OPER_OPTIONS;
		}

		// 查找并更新对应的操作符选择字段
		const currentFilterForm = this.filterFormOptions()[this.filterFormOptions().length - 1];
		if (currentFilterForm?.fields?.[0]?.group) {
			const operatorField = currentFilterForm.fields[0].group.find((field) => field.key === `type${index}`);
			if (operatorField?.selectProps) {
				operatorField.selectProps.options = operatorOptions;
				console.log(`字段类型 ${fieldType} 对应的操作符选项:`, operatorOptions);
			}
		}
	}

	// 更新过滤器输入框显示状态的方法
	private updateFilterInputsVisibility(index: number, fieldType: string | undefined): void {
		// 这里可以触发表单重新渲染来更新 hideExpression 的结果
		// 由于 hideExpression 是响应式的，当模型数据变化时会自动重新计算
		console.log(`字段类型变更为: ${fieldType}, 将更新输入框 ${index} 的显示状态`);
	}

	// 根据操作符更新输入框显示状态
	private updateFilterInputsVisibilityByOperator(index: number, operator: string): void {
		console.log(`操作符变更为: ${operator}, 将更新输入框 ${index} 的显示状态`);
		// hideExpression 会自动根据模型数据变化重新计算
	}

	del(index: number) {
		this.filterMoel.splice(index, 1);
		this.updateFilterFormOptions(index);
		this.updateSearch();
	}

	private updateFilterFormOptions(deletedIndex: number) {
		this.filterFormOptions.update((values) => {
			const newValues = values.filter((_, i) => i !== deletedIndex);
			newValues.forEach((item, newIndex) => {
				this.updateFormOptionLabel(item, newIndex);
			});
			return newValues;
		});
	}

	private updateFormOptionLabel(item: FormOptions, index: number): void {
		const selectProps = item.fields?.[0]?.group?.[0]?.selectProps;
		if (selectProps) {
			selectProps.label = index === 0 ? '当' : '且';
		}
	}

	// 搜索更新
	private updateSearch() {
		if (this.bufferSearch) {
			this.bufferSearch.columnFilters = this.filterMoel.map((item) => {
				const { bufferIndex } = item;
				return {
					columnField: item[`columnField${bufferIndex}`],
					type: item[`type${bufferIndex}`],
					fiter: item[`fiter${bufferIndex}`],
				};
			});
			console.log('[数据源面板] 发送搜索参数:', this.bufferSearch);
			this.paramsOnChange.emit(this.bufferSearch);
		}
	}

	// 过滤器模型更新
	private updateFilterModel(columnFilters: ColumnFilter[]) {
		this.dataSourceTreeNodes$.subscribe((nodes) => {
			if (nodes.length > 0 && this.model.modelName) {
				this.updateFieldOptionsByModelName(this.model.modelName);
			}
		});

		this.rebuildFilterForms(columnFilters);
	}

	private rebuildFilterForms(columnFilters: ColumnFilter[]) {
		columnFilters.forEach((filter, index) => {
			const operationIndex = this.bufferIndex;
			const filterModelItem = this.createFilterModelItem(filter, operationIndex);
			const formOptions = this.createFilterFormOptionsFromFilter(operationIndex, index);

			this.filterMoel.push(filterModelItem);
			this.bufferIndex++;
			this.filterFormOptions.update((options) => [...options, formOptions]);
		});
	}

	private createFilterModelItem(filter: ColumnFilter, index: number): SafeAny {
		return {
			[`columnField${index}`]: filter.columnField || '',
			[`type${index}`]: filter.type || '',
			[`fiter${index}`]: filter.fiter || '',
		};
	}

	private createFilterFormOptionsFromFilter(operationIndex: number, index: number): FormOptions {
		return {
			fields: [
				{
					groupClass: 'flex flex-row flex-wrap',
					group: [
						this.createColumnFieldSelect(operationIndex, index === 0),
						this.createOperatorSelect(operationIndex),
						// 同样为重建的表单创建多种类型的输入框
						this.createTextFilterInput(operationIndex),
						this.createNumberFilterInput(operationIndex),
						this.createDateFilterInput(operationIndex),
						this.createDateRangeFilterInput(operationIndex),
					],
				},
			],
			form: new FormGroup({}),
		};
	}

	private updateFieldOptionsByModelName(modelName: string) {
		const modelId = this.modelMap[modelName];
		if (!modelId) {
			console.warn(`未找到 modelName: ${modelName} 对应的 ID`);
			return;
		}

		this.getModelData(modelId);
	}

	preview() {
		// 预览源数据：不执行聚合，使用当前选择的字段作为表头
		const selectedFields = this.fieldOptions$.value.filter((field: SafeAny) =>
			this.formOptions?.form?.get('showFields')?.value?.includes(field.field),
		);
		if (selectedFields.length > 0) {
			this.setColumnDefs(selectedFields);
		}
		this.getData(false);
	}

	previewAgg() {
		// 预览聚合数据：执行聚合并根据结果的key生成表头
		this.getData(true);
	}

	getData(isAggregated = false) {
		if (!this.model.modelName) return;

		this.web_searchmap(this.bufferSearch)
			.pipe(
				map((data) => {
					if (isAggregated && this.aggregationFn()) {
						// 聚合预览模式
						const result = this.aggregationService.execute(this.aggregationFn()!, data || []);
						console.log('[数据源] 聚合处理结果:', result);
						return result;
					}
					console.log('[数据源] 原始数据:', data);
					return data || [];
				}),
			)
			.subscribe((res) => {
				console.log(`getData`, res);
				this.rowData = res;

				// 如果是聚合预览且有数据，根据第一条记录的key生成表头
				if (isAggregated && res.length > 0) {
					this.columnDefs = Object.keys(res[0]).map((key) => ({
						headerName: key,
						field: key,
					}));
				}
			});
	}

	/**
	 * 清空数据源切换时的所有联动数据
	 */
	private clearCascadeData(): void {
		// 清空过滤器相关数据
		this.filterFormOptions.set([]);
		this.filterMoel = [];
		this.bufferIndex = 1;

		// 清空字段选项
		this.fieldOptions$.next([]);

		// 清空表格相关数据
		this.columnDefs = [];
		this.rowData = [];
		this.columnFilters = [];

		// 清空表单中的展示字段选择
		if (this.formOptions?.form) {
			const showFieldsControl = this.formOptions.form.get('showFields');
			if (showFieldsControl) {
				showFieldsControl.setValue([]);
			}
		}

		// 清空搜索缓存
		this.bufferSearch = {
			modelName: this.model.modelName,
			orgField: undefined,
			columnFilters: [],
			sorts: [{ field: 'CreatedAt', isAsc: false }],
		};
	}

	getFields(id: number) {
		this.web_get({ modelName: 'ModelInfo', preloads: ['fields'], id }).subscribe((res) => {
			this.form.getField('orgField')!.selectProps!.options = res.fields.map((v: SafeAny) => v.field) || [];
		});
	}

	public validate(): boolean {
		return !!this.form.validate();
	}
}
