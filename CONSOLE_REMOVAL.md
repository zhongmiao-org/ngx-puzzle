# Console 语句移除方案

本项目实现了在库构建时自动移除所有 console 语句的功能，采用了**双重保护**策略。

## 实现方案

采用了**构建时移除 + 运行时检测**的双重方案，确保最彻底的console清理。

### 核心文件
- `scripts/build-production.js`: 构建时后处理脚本，物理移除console语句
- `projects/puzzle/src/console-override.ts`: 运行时检测备用方案
- `projects/puzzle/src/public-api.ts`: 入口文件，自动导入console禁用逻辑

### 工作原理

#### 第一层：构建时移除（主要方案）
1. **正常构建**: 先执行 `ng build puzzle --configuration production`
2. **后处理**: 使用正则表达式扫描所有生成的 `.mjs` 和 `.js` 文件
3. **物理移除**: 直接删除所有 `console.*()` 调用
4. **文件更新**: 重写处理后的文件

#### 第二层：运行时检测（备用方案）
1. **环境检测**: 使用 Angular 的 `ngDevMode` 全局变量检测是否为生产环境
2. **方法重写**: 在生产环境下，将所有 console 方法替换为空函数 (noop)
3. **自动加载**: 通过在 public-api.ts 中导入，确保库被使用时自动执行

### 受影响的 Console 方法

以下 console 方法在生产环境下将被禁用：
- `console.log`
- `console.warn`
- `console.error`
- `console.info`
- `console.debug`
- `console.trace`
- `console.table`
- `console.group` / `console.groupCollapsed` / `console.groupEnd`
- `console.time` / `console.timeEnd`
- `console.count`
- `console.assert`
- `console.clear`
- `console.dir` / `console.dirxml`
- `console.profile` / `console.profileEnd` / `console.timeStamp` (如果存在)

## 使用方法

### 对于库的使用者

无需任何额外配置，当在生产环境下使用此库时，console 输出会自动被禁用。

### 对于库的开发者

在开发过程中，console 语句正常工作。在执行 `npm run build` 构建生产版本时，console 会被自动禁用。

## 验证方法

1. **构建库**:
   ```bash
   npm run build
   ```

2. **检查生成的文件**:
   ```bash
   grep -n "console" dist/puzzle/fesm2022/zhongmiao-ngx-puzzle.mjs
   ```

3. **在生产环境测试**: 将库集成到应用中，使用生产模式构建应用，console 输出应该被禁用

## 构建脚本详情

### 修改的文件

- `package.json`:
  - `build:lib` 脚本现在调用 `scripts/build-production.js`
  - `build:lib:dev` 保留原始构建命令用于开发
- `scripts/build-production.js`: 新增的后处理脚本

### 构建输出示例

```
🚀 开始构建生产版本...
✅ 基础构建完成
🔧 开始移除console语句...
📝 已处理文件: esm2022/components/canvas/ngx-puzzle-canvas.component.mjs
📝 已处理文件: esm2022/core/services/external/ngx-puzzle-external.service.mjs
📝 已处理文件: fesm2022/zhongmiao-ngx-puzzle.mjs
✅ 生产版本构建完成！Console语句已移除。
```

## 优势

- ✅ **零配置**: 库的使用者无需任何配置
- ✅ **双重保护**: 构建时物理移除 + 运行时检测
- ✅ **彻底清理**: 直接从bundle中删除console语句
- ✅ **完整性**: 覆盖所有常用的 console 方法
- ✅ **兼容性**: 与现有代码完全兼容
- ✅ **性能最优**: 生产环境中console调用完全不存在

## 注意事项

- 此方案仅影响生产环境，开发环境下 console 正常工作
- 如果需要在生产环境下保留某些关键日志，建议使用专门的日志库
- Console 方法被重写后无法恢复，如有特殊需求请在导入库之前处理