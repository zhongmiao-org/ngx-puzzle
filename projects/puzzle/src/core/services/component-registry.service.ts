import { Injectable } from '@angular/core';
import { AbstractComponentFactory } from '../factories/abstract-component-factory';
// import { ChartFactoryService } from '../factories/concrete/chart-factory.service';
import { ComponentBaseProps, ComponentConfig, Position, Size } from '../interfaces';
// import { TableFactoryService } from '../factories/concrete/table-factory.service';
// import { TextFactoryService } from '../factories/concrete/text-factory.service';
import { mainTypes } from '../types';
import { INIT_SETTINGS_CONFIG } from '../constants';

@Injectable({ providedIn: 'root' })
export class ComponentRegistryService<TConfigProps extends ComponentBaseProps = ComponentBaseProps, TSubType = string> {
	private factories: Partial<{ [key in mainTypes]: AbstractComponentFactory }> = {};
	private components: Map<string, ComponentConfig<TConfigProps, TSubType>> = new Map<string, ComponentConfig<TConfigProps, TSubType>>();

	constructor(
        // chartFactory: ChartFactoryService,
        // tableFactory: TableFactoryService,
        // textFactory: TextFactoryService
    ) {
		this.components.set('canvas', INIT_SETTINGS_CONFIG['canvas'] as ComponentConfig<TConfigProps, TSubType>);
		// this.factories['chart'] = chartFactory;
		// this.factories['table'] = tableFactory;
		// this.factories['text'] = textFactory;
	}

	getFactory(type: mainTypes): AbstractComponentFactory {
		return this.factories[type]!;
	}

	register(config: ComponentConfig<TConfigProps, TSubType>): void {
		this.components.set(config.id, config);
	}

	update(id: string, config: ComponentConfig<TConfigProps, TSubType>): void {
		const existing = this.components.get(id);
		if (!existing) return;

		const updated: ComponentConfig<TConfigProps, TSubType> = {
			...existing,
			props: { ...existing.props, ...config.props },
		};
		console.log(`updated`, updated);
		this.components.set(id, updated);
	}

	updatePosition(id: string, pos: Position): void {
		const existing = this.components.get(id);
		if (!existing) return;

		const updated: ComponentConfig<TConfigProps, TSubType> = {
			...existing,
			position: pos,
		};

		this.components.set(id, updated);
	}

	updateSize(id: string, size: Size, position: Position): void {
		const existing = this.components.get(id);
		if (!existing) return;
		const updated: ComponentConfig<TConfigProps, TSubType> = {
			...existing,
			size,
			position,
		};

		this.components.set(id, updated);
	}

	getAll(): ComponentConfig<TConfigProps, TSubType>[] {
		return Array.from(this.components.values());
	}

	getById(id: string): ComponentConfig<TConfigProps, TSubType> | undefined {
		return this.components.get(id);
	}

	remove(id: string): void {
		if (this.components.has(id)) {
			this.components.delete(id);
		}
	}
}
