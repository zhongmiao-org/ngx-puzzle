English | [中文文档](CONTRIBUTING.zh-CN.md)

## Contribution Guidelines

Welcome and thank you for your interest in contributing to the `ng-puzzle` project! Below are the guidelines to help you get started and make the most of your contributions.

### 1. Submitting Issues

- **Search for Existing Issues**: Before submitting a new issue, please search the existing issues to see if someone has already reported the same problem.
- **Describe the Issue**: If you find a new issue, please provide a detailed description of the background, steps to reproduce, and the expected behavior. Include any relevant error logs or screenshots.
- **Use Labels**: Please use appropriate labels for the type of issue, such as `bug`, `feature request`, etc.

### 2. Submitting Code (Pull Requests)

- **Fork the Project**: First, fork the project to your GitHub account.
- **Create a Branch**: From the `main` branch, create a new branch with a naming convention like `feature/your-feature-name` or `fix/your-fix-name`.
- **Write the Code**:
  - Ensure your code follows the project's coding standards.
  - Add necessary unit tests and integration tests.
  - Update the documentation to reflect your changes.
- **Commit Your Changes**: We enforce Conventional Commits via Husky + Commitlint. Your commit message must follow the format `<type>(optional scope): <short summary>`. Examples:

```
feat(editor): add new chart type selector
fix(core): prevent null pointer when parsing options
chore: update dependencies
```

- **Push the Branch**: Push your branch to your forked repository.
- **Create a Pull Request**: On GitHub, create a Pull Request (PR) to merge your changes into the main repository's `main` branch.
- **Wait for Review**: The project maintainers will review your PR and provide feedback. Please be patient and make the necessary adjustments based on the feedback.

#### 2.1 Commit Message Convention (Conventional Commits)

We use [Conventional Commits](https://www.conventionalcommits.org/) and validate messages with Commitlint on the `commit-msg` hook.

Allowed types include:

- feat: a new feature
- fix: a bug fix
- docs: documentation only changes
- style: formatting, missing semi colons, etc. (no code change)
- refactor: code change that neither fixes a bug nor adds a feature
- perf: performance improvement
- test: adding or fixing tests
- build: changes that affect the build system or external dependencies
- ci: changes to CI configuration files and scripts
- chore: other changes that don't modify src or test files
- revert: revert a previous commit

Optional scope can specify the area, e.g., `editor`, `core`, `chart`.

Body and footer are optional but recommended for complex changes. Use footer for breaking changes using `BREAKING CHANGE:`.

Setup notes:

- Husky is installed automatically via `postinstall`. If hooks are missing, run: `npx husky install`.
- Commitlint config: `commitlint.config.cjs` extends `@commitlint/config-conventional`.

### 3. Code Style

- **Formatting**: Use Prettier for code formatting. The configuration file is located at `.prettierrc`.
- **Linting**: Run ESLint to check code quality. The configuration file is located at `.eslintrc.js`.

### 4. Testing

- **Unit Tests**: Ensure your changes have corresponding unit tests. Test files are located in the `projects/puzzle/src/test` directory.
- **Integration Tests**: For larger features or changes, write integration tests to ensure the overall functionality is correct.

### 5. Documentation

- **Update Documentation**: If you add new features or fix significant issues, please update the relevant documentation. Documentation is located in the `docs` directory.
- **Example Code**: If possible, provide example code to help other developers understand and use your changes more easily.

### 6. Join the Organization

If you are interested in becoming more involved in the project and joining the organization, please contact the author ark65:

- Email: liuwufangzhou@gmail.com, liuwufangzhou@vip.qq.com
- In your email, briefly introduce yourself and describe the content you would like to contribute.

### 7. License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### 8. Contact Us

If you have any questions or suggestions, feel free to reach out to us!

We hope this contribution guide helps you get started and make meaningful contributions to the `ng-puzzle` project!

### 9. Changelog

- `CHANGELOG.md` and `CHANGELOG.zh-CN.md` must keep `## [Unreleased]` at the top.
- If a PR changes code-impacting files, CI requires both changelog files to be updated under `Unreleased`.
- If a PR only changes docs/CI, changelog update is optional.
- Release drafts are generated from the current `Unreleased` section after merge to `main`.

### 10. Main-only release policy

- Only `main` is used for both prereleases and stable releases.
- Release version source is `package.json.version` on `main`.
- Do not publish from `release/*` branches.
- Use valid SemVer:
  - stable: `1.2.2`
  - prerelease: `1.2.2-beta.1` or `1.2.2-rc.1`
  - invalid format example: `1.2.2.rc`

### 11. Release workflow

GitHub Actions now handles release end-to-end:

1. Open a PR that updates `package.json.version` and `CHANGELOG.md` `Unreleased`.
2. Merge PR into `main`.
3. `Release Draft` workflow creates/updates draft release `v<version>` from `Unreleased`.
4. Click **Publish release** on GitHub.
5. `Release Publish` workflow publishes to npm:
   - `-beta.x` / `-rc.x` -> `next`
   - stable `x.y.z` -> `latest`
6. Workflow finalizes changelog by archiving `Unreleased` into the released version and opens a PR back to `main`.

See [RELEASING.md](RELEASING.md) for the full operational guide (Chinese version: [RELEASING.zh-CN.md](RELEASING.zh-CN.md)).
