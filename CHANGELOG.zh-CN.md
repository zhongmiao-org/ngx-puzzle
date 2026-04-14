## [Unreleased]

## 21.0.0 (2026-04-14)

### ✨ Added
* Table runtime is now adapter-oriented, making table behaviors and data binding easier to extend by feature modules and downstream integrations. ([fa46b91](https://github.com/zhongmiao-org/ngx-puzzle/commit/fa46b91))
* Added number capability in the text category to support numeric display/editing scenarios in dashboard composition. ([fe8d445](https://github.com/zhongmiao-org/ngx-puzzle/commit/fe8d445), [01dc8a9](https://github.com/zhongmiao-org/ngx-puzzle/commit/01dc8a9))
* Added live demo entry in project docs for faster evaluation and onboarding. ([0ed2d70](https://github.com/zhongmiao-org/ngx-puzzle/commit/0ed2d70))
* Added a main-only GitHub release pipeline: PR quality gate, release-draft sync from `main` version, release-triggered npm publish, and automated changelog finalization PR. ([bca01d6](https://github.com/zhongmiao-org/ngx-puzzle/commit/bca01d6))
### 🔄 Changed
* Angular 21 alignment completed across provider wiring, demo bootstrap flow, and documentation guidance to match current framework conventions. ([9e40e48](https://github.com/zhongmiao-org/ngx-puzzle/commit/9e40e48))
* Build baseline upgraded to Angular 21 and newer lodash, ensuring dependency consistency with the current release line. ([f35da10](https://github.com/zhongmiao-org/ngx-puzzle/commit/f35da10))
* Release documentation and root docs are now bilingual-complete, with explicit main-only release rules and prerelease/stable versioning policy.
* Changelog governance is now stricter: code-impacting PRs must update both English and Chinese `Unreleased` sections.
### 🐛 Fixed
* Fixed `addArrayItem` behavior in chart editor operations. ([8cbaa8a](https://github.com/zhongmiao-org/ngx-puzzle/commit/8cbaa8a))
* Fixed control component style/props inconsistencies. ([2985509](https://github.com/zhongmiao-org/ngx-puzzle/commit/2985509))
* Fixed form-renderer style issues. ([c66d6dc](https://github.com/zhongmiao-org/ngx-puzzle/commit/c66d6dc))
* Fixed `build:docs` CI warning path. ([f94ed53](https://github.com/zhongmiao-org/ngx-puzzle/commit/f94ed53))

[English](CHANGELOG.md) | 中文文档

