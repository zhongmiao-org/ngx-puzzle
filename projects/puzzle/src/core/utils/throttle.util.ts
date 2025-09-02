import { SafeAny } from '../../core';

/**
 * 节流工具类
 */
export class ThrottleUtil {
  static lastCallMap = new Map<string, number>();
  static timeoutMap = new Map<string, SafeAny>();

  /**
   * 创建节流函数
   * @param func 需要节流的函数
   * @param delay 延迟时间（毫秒）
   * @param key 可选的唯一标识符
   * @returns 节流后的函数
   */
  static create<T extends (...args: SafeAny[]) => SafeAny>(func: T, delay: number, key?: string): (...args: Parameters<T>) => void {
    const throttleKey = key || func.toString();

    return function (this: SafeAny, ...args: Parameters<T>) {
      const context = this;
      const now = Date.now();
      const lastCall = ThrottleUtil.lastCallMap.get(throttleKey) || 0;

      if (now - lastCall >= delay) {
        // 立即执行
        ThrottleUtil.lastCallMap.set(throttleKey, now);
        func.apply(context, args);
      } else {
        // 清除之前的延迟执行
        if (ThrottleUtil.timeoutMap.has(throttleKey)) {
          clearTimeout(ThrottleUtil.timeoutMap.get(throttleKey));
        }

        // 设置延迟执行
        const timeoutId = setTimeout(
          () => {
            ThrottleUtil.lastCallMap.set(throttleKey, Date.now());
            func.apply(context, args);
            ThrottleUtil.timeoutMap.delete(throttleKey);
          },
          delay - (now - lastCall)
        );

        ThrottleUtil.timeoutMap.set(throttleKey, timeoutId);
      }
    };
  }

  /**
   * 清除所有节流定时器
   */
  static clearAll(): void {
    ThrottleUtil.timeoutMap.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    ThrottleUtil.timeoutMap.clear();
    ThrottleUtil.lastCallMap.clear();
  }

  /**
   * 取消特定的节流函数
   * @param key 节流函数的唯一标识符
   */
  static cancel(key: string): void {
    if (ThrottleUtil.timeoutMap.has(key)) {
      clearTimeout(ThrottleUtil.timeoutMap.get(key));
      ThrottleUtil.timeoutMap.delete(key);
    }
    ThrottleUtil.lastCallMap.delete(key);
  }

  /**
   * 获取当前活跃的节流实例数量
   * @returns 活跃的节流实例数量
   */
  static getActiveCount(): number {
    return ThrottleUtil.timeoutMap.size;
  }
}

/**
 * 节流装饰器
 * @param delay 延迟时间（毫秒）
 * @param key 可选的唯一标识符
 * @returns 装饰器函数
 */
export function Throttle(delay: number, key?: string) {
  return function (target: SafeAny, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const throttleKey = key || `${target.constructor.name}.${propertyKey}`;

    descriptor.value = function (this: SafeAny, ...args: SafeAny[]) {
      const context = this;
      const now = Date.now();
      const lastCall = ThrottleUtil.lastCallMap.get(throttleKey) || 0;

      if (now - lastCall >= delay) {
        // 立即执行
        ThrottleUtil.lastCallMap.set(throttleKey, now);
        originalMethod.apply(context, args);
      } else {
        // 清除之前的延迟执行
        if (ThrottleUtil.timeoutMap.has(throttleKey)) {
          clearTimeout(ThrottleUtil.timeoutMap.get(throttleKey));
        }

        // 设置延迟执行
        const timeoutId = setTimeout(
          () => {
            ThrottleUtil.lastCallMap.set(throttleKey, Date.now());
            originalMethod.apply(context, args);
            ThrottleUtil.timeoutMap.delete(throttleKey);
          },
          delay - (now - lastCall)
        );

        ThrottleUtil.timeoutMap.set(throttleKey, timeoutId);
      }
    };

    return descriptor;
  };
}

// 导出便捷函数
export const throttle = ThrottleUtil.create;
