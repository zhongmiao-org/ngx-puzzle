
[English](CHANGELOG.md) | 中文文档

## [Unreleased]

- test(puzzle): 将库测试目标从 Karma/Jasmine 迁移到 Angular 21 的 Vitest unit-test builder。
- chore(ci): 将 GitHub workflow 与 CI 脚本变更纳入 changelog 门禁的代码影响范围。

## 21.0.0 (2026-04-14)

### ✨ 新增

* 表格运行时重构为适配器导向模型，便于按功能模块扩展表格能力与数据绑定流程。([fa46b91](https://github.com/zhongmiao-org/ngx-puzzle/commit/fa46b91))
* 文本类别新增数字能力，支持看板中的数值展示与编辑场景。([fe8d445](https://github.com/zhongmiao-org/ngx-puzzle/commit/fe8d445), [01dc8a9](https://github.com/zhongmiao-org/ngx-puzzle/commit/01dc8a9))
* 文档新增在线演示入口，降低试用与接入成本。([0ed2d70](https://github.com/zhongmiao-org/ngx-puzzle/commit/0ed2d70))
* 新增仅 `main` 分支发布链路：PR 质量门禁、基于 `main` 版本的 release draft 同步、release 事件触发 npm 发布、发布后 changelog 自动归档并回写 PR。([bca01d6](https://github.com/zhongmiao-org/ngx-puzzle/commit/bca01d6))

### 🔄 变更

* 完成 Angular 21 对齐：providers 接入方式、demo 启动流程与文档说明保持一致。([9e40e48](https://github.com/zhongmiao-org/ngx-puzzle/commit/9e40e48))
* 构建基础升级到 Angular 21 与新版本 lodash，依赖基线与当前版本线保持一致。([f35da10](https://github.com/zhongmiao-org/ngx-puzzle/commit/f35da10))
* 发布规范与根目录文档已补齐双语，并明确 main-only、预发布/正式版版本规则。
* changelog 规则升级：代码相关 PR 必须同时更新中英文 `Unreleased`。

### 🐛 修复

* 修复图表编辑器 `addArrayItem` 行为问题。([8cbaa8a](https://github.com/zhongmiao-org/ngx-puzzle/commit/8cbaa8a))
* 修复 control 组件样式与属性问题。([2985509](https://github.com/zhongmiao-org/ngx-puzzle/commit/2985509))
* 修复 form-renderer 样式问题。([c66d6dc](https://github.com/zhongmiao-org/ngx-puzzle/commit/c66d6dc))
* 修复 `build:docs` 的 CI warning。([f94ed53](https://github.com/zhongmiao-org/ngx-puzzle/commit/f94ed53))
