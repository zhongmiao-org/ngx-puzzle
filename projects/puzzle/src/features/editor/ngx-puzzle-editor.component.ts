import {  Component, HostBinding, signal } from '@angular/core';
import { ThySlideModule } from 'ngx-tethys/slide';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyButtonModule } from 'ngx-tethys/button';
import { NgxPuzzlePanelComponent } from '../../components/panel/ngx-puzzle-panel.component';
import { NgxPuzzlePropsEditorComponent } from '../../components/editor/ngx-puzzle-props-editor.component';
import { NgxPuzzleCanvasComponent } from '../../components/canvas/ngx-puzzle-canvas.component';

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
  templateUrl: './ngx-puzzle-editor.component.html',
  styleUrl: './ngx-puzzle-editor.component.scss'
})
export class NgxPuzzleEditorComponent  {
  @HostBinding() className = 'ngx-puzzle-component';

  protected readonly MIN_WIDTH = 100;
  protected readonly MIN_HEIGHT = 100;

  public width = this.MIN_WIDTH;
  public height = this.MIN_HEIGHT;

  // -------------------new----------------------
  leftCollapsed = signal<boolean>(false);
  rightCollapsed = signal<boolean>(false);

  constructor() {}


}
