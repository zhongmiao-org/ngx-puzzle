import { inject, NgModule } from '@angular/core';
import { NgxPuzzleComponent } from './puzzle.component';
import { ThyIconRegistry } from 'ngx-tethys/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ChartTypesEnum, TableTypesEnum, TabTypesEnum, TextTypesEnum } from 'ngx-puzzle/core/enums';

@NgModule({
    imports: [NgxPuzzleComponent],
    exports: [NgxPuzzleComponent]
})
export class NgxPuzzleModule {

    private readonly iconRegistry = inject(ThyIconRegistry);
    private readonly sanitizer = inject(DomSanitizer);
    constructor() {
        this.registerIcons();
    }

    private registerIcons() {
        const iconSvgUrl = `assets/icons/defs/svg/sprite.defs.svg`;
        this.iconRegistry.addSvgIconSet(this.sanitizer.bypassSecurityTrustResourceUrl(iconSvgUrl));

        this.registerIconsForType('chart', ChartTypesEnum, 'charts');
        this.registerIconsForType('table', TableTypesEnum, 'tables');
        this.registerIconsForType('text', TextTypesEnum, 'text');
        this.registerIconsForType('editor', TabTypesEnum, 'editor');

    }
    private registerIconsForType(namespace: string, enumType: any, iconPath: string) {
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
