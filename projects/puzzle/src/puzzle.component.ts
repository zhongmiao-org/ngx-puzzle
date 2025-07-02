import { AfterViewInit, Component, HostBinding, inject, TemplateRef, ViewChild } from '@angular/core';
import { generateUUID } from 'ngx-puzzle/utils';
import { ComponentRegistryService } from 'ngx-puzzle/core/services/component-registry.service';
import { SessionIndexedDbService } from 'ngx-puzzle/core/services/session-indexed-db.service';
import { ThySlideModule, ThySlideService } from 'ngx-tethys/slide';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyButtonModule } from 'ngx-tethys/button';
import { NgxPuzzlePanelComponent } from 'ngx-puzzle/components/panel/ngx-puzzle-panel.component';

@Component({
    selector: 'ngx-puzzle',
    standalone: true,
    imports: [ThySlideModule, ThyButtonModule, ThyIconModule, NgxPuzzlePanelComponent],
    templateUrl: './puzzle.component.html',
    styleUrl: './puzzle.component.scss'
})
export class NgxPuzzleComponent implements AfterViewInit {
    @HostBinding() className = 'ngx-puzzle-component';

    protected readonly MIN_WIDTH = 100;
    protected readonly MIN_HEIGHT = 100;

    private thySlideNewService = inject(ThySlideService);
    private registry = inject(ComponentRegistryService);
    private sessionService = inject(SessionIndexedDbService);

    public width = this.MIN_WIDTH;
    public height = this.MIN_HEIGHT;

    // -------------------new----------------------
    leftCollapsed = false;
    rightCollapsed = false;

    constructor() {
        this.registerIcons();
    }

    ngAfterViewInit() {}

    private registerIcons() {}

    toggleLeft() {
        this.leftCollapsed = !this.leftCollapsed;
    }

    toggleRight() {
        this.rightCollapsed = !this.rightCollapsed;
    }


    save(): void {
        console.log(`saved ---->`);
    }

    preview(): void {
        console.log(`预览`);
        let allConfigs = this.registry.getAll();
        console.log(allConfigs);
        const uuid = generateUUID();
        this.sessionService.setItem(uuid, allConfigs).then(() => {
            const url = `/am/preview/${uuid}`;
            window.open(url, '_blank');
        });
    }
}
