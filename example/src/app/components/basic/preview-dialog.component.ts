import { Component, inject, input } from '@angular/core';
import { ThyDialog, ThyDialogBody, ThyDialogFooter, ThyDialogHeader } from 'ngx-tethys/dialog';
import { ThyButton } from 'ngx-tethys/button';
import { NgxPuzzlePreviewComponent } from '@zhongmiao/ngx-puzzle';

@Component({
  selector: 'example-preview-dialog',
  standalone: true,
  imports: [ThyDialogHeader, ThyDialogBody, ThyDialogFooter, ThyButton, NgxPuzzlePreviewComponent],
  template: `
    <thy-dialog-header thyTitle="预览"></thy-dialog-header>
    <thy-dialog-body>
      <div style="width: 100%; height: 600px;">
        <ngx-puzzle-preview
          [previewId]="previewId()"
          [enableZoomBtn]="false"
          [enableFullscreenBtn]="false"
          previewMode="edit"
          [enableZoom]="true"
        >
        </ngx-puzzle-preview>
      </div>
    </thy-dialog-body>
    <thy-dialog-footer thyAlign="right">
      <button thyButton="primary" (click)="close()">关闭</button>
    </thy-dialog-footer>
  `
})
export class ExamplePreviewDialogComponent {
  private dialog = inject(ThyDialog);

  previewId = input<string>('');

  close() {
    this.dialog.close();
  }
}
