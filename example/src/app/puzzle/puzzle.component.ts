import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ThyContent, ThyLayout } from 'ngx-tethys/layout';
import { NgxPuzzleEditorComponent } from 'ngx-puzzle';
import {
  NgxPuzzleControlChangeNotification,
  NgxPuzzleDataBindingRequest,
  NgxPuzzleDataBindingService,
  NgxPuzzleExternalService
} from 'ngx-puzzle/core';
import { Subject, takeUntil } from 'rxjs';
import { ThyDialog } from 'ngx-tethys/dialog';
import { ExampleDataSourceDialogComponent } from './data-source-dialog.component';

@Component({
  selector: 'example-puzzle',
  standalone: true,
  templateUrl: './puzzle.component.html',
  imports: [ThyLayout, ThyContent, NgxPuzzleEditorComponent],
  styleUrl: './puzzle.component.scss'
})
export class AppPuzzleComponent implements OnInit, OnDestroy {
  private puzzleService = inject(NgxPuzzleExternalService);
  private dataBindingService = inject(NgxPuzzleDataBindingService);
  private destroy$ = new Subject<void>();
  private dialog = inject(ThyDialog);

  ngOnInit() {
    // 监听数据绑定请求
    this.dataBindingService.bindingRequest$.pipe(takeUntil(this.destroy$)).subscribe((request) => {
      this.handleDataBindingRequest(request);
    });

    // 监听控件变化通知
    this.dataBindingService.controlChange$.pipe(takeUntil(this.destroy$)).subscribe((notification) => {
      this.handleControlChange(notification);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handleDataBindingRequest(request: NgxPuzzleDataBindingRequest) {
    // 准备回显数据
    const initialData: any = {};

    if (request.apiSource) {
      initialData.type = request.apiSource.method as 'GET' | 'POST';
      initialData.url = request.apiSource.url;

      // 如果是 POST 请求且有参数，将参数序列化为 JSON 字符串
      if (request.apiSource.method === 'POST' && request.apiSource.params) {
        try {
          initialData.body = JSON.stringify(request.apiSource.params, null, 2);
        } catch (e) {
          initialData.body = '';
        }
      }
    }

    console.log('弹出数据源对话框，回显数据:', initialData);

    // 弹出配置数据源的对话框，使用 data 参数传递初始数据
    const ref = this.dialog.open(ExampleDataSourceDialogComponent, {
      initialState: {
        inputType: initialData.type,
        inputUrl: initialData.url,
        inputBody: initialData.body
      }
    });

    // ngx-tethys ThyDialogRef exposes an afterClosed observable instead of a Promise result
    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: any) => {
        if (!result) {
          console.log('用户取消了数据源配置');
          return;
        }

        console.log('用户完成数据源配置:', result);

        const apiSources = this.createApiSourceFromDialog(result);

        // 获取现有的请求配置，按系列索引更新或插入
        const existed = this.dataBindingService.getComponentDataRequest(request.componentId) || { apiSources: [] };
        const streams = existed.apiSources ? [...existed.apiSources] : [];

        if (apiSources) {
          streams[request.seriesIndex] = apiSources;
          console.log('更新数据流配置:', { seriesIndex: request.seriesIndex, apiSources, streams });
        } else {
          console.log('使用默认 Mock 数据，不更新数据流配置');
        }

        this.dataBindingService.responseBinding({
          componentId: request.componentId,
          dataRequest: {
            ...existed,
            apiSources: streams
          }
        });
      });
  }

  private handleControlChange(notification: NgxPuzzleControlChangeNotification) {
    console.log('处理控件变化通知:', notification);

    // 控件变化后，仅更新 API 源，具体请求由组件内部发起
    const newSources = [
      {
        url: '/api/chart-data-1',
        method: 'POST',
        params: this.buildParamsFromFilters(notification.controlFilters)
      },
      {
        url: '/api/chart-data-2',
        method: 'POST',
        params: this.buildParamsFromFilters(notification.controlFilters)
      }
    ];

    this.dataBindingService.responseBinding({
      componentId: notification.componentId,
      dataRequest: {
        apiSources: newSources
      }
    });
  }

  private createApiSourceFromDialog(result: {
    type: 'GET' | 'POST';
    url: string;
    body?: string;
    mock?: number[];
  }): { url: string; method: string; params?: Record<string, any> } | undefined {
    console.log('处理对话框返回结果:', result);

    // 优先使用用户填写的 URL；仅当没有提供 URL 时，才走内置 mock（返回 undefined 让组件使用默认模拟数据）
    if (result?.url && result.url.trim()) {
      const url = result.url.trim();

      if (result.type === 'POST') {
        let payload: any;
        try {
          payload = result.body ? JSON.parse(result.body) : {};
        } catch (e) {
          console.warn('解析 POST body JSON 失败，使用空对象:', e);
          payload = {};
        }

        console.log('创建 POST API 源:', { url, method: 'POST', params: payload });
        return { url, method: 'POST', params: payload };
      }

      console.log('创建 GET API 源:', { url, method: 'GET' });
      return { url, method: 'GET' };
    }

    // 未提供 URL 且存在 mock，返回 undefined 以便组件内部使用 MockService
    if (result?.mock && Array.isArray(result.mock)) {
      console.log('使用 Mock 数据，返回 undefined');
      return undefined;
    }

    console.log('无有效配置，返回 undefined 使用默认 Mock');
    return undefined;
  }

  private buildParamsFromFilters(filters: any): any {
    // 用户自定义的参数构建逻辑
    console.log('从过滤器构建参数:', filters);
    const params = { filters };
    console.log('构建的参数:', params);
    return params;
  }

  save() {
    const configs = this.puzzleService.getAllConfigs();
    console.log('保存所有配置:', configs);
  }

  preview() {
    const previewId = this.puzzleService.generatePreviewId();
    console.log('生成预览ID:', previewId);
  }
}
