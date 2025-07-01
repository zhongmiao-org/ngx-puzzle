import { inject, NgModule } from '@angular/core';
import { NgxPuzzleComponent } from './puzzle.component';
import { ThyIconRegistry } from 'ngx-tethys/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
    imports: [NgxPuzzleComponent],
    exports: [NgxPuzzleComponent]
})
export class NgxPuzzleModule {
    constructor() {
        this.registerIcons();
    }

    private registerIcons() {
        const iconRegistry = inject(ThyIconRegistry);
        const sanitizer = inject(DomSanitizer);
        const iconSvgUrl = `assets/icons/defs/svg/sprite.defs.svg`;

        iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl(iconSvgUrl));
    }
}
