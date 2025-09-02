import { Injectable, ViewContainerRef, ComponentRef, EnvironmentInjector } from '@angular/core';
import { ComponentInstance } from 'ngx-puzzle/core';

@Injectable({ providedIn: 'root' })
export class ComponentInjectorService {
  private containerRef: ViewContainerRef | null = null;
  private componentRefs = new Map<string, ComponentRef<any>>();

  constructor(private envInjector: EnvironmentInjector) {}

  setContainerRef(ref: ViewContainerRef) {
    this.containerRef = ref;
  }

  createComponent(instance: ComponentInstance, isEdit = true): ComponentRef<any> | null {
    if (!this.containerRef) return null;

    const compRef = this.containerRef.createComponent(instance.component, {
      injector: this.envInjector
    });
    compRef.instance.config = instance.config;
    compRef.instance.isEdit = isEdit;
    this.componentRefs.set(instance.config.id, compRef);
    return compRef;
  }

  destroyComponent(id: string): void {
    const compRef = this.componentRefs.get(id);
    if (compRef) {
      compRef.destroy();
      this.componentRefs.delete(id);
      console.log('[注入器] 已销毁组件:', id);
    }
  }

  /**
   * 清理所有组件引用和容器
   */
  clearAll(): void {
    console.log('[注入器] 正在清理所有组件');

    // 销毁所有组件引用
    this.componentRefs.forEach((compRef, id) => {
      try {
        compRef.destroy();
        console.log('[注入器] 已销毁组件:', id);
      } catch (error) {
        console.warn('[注入器] 销毁组件时出错:', id, error);
      }
    });

    // 清空组件引用Map
    this.componentRefs.clear();

    // 清空容器内容
    if (this.containerRef) {
      this.containerRef.clear();
    }

    console.log('[注入器] 所有组件已清理完成');
  }

  /**
   * 获取所有组件引用的数量，用于调试
   */
  getComponentCount(): number {
    return this.componentRefs.size;
  }

  /**
   * 检查是否有指定ID的组件
   */
  hasComponent(id: string): boolean {
    return this.componentRefs.has(id);
  }
}
