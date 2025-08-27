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
- We maintain a CHANGELOG.md generated from Conventional Commits.
- On each release (`npm run release`), the changelog is automatically updated by the `postrelease` script.
- Before releasing, we validate the library builds successfully via `prerelease` (runs `npm run build`). If build fails, the release is aborted.
- The CHANGELOG.md, README.md and LICENSE are copied into the published package during build, so users on npm can read them.
- To update locally without releasing:
  - Latest changes since last tag: `npm run changelog`
  - Regenerate from entire history: `npm run changelog:all`
- Commit message used by automation: `docs(changelog): update changelog` (validated by Commitlint).

### 10. Release helper (interactive)
Use the interactive release helper to cut a release end-to-end (branch → validate → bump → changelog → overwrite dist → publish):

- Run: `npm run release:select`
- Choose bump type (SemVer):
  - major: breaking changes; typically aligns with Angular major updates
  - minor: new features, backward-compatible
  - patch: bug fixes and optimizations, no breaking changes
- The script performs:
  1) Creates a branch `release-v<nextVersion>`
  2) Validates environment and runs a pre-bump build (`npm run build`)
  3) Updates version in root and library package.json to `<nextVersion>`
  4) Generates/updates CHANGELOG.md using Conventional Commits
  5) Overwrites `dist/puzzle/package.json` version and copies `CHANGELOG.md` into `dist/puzzle`
  6) Commits changes and pushes the release branch
  7) Publishes the package from `dist/puzzle` to npm

Flags:
- `--type <major|minor|patch>` non-interactive
- `--yes` skip confirmation
- `--dry-run` show actions without changing anything
