import { NgModule } from '@angular/core';
import { ThyIconRegistry } from 'ngx-tethys/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ChartTypesEnum, ControlTypesEnum, TableTypesEnum, TabTypesEnum, TextTypesEnum,SafeAny } from './core';
import { NgxPuzzleEditorComponent, NgxPuzzlePreviewComponent } from './features';

@NgModule({
  imports: [NgxPuzzleEditorComponent, NgxPuzzlePreviewComponent],
  exports: [NgxPuzzleEditorComponent, NgxPuzzlePreviewComponent]
})
export class NgxPuzzleModule {
  constructor(
    private iconRegistry: ThyIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.registerIcons();
  }

  private registerIcons() {
    const iconSvgUrl = `assets/icons/defs/svg/sprite.defs.svg`;
    this.iconRegistry.addSvgIconSet(this.sanitizer.bypassSecurityTrustResourceUrl(iconSvgUrl));

    this.registerIconsForType('chart', ChartTypesEnum, 'charts');
    this.registerIconsForType('table', TableTypesEnum, 'tables');
    this.registerIconsForType('text', TextTypesEnum, 'text');
    this.registerIconsForType('editor', TabTypesEnum, 'editor');
    this.registerIconsForType('control', ControlTypesEnum, 'controls');
  }
  private registerIconsForType(namespace: string, enumType: SafeAny, iconPath: string) {
    for (const key in enumType) {
      if (enumType.hasOwnProperty(key)) {
        const enumValue = enumType[key];
        this.iconRegistry.addSvgIconInNamespace(
          namespace,
          `${enumValue}`,
          this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${iconPath}/${enumValue}.svg`)
        );
      }
    }
  }
}
