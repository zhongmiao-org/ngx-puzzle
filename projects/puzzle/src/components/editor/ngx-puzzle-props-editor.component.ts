import { AfterViewInit, Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  BaseSelectOption,
  ComponentBaseProps,
  ComponentConfig,
  DataRequestConfig,
  EditorFields,
  EditorFormData,
  // EditorImageOption,
  EditorStyleField,
  EditorTab,
  Position,
  RefreshConfig,
  Size,
  TableConfig,
  TextConfig,
  ControlConfig
} from 'ngx-puzzle/core/interfaces';
import { basicTypes, editorTabTypes, mainTypes, SafeAny } from 'ngx-puzzle/core/types';
import { Subject, takeUntil } from 'rxjs';
import { BASE_TAB, DATA_TAB, EDITOR_FIELDS_MAP, EDITOR_TAB_MAP, STYLE_TAB } from 'ngx-puzzle/core/constants';
import { ThyTabsModule } from 'ngx-tethys/tabs';
import { ThyIcon } from 'ngx-tethys/icon';
import { cloneDeep, isEqual } from 'lodash';
import { ThyLayoutModule } from 'ngx-tethys/layout';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyInputNumberModule } from 'ngx-tethys/input-number';
import { ThyColorPickerModule } from 'ngx-tethys/color-picker';
import { ThySelectModule } from 'ngx-tethys/select';
import {
  NgxPuzzleChartEditorComponent
} from 'ngx-puzzle/components/editor/dynamic-editor/chart-editor/ngx-puzzle-chart-editor.component';
import { PuzzleCanvasMediatorService } from 'ngx-puzzle/core';

@Component({
  selector: 'ngx-puzzle-props-editor, puzzle-props-editor',
  standalone: true,
  imports: [
    FormsModule,
    ThyTabsModule,
    ThyIcon,
    ThyLayoutModule,
    ThyGridModule,
    ThyInputNumberModule,
    ThyColorPickerModule,
    ThyInputModule,
    NgStyle,
    ThySelectModule,
    NgxPuzzleChartEditorComponent
  ],
  templateUrl: './ngx-puzzle-props-editor.component.html',
  styleUrl: './ngx-puzzle-props-editor.component.scss',
  host: {
    '[class.ngx-puzzle-editor]': `true`
  }
})
export class NgxPuzzlePropsEditorComponent implements AfterViewInit, OnDestroy {
  // @ViewChild(Tabs) tabComponent!: Tabs;

  private readonly mediator = inject(PuzzleCanvasMediatorService<ComponentBaseProps, string>);

  private destroy$: Subject<void> = new Subject<void>();

  public config!: ComponentConfig;

  public fields: EditorFields[] = [];
  // 样式字段
  public styleFields: EditorStyleField[] = [];

  public formData: EditorFormData = {
    width: 0,
    height: 0,
    positionX: 0,
    positionY: 0,
    styles: {},
  };

  public tabs = signal<EditorTab[]>([]);

  public activeTab: editorTabTypes = 'appearance';


  ngAfterViewInit(): void {
    const config = this.mediator.getCurrentSelect();
    if (!!config) {
      this.resetConfig(config);
    }
    this.setupObservables();
  }

  private setupTabs(config: ComponentConfig): void {
    this.tabs.set( EDITOR_TAB_MAP[config.type] || [BASE_TAB]);
    this.onTabChange(this.tabs()[0].value);
  }

  private resetConfig(config: ComponentConfig): void {
    // 检查是否需要更新配置
    const shouldUpdate = this.shouldUpdateConfig(config);

    if (shouldUpdate) {
      this.setupTabs(config);
      this.updateAllConfig(config);
    }
  }

  private shouldUpdateConfig(newConfig: ComponentConfig): boolean {
    // 如果当前没有配置，需要更新
    if (!this.config) {
      return true;
    }

    // 如果 ID 不同，需要更新
    if (this.config.id !== newConfig.id) {
      return true;
    }

    // 如果配置内容发生变化，需要更新
    return !isEqual(this.config, newConfig);
  }

