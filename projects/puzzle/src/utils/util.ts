import { scatterChartOptionMap } from 'ngx-puzzle/core/constants';
import { LabelFormatterEnum } from 'ngx-puzzle/core/enums';

export function getTranslate3dValues(element: HTMLElement): { x: number; y: number } {
  const style = element.style;
  const transform = style.transform || style.webkitTransform;

  if (!transform || transform === 'none') {
    return { x: 0, y: 0 };
  }

  // 解析矩阵 matrix(1, 0, 0, 1, x, y) 或 translate3d(x, y, z)
  const matrix = transform.match(/^matrix3d\((.+)\)$/);
  if (matrix) {
    // 3D 矩阵格式：matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1)
    const values = matrix[1].split(', ').map(parseFloat);
    return { x: values[12], y: values[13] };
  } else {
    // 2D 矩阵或 translate3d 格式
    const matches = transform.match(/translate3d\(([^,]+),\s*([^,]+),\s*([^,]+)\)/);
    if (matches) {
      return {
        x: parseFloat(matches[1]),
        y: parseFloat(matches[2])
      };
    }
  }

  return { x: 0, y: 0 };
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function updateCharts(option: any) {
  const newOption = structuredClone(option);
  for (const key in newOption) {
    // 轴设置需要格式化函数
    if (newOption.hasOwnProperty(key) && key === 'axes') {
      (newOption['axes'] as any[]).forEach((axes: any, index: number) => {
        if (axes?.label?.formatter) {
          newOption['axes'][index].label.formatter = scatterChartOptionMap[axes.label.formatter as LabelFormatterEnum];
        }
      });
    }
  }

  return newOption;
}

export function validationEnum<T extends Record<string | number, string | number>>(enumObj: T, value: unknown): boolean {
  const enumValues = Object.values(enumObj);

  return enumValues.includes(value as any);
}
