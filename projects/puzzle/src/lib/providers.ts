import { APP_INITIALIZER, EnvironmentProviders, importProvidersFrom, makeEnvironmentProviders } from '@angular/core';
import { ThyTooltipModule, THY_TOOLTIP_DEFAULT_CONFIG_TOKEN, thyTooltipDefaultConfig } from 'ngx-tethys/tooltip';
import { ThyIconModule, ThyIconRegistry } from 'ngx-tethys/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { ChartTypesEnum, ControlTypesEnum, TableTypesEnum, TextTypesEnum, TabTypesEnum } from '../core';

export interface PuzzleLibConfig {
  tooltip?: Partial<typeof thyTooltipDefaultConfig>;
  animations?: 'browser' | 'noop';
}

function registerIcons(iconRegistry: ThyIconRegistry, sanitizer: DomSanitizer) {
  const iconSvgUrl = `/assets/icons/defs/svg/sprite.defs.svg`;
  iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl(iconSvgUrl));

  const registerIconsForType = (namespace: string, enumType: any, iconPath: string) => {
    for (const key in enumType) {
      if (Object.prototype.hasOwnProperty.call(enumType, key)) {
        const enumValue = (enumType as any)[key];
        iconRegistry.addSvgIconInNamespace(
          namespace,
          `${enumValue}`,
          sanitizer.bypassSecurityTrustResourceUrl(`/assets/icons/${iconPath}/${enumValue}.svg`)
        );
      }
    }
  };

  registerIconsForType('chart', ChartTypesEnum, 'charts');
  registerIconsForType('table', TableTypesEnum, 'tables');
  registerIconsForType('text', TextTypesEnum, 'text');
  registerIconsForType('editor', TabTypesEnum, 'editor');
  registerIconsForType('control', ControlTypesEnum, 'controls');
}

/**
 * 提供 puzzle 库依赖的 Angular providers
 */
export function providePuzzleLib(config: PuzzleLibConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    importProvidersFrom(ThyTooltipModule, ThyIconModule),
    config.animations === 'noop' ? provideNoopAnimations() : provideAnimations(),
    {
      provide: THY_TOOLTIP_DEFAULT_CONFIG_TOKEN,
      useValue: {
        ...thyTooltipDefaultConfig,
        ...config.tooltip
      }
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (iconRegistry: ThyIconRegistry, sanitizer: DomSanitizer) => () => {
        registerIcons(iconRegistry, sanitizer);
      },
      deps: [ThyIconRegistry, DomSanitizer]
    }
  ]);
}
