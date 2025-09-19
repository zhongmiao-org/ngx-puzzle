import {  Component, HostBinding, signal } from '@angular/core';
import { ThySlideModule } from 'ngx-tethys/slide';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyButtonModule } from 'ngx-tethys/button';
import { NgxPuzzlePanelComponent,NgxPuzzlePropsEditorComponent,NgxPuzzleCanvasComponent } from '../../components';

@Component({
  selector: 'ngx-puzzle-editor, puzzle-editor',
  imports: [
    ThySlideModule,
    ThyButtonModule,
    ThyIconModule,
    NgxPuzzlePanelComponent,
    NgxPuzzlePropsEditorComponent,
    NgxPuzzleCanvasComponent
  ],
  templateUrl: './ngx-puzzle-editor.component.html',
  styleUrls: ['./ngx-puzzle-editor.component.scss'],
  standalone: true,
})
export class NgxPuzzleEditorComponent {
  @HostBinding() className = 'ngx-puzzle-editor-component';

  protected readonly MIN_WIDTH = 100;
  protected readonly MIN_HEIGHT = 100;

  public width = this.MIN_WIDTH;
  public height = this.MIN_HEIGHT;

  // -------------------new----------------------
  leftCollapsed = signal<boolean>(false);
  rightCollapsed = signal<boolean>(false);

  constructor() {}
}
