import { AfterViewInit, Component, HostBinding, inject, TemplateRef, ViewChild } from '@angular/core';
import { generateUUID } from 'ngx-puzzle/utils';
import { ComponentRegistryService } from 'ngx-puzzle/core/services/component-registry.service';
import { SessionIndexedDbService } from 'ngx-puzzle/core/services/session-indexed-db.service';
import { ThySlideLayout, ThySlideModule, ThySlideService } from 'ngx-tethys/slide';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'ngx-puzzle',
    standalone: true,
    imports: [ThySlideModule, ThyButton],
    templateUrl: './puzzle.component.html',
    styleUrl: './puzzle.component.scss'
})
export class NgxPuzzleComponent implements AfterViewInit {
    @HostBinding() className = 'ngx-puzzle-component';

    @ViewChild('leftCollapsed', { static: true }) templateRef!: TemplateRef<any>;

    protected readonly MIN_WIDTH = 100;
    protected readonly MIN_HEIGHT = 100;

    private thySlideNewService = inject(ThySlideService);

    public width = this.MIN_WIDTH;
    public height = this.MIN_HEIGHT;

    // -------------------new----------------------
    leftCollapsed = false;
    rightCollapsed = false;

    constructor(
        private registry: ComponentRegistryService,
        private sessionService: SessionIndexedDbService
    ) {}

    ngAfterViewInit() {
        // this.thySlideNewService.open()
        this.thySlideNewService.open(this.templateRef, {
            id: 'side',
            mode: 'side',
            from: 'left',
            hasBackdrop: false,
            drawerContainer: 'ngx-puzzle'
        });
    }

    toggleLeft() {
        this.leftCollapsed = !this.leftCollapsed;
    }

    toggleRight() {
        this.rightCollapsed = !this.rightCollapsed;
    }

    ngOnInit(): void {
        // this.initDataList();
    }

    showSlideWithTemplate() {
        this.thySlideNewService.open(this.templateRef, {
            id: 'side',
            mode: 'side',
            from: 'left',
            hasBackdrop: false,
            drawerContainer: 'ngx-puzzle'
        });
    }

    /** 初始化 mini 图表列表 */
    // private initDataList() {
    //     for (let i = 0; i < 10; i++) {
    //         if (chartsOptionMockData[i]) {
    //             this.miniChartList.push({
    //                 id: i,
    //                 options: chartsOptionMockData[i],
    //             });
    //         }
    //     }
    // }

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
