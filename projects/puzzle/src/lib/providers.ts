import { EnvironmentProviders, importProvidersFrom, inject, makeEnvironmentProviders, provideAppInitializer, Type } from '@angular/core';
import { ThyTooltipModule, THY_TOOLTIP_DEFAULT_CONFIG_TOKEN, thyTooltipDefaultConfig } from 'ngx-tethys/tooltip';
import { ThyIconModule, ThyIconRegistry } from 'ngx-tethys/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ChartTypesEnum, ControlTypesEnum, PuzzleDataAdapter, PUZZLE_DATA_ADAPTER, TableTypesEnum, TextTypesEnum, TabTypesEnum } from '../core';

export interface PuzzleLibConfig {
  tooltip?: Partial<typeof thyTooltipDefaultConfig>;
  dataAdapter?: Type<PuzzleDataAdapter>;
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
    {
      provide: THY_TOOLTIP_DEFAULT_CONFIG_TOKEN,
      useValue: {
        ...thyTooltipDefaultConfig,
        ...config.tooltip
      }
    },
    ...(config.dataAdapter
      ? [
          config.dataAdapter,
          {
            provide: PUZZLE_DATA_ADAPTER,
            useExisting: config.dataAdapter
          }
        ]
      : []),
    provideAppInitializer(() => {
      ModuleRegistry.registerModules([AllCommunityModule]);
      registerIcons(inject(ThyIconRegistry), inject(DomSanitizer));
    })
  ]);
}
