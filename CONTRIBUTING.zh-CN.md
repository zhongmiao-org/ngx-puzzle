中文文档 | [English](CONTRIBUTING.md)

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

- 我们维护 `CHANGELOG.md`，由符合 Conventional Commits 规范的提交信息自动生成与归类。
- 每次发布版本（`npm run release`）后，会通过 `postrelease` 脚本自动更新 `CHANGELOG.md`。
- 发布前会通过 `prerelease` 钩子验证库是否能成功构建（执行 `npm run build`），如果构建失败将中止发版。
- 在构建过程中会把 `CHANGELOG.md`、`README.md` 和 `LICENSE` 复制到发布包中，确保 npm 用户能直接查看。
- 本地手动更新：
  - 从最近一个 tag 开始汇总：`npm run changelog`
  - 基于完整历史重新生成：`npm run changelog:all`
- 自动化提交信息为：`docs(changelog): update changelog`（将通过 Commitlint 校验）。

### 10. 交互式发版助手

使用交互式脚本一键发版（创建分支 → 校验构建 → 修改版本 → 更新日志 → 覆盖打包输出 → 发布）：

- 运行：`npm run release:select`
- 选择版本类型（SemVer 权威命名）：
  - major：破坏性变更；通常与 Angular 大版本同步
  - minor：新增功能，向后兼容
  - patch：修复和优化，不引入破坏性变更
- 脚本执行的步骤：
  1. 创建分支 `release: <nextVersion>`
  2. 校验环境并执行发版前构建（`npm run build`）
  3. 将根目录与库的 package.json 版本更新为 `<nextVersion>`
  4. 基于 Conventional Commits 生成/更新 CHANGELOG.md
  5. 覆盖 `dist/puzzle/package.json` 的 version，并将 `CHANGELOG.md` 拷贝到 `dist/puzzle`
  6. 提交变更并推送 release 分支
  7. 从 `dist/puzzle` 发布到 npm

可选参数：

- `--type <major|minor|patch>` 非交互模式
- `--yes` 跳过确认
- `--dry-run` 仅展示行为，不实际执行
