import { Component, inject } from '@angular/core';
import { ThyContent, ThyLayout } from 'ngx-tethys/layout';
import { NgxPuzzleExternalService, NgxPuzzleEditorComponent } from '@zhongmiao/ngx-puzzle';
import { ThyDialog, ThyDialogModule } from 'ngx-tethys/dialog';
import { ExamplePreviewDialogComponent } from './preview-dialog.component';

@Component({
  selector: 'example-puzzle',
  standalone: true,
  templateUrl: './basic-puzzle.component.html',
  imports: [ThyLayout, ThyContent, NgxPuzzleEditorComponent, ThyDialogModule],
  styleUrl: './basic-puzzle.component.scss'
})
export class BasicPuzzleComponent {
  private puzzleService = inject(NgxPuzzleExternalService);
  private dialog = inject(ThyDialog);

  save() {
    const configs = this.puzzleService.getAllConfigs();
    console.log('保存所有配置:', configs);
  }


  async openPreviewDialog() {
    const previewId = await this.puzzleService.generatePreviewId();

    this.dialog.open(ExamplePreviewDialogComponent, {
      height: '90%',
      width: '90%',
      initialState: {
        previewId: previewId
      }
    });
  }
}
