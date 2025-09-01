import { ThyLayoutModule } from 'ngx-tethys/layout';
import { setPrintErrorWhenIconNotFound } from 'ngx-tethys/icon';
import { ThyNavModule } from 'ngx-tethys/nav';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThySwitchModule } from 'ngx-tethys/switch';
import { ThyNotifyModule } from 'ngx-tethys/notify';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DocgeniTemplateModule } from '@docgeni/template';
import { AppRoutingModule } from './app-routing.module';
import { NgxPuzzleModule } from 'ngx-puzzle';
import { AppComponent } from './app.component';
import { DOCGENI_SITE_PROVIDERS } from './content/index';
import { AppExampleComponentsComponent } from './components/components.component';

@NgModule({
    declarations: [AppComponent, AppExampleComponentsComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        DocgeniTemplateModule,
        NgxPuzzleModule,
        AppRoutingModule,
        RouterModule.forRoot([]),
        ThyButtonModule,
        ThyNavModule,
        ThyLayoutModule,
        ThyCheckboxModule,
        ThyNotifyModule,
        ThySwitchModule,
        ThyDatePickerModule
    ],
    providers: [
        ...DOCGENI_SITE_PROVIDERS
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        setPrintErrorWhenIconNotFound(false);
    }
}
