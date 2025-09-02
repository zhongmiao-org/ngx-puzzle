---
title: Introduction
subtitle: Intro
path: 'intro'
order: 1
---

ng-puzzle is an Angular-based, drag-and-drop dashboard builder. Like assembling a puzzle, you can freely compose charts, tables, texts, and more to quickly construct data dashboards. With modular design and live preview, engineers and business users can collaborate to build responsive analytics pages.

## Why choose ng-puzzle

- Simple to start: standalone components, no NgModule required, import on demand.
- Low-code building: the editor container offers WYSIWYG drag-and-drop layout.
- Extensible: componentized architecture, supports custom component registration and extension.
- Modern Angular stack: Signals-first, OnPush change detection, typed APIs.

## Core features

- Drag-and-drop layout: components snap onto the canvas, supporting free layout and z-index management.
- Preview zoom & fullscreen: zoom and fullscreen in the preview container, adapting to different screens.
- Session preview ID: from the editor, generate a previewId; the preview page can fetch temporary configs by ID for linked previewing.
- Data binding channel: data binding service to connect external data sources and event streams.

> Ideal for rapid prototyping, internal enterprise dashboards, operations dashboards, and data visualization portals.

## Components and Services overview

- ngx-puzzle-editor (Editor container)
  - Drag canvas and properties panel; currently no public inputs/outputs. Internal state is managed by Signals.
- ngx-puzzle-preview (Preview container)
  - Key inputs: enableZoom, enableZoomBtn, enableFullscreenBtn, previewMode (`'normal' | 'edit'`), previewId, passedConfig.
  - Common methods: toggleZoomMode(), isFullscreen(), toggleFullscreen().
- NgxPuzzleExternalService (External service)
  - Initialization & session preview: getAllConfigs(), initializeComponent(), generatePreviewId(), getConfigsByPreviewId(), resetAllComponents().
- NgxPuzzleDataBindingService (Data binding service)
  - Streams: bindingRequest$, bindingResponse$, controlChange$, activeRequest$, bindingDelete$; methods like requestBinding()/responseBinding().

## Table of contents

- Quick Start: /en-us/guides/intro/getting-started

## Next steps

- Read Quick Start to complete installation and your first integration.
- Visit the example site’s Parameters page to explore detailed APIs.
