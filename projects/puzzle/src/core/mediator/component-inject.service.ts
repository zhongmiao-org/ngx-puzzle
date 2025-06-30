import { Injectable, ViewContainerRef, ComponentRef, EnvironmentInjector } from '@angular/core';
import { ComponentInstance } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class ComponentInjectorService {
	private containerRef: ViewContainerRef | null = null;
	private componentRefs = new Map<string, ComponentRef<any>>();

	constructor(private envInjector: EnvironmentInjector) {}

	setContainerRef(ref: ViewContainerRef) {
		console.log(`setContainerRef`, ref);
		this.containerRef = ref;
	}

	createComponent(instance: ComponentInstance, isEdit = true): ComponentRef<any> | null {
		console.log(`createComponent`, instance);
		console.log(`containerRef`, this.containerRef);
		if (!this.containerRef) return null;

		const compRef = this.containerRef.createComponent(instance.component, {
			injector: this.envInjector,
		});
		compRef.instance.config = instance.config;
		compRef.instance.isEdit = isEdit;
		this.componentRefs.set(instance.config.id, compRef);
		console.log(`compRef`, compRef);
		return compRef;
	}

	destroyComponent(id: string): void {
		const compRef = this.componentRefs.get(id);
		if (compRef) {
			compRef.destroy();
			this.componentRefs.delete(id);
			console.log('[Injector] Destroyed component:', id);
		}
	}
}
