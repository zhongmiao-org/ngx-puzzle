import { Component, inject } from '@angular/core';
import { ThyContent, ThyLayout } from 'ngx-tethys/layout';
import { NgxPuzzleEditorComponent } from 'ngx-puzzle';
import { PuzzleExternalService } from 'ngx-puzzle/core';

@Component({
  selector: 'example-puzzle',
  standalone: true,
  templateUrl: './puzzle.component.html',
  imports: [ThyLayout, ThyContent, NgxPuzzleEditorComponent],
  styleUrl: './puzzle.component.scss'
})
export class AppPuzzleComponent {
  private puzzleService = inject(PuzzleExternalService);

  save() {
    console.log(this.puzzleService.getAllConfigs());
  }

  preview() {
    console.log(this.puzzleService.generatePreviewId());
  }
}
