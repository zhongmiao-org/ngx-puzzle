import { Pipe, PipeTransform } from '@angular/core';
import { SafeAny } from '../core';

@Pipe({
  name: 'stylesFormat',
  standalone: true,
  pure: false
})
export class StylesFormatPipe implements PipeTransform {
  private cache = new Map<string, { [key: string]: any }>();

  transform(styles?: Record<string, SafeAny>): { [key: string]: any } {
    if (!styles) return {};

    const cacheKey = JSON.stringify(styles);

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    let newStyles: { [key: string]: SafeAny } = {};

    for (const styleName in styles) {
      switch (styleName) {
        case 'backgroundImage':
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

    if (this.cache.size > 50) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(cacheKey, newStyles);

    console.log(`StylesFormatPipe 转换结果:`, newStyles);
    return newStyles;
  }
}
