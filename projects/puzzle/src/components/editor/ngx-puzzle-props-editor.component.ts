import { AfterViewInit, Component, inject, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ComponentBaseProps,
  ComponentConfig,
  DataRequestConfig,
  EditorTab,
  Position,
  RefreshConfig,
  Size,
  TextConfig,
  ControlConfig,
  EditorBaseField
} from 'ngx-puzzle/core/interfaces';
import { basicTypes, editorTabTypes, mainTypes, SafeAny } from 'ngx-puzzle/core/types';
import { Subject, takeUntil } from 'rxjs';
import { BASE_TAB, EDITOR_TAB_MAP } from 'ngx-puzzle/core/constants';
import { ThyTabsModule } from 'ngx-tethys/tabs';
import { ThyIcon } from 'ngx-tethys/icon';
import { cloneDeep, isEqual } from 'lodash';
import { ThyLayoutModule } from 'ngx-tethys/layout';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyInputNumberModule } from 'ngx-tethys/input-number';
import { ThyColorPickerModule } from 'ngx-tethys/color-picker';
import { ThySelectModule } from 'ngx-tethys/select';
import { NgxPuzzleChartEditorComponent } from 'ngx-puzzle/components/editor/dynamic-editor/chart-editor/ngx-puzzle-chart-editor.component';
import { convertFormDataToOptions, convertOptionsToFormData, PuzzleCanvasMediatorService, updateFormData } from 'ngx-puzzle/core';
import { NgxPuzzleRefreshEditorComponent } from 'ngx-puzzle/components/editor/dynamic-editor/refresh-editor/ngx-puzzle-refresh-editor.component';
import { NgxPuzzleTextEditorComponent } from 'ngx-puzzle/components/editor/dynamic-editor/text-editor/ngx-puzzle-text-editor.component';
import { NgxPuzzleTableEditorComponent } from 'ngx-puzzle/components/editor/dynamic-editor/table-editor/ngx-puzzle-table-editor.component';
import { NgxPuzzleControlEditorComponent } from 'ngx-puzzle/components/editor/dynamic-editor/control-editor/ngx-puzzle-control-editor.component';
import { Report } from '@webdatarocks/webdatarocks';
import { PuzzleFormRendererComponent } from 'ngx-puzzle/components/primitives/puzzle-form-renderer/puzzle-form-renderer.component';
import { EDITOR_BASE_FIELDS } from 'ngx-puzzle/core/constants/field-configs/base-editor';

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
    ThySelectModule,
    NgxPuzzleChartEditorComponent,
    NgxPuzzleControlEditorComponent,
    NgxPuzzleRefreshEditorComponent,
    NgxPuzzleTextEditorComponent,
    NgxPuzzleTableEditorComponent,
    PuzzleFormRendererComponent
  ],
  templateUrl: './ngx-puzzle-props-editor.component.html',
  styleUrl: './ngx-puzzle-props-editor.component.scss',
  host: {
    '[class.ngx-puzzle-editor]': `true`
  }
})
export class NgxPuzzlePropsEditorComponent implements AfterViewInit, OnDestroy {
  private readonly mediator = inject(PuzzleCanvasMediatorService<ComponentBaseProps, string>);

  private destroy$: Subject<void> = new Subject<void>();

  public config!: ComponentConfig;

  public fields: EditorBaseField[] = [];
  // 样式字段
  public styleFields: EditorBaseField[] = [];

  public sections: EditorBaseField[] = [];

  public formData: Record<string, SafeAny> = {};

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
    this.tabs.set(EDITOR_TAB_MAP[config.type] || [BASE_TAB]);
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
    this.mediator.dataRequest$.pipe(takeUntil(this.destroy$)).subscribe(({ id, dataRequest }) => {
      if (id === this.config.id) {
        this.config.dataRequest = {
          ...dataRequest
        };
      }
    });
  }

  private updateAllConfig(config: ComponentConfig): void {
    const configCopy = cloneDeep(config);
    console.log(`updateAllConfig`, configCopy);
    this.config = {
      ...this.config,
      ...configCopy
    };
    this.sections = EDITOR_BASE_FIELDS[config.type];
    this.formData = convertOptionsToFormData(this.config, this.sections);
  }

  private updateProps<TConfigProps extends ComponentBaseProps>(props: TConfigProps): void {
    this.config.props = {
      ...this.config.props,
      ...props
    };

    this.formData = convertOptionsToFormData(this.config, this.sections);
  }

  private updatePosition(position: Position) {
    this.config = {
      ...this.config,
      position
    };
    this.formData = convertOptionsToFormData(this.config, this.sections);
  }

  private updateSize(size: Size) {
    this.config = {
      ...this.config,
      size
    };
    this.formData = convertOptionsToFormData(this.config, this.sections);
  }

  basicDataChange(val: number | string, field: basicTypes): void {
    // Create a deep copy for history recording before making changes
    const configForHistory = cloneDeep(this.config);
    let actionType: 'resize' | 'move' | null = null;

    switch (field) {
      case 'width':
      case 'height':
        actionType = 'resize';
        break;
      case 'positionX':
      case 'positionY':
        actionType = 'move';
        break;
    }
    if (actionType) {
      this.mediator.recordHistory(configForHistory, actionType);
      const { id, size, position } = this.config;
      actionType === 'resize' ? this.mediator.resizeComponent(id, size, position) : this.mediator.movingComponent(id, position);
    }
  }

  // 更新刷新评率
  updateRefreshOptions(refreshOptions: RefreshConfig): void {
    this.config['refreshConfig'] = refreshOptions;
    this.mediator.updateComponentData(this.config);
  }

  // 更新 props
  updateOptions(options: SafeAny | Report | TextConfig | ControlConfig, type: mainTypes): void {
    const optionsCopy = cloneDeep(options);

    switch (type) {
      case 'chart':
        this.config.props = {
          ...this.config.props,
          chart: optionsCopy
        };
        break;
      case 'table':
        this.config.props = {
          ...this.config.props,
          table: optionsCopy
        };
        break;
      case 'text':
        this.config.props = {
          ...this.config.props,
          text: optionsCopy
        };
        break;
      case 'control':
        this.config.props = {
          ...this.config.props,
          control: optionsCopy
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

  onFieldChange(event: { key: string; value: SafeAny; parentKey?: string; index?: number }): void {
    this.formData = updateFormData(this.formData, event.key, event.value, event?.parentKey, event?.index);
    const updated = convertFormDataToOptions(this.formData, this.config, this.sections);
    this.config = {
      ...this.config,
      ...updated
    }
    const basicKeys: basicTypes[] = ['width', 'height', 'positionX', 'positionY'];
    if ((basicKeys as string[]).includes(event.key)) {
      this.basicDataChange(event.value as number | string, event.key as basicTypes);
    } else {
      console.log(updated.props)
      this.mediator.updateComponentProps(this.config.id, updated.props);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
