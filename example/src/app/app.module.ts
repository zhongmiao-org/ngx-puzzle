import { ThyLayoutModule } from 'ngx-tethys/layout';
import { ThyIconRegistry } from 'ngx-tethys/icon';
import { ThyNavModule } from 'ngx-tethys/nav';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThySwitchModule } from 'ngx-tethys/switch';
import { ThyNotifyModule } from 'ngx-tethys/notify';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DocgeniTemplateModule } from '@docgeni/template';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DOCGENI_SITE_PROVIDERS } from './content';
import { AppExampleComponentsComponent } from './components/components.component';
import { ChartTypesEnum, ControlTypesEnum, SafeAny, TableTypesEnum, TabTypesEnum, TextTypesEnum } from '@zhongmiao/ngx-puzzle';

@NgModule({
  declarations: [AppComponent, AppExampleComponentsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    DocgeniTemplateModule,
    AppRoutingModule,
    ThyButtonModule,
    ThyNavModule,
    ThyLayoutModule,
    ThyCheckboxModule,
    ThyNotifyModule,
    ThySwitchModule,
    ThyDatePickerModule
  ],
  providers: [...DOCGENI_SITE_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor() {
  //   setPrintErrorWhenIconNotFound(false);
  // }

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
