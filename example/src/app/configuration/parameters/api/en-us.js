module.exports = [
  {
    type: 'component',
    name: 'ngx-puzzle-editor',
    description: 'Visual puzzle editor component (editor container)',
    properties: [
      {
        name: 'selector',
        description: 'Selector aliases',
        type: "'ngx-puzzle-editor' | 'puzzle-editor'"
      },
      {
        name: 'inputs',
        description: 'No public inputs in this version. Internal state uses signals (leftCollapsed/rightCollapsed).',
        type: '—'
      },
      {
        name: 'outputs',
        description: 'No public outputs in this version.',
        type: '—'
      }
    ]
  },
  {
    type: 'component',
    name: 'ngx-puzzle-preview',
    description: 'Puzzle preview component (renders canvas and components)',
    properties: [
      {
        name: 'selector',
        description: 'Selector aliases',
        type: "'ngx-puzzle-preview' | 'puzzle-preview'"
      },
      {
        name: 'enableZoom',
        description: 'Enable zooming (two-way). true: scale to fit window width; false: show at original size.',
        type: 'boolean',
        default: true
      },
      {
        name: 'enableZoomBtn',
        description: 'Whether the zoom button is enabled; disabled when false.',
        type: 'boolean',
        default: false
      },
      {
        name: 'enableFullscreenBtn',
        description: 'Whether the fullscreen button is enabled.',
        type: 'boolean',
        default: true
      },
      {
        name: 'previewId',
        description: 'Preview ID (used only when previewMode is edit) to load temporary configs from session storage.',
        type: 'string | undefined'
      },
      {
        name: 'previewMode',
        description: 'Preview mode: normal (uses only passedConfig) | edit (loads temporary data from session by previewId).',
        type: "'normal' | 'edit'",
        default: 'normal'
      },
      {
        name: 'passedConfig',
        description: 'Component configs for normal preview mode.',
        type: 'ComponentConfig[] | undefined'
      },
      {
        name: 'methods.toggleZoomMode()',
        description: 'Toggle zoom mode; when turning off zoom, reset scale to 1.',
        type: '() => void'
      },
      {
        name: 'methods.isFullscreen()',
        description: 'Whether it is currently in fullscreen.',
        type: '() => boolean'
      },
      {
        name: 'methods.toggleFullscreen()',
        description: 'Toggle between fullscreen and normal.',
        type: '() => Promise<void> | void'
      }
    ]
  },
  {
    type: 'service',
    name: 'NgxPuzzleExternalService',
    description: 'External service exposing initialization and preview capabilities',
    properties: [
      {
        name: 'getAllConfigs()',
        description: 'Get all currently registered component configs.',
        type: '() => ComponentConfig[]'
      },
      {
        name: 'initializeComponent(configs)',
        description: 'Initialize components from given configs. Accepts single or array. When type===\'canvas\', updates canvas config and selects it.',
        type: '(configs: ComponentConfig | ComponentConfig[]) => void'
      },
      {
        name: 'generatePreviewId(ttl?)',
        description: 'Persist current configs to session storage and return a generated preview ID; optional TTL in ms.',
        type: '(ttl?: number) => Promise<string>'
      },
      {
        name: 'getConfigsByPreviewId(previewId)',
        description: 'Fetch configs from session storage by preview ID.',
        type: '(previewId: string) => Promise<ComponentConfig[] | null>'
      },
      {
        name: 'resetAllComponents()',
        description: 'Clear registry, injector and mediator states to a clean environment.',
        type: '() => void'
      }
    ]
  },
  {
    type: 'service',
    name: 'NgxPuzzleDataBindingService',
    description: 'Data binding gateway service: request/respond to bindings and notify control changes',
    properties: [
      {
        name: 'bindingRequest$',
        description: 'Stream of data-binding requests (Subject as Observable).',
        type: 'Observable<NgxPuzzleDataBindingRequest>'
      },
      {
        name: 'bindingResponse$',
        description: 'Stream of data-binding responses (Subject as Observable).',
        type: 'Observable<NgxPuzzleDataBindingResponse>'
      },
      {
        name: 'controlChange$',
        description: 'Stream that notifies external listeners when internal controls change.',
        type: 'Observable<NgxPuzzleControlChangeNotification>'
      },
      {
        name: 'activeRequest$',
        description: 'The currently active binding request (BehaviorSubject as Observable).',
        type: 'Observable<NgxPuzzleDataBindingRequest | null>'
      },
      {
        name: 'bindingDelete$',
        description: 'Notification stream for deleting a binding (componentId and seriesIndex).',
        type: 'Observable<{ componentId: string; seriesIndex: number }>'
      },
      {
        name: 'requestBinding(request)',
        description: 'Emit a binding request and set it as the active request.',
        type: '(request: NgxPuzzleDataBindingRequest) => void'
      },
      {
        name: 'responseBinding(response)',
        description: 'Complete a binding response, update mediator data request and emit response.',
        type: '(response: NgxPuzzleDataBindingResponse) => void'
      },
      {
        name: 'notifyControlChange(componentId, controlId, controlFilters)',
        description: 'Notify external listeners of a control change.',
        type: '(componentId: string, controlId: string, controlFilters: any) => void'
      },
      {
        name: 'getDataStreamHash(dataStream)',
        description: 'Get an identifier for a data stream (reference-based).',
        type: '(dataStream: Observable<any>) => string'
      },
      {
        name: 'removeSeriesBinding(componentId, seriesIndex)',
        description: 'Remove API source at series index and emit delete/update events.',
        type: '(componentId: string, seriesIndex: number) => void'
      },
      {
        name: 'insertSeriesBinding(componentId, seriesIndex)',
        description: 'Insert a placeholder API source at given index (requires later external config).',
        type: '(componentId: string, seriesIndex: number) => void'
      },
      {
        name: 'getComponentDataRequest(componentId)',
        description: 'Get component data request config.',
        type: '(componentId: string) => DataRequestConfig | undefined'
      },
      {
        name: 'removeComponentDataRequest(componentId)',
        description: 'Remove all data request configs for a component.',
        type: '(componentId: string) => void'
      },
      {
        name: 'getActiveRequest()',
        description: 'Get current active binding request.',
        type: '() => NgxPuzzleDataBindingRequest | null'
      }
    ]
  }
];
