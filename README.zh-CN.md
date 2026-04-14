# ngx-puzzle

中文 | [English](README.md)

[![ngx-puzzle](https://img.shields.io/npm/v/@zhongmiao/ngx-puzzle?style=flat&label=ngx-puzzle&color=blue)](https://www.npmjs.com/package/@zhongmiao/ngx-puzzle)
[![npm](https://img.shields.io/npm/dm/%40zhongmiao/ngx-puzzle)](https://www.npmjs.com/package/@zhongmiao/ngx-puzzle)
![](https://img.shields.io/badge/Angular-%E7%94%A8%E4%BA%8E%E6%89%93%E9%80%A0-red?logo=angular)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

👉 示例仓库（Demo）：https://github.com/zhongmiao-org/ngx-puzzle-example

🚀 **在线体验**: https://www.zhongmiaoorg.cn/

![拖拽](./docs/images/doc1.gif)

用于 Angular 的拖拽式看板构建器。像拼图一样在画布上自由组合图表、表格、文本和控件，快速搭建响应式数据大屏。采用 Angular 独立组件（standalone）与 signals 架构。

适合快速原型、企业内部 BI 看板、数据可视化门户。

## 特性

- 拖拽编辑器，吸附布局
- 内置组件：图表、普通表格、高级表格、文本、控件
- 以架构为先：standalone、signals、OnPush
- 外置数据绑定协议：可接真实 API 或使用内置 Mock
- 通过外部服务提供预览/保存等能力

## 安装

优先推荐使用 ng add。也可手动安装。

### 方式一：ng add（推荐）

```bash
ng new my-angular21-app --routing=true --style=scss
# 或
# npx @angular/cli@21 new my-angular21-app
cd my-angular21-app
ng add @zhongmiao/ngx-puzzle
```
#### 输出结果:
```bash
✔ Determining Package Manager
  › Using package manager: npm
✔ Loading package information from registry
✔ Confirming installation
✔ Installing package
    Added @angular/cdk@^21.2.6 to dependencies
    Added ag-grid-community@^35 和 ag-grid-angular@^35 到依赖
    Added echarts@^6.0.0 to dependencies
    Added lodash@4.17.21 to dependencies
    Added ngx-tethys@^21.0.0 to dependencies
    Added asset mapping: ./node_modules/@zhongmiao/ngx-puzzle/assets -> /assets
    Prepended style import to src/styles.scss: @use "@zhongmiao/ngx-puzzle/styles/index.scss";
    Prepended style import to src/styles.scss: @use 'ngx-tethys/styles/index.scss';
    Added import for provideHttpClient in src/app/app.config.ts
    Added import for providePuzzleLib in src/app/app.config.ts
    Updated assets configuration to include library assets.
    ✅ Configuration updated successfully!
    📦 New dependencies have been added to package.json
    🚀 Please run the following command to install dependencies:
       npm install
UPDATE package.json (1246 bytes)
UPDATE src/styles.scss (171 bytes)
UPDATE src/app/app.config.ts (493 bytes)
UPDATE angular.json (3049 bytes)
```

- 若 CLI 版本较低或自动追加失败，请参考下述“手动配置静态资源”。

### 方式二：包管理器安装

```bash
npm install @zhongmiao/ngx-puzzle
# 依赖环境：Angular 21+、Angular cdk 21+、ngx-tethys 21.x、echarts 6.x
```

#### 全局样式与静态资源

在应用的 src/styles.scss 中加入以下全局样式：

```scss
@use "@zhongmiao/ngx-puzzle/styles/index.scss";
@use "ngx-tethys/styles/index.scss";
```

全程为独立组件, ngx-puzzle 提供了预制 provider, 在应用的 `src/app/app.config.ts` 中追加 `provideHttpClient()` 与 `providePuzzleLib()`

```ts
import { providePuzzleLib } from '@zhongmiao/ngx-puzzle';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), providePuzzleLib()]
};

```

在 angular.json 中配置静态资源，确保图标与库资源可被访问：

```json
{
  "assets": [
    {
      "glob": "**/*",
      "input": "./node_modules/@zhongmiao/ngx-puzzle/assets",
      "output": "/assets"
    }
  ]
}
```
如果你在自己的应用中使用 @zhongmiao/ngx-puzzle，并且需要这些资源（图标或库资源），可在应用的 angular.json 中为对应项目添加类似的 assets 配置。

#### ng add 将添加的依赖版本
使用 `ng add @zhongmiao/ngx-puzzle` 时，原理图会向 package.json 添加（或确保存在）以下依赖及版本：

```json
{
  "@angular/cdk": "^21.2.6",
  "ag-grid-community": "^35.0.0",
  "ag-grid-angular": "^35.0.0",
  "echarts": "^6.0.0",
  "lodash": "4.17.21",
  "ngx-tethys": "^21.0.0"
}
```

## 兼容性

- Angular：21+
- Angular cdk 21+ (被拖拽使用)
- ngx-tethys：21.x（布局使用）
- ECharts：6.x（被图表组件使用）
- ag-grid-community / ag-grid-angular（高级表格组件使用）

具体版本参见 package.json。

## 快速开始（standalone）

在独立组件中直接使用编辑器组件。若要接入业务数据能力，推荐通过 `providePuzzleLib({ dataAdapter })` 注入自定义 `PuzzleDataAdapter`，而不是把 SQL 或业务模型逻辑写进组件库内部。

```ts
import { Component } from '@angular/core';
import { ThyContent, ThyLayout } from 'ngx-tethys/layout';
import { NgxPuzzleEditorComponent } from 'ngx-puzzle';

@Component({
  selector: 'example-puzzle',
  standalone: true,
  template: `
    <thy-layout>
      <thy-content>
        <ngx-puzzle-editor></ngx-puzzle-editor>
      </thy-content>
    </thy-layout>
  `,
  imports: [ThyLayout, ThyContent, NgxPuzzleEditorComponent]
})
export class AppPuzzleComponent {}
```

如需接入宿主侧的数据配置弹窗、SQL 执行或模型查询，可以在应用边界注册自定义 adapter：

```ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { providePuzzleLib } from '@zhongmiao/ngx-puzzle';
import { ExamplePuzzleDataAdapter } from './example-puzzle-data-adapter.service';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), providePuzzleLib({ dataAdapter: ExamplePuzzleDataAdapter })]
};
```

这套结构下：

- 组件库只负责画布、编辑器、联动和运行时骨架
- 普通表格使用 `ngx-tethys`
- 高级表格使用 `ag-grid-community`
- SQL、查询模型和数据编排由宿主 adapter 自行实现

## 架构与数据绑定

- 仅使用独立组件（standalone）；局部状态用 signals，派生状态用 computed。
- OnPush 变更检测。
- 外部数据绑定改为 adapter 驱动：
  - `PuzzleDataAdapter.openBinding(...)`：宿主打开自定义绑定面板，或执行默认绑定流程
  - `PuzzleDataAdapter.onControlChange(...)`：宿主解释控件筛选上下文并更新请求配置
  - `PuzzleDataAdapter.executeSource(...)`：宿主执行真实数据请求，包括自定义 SQL / 模型扩展
- NgxPuzzleExternalService：用于获取/保存编辑器配置、生成预览 ID。

## 使用建议

- 优先使用 signals（set/update），避免 mutate。
- 模板保持简洁，使用内置控制流（@if/@for）。
- 不使用 @HostBinding/@HostListener；改用装饰器的 host 配置。
- 静态图片使用 NgOptimizedImage。

## 运行示例

```bash
npm install
npm start
# 打开 http://localhost:4200 查看示例
```

## 贡献

请阅读 CONTRIBUTING.md（中文参见 CONTRIBUTING.zh-CN.md）。

## 致谢

- ngx-tethys（示例中的 UI 组件、对话框与布局）：https://github.com/atinc/ngx-tethys
- Apache ECharts（内置图表组件的渲染引擎）：https://echarts.apache.org/ 及 https://github.com/apache/echarts
- ag-grid-community / ag-grid-angular（高级表格渲染）: https://www.ag-grid.com/

## 许可证

MIT，详见 LICENSE。

## 贡献者

- ark65 (liuwufangzhou@gmail.com, liuwufangzhou@qq.vip.com)
