/**
 * 生产环境下禁用 console 输出的工具
 * 在主模块中导入此文件以在生产环境禁用 console
 */

// 声明全局变量
declare const ngDevMode: boolean | undefined;

export function disableConsoleInProduction(): void {
  // 检查是否为生产环境
  // Angular 18+ 中，ngDevMode 在生产环境下为 false 或 undefined
  const isProduction = !ngDevMode;

  if (isProduction) {
    // 生产环境下禁用所有 console 方法
    const noop = () => {};

    console.log = noop;
    console.warn = noop;
    console.error = noop;
    console.info = noop;
    console.debug = noop;
    console.trace = noop;
    console.table = noop;
    console.group = noop;
    console.groupCollapsed = noop;
    console.groupEnd = noop;
    console.time = noop;
    console.timeEnd = noop;
    console.count = noop;
    console.assert = noop;
    console.clear = noop;
    console.dir = noop;
    console.dirxml = noop;

    // 只覆盖存在的方法
    if ('profile' in console) {
      (console as any).profile = noop;
    }
    if ('profileEnd' in console) {
      (console as any).profileEnd = noop;
    }
    if ('timeStamp' in console) {
      (console as any).timeStamp = noop;
    }
  }
}

// 自动执行禁用函数
disableConsoleInProduction();