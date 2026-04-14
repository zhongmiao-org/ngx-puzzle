# 发布指南（仅 main 分支）

[English](RELEASING.md) | 中文文档

本仓库采用 **Main-Only** 发布模型。预发布与正式版都从 `main` 触发。

## 版本规则

- 唯一版本来源：`main` 上的 `package.json.version`
- 正式版：`x.y.z`（示例：`1.2.2`）
- 预发布：`x.y.z-beta.N` 或 `x.y.z-rc.N`（示例：`1.2.2-rc.1`）
- 错误格式：`1.2.2.rc`

## 必需 Secret

- `NPM_TOKEN`：用于发布 `@zhongmiao/ngx-puzzle` 的 npm Token

## CI 与 Changelog 约束

PR 阶段：

- CI 会执行 lint、test、build。
- 若改动代码相关文件（`projects/**`、`scripts/**`、根目录 `package*.json`、`angular.json`、`tsconfig*.json`），必须同步更新 `CHANGELOG.md` 与 `CHANGELOG.zh-CN.md` 的 `## [Unreleased]`。
- 仅 docs/ci 变更可跳过 changelog 更新。

## 正式版发布流程

1. 从功能分支发起 PR。
2. 将 `package.json.version` 更新为正式版（例如 `1.2.2`）。
3. 在 `CHANGELOG.md` 与 `CHANGELOG.zh-CN.md` 的 `## [Unreleased]` 下补充发布说明。
4. 合并到 `main`。
5. `Release Draft` 工作流自动创建或更新 `v1.2.2` 草稿。
6. 在 GitHub 检查草稿内容并点击 **Publish release**。
7. `Release Publish` 工作流自动以 `--tag latest` 发布到 npm。
8. 工作流自动把两份 changelog 的 `Unreleased` 归档到 `## 1.2.2 (YYYY-MM-DD)` 并发起回写 `main` 的 PR。

## 预发布流程

1. 从功能分支发起 PR。
2. 将 `package.json.version` 更新为预发布版本（例如 `1.2.2-rc.1`）。
3. 在 `CHANGELOG.md` 与 `CHANGELOG.zh-CN.md` 的 `## [Unreleased]` 下补充发布说明。
4. 合并到 `main`。
5. `Release Draft` 自动创建或更新 `v1.2.2-rc.1`，并标记为 prerelease。
6. 点击 **Publish release**。
7. `Release Publish` 工作流自动以 `--tag next` 发布到 npm。
8. 工作流自动归档 `Unreleased` 并发起回写 PR。

## 说明

- 不允许从 `release/*` 分支发版。
- 若 release tag 与 `package.json.version` 不一致，发布流程会主动失败。
