import { ComponentBaseProps, ComponentConfig } from 'ngx-puzzle/core/interfaces';
import { Component, OnDestroy } from '@angular/core';
import { mainTypes } from 'ngx-puzzle/core/types';
import { PuzzleCanvasMediatorService } from 'ngx-puzzle/core/mediator/puzzle-canvas-mediator.service';
import { SafeAny } from 'ngx-tethys/types';


@Component({
	template: ``,
})
export abstract class NgxPuzzleCanvasBaseComponent<TConfigProps extends ComponentBaseProps = ComponentBaseProps, TSubType = string> implements OnDestroy {
	protected _config!: ComponentConfig<TConfigProps, TSubType>;
	protected _isEdit: boolean = true;
	protected abstract readonly dataKey: mainTypes;

	set isEdit(value: boolean) {
		this._isEdit = value;
	}

	get isEdit(): boolean {
		return this._isEdit;
	}


	protected constructor(public mediator: PuzzleCanvasMediatorService<TConfigProps, TSubType>) {
		this.setupObservables();
	}


	protected abstract getDefaultOptions(subType: TSubType): SafeAny;

	// 子类可以覆盖这个方法进行更新
	protected afterUpdateConfig(): void {}

	/**
	 * 公共 update 实现
	 */
	update(config: ComponentConfig<TConfigProps, TSubType>): void {
		console.log(`update`, config);
		this.updateComponentByConfig(config);

		if (!this._config.props?.[this.dataKey]) {
			console.log(`getDefaultOptions`, this.getDefaultOptions(config.subType));
			this._config = {
				...this._config,
				props: {
					...this._config.props,
					[this.dataKey]: this.getDefaultOptions(config.subType),
				},
			};
			this.mediator.updateComponentData(this._config);
		}
		this.afterUpdateConfig();
	}

	protected setupObservables() {
		this.mediator.componentUpdate$.subscribe((config: ComponentConfig<TConfigProps, TSubType>) => {
			if (config.id === this._config.id) {
				console.log(`componentUpdate$`)
				this.update(config);
			}
		});
	}


	/**
	 * 更新
	 * @param config
	 */
	protected updateComponentByConfig(config: ComponentConfig<TConfigProps, TSubType>) {
		console.log(`updateComponentByConfig`, config);
		// todo 记录更新
		// this.mediator.recordHistory(cloneDeep(this._config), 'update');
		const { id } = config;
		if (!this._config || this._config.id === id) {
			this._config = {
				...this._config,
				...config,
			};
		}
	}


	ngOnDestroy(): void {
		// this.detachResizeListeners();
	}
}
