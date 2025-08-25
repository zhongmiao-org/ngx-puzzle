# ngx-puzzle

`ngx-puzzle` 是一个基于 Angular 的拖拽式大屏构建工具，像拼图一样自由组合图表、表格、文字等组件，快速生成可视化数据看板。通过模块化设计和实时预览，让开发者和业务人员轻松搭建响应式数据分析界面。

## 核心功能
- ✨ **拖拽即所得** – 将组件像拼图一样吸附到画布，手动布局。
- 📊 **丰富组件库** – 支持图表、表格、文本。
- 🛠 **Angular 驱动** – 组件化架构，易于二次开发。
- ⚡ **实时数据对接** – 可连接 API 或静态数据源。

适用于快速原型开发、企业内部看板或数据可视化门户。

## 安装
```shell script
npm install @zhongmiao/ngx-puzzle
```


## 快速开始
1. 在您的 Angular 项目中安装 `ngx-puzzle`。
2. 在您的应用模块中导入 `NgxPuzzleModule`。
3. 在您的组件模板中使用 `<ngx-puzzle>` 标签。

### 示例代码
```typescript
import { NgxPuzzleModule } from '@zhongmiao/ngx-puzzle';

@NgModule({
  imports: [
    // 其他模块
    NgxPuzzleModule
  ],
  // ...
})
export class AppModule { }
```


```html
<ngx-puzzle></ngx-puzzle>
```


## 文档
更多详细文档请参阅 [官方文档](docs/zh-cn/guides/intro/index.md)。

## 贡献
欢迎贡献代码！请参考 [贡献指南](CONTRIBUTING.zh-CN.md)。

## 许可证
本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 贡献者
- ark65 (liuwufangzhou@gmail.com, liuwufangzhou@qq.vip.com)

## 联系我们
如果您有任何问题或建议，请随时联系我们！
