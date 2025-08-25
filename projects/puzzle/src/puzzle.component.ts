import { AfterViewInit, Component, HostBinding, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { generateUUID } from 'ngx-puzzle/utils';
import { PuzzleComponentRegistryService } from 'ngx-puzzle/core/services/puzzle-component-registry.service';
import { PuzzleSessionIndexedDbService } from 'ngx-puzzle/core/services/puzzle-session-indexed-db.service';
import { ThySlideModule, ThySlideService } from 'ngx-tethys/slide';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyButtonModule } from 'ngx-tethys/button';
import { NgxPuzzlePanelComponent } from 'ngx-puzzle/components/panel/ngx-puzzle-panel.component';
import { NgxPuzzleEditorComponent } from 'ngx-puzzle/components/editor/ngx-puzzle-editor.component';
import { NgxPuzzleCanvasComponent } from 'ngx-puzzle/components/canvas/ngx-puzzle-canvas.component';

@Component({
  selector: 'ngx-puzzle',
  standalone: true,
  imports: [ThySlideModule, ThyButtonModule, ThyIconModule, NgxPuzzlePanelComponent, NgxPuzzleEditorComponent, NgxPuzzleCanvasComponent],
  templateUrl: './puzzle.component.html',
  styleUrl: './puzzle.component.scss'
})
export class NgxPuzzleComponent implements AfterViewInit {
  @HostBinding() className = 'ngx-puzzle-component';

  protected readonly MIN_WIDTH = 100;
  protected readonly MIN_HEIGHT = 100;

  private thySlideNewService = inject(ThySlideService);
  private registry = inject(PuzzleComponentRegistryService);
  private sessionService = inject(PuzzleSessionIndexedDbService);

  public width = this.MIN_WIDTH;
  public height = this.MIN_HEIGHT;

  // -------------------new----------------------
  leftCollapsed = signal<boolean>(false);
  rightCollapsed = signal<boolean>(false);

  constructor() {
    this.registerIcons();
  }

  ngAfterViewInit() {}

  private registerIcons() {}

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
