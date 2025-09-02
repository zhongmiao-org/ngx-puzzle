module.exports = [
  {
    type: 'component',
    name: 'ngx-puzzle-editor',
    description: '可视化拼图编辑器组件（编辑模式容器）',
    properties: [
      {
        name: 'selector',
        description: '选择器别名',
        type: "`ngx-puzzle-editor` | 'puzzle-editor'"
      },
      {
        name: 'inputs',
        description: '当前版本无输入参数。编辑器内部使用信号管理折叠状态(leftCollapsed/rightCollapsed)。',
        type: '—'
      },
      {
        name: 'outputs',
        description: '当前版本无输出事件。',
        type: '—'
      }
    ]
  },
  {
    type: 'component',
    name: 'ngx-puzzle-preview',
    description: '拼图预览组件（渲染画布与组件预览）',
    properties: [
      {
        name: 'selector',
        description: '选择器别名',
        type: "'ngx-puzzle-preview' | 'puzzle-preview'"
      },
      {
        name: 'enableZoom',
        description: '是否启用缩放（支持双向绑定）。true：按窗口宽度等比缩放；false：原始尺寸显示。',
        type: 'boolean',
        default: true
      },
      {
        name: 'enableZoomBtn',
        description: '是否启用缩放按钮；false 时按钮不可用。',
        type: 'boolean',
        default: false
      },
      {
        name: 'enableFullscreenBtn',
        description: '是否启用全屏按钮。',
        type: 'boolean',
        default: true
      },
      {
        name: 'previewId',
        description: '预览ID（仅在 previewMode 为 edit 时使用），用于从会话存储中加载临时配置。',
        type: 'string | undefined'
      },
      {
        name: 'previewMode',
        description: '预览模式：normal（仅使用传入的 passedConfig）；edit（结合 previewId 从会话中加载临时数据）。',
        type: "'normal' | 'edit'",
        default: 'normal'
      },
      {
        name: 'passedConfig',
        description: '正常预览模式下传入的组件配置列表。',
        type: 'ComponentConfig[] | undefined'
      },
      {
        name: 'methods.toggleZoomMode()',
        description: '切换缩放模式；关闭缩放时恢复比例为 1。',
        type: '() => void'
      },
      {
        name: 'methods.isFullscreen()',
        description: '是否处于全屏状态。',
        type: '() => boolean'
      },
      {
        name: 'methods.toggleFullscreen()',
        description: '在全屏与非全屏之间切换。',
        type: '() => Promise<void> | void'
      }
    ]
  },
  {
    type: 'service',
    name: 'NgxPuzzleExternalService',
    description: '对外提供组件初始化与预览能力的服务',
    properties: [
      {
        name: 'getAllConfigs()',
        description: '获取当前已注册的所有组件配置。',
        type: '() => ComponentConfig[]'
      },
      {
        name: 'initializeComponent(configs)',
        description: "根据传入配置初始化组件。支持传入单个或数组；包含 type==='canvas' 时将更新画布配置并选中画布。",
        type: '(configs: ComponentConfig | ComponentConfig[]) => void'
      },
      {
        name: 'generatePreviewId(ttl?)',
        description: '保存当前配置到会话存储并返回生成的预览ID；可选传入生存时间(毫秒)。',
        type: '(ttl?: number) => Promise<string>'
      },
      {
        name: 'getConfigsByPreviewId(previewId)',
        description: '通过预览ID从会话存储获取配置。',
        type: '(previewId: string) => Promise<ComponentConfig[] | null>'
      },
      {
        name: 'resetAllComponents()',
        description: '清空注册表、注入器与中介者状态，恢复到干净环境。',
        type: '() => void'
      }
    ]
  },
  {
    type: 'service',
    name: 'NgxPuzzleDataBindingService',
    description: '数据绑定对接服务：负责发起、响应绑定请求以及控件变更通知等',
    properties: [
      {
        name: 'bindingRequest$',
        description: '数据绑定请求流（Subject as Observable）。',
        type: 'Observable<NgxPuzzleDataBindingRequest>'
      },
      {
        name: 'bindingResponse$',
        description: '数据绑定响应流（Subject as Observable）。',
        type: 'Observable<NgxPuzzleDataBindingResponse>'
      },
      {
        name: 'controlChange$',
        description: '控件变化通知流（内部控件变化时对外通知）。',
        type: 'Observable<NgxPuzzleControlChangeNotification>'
      },
      {
        name: 'activeRequest$',
        description: '当前激活绑定请求（BehaviorSubject as Observable）。',
        type: 'Observable<NgxPuzzleDataBindingRequest | null>'
      },
      {
        name: 'bindingDelete$',
        description: '删除绑定的通知流（包含 componentId 与 seriesIndex）。',
        type: 'Observable<{ componentId: string; seriesIndex: number }>'
      },
      {
        name: 'requestBinding(request)',
        description: '发起绑定请求并设置为当前激活请求。',
        type: '(request: NgxPuzzleDataBindingRequest) => void'
      },
      {
        name: 'responseBinding(response)',
        description: '完成绑定响应，更新中介者数据请求并发布响应事件。',
        type: '(response: NgxPuzzleDataBindingResponse) => void'
      },
      {
        name: 'notifyControlChange(componentId, controlId, controlFilters)',
        description: '对外通知控件变化。',
        type: '(componentId: string, controlId: string, controlFilters: SafeAny) => void'
      },
      {
        name: 'getDataStreamHash(dataStream)',
        description: '获取数据流的标识（基于引用）。',
        type: '(dataStream: Observable<any>) => string'
      },
      {
        name: 'removeSeriesBinding(componentId, seriesIndex)',
        description: '删除指定系列的 API 数据源并发布删除与更新事件。',
        type: '(componentId: string, seriesIndex: number) => void'
      },
      {
        name: 'insertSeriesBinding(componentId, seriesIndex)',
        description: '在指定位置插入占位 API 源（需外部后续配置）。',
        type: '(componentId: string, seriesIndex: number) => void'
      },
      {
        name: 'getComponentDataRequest(componentId)',
        description: '获取组件的数据请求配置。',
        type: '(componentId: string) => DataRequestConfig | undefined'
      },
      {
        name: 'removeComponentDataRequest(componentId)',
        description: '删除组件的全部数据请求配置。',
        type: '(componentId: string) => void'
      },
      {
        name: 'getActiveRequest()',
        description: '获取当前激活的绑定请求。',
        type: '() => NgxPuzzleDataBindingRequest | null'
      }
    ]
  }
];
