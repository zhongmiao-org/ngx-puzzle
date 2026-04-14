import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThyIconRegistry } from 'ngx-tethys/icon';
import {
  ChartTypesEnum,
  ControlTypesEnum,
  SafeAny,
  TableTypesEnum,
  TabTypesEnum,
  TextTypesEnum,
  providePuzzleLib
} from '@zhongmiao/ngx-puzzle';
import { DOCGENI_SITE_PROVIDERS } from './content';
import { routes } from './app.routes';
import { ExamplePuzzleDataAdapter } from './components/basic/example-puzzle-data-adapter.service';

function registerIcons(iconRegistry: ThyIconRegistry, sanitizer: DomSanitizer) {
  const iconSvgUrl = 'assets/icons/defs/svg/sprite.defs.svg';
  iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl(iconSvgUrl));

  const registerIconsForType = (namespace: string, enumType: SafeAny, iconPath: string) => {
    for (const key in enumType) {
      if (Object.prototype.hasOwnProperty.call(enumType, key)) {
        const enumValue = enumType[key];
        iconRegistry.addSvgIconInNamespace(
          namespace,
          `${enumValue}`,
          sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${iconPath}/${enumValue}.svg`)
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule, ThyDialogModule),
    providePuzzleLib({
      dataAdapter: ExamplePuzzleDataAdapter
    }),
    ...DOCGENI_SITE_PROVIDERS,
    provideAppInitializer(() => {
      registerIcons(inject(ThyIconRegistry), inject(DomSanitizer));
    })
  ]
};
