// 自动生成的背景图片常量文件
import { BaseSelectOption } from '../interfaces';

// 原始图片数据
export const BACKGROUND_IMAGES = {
  'canvas-bg-1': {
    label: `画布背景 1`,
    val: `url(assets/images/backgrounds/bg1.png)`,
    className: ['canvas-bg-1']
  }
};

// 获取画布背景图片
export function getCanvasBackgroundOptions(): BaseSelectOption[] {
  return Object.entries(BACKGROUND_IMAGES)
    .filter(([key]) => key.startsWith('canvas-'))
    .map(([, config]) => config);
}

// 获取标题背景图片
export function getHeaderBackgroundOptions(): BaseSelectOption[] {
  return Object.entries(BACKGROUND_IMAGES)
    .filter(([key]) => key.startsWith('header-'))
    .map(([, config]) => config);
}

// 获取文本背景图片
export function getTextBackgroundOptions(): BaseSelectOption[] {
  return Object.entries(BACKGROUND_IMAGES)
    .filter(([key]) => key.startsWith('text-'))
    .map(([, config]) => config);
}

// 获取数据可视化背景图片（chart 和 table 通用）
export function getDataBackgroundOptions(): BaseSelectOption[] {
  return Object.entries(BACKGROUND_IMAGES)
    .filter(([key]) => key.startsWith('data-'))
    .map(([, config]) => config);
}

// 兼容旧版本的函数
export function getBackgroundImageOptions(): BaseSelectOption[] {
  return getDataBackgroundOptions();
}

// 获取所有背景图片选项
export function getAllBackgroundOptions(): BaseSelectOption[] {
  return Object.values(BACKGROUND_IMAGES);
}
