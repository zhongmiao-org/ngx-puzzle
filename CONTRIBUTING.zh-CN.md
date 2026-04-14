[English](CONTRIBUTING.md) | 中文文档

## 贡献指南

欢迎并感谢您对 `ng-puzzle` 项目的贡献！以下是贡献指南，帮助您更好地参与到项目中来。

### 1. 提交问题（Issues）

- **搜索现有问题**：在提交新问题之前，请先搜索现有的问题列表，看看是否已经有人报告了相同的问题。
- **描述问题**：如果确实发现了新的问题，请详细描述问题的背景、复现步骤以及期望的行为。如果有相关的错误日志或截图，请一并附上。
- **使用标签**：请根据问题的类型选择合适的标签，例如 `bug`、`feature request` 等。

### 2. 提交代码（Pull Requests）

- **Fork 项目**：首先 Fork 本项目到您的 GitHub 账户。
- **创建分支**：从 `main` 分支创建一个新的分支，命名规则为 `feature/your-feature-name` 或 `fix/your-fix-name`。
- **编写代码**：
  - 请确保您的代码遵循项目的编码规范。
  - 添加必要的单元测试和集成测试。
  - 更新文档以反映您的更改。
- **提交更改**：本项目通过 Husky + Commitlint 强制执行 Conventional Commits 规范。提交信息必须符合 `<type>(optional scope): <short summary>` 格式。例如：

```
feat(editor): 新增图表类型选择器
fix(core): 修复解析选项时的空指针问题
chore: 更新依赖
```

- **推送分支**：将您的分支推送到您的 Fork 仓库。
- **创建 Pull Request**：在 GitHub 上创建一个 Pull Request (PR)，请求合并到主仓库的 `main` 分支。
- **等待审核**：项目维护者会审核您的 PR 并提供反馈。请耐心等待，并根据反馈进行相应的修改。

#### 2.1 提交信息规范（Conventional Commits）

我们使用 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/) 并在 `commit-msg` 钩子中使用 Commitlint 校验提交信息。

允许的 `type` 包括：

- feat：新功能
- fix：修复 Bug
- docs：仅文档变更
- style：代码格式（不影响代码逻辑）
- refactor：重构（既不是修复 Bug，也不是新增功能）
- perf：性能优化
- test：测试相关的新增或修复
- build：构建系统或依赖项的变更
- ci：CI 配置或脚本的变更
- chore：不修改 src 或 test 的其他变更
- revert：回滚某次提交

可选的 scope 用于标明影响范围，例如 `editor`、`core`、`chart` 等。

对于复杂变更，建议补充正文（Body）与页脚（Footer）。破坏性变更请在页脚中使用 `BREAKING CHANGE:` 说明。

使用说明：

- Husky 会在 `postinstall` 时自动安装。如果钩子缺失，可手动运行：`npx husky install`。
- Commitlint 配置文件：`commitlint.config.cjs`，继承自 `@commitlint/config-conventional`。

### 3. 代码风格

- **格式化**：请使用 Prettier 进行代码格式化。配置文件位于 `.prettierrc`。
- **Linting**：请运行 ESLint 检查代码质量。配置文件位于 `.eslintrc.js`。

### 4. 测试

- **单元测试**：请确保您的更改有相应的单元测试覆盖。测试文件位于 `projects/puzzle/src/test` 目录下。
- **集成测试**：对于较大的功能或改动，请编写集成测试以确保整体功能的正确性。

### 5. 文档

- **更新文档**：如果您添加了新功能或修复了重要问题，请更新相关文档。文档位于 `docs` 目录下。
- **示例代码**：如果可能，请提供示例代码，以便其他开发者更容易理解和使用您的更改。

### 6. 加入组织

如果您希望更深入地参与项目，并成为组织的一员，请联系作者 ark65：

- 邮箱：liuwufangzhou@gmail.com, liuwufangzhou@vip.qq.com
- 请在邮件中简要介绍自己以及您希望贡献的内容。

### 7. 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

### 8. 联系我们

如果您有任何问题或建议，请随时联系我们！

希望这份贡献指南能帮助您更好地参与 `ng-puzzle` 项目！

### 9. 更新日志（Changelog）

- `CHANGELOG.md` 与 `CHANGELOG.zh-CN.md` 顶部都必须保留 `## [Unreleased]`。
- 当 PR 修改代码相关文件时，CI 会强制要求两份 changelog 的 `Unreleased` 同步更新。
- 仅文档/CI 变更时，可不更新 changelog。
- 合并到 `main` 后，Release Draft 会从当前 `Unreleased` 自动生成。

### 10. 仅 main 分支发版策略

- 预发布与正式版都只从 `main` 发版。
- 版本唯一来源是 `main` 上的 `package.json.version`。
- 禁止从 `release/*` 分支发版。
- 版本号必须符合 SemVer：
  - 正式版：`1.2.2`
  - 预发布：`1.2.2-beta.1` 或 `1.2.2-rc.1`
  - 错误示例：`1.2.2.rc`

### 11. 发版工作流

GitHub Actions 自动完成发版流程：

1. 提交 PR，同时更新 `package.json.version` 和 `CHANGELOG.md` 的 `Unreleased`。
2. 合并到 `main`。
3. `Release Draft` 工作流自动创建/更新 `v<version>` 草稿。
4. 在 GitHub 点击 **Publish release**。
5. `Release Publish` 自动发布到 npm：
   - `-beta.x` / `-rc.x` 发布到 `next`
   - 正式版 `x.y.z` 发布到 `latest`
6. 发布后自动将 `Unreleased` 归档到对应版本，并创建 PR 回写 `main`。

完整操作细则见 [RELEASING.zh-CN.md](RELEASING.zh-CN.md)。
