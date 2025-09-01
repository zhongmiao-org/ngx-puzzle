---
title: 介绍
subtitle: Intro
path: 'intro'
order: 1
---

`ngx-puzzle` 是一个基于 Angular 的拖拽式大屏构建工具，像拼图一样自由组合图表、表格、文字等组件，快速生成可视化数据看板。通过模块化设计与实时预览，让开发者与业务人员协作搭建响应式数据分析界面。

## 为什么选择 ngx-puzzle
- 上手简单：独立组件（standalone），无需 NgModule，按需引入即可。
- 低代码搭建：编辑器容器提供所见即所得的拖拽布局能力。
- 可扩展：组件化架构，支持自定义组件注册与二次开发。
- 现代化 Angular 技术栈：全面采用 Signals、OnPush、typed APIs。

## 核心功能
- 拖拽布局：组件像拼图一样吸附到画布，支持自由布局与层级管理。
- 预览缩放与全屏：在预览容器中支持缩放与全屏查看，适配不同屏幕尺寸。
- 会话预览 ID：编辑端一键生成 previewId，预览端可按 ID 拉取临时配置进行联动预览。
- 数据绑定通道：提供数据绑定服务，支持外部数据源对接与事件流通知。

> 适用于快速原型开发、企业内部数据看板、运营看板和数据可视化门户。

## 组件与服务概览
- ngx-puzzle-editor（编辑器容器）
  - 拖拽式画布与属性面板；当前版本不暴露输入输出，内部使用 Signals 管理状态。
- ngx-puzzle-preview（预览容器）
  - 关键输入：enableZoom、enableZoomBtn、enableFullscreenBtn、previewMode（`'normal' | 'edit'`）、previewId、passedConfig。
  - 常用方法：toggleZoomMode()、isFullscreen()、toggleFullscreen()。
- NgxPuzzleExternalService（外部服务）
  - 初始化与会话预览：getAllConfigs()、initializeComponent()、generatePreviewId()、getConfigsByPreviewId()、resetAllComponents()。
- NgxPuzzleDataBindingService（数据绑定服务）
  - 事件流：bindingRequest$、bindingResponse$、controlChange$、activeRequest$、bindingDelete$；提供 requestBinding()/responseBinding() 等方法。

## 下一步
- 阅读「快速开始」完成安装与首个页面集成。
- 前往示例站点的参数说明页面，了解组件与服务的详细 API。


