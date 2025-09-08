import { Pipe, PipeTransform } from '@angular/core';
import { SafeAny } from 'ngx-puzzle/core';

@Pipe({
  name: 'stylesFormat',
  standalone: true,
  pure: false // 确保管道是纯管道，提高性能
})
export class StylesFormatPipe implements PipeTransform {
  // 缓存转换结果，避免重复计算
  private cache = new Map<string, { [key: string]: any }>();

  transform(styles?: Record<string, SafeAny>): { [key: string]: any } {
    if (!styles) return {};

    // 创建缓存键
    const cacheKey = JSON.stringify(styles);

    // 检查缓存
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    let newStyles: { [key: string]: SafeAny } = {};

    for (const styleName in styles) {
      switch (styleName) {
        case 'backgroundImage':
          // 对于背景图片，直接使用值（假设已经是正确格式）
          newStyles[styleName] = styles[styleName];
          break;
        case 'backgroundPositionX':
        case 'backgroundPositionY':
        case 'backgroundSize':
          newStyles[styleName] = `${styles[styleName]}%`;
          break;
        default:
          const value = typeof styles[styleName] === 'number' ? `${styles[styleName]}px` : styles[styleName];
          newStyles[styleName] = value;
          break;
      }
    }

    // 缓存结果（限制缓存大小）
    if (this.cache.size > 50) {
      // 清理最旧的缓存项
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(cacheKey, newStyles);

    console.log(`StylesFormatPipe 转换结果:`, newStyles);
    return newStyles;
  }
}
