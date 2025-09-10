# @zhongmiao/ngx-puzzle

A drag-and-drop dashboard builder library for Angular. It provides a canvas, a component panel, and a property editor to compose BI-style dashboards with charts, tables, text and controls. Built with Angular 18 standalone components, signals, and OnPush change detection.

## Features

- Drag-and-drop to place components onto a canvas
- Built-in primitives: Charts (ECharts), Tables, Text, Controls
- Property editor with tabs (Basic, Style, Data, Refresh)
- Rulers and snapping helpers on the canvas
- Component registry and mediator services to manage state
- Standalone Angular components; signal-based state updates

## Installation

```bash
npm install @zhongmiao/ngx-puzzle echarts ngx-tethys lodash 
```

Peer Angular v18+ is required. See package.json for exact peer versions used in this repo.

## Quick Start

Below is a minimal example to render the full puzzle workspace (panel + canvas + editor). All components are standalone, so you can import them directly.

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { NgxPuzzleComponent } from '@zhongmiao/ngx-puzzle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxPuzzleComponent],
  template: `<ngx-puzzle style="display:block; height: 100vh;"></ngx-puzzle>`
})
class AppComponent {}

bootstrapApplication(AppComponent);
```

Alternatively, you can use parts individually:

- Panel: ngx-puzzle/components/panel/ngx-puzzle-panel.component
- Canvas: ngx-puzzle/components/canvas/ngx-puzzle-canvas.component
- Editor: ngx-puzzle/components/editor/ngx-puzzle-editor.component

Example:

```ts
import { Component } from '@angular/core';
import { NgxPuzzlePanelComponent } from '@zhongmiao/ngx-puzzle/components/panel/ngx-puzzle-panel.component';
import { NgxPuzzleCanvasComponent } from '@zhongmiao/ngx-puzzle/components/canvas/ngx-puzzle-canvas.component';
import { NgxPuzzleEditorComponent } from '@zhongmiao/ngx-puzzle/components/editor/ngx-puzzle-editor.component';

@Component({
  selector: 'app-workbench',
  standalone: true,
  imports: [NgxPuzzlePanelComponent, NgxPuzzleCanvasComponent, NgxPuzzleEditorComponent],
  template: `
    <div class="workbench">
      <puzzle-panel />
      <ngx-puzzle-canvas />
      <ngx-puzzle-editor />
    </div>
  `,
  styles: [
    `
      .workbench {
        display: grid;
        grid-template-columns: 280px 1fr 360px;
        height: 100vh;
      }
    `
  ]
})
export class WorkbenchComponent {}
```

## Core Concepts

- Component Panel: drag items (chart/table/text/control) into the canvas. The panel uses lists like CHART_SERIES_TYPE_OPTIONS, TABLE_TYPE_OPTIONS, etc.
- Canvas: hosts dynamic components, tracks position/size, shows rulers, and mediates selection and snapping. See NgxPuzzleCanvasComponent.
- Editor: edits selected component via tabs (Basic, Style, Data, Refresh). See NgxPuzzleEditorComponent.
- Services: PuzzleCanvasMediatorService mediates add/select/update; ComponentRegistryService manages component instances.

## Basic APIs

The following are commonly used types and services exposed by the library (simplified):

- Interfaces (ngx-puzzle/core/interfaces): ComponentConfig, Position, Size, ComponentBaseProps, RefreshConfig, etc.
- Enums (ngx-puzzle/core/enums): ChartTypesEnum, TableTypesEnum, TextTypesEnum, ControlTypesEnum.
- Services (ngx-puzzle/core): ComponentRegistryService, ComponentInjectorService, PuzzleCanvasMediatorService.
- Utilities: generateUUID from ngx-puzzle/utils.

Panel drag-end creates a ComponentConfig with id, type/subType, position and default INIT_SETTINGS_CONFIG. The mediator service addComponent(config) injects it into the canvas.

## Styling

- The library ships SCSS for internal components. You can override styles by adding more specific selectors in your app.
- Layout is CSS-based; ensure the host container provides an explicit height for the canvas area.

## Accessibility

- Keyboard navigation will depend on your application container. Provide focus outlines and skip links as needed.
- Use semantic headings and ARIA where composing custom layouts.

## Internationalization

- The editor and panel labels can be localized by replacing text resources in your app (future enhancement). Current default is Chinese for some UI strings.

## Development

- Repo root provides scripts to build and publish the library. For local development:
  - Run example docs site: `npm run start:docs` (see example/ and docs/)
  - Build library: `npm run build` (equivalent to ng build puzzle + assets copy)
  - Run tests: `npm test`

## Build

Run `ng build puzzle` to build the library. Artifacts will be in `dist/puzzle`.

## Publish

After building, publish from dist folder:

```bash
cd dist/puzzle
npm publish
```

## Links

- Root README: see /README.md and /README.zh-CN.md
- Changelog: /CHANGELOG.md
- Example and docs: /example and /docs

---

# 简介（中文）

@zhongmiao/ngx-puzzle 是一个用于构建拖拽式 BI 看板的 Angular 组件库，内置画布、组件面板与属性编辑器，支持图表（ECharts）、表格、文本与控件。

## 特性

- 拖拽放置组件到画布
- 属性面板分为 基础/样式/数据/刷新 四个标签页
- 画布标尺与辅助线
- 全部为 Standalone 组件，基于 Signals 管理状态

## 安装

```bash
npm i @zhongmiao/ngx-puzzle echarts ngx-tethys lodash 
```

## 快速开始

```ts
import { NgxPuzzleComponent } from '@zhongmiao/ngx-puzzle';
// 模板：<ngx-puzzle style="display:block;height:100vh;"></ngx-puzzle>
```

也可分别使用 Panel / Canvas / Editor 三个组件按需搭建工作台。

## 构建与发布

- 构建：`ng build puzzle`
- 发布：`cd dist/puzzle && npm publish`

如需更多使用示例，请参考仓库根目录的 README 与 example/ 目录。
