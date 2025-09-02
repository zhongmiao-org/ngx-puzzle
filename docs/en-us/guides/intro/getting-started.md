---
title: Quick Start
subtitle: Quick Start
path: 'getting-started'
order: 2
---

This guide walks you through installing and running @zhongmiao/ngx-puzzle in minutes.

ng-puzzle is an Angular-based drag-and-drop visualization library. It provides an editor container and a preview container to help you quickly build dashboards.

# Requirements

- Angular 17+ (with native Signals and standalone components)
- Node.js 18+ / npm 9+ (or pnpm / yarn)

# Installation

```bash
# with npm
npm i @zhongmiao/ngx-puzzle --save

# or pnpm
pnpm add @zhongmiao/ngx-puzzle

# or yarn
yarn add @zhongmiao/ngx-puzzle
```

# Basic usage

ng-puzzle ships two primary components:

- Editor container: ngx-puzzle-editor (edit mode)
- Preview container: ngx-puzzle-preview (preview/runtime)

Examples below use standalone components.

## Use the editor container on a page

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

## Use the preview container (normal mode)

Pass static component configs to render:

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

## Use the preview container (edit-linked mode)

When generating temporary configs in the editor, use NgxPuzzleExternalService to create a previewId and load it on the preview page in edit mode:

```ts
// Editor page (generate preview ID)
import { Component, inject } from '@angular/core';
import { NgxPuzzleEditorComponent, NgxPuzzleExternalService } from '@zhongmiao/ngx-puzzle';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [NgxPuzzleEditorComponent],
  template: `
    <button (click)="share()">Generate Preview Link</button>
    <ngx-puzzle-editor />
  `
})
export class EditorComponent {
  private external = inject(NgxPuzzleExternalService);

  async share() {
    const id = await this.external.generatePreviewId(10 * 60 * 1000); // valid for 10 minutes
    // pass id as a route parameter to the preview page
    console.log('previewId:', id);
  }
}
```

```ts
// Preview page (load by previewId)
import { Component } from '@angular/core';
import { NgxPuzzlePreviewComponent } from '@zhongmiao/ngx-puzzle';

@Component({
  selector: 'app-live-preview',
  standalone: true,
  imports: [NgxPuzzlePreviewComponent],
  template: ` <ngx-puzzle-preview [previewMode]="'edit'" [previewId]="previewId" [enableZoom]="true" /> `
})
export class LivePreviewComponent {
  // Provided via route or parent component
  previewId = '';
}
```

# Quick reference (Preview component)

- enableZoom: enable zooming, two-way binding supported (default true)
- enableZoomBtn: whether the zoom button is enabled (default false)
- enableFullscreenBtn: whether the fullscreen button is enabled (default true)
- previewMode: 'normal' | 'edit' (default 'normal')
- previewId: used in edit mode to load temporary configs from session
- passedConfig: configs array for normal mode

# Tips & best practices

- Components are standalone; no NgModule needed. Import directly in imports.
- Use Angular Signals for local state; avoid mutate and use set/update.
- Zooming only applies when enableZoom is true; adapts automatically on window resize.

# Next

- Read Introduction to learn core capabilities: /en-us/guides/intro
- Check the API Parameters page in the example site (example/ directory)
- Integrate data sources with NgxPuzzleDataBindingService to build live dashboards
