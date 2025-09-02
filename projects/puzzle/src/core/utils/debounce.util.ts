import { OperationHistoryEnum, SafeAny } from '../../core';

/**
 * 防抖工具类
 */
export class DebounceUtil {
  public static timeoutMap = new Map<string, SafeAny>();

  /**
   * 创建防抖函数
   * @param func 需要防抖的函数
   * @param delay 延迟时间（毫秒）
   * @param key 可选的唯一标识符，用于管理多个防抖实例
   * @returns 防抖后的函数
   */
  static create<T extends (...args: SafeAny[]) => SafeAny>(func: T, delay: number, key?: string): (...args: Parameters<T>) => void {
    const timeoutKey = key || func.toString();

    return function (this: SafeAny, ...args: Parameters<T>) {
      const context = this;

      // 清除之前的定时器
      if (DebounceUtil.timeoutMap.has(timeoutKey)) {
        clearTimeout(DebounceUtil.timeoutMap.get(timeoutKey));
      }

      // 设置新的定时器
      const timeoutId = setTimeout(() => {
        func.apply(context, args);
        DebounceUtil.timeoutMap.delete(timeoutKey);
      }, delay);

      DebounceUtil.timeoutMap.set(timeoutKey, timeoutId);
    };
  }

  /**
   * 创建带有返回值的防抖函数（使用 Promise）
   * @param func 需要防抖的函数
   * @param delay 延迟时间（毫秒）
   * @param key 可选的唯一标识符
   * @returns 返回 Promise 的防抖函数
   */
  static createWithPromise<T extends (...args: SafeAny[]) => SafeAny>(
    func: T,
    delay: number,
    key?: string
  ): (...args: Parameters<T>) => Promise<ReturnType<T>> {
    const timeoutKey = key || func.toString();
    let promiseResolve: ((value: ReturnType<T>) => void) | null = null;
    let promiseReject: ((reason?: SafeAny) => void) | null = null;

    return function (this: SafeAny, ...args: Parameters<T>): Promise<ReturnType<T>> {
      const context = this;

      return new Promise<ReturnType<T>>((resolve, reject) => {
        // 如果有之前的 Promise，先 reject
        if (promiseReject) {
          promiseReject(new Error('Debounced'));
        }

        promiseResolve = resolve;
        promiseReject = reject;

        // 清除之前的定时器
        if (DebounceUtil.timeoutMap.has(timeoutKey)) {
          clearTimeout(DebounceUtil.timeoutMap.get(timeoutKey));
        }

        // 设置新的定时器
        const timeoutId = setTimeout(async () => {
          try {
            const result = await func.apply(context, args);
            promiseResolve?.(result);
            DebounceUtil.timeoutMap.delete(timeoutKey);
          } catch (error) {
            promiseReject?.(error);
            DebounceUtil.timeoutMap.delete(timeoutKey);
          }
        }, delay);

        DebounceUtil.timeoutMap.set(timeoutKey, timeoutId);
      });
    };
  }

  /**
   * 立即执行防抖函数（跳过延迟）
   * @param key 防抖函数的唯一标识符
   */
  static flush(key: OperationHistoryEnum): void {
    if (DebounceUtil.timeoutMap.has(key)) {
      const timeoutId = DebounceUtil.timeoutMap.get(key);
      clearTimeout(timeoutId);
      DebounceUtil.timeoutMap.delete(key);
    }
  }

  /**
   * 取消防抖函数的执行
   * @param key 防抖函数的唯一标识符
   */
  static cancel(key: string): void {
    if (DebounceUtil.timeoutMap.has(key)) {
      clearTimeout(DebounceUtil.timeoutMap.get(key));
      DebounceUtil.timeoutMap.delete(key);
    }
  }

  /**
   * 清除所有防抖定时器
   */
  static clearAll(): void {
    DebounceUtil.timeoutMap.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    DebounceUtil.timeoutMap.clear();
  }

  /**
   * 获取当前活跃的防抖实例数量
   * @returns 活跃的防抖实例数量
   */
  static getActiveCount(): number {
    return DebounceUtil.timeoutMap.size;
  }
}

/**
 * 防抖装饰器
 * @param delay 延迟时间（毫秒）
 * @param key 可选的唯一标识符
 * @returns 装饰器函数
 */
export function Debounce(delay: number, key?: string) {
  return function (target: SafeAny, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const debounceKey = key || `${target.constructor.name}.${propertyKey}`;

    descriptor.value = function (this: SafeAny, ...args: SafeAny[]) {
      const context = this;

      // 清除之前的定时器
      if (DebounceUtil.timeoutMap.has(debounceKey)) {
        clearTimeout(DebounceUtil.timeoutMap.get(debounceKey));
      }

      // 设置新的定时器
      const timeoutId = setTimeout(() => {
        originalMethod.apply(context, args);
        DebounceUtil.timeoutMap.delete(debounceKey);
      }, delay);

      DebounceUtil.timeoutMap.set(debounceKey, timeoutId);
    };

    return descriptor;
  };
}

// 导出便捷函数
export const debounce = DebounceUtil.create;
