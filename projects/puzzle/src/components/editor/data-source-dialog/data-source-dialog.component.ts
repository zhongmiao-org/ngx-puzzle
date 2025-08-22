import { Component, input, output, model, ViewChild } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DataSourcePanelComponent } from '../data-source-panel/data-source-panel.component';
import { Search } from 'imm-element-ui';
import { DataRequestConfig } from '../../../../core';
import { ColDef } from 'ag-grid-community';

@Component({
	selector: 'imm-bi-data-source-dialog',
	standalone: true,
	imports: [Dialog, Button, CommonModule, DataSourcePanelComponent],
	templateUrl: 'data-source-dialog.component.html',
})
export class DataSourceDialogComponent {
	@ViewChild(DataSourcePanelComponent) dataSourcePanel!: DataSourcePanelComponent;

	// 输入属性
	header = input<string>('查看数据');
	dialogStyle = input<Record<string, any>>({ width: '1200px', height: '800px' });
	contentStyle = input<Record<string, any>>({ height: '691px', width: '1173px' });
	bufferIndex = input<number>(0);
	requestOptions = input<DataRequestConfig>({ paramSearch: [], aggregations: [] });
	showAggPreview = input<boolean>(true);

	// 双向绑定属性
	visible = model<boolean>(false);

	// 输出事件 - 只保留必要的事件
	readonly cancel = output<void>();
	readonly confirm = output<DataRequestConfig>(); // 这个事件同时承担数据更新的职责

	// 内部状态
	private _bufferParams!: Search;
	private _allColumns: ColDef[] = [];

	// 计算属性
	currentParamSearch() {
		const paramSearch = this.requestOptions().paramSearch;
		const index = this.bufferIndex();
		return paramSearch && paramSearch[index] ? paramSearch[index] : {};
	}

	currentAggregationFn() {
		const aggregations = this.requestOptions().aggregations;
		const index = this.bufferIndex();
		return aggregations && aggregations[index] ? aggregations[index] : undefined;
	}

	// 事件处理方法
	onParamsChange(paramSearch: Search) {
		this._bufferParams = paramSearch;
	}

	// 重置内部状态的方法
	onCancel(): void {
		this._bufferParams = undefined as any; // 清空缓冲参数
		this.cancel.emit();
	}

	onConfirm(): void {
		if (!this.dataSourcePanel.validate()) return;
		const originalRequestOptions = this.requestOptions();
		let paramSearch = [...(originalRequestOptions.paramSearch ?? [])]; // 深拷贝原有数组
		const aggregations = [...(originalRequestOptions.aggregations ?? [])]; // 深拷贝原有数组
		const currentIndex = this.bufferIndex();

		// 检查是否有实际的参数变更
		const bufferParams = this._bufferParams;

		console.log('[数据源对话框] 确认前状态:', {
			'原有参数搜索': paramSearch,
			'缓冲参数': bufferParams,
			'当前索引': currentIndex,
			'是否有缓冲参数': !!bufferParams,
		});

		// 只有当确实有参数变更时才更新
		if (bufferParams && Object.keys(bufferParams).length > 0) {
			// 确保 paramSearch 数组有足够的长度
			while (paramSearch.length <= currentIndex) {
				paramSearch.push({});
			}

			paramSearch[currentIndex] = bufferParams;
		}
		// 如果没有 bufferParams，保持原有的参数不变

		let updatedRequestOptions: DataRequestConfig = {
			...originalRequestOptions, // 保留原有的所有属性
			paramSearch,
			aggregations, // 确保聚合函数不丢失
		};

		// 只有表格组件才需要处理 tableHeader
		if (this._allColumns.length > 0) {
			updatedRequestOptions = {
				...updatedRequestOptions,
				props: {
					...updatedRequestOptions.props, // 保留原有的 props
					tableHeader: this._allColumns,
				},
			};
		}

		console.log('[数据源对话框] 最终确认数据:', {
			'原有数据': originalRequestOptions,
			'更新后数据': updatedRequestOptions,
			'参数是否变更': JSON.stringify(originalRequestOptions.paramSearch) !== JSON.stringify(updatedRequestOptions.paramSearch),
		});

		this.visible.set(false);
		this.confirm.emit(updatedRequestOptions);
	}

	onAllColChanged(columns: ColDef[]) {
		this._allColumns = columns || [];
	}
}
