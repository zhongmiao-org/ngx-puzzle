---
title: 快速开始
subtitle: Quick Start
path: 'getting-started'
order: 2
---

本指南将带你在几分钟内完成 @zhongmiao/ngx-puzzle 的安装与首次运行。

ng-puzzle 是一个基于 Angular 的拖拽式可视化拼图库，提供编辑器容器与预览容器，帮助你快速搭建可视化看板。

# 环境要求

- Angular 17+（支持 Angular 原生信号与独立组件）
- Node.js 18+ / npm 9+（或 pnpm / yarn）

# 安装

推荐使用 ng add。也可手动安装依赖。

## 方式一：使用 ng add（推荐）

```bash
# 创建 Angular 18 项目
npx @angular/cli@18 new my-angular18-app
cd my-angular18-app

# 一键接入（会尝试自动追加 assets 配置）
ng add @zhongmiao/ngx-puzzle
```

- 说明：仅 Angular CLI 18.4.1 及以上版本支持在 ng add 时自动更新 angular.json 的 assets 静态资源配置。
- 如果你的 CLI 版本较低，或自动追加失败，请按下文“手动配置静态资源”进行补充。

## 方式二：包管理器安装

```bash
# 使用 npm
npm i @zhongmiao/ngx-puzzle --save

# 或使用 pnpm
pnpm add @zhongmiao/ngx-puzzle

# 或使用 yarn
yarn add @zhongmiao/ngx-puzzle
```

#### ng add 将添加的依赖版本
执行 `ng add @zhongmiao/ngx-puzzle` 时，原理图会添加/确保以下依赖与版本：

```json
{
  "@angular/cdk": "^18.2.14",
  "@tethys/icons": "1.4.50",
  "@webdatarocks/webdatarocks": "1.4.19",
  "@zhongmiao/ngx-puzzle": "^18.4.13",
  "echarts": "6.0.0",
  "lodash": "4.17.21",
  "ngx-tethys": "^18.2.17"
}
```

### 手动配置静态资源（当 ng add 未自动追加时）
将以下条目添加到你的应用项目在 angular.json 中的 assets 列表（注意是你的应用项目，而非本仓库 example 项目）：

```json
[
  {
    "glob": "**/*",
    "input": "./node_modules/@tethys/icons/assets",
    "output": "/assets/icons"
  },
  {
    "glob": "**/*",
    "input": "./node_modules/ngx-puzzle/assets",
    "output": "/assets"
  }
]
```

- @tethys/icons -> /assets/icons：用于 Tethys 组件库的图标资源。
- projects/puzzle/src/assets -> /assets：用于暴露本库内置的静态资源（如编辑器背景等）。

# 基本使用

ng-puzzle 提供两个主要组件：

- 编辑器容器：ngx-puzzle-editor（编辑模式）
- 预览容器：ngx-puzzle-preview（仅预览/运行）

文档中的示例均基于独立组件（standalone component）。

## 在页面中使用编辑器容器

```ts
import { Component } from '@angular/core';
import { NgxPuzzleEditorComponent } from '@zhongmiao/ngx-puzzle';

@Component({
  selector: 'app-editor-page',
  standalone: true,
  imports: [NgxPuzzleEditorComponent],
  template: ` <ngx-puzzle-editor /> `
})
export class EditorPageComponent {}
```

## 在页面中使用预览容器（普通模式）

传入静态组件配置进行渲染：

```ts
import { Component } from '@angular/core';
import { NgxPuzzlePreviewComponent } from '@zhongmiao/ngx-puzzle';
import type { ComponentConfig } from '@zhongmiao/ngx-puzzle';

const demoConfigs: ComponentConfig[] = [
  { id: 'canvas', type: 'canvas', size: { width: 1200, height: 800 } },
  { id: 'title1', type: 'text', position: { x: 40, y: 40 }, props: { text: 'Hello Puzzle' } }
];

@Component({
  selector: 'app-preview-page',
  standalone: true,
  imports: [NgxPuzzlePreviewComponent],
  template: ` <ngx-puzzle-preview [passedConfig]="configs" [enableZoomBtn]="true" [enableFullscreenBtn]="true" /> `
})
export class PreviewPageComponent {
  configs = demoConfigs;
}
```

## 使用预览容器（编辑联动模式）

当你在编辑器中生成临时配置时，可通过 NgxPuzzleExternalService 生成 previewId，并在预览页面以 edit 模式加载：

```ts
// 编辑器页（生成预览 ID）
import { Component, inject } from '@angular/core';
import { NgxPuzzleEditorComponent, NgxPuzzleExternalService } from '@zhongmiao/ngx-puzzle';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [NgxPuzzleEditorComponent],
  template: `
    <button (click)="share()">生成预览链接</button>
    <ngx-puzzle-editor />
  `
})
export class EditorComponent {
  private external = inject(NgxPuzzleExternalService);

  async share() {
    const id = await this.external.generatePreviewId(10 * 60 * 1000); // 10 分钟有效
    // 将 id 作为路由参数带到预览页
    console.log('previewId:', id);
  }
}
```

```ts
// 预览页（根据 previewId 加载）
import { Component, input } from '@angular/core';
import { NgxPuzzlePreviewComponent } from '@zhongmiao/ngx-puzzle';

@Component({
  selector: 'app-live-preview',
  standalone: true,
  imports: [NgxPuzzlePreviewComponent],
  template: ` <ngx-puzzle-preview [previewMode]="'edit'" [previewId]="previewId" [enableZoom]="true" /> `
})
export class LivePreviewComponent {
  // 从路由或父组件传入
  previewId = '';
}
```

# 常用属性速览（预览组件）

- enableZoom: 是否启用缩放，支持双向绑定（默认 true）
- enableZoomBtn: 是否启用缩放按钮（默认 false）
- enableFullscreenBtn: 是否启用全屏按钮（默认 true）
- previewMode: 'normal' | 'edit'（默认 'normal'）
- previewId: 在 edit 模式下用于加载会话中的临时配置
- passedConfig: 在 normal 模式下传入的组件配置数组

# 提示与最佳实践

- 组件为独立组件（standalone），无需 NgModule，直接在 imports 中引入即可。
- 使用 Angular Signals 管理本地状态；避免使用 mutate，使用 set/update。
- 预览组件的缩放能力仅在 enableZoom 为 true 时生效；窗口尺寸变化会自动适配。

# 下一步

- 阅读「介绍」了解核心能力：/zh-cn/guides/intro
- 查看 API 参数说明（示例站点 example/ 中的参数页面）
- 结合 NgxPuzzleDataBindingService 对接数据源，实现实时数据看板