  private setupObservables(): void {
    this.mediator.componentSelect$.pipe(takeUntil(this.destroy$)).subscribe((config: ComponentConfig) => {
      this.resetConfig(config);
    });
    this.mediator.componentUpdateProps$.pipe(takeUntil(this.destroy$)).subscribe(({ id, props }) => {
      if (id === this.config.id) {
        this.updateProps(props);
      }
    });
    this.mediator.componentMoving$.pipe(takeUntil(this.destroy$)).subscribe(({ id, position }) => {
      if (id === this.config.id) {
        this.updatePosition(position);
      }
    });
    this.mediator.componentResize$.pipe(takeUntil(this.destroy$)).subscribe((config) => {
      const { id, size, position } = config;
      if (id === this.config.id) {
        this.updateSize(size);
        this.updatePosition(position);
      }
    });
  }

  private updateAllConfig(config: ComponentConfig): void {
    const configCopy = cloneDeep(config);

    this.config = {
      ...this.config,
      ...configCopy,
    };
    const typeFields = EDITOR_FIELDS_MAP[config.type];
    this.fields = typeFields?.fields || [];
    this.styleFields = typeFields?.styles || [];

    // 初始化基础数据
    this.formData = {
      ...this.formData,
      width: config.size.width,
      height: config.size.height,
      positionX: config.position.x,
      positionY: config.position.y,
      styles: {
        ...this.formData.styles,
        ...config.props.styles,
      },
    };
  }

  private updateProps<TConfigProps extends ComponentBaseProps>(props: TConfigProps): void {
    this.config.props = {
      ...this.config.props,
      ...props,
    };

    this.formData = {
      ...this.formData,
      styles: {
        ...this.formData.styles,
        ...props.styles,
      },
    };
  }

  private updatePosition(position: Position) {
    this.config = {
      ...this.config,
      position,
    };
    this.formData.positionX = position.x;
    this.formData.positionY = position.y;
  }

  private updateSize(size: Size) {
    this.config = {
      ...this.config,
      size,
    };
    this.formData.width = size.width;
    this.formData.height = size.height;
  }

  basicDataChange(val: number | string, field: basicTypes): void {
    // Create a deep copy for history recording before making changes
    const configForHistory = cloneDeep(this.config);
    let actionType: 'resize' | 'move' | null = null;

    switch (field) {
      case 'width':
        this.config.size.width = +val;
        actionType = 'resize';
        break;
      case 'height':
        this.config.size.height = +val;
        actionType = 'resize';
        break;
      case 'positionX':
        this.config.position.x = +val;
        actionType = 'move';
        break;
      case 'positionY':
        this.config.position.y = +val;
        actionType = 'move';
        break;
    }

    if (actionType) {
      this.mediator.recordHistory(configForHistory, actionType);
      const { id, size, position } = this.config;
      actionType === 'resize' ? this.mediator.resizeComponent(id, size, position) : this.mediator.movingComponent(id, position);
    }
  }

  styleDataChange(val: number | string | BaseSelectOption, field: string): void {
    this.config.props.styles = {
      ...this.config.props.styles,
      [field]: val,
    };
    this.formData.styles = {
      ...this.formData.styles,
      [field]: val,
    };
    this.emitUpdateProps(this.config.props);
  }

  // 更新刷新评率
  updateRefreshOptions(refreshOptions: RefreshConfig): void {
    this.config['refreshConfig'] = refreshOptions;
    this.mediator.updateComponentData(this.config);
  }

  // 更新 props
  updateOptions(options: SafeAny | TableConfig | TextConfig | ControlConfig, type: mainTypes): void {
    const optionsCopy = cloneDeep(options);

    switch (type) {
      case 'chart':
        this.config.props = {
          ...this.config.props,
          chart: optionsCopy,
        };
        break;
      case 'table':
        this.config.props = {
          ...this.config.props,
          table: optionsCopy,
        };
        break;
      case 'text':
        this.config.props = {
          ...this.config.props,
          text: optionsCopy,
        };
        break;
      case 'control':
        this.config.props = {
          ...this.config.props,
          control: optionsCopy,
        };
        break;
    }
    this.emitUpdateProps(this.config.props);
  }

  private emitUpdateProps<TProps extends ComponentBaseProps>(props: TProps): void {
    this.mediator.updateComponentProps(this.config.id, props);
  }

  onTabChange(event: any): void {
    this.activeTab = event;
    const isWideMode = event === 'advanced' && this.config.type === 'table';
    this.mediator.setDrawerWideMode(isWideMode);
  }

  requestChange(dateRequest: DataRequestConfig): void {
    this.mediator.updateDataRequest(this.config.id, dateRequest);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
