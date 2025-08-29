import { AfterViewInit, Component, HostBinding, inject, output, signal, TemplateRef, ViewChild } from '@angular/core';
import { generateUUID } from 'ngx-puzzle/utils';
import { PuzzleComponentRegistryService } from 'ngx-puzzle/core/services/puzzle-component-registry.service';
import { PuzzleSessionIndexedDbService } from 'ngx-puzzle/core/services/puzzle-session-indexed-db.service';
import { ThySlideModule, ThySlideService } from 'ngx-tethys/slide';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyButtonModule } from 'ngx-tethys/button';
import { NgxPuzzlePanelComponent } from 'ngx-puzzle/components/panel/ngx-puzzle-panel.component';
import { NgxPuzzlePropsEditorComponent } from 'ngx-puzzle/components/editor/ngx-puzzle-props-editor.component';
import { NgxPuzzleCanvasComponent } from 'ngx-puzzle/components/canvas/ngx-puzzle-canvas.component';
import { ComponentConfig } from 'ngx-puzzle/core';

@Component({
  selector: 'ngx-puzzle-editor, puzzle-editor',
  standalone: true,
  imports: [
    ThySlideModule,
    ThyButtonModule,
    ThyIconModule,
    NgxPuzzlePanelComponent,
    NgxPuzzlePropsEditorComponent,
    NgxPuzzleCanvasComponent
  ],
  templateUrl: './puzzle-editor.component.html',
  styleUrl: './puzzle-editor.component.scss'
})
export class NgxPuzzleEditorComponent implements AfterViewInit {
  @HostBinding() className = 'ngx-puzzle-component';

  protected readonly MIN_WIDTH = 100;
  protected readonly MIN_HEIGHT = 100;

  public width = this.MIN_WIDTH;
  public height = this.MIN_HEIGHT;

  // -------------------new----------------------
  leftCollapsed = signal<boolean>(false);
  rightCollapsed = signal<boolean>(false);

  constructor() {}

  ngAfterViewInit() {}
}
