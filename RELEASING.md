# Releasing Guide (Main-Only)

English | [中文文档](RELEASING.zh-CN.md)

This repository uses a **main-only** release model.
Both prereleases and stable releases are cut from `main`.

## Version rules

- Source of truth: `package.json.version` on `main`
- Stable: `x.y.z` (example: `1.2.2`)
- Prerelease: `x.y.z-beta.N` or `x.y.z-rc.N` (example: `1.2.2-rc.1`)
- Invalid: `1.2.2.rc`

## Required secret

- `NPM_TOKEN`: npm publish token with permission to publish `@zhongmiao/ngx-puzzle`

## CI and changelog gate

For pull requests:

- CI runs lint, test, and build.
- If code-impacting files change (`projects/**`, `scripts/**`, root `package*.json`, `angular.json`, `tsconfig*.json`), both `CHANGELOG.md` and `CHANGELOG.zh-CN.md` must be updated under `## [Unreleased]`.
- Docs/CI-only changes can skip changelog updates.

## Stable release flow

1. Open a PR from your feature branch.
2. Update `package.json.version` to stable SemVer (for example `1.2.2`).
3. Add release notes under `## [Unreleased]` in both `CHANGELOG.md` and `CHANGELOG.zh-CN.md`.
4. Merge PR into `main`.
5. `Release Draft` workflow creates or updates draft release `v1.2.2`.
6. Review draft notes and click **Publish release**.
7. `Release Publish` workflow publishes npm with `--tag latest`.
8. Workflow opens a PR that archives `Unreleased` into `## 1.2.2 (YYYY-MM-DD)` and resets `Unreleased` in both changelog files.

## Prerelease flow

1. Open a PR from your feature branch.
2. Update `package.json.version` to prerelease SemVer (for example `1.2.2-rc.1`).
3. Add release notes under `## [Unreleased]` in both `CHANGELOG.md` and `CHANGELOG.zh-CN.md`.
4. Merge PR into `main`.
5. `Release Draft` workflow creates or updates draft release `v1.2.2-rc.1` and marks it as prerelease.
6. Click **Publish release**.
7. `Release Publish` workflow publishes npm with `--tag next`.
8. Workflow opens a PR that archives `Unreleased` into `## 1.2.2-rc.1 (YYYY-MM-DD)` and resets `Unreleased`.

## Notes

- Do not publish from `release/*` branches.
- If release tag and `package.json.version` do not match, publish workflow fails intentionally.
