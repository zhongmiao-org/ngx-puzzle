import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ThyDialog, ThyDialogBody, ThyDialogFooter, ThyDialogHeader } from 'ngx-tethys/dialog';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { FormsModule } from '@angular/forms';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyButton } from 'ngx-tethys/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'example-data-source-dialog',
  standalone: true,
  imports: [ThyDialogHeader, ThyDialogBody, ThyDialogFooter, ThySelect, ThyOption, FormsModule, ThyInputDirective, ThyButton, NgIf],
  template: `
    <thy-dialog-header thyTitle="配置数据源"></thy-dialog-header>
    <thy-dialog-body>
      <div class="mb-3">
        <label class="form-label">数据源类型</label>
        <thy-select [ngModel]="type()" (ngModelChange)="type.set($event)">
          <thy-option [thyValue]="'GET'" [thyLabelText]="'HTTP GET'" />
          <thy-option [thyValue]="'POST'" [thyLabelText]="'HTTP POST'" />
        </thy-select>
      </div>
      <div class="mb-3">
        <label class="form-label">URL</label>
        <input thyInput [ngModel]="url()" (ngModelChange)="url.set($event)" placeholder="/api/chart-data" />
      </div>
      <div class="mb-3" *ngIf="type() === 'POST'">
        <label class="form-label">Body(JSON)</label>
        <textarea thyInput rows="4" [ngModel]="body()" (ngModelChange)="body.set($event)"></textarea>
      </div>
    </thy-dialog-body>
    <thy-dialog-footer thyAlign="right">
      <button thyButton="link-secondary" (click)="close()">取消</button>
      <button thyButton="primary" (click)="confirm()">确定</button>
    </thy-dialog-footer>
  `
})
export class ExampleDataSourceDialogComponent implements OnInit {
  private dialog = inject(ThyDialog);

  inputType = input<'GET' | 'POST'>('GET');
  inputUrl = input<string>('');
  inputBody = input<string>('');

  type = signal<'GET' | 'POST'>('GET');
  url = signal<string>('');
  body = signal<string>('');

  ngOnInit() {
    console.log(`ExampleDataSourceDialogComponent`, this.inputType(), this.inputUrl(), this.inputBody());

    this.type.set(this.inputType() ?? 'GET');
    this.url.set(this.inputUrl() ?? '');
    this.body.set(this.inputBody() ?? '');
  }

  confirm() {
    this.dialog.close({ type: this.type(), url: this.url(), body: this.body() });
  }

  close() {
    this.dialog.close();
  }
}
