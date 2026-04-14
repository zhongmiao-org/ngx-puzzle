# Console Removal Strategy

English | [中文文档](CONSOLE_REMOVAL.zh-CN.md)

This project removes `console.*` calls from the published library build with a two-layer strategy.

## Implementation

- Build-time cleanup: `scripts/build-production.js`
- Runtime fallback: `projects/puzzle/src/console-override.ts`
- Auto bootstrap from: `projects/puzzle/src/public-api.ts`

## How it works

### Layer 1: build-time removal (primary)

1. Run production build (`ng build puzzle --configuration production`).
2. Scan generated `.js/.mjs` files.
3. Remove `console.*(...)` calls.
4. Write cleaned files back to `dist`.

### Layer 2: runtime safeguard (fallback)

1. Detect prod mode using Angular runtime flags.
2. Replace console methods with noop functions.
3. Execute automatically through library entry import.

## Methods covered

- `console.log`, `warn`, `error`, `info`, `debug`, `trace`
- `table`, `group*`, `time*`, `count`, `assert`, `clear`, `dir*`
- `profile*` and `timeStamp` when present

## Verification

```bash
npm run build
grep -n "console" dist/puzzle/fesm2022/zhongmiao-ngx-puzzle.mjs
```

## Notes

- Dev mode is unaffected.
- If production logging is required, use a dedicated logger instead of `console`.
