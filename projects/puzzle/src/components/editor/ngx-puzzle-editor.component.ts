import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuzzleCanvasMediatorService } from 'ngx-puzzle/core/mediator/puzzle-canvas-mediator.service';
import {
  ComponentBaseProps,
  ComponentConfig,
  EditorFields,
  EditorFormData,
  EditorImageOption,
  EditorStyleField,
  EditorTab,
  Position,
  Size,
  TableConfig,
  TextConfig
} from 'ngx-puzzle/core/interfaces';
import { basicTypes, editorTabTypes, mainTypes } from 'ngx-puzzle/core/types';
import { Subject, takeUntil } from 'rxjs';
import { BASE_TAB, DATA_TAB, EDITOR_FIELDS_MAP, STYLE_TAB } from 'ngx-puzzle/core/constants';
import { ThyTabsModule } from 'ngx-tethys/tabs';
import { ThyIcon } from 'ngx-tethys/icon';
import { cloneDeep } from 'lodash';
import { AgChartOptions } from 'ag-charts-community';
import { ThyLayoutModule } from 'ngx-tethys/layout';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyInputNumberModule } from 'ngx-tethys/input-number';
import { ThyColorPickerModule } from 'ngx-tethys/color-picker';
import { ThySelectModule } from 'ngx-tethys/select';
import {
  NgxPuzzleChartEditorComponent
} from 'ngx-puzzle/components/editor/dynamic-editor/chart-editor/ngx-puzzle-chart-editor.component';

@Component({
  selector: 'ngx-puzzle-editor, puzzle-editor',
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
  templateUrl: './ngx-puzzle-editor.component.html',
  styleUrl: './ngx-puzzle-editor.component.scss',
  host: {
    '[class.ngx-puzzle-editor]': `true`
  }
})
export class NgxPuzzleEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  // @ViewChild(Tabs) tabComponent!: Tabs;

  private readonly mediator = inject(PuzzleCanvasMediatorService<ComponentBaseProps, string>);

  private destroy$: Subject<void> = new Subject<void>();

  public config!: ComponentConfig;
  public currentType: string = 'canvas';

  public fields: EditorFields[] = [];
  // 样式字段
  public styleFields: EditorStyleField[] = [];

  public formData: EditorFormData = {
    width: 0,
    height: 0,
    positionX: 0,
    positionY: 0,
    styles: {}
  };

  public tabs: EditorTab[] = [];

  public activeTab: editorTabTypes = 'appearance';

  constructor() {}

  ngOnInit() {
    this.setupObservables();
  }

  ngAfterViewInit(): void {
    const config = this.mediator.getCurrentSelect();
    console.log(`ngAfterViewInit`, config);
    if (!!config) {
      console.log(`NgxPuzzleEditorComponent ngAfterViewInit config`, config);
      this.resetConfig(config);
    }
  }

  private setupTabs(config: ComponentConfig): void {
    console.log(`setupTabs`, config);
    switch (config.type) {
      case 'chart':
        this.tabs = [BASE_TAB, DATA_TAB];
        break;
      case 'table':
        this.tabs = [BASE_TAB, DATA_TAB];
        break;
      case 'text':
        this.tabs = [BASE_TAB, STYLE_TAB];
        break;
      default:
        this.tabs = [BASE_TAB];
        break;
    }
    console.log(this.tabs);
    this.activeTab = 'appearance';
    // this.tabComponent.value.set(`appearance`);
  }

  private resetConfig(config: ComponentConfig): void {
    console.log(`resetConfig`, config, this.config, (this.config && this.config.id !== config.id) || !this.config);
    if ((this.config && this.config.id !== config.id) || !this.config) {
      this.setupTabs(config);
    }
    this.update(cloneDeep(config));
  }

  private setupObservables(): void {
    this.mediator.componentSelect$.pipe(takeUntil(this.destroy$)).subscribe((config: ComponentConfig) => {
      this.resetConfig(config);
    });
    this.mediator.componentUpdate$.pipe(takeUntil(this.destroy$)).subscribe((config: ComponentConfig) => {
      this.update(config);
    });
    this.mediator.componentMoving$.pipe(takeUntil(this.destroy$)).subscribe(({ id, position }) => {
      if (id === this.config.id) {
        this.updatePosition(position);
      }
    });
    this.mediator.componentResize$.pipe(takeUntil(this.destroy$)).subscribe((config) => {
      const { id, size } = config;
      if (id === this.config.id) {
        this.updateSize(size);
      }
    });
  }

  private update(config: ComponentConfig): void {
    this.config = config;
    this.currentType = config.type;

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
        ...config.props.styles
      }
    };
  }

  private updatePosition(position: Position) {
    this.config = {
      ...this.config,
      position
    };
    this.formData.positionX = position.x;
    this.formData.positionY = position.y;
  }

  private updateSize(size: Size) {
    this.config = {
      ...this.config,
      size
    };
    this.formData.width = size.width;
    this.formData.height = size.height;
  }

  basicDataChange(val: number, field: basicTypes): void {
    console.log(val);
    const config = cloneDeep(this.config);
    let actionType: 'resize' | 'move' | null = null;

    switch (field) {
      case 'width':
        this.config.size.width = val;
        actionType = 'resize';
        break;
      case 'height':
        this.config.size.height = val;
        actionType = 'resize';
        break;
      case 'positionX':
        this.config.position.x = val;
        actionType = 'move';
        break;
      case 'positionY':
        this.config.position.y = val;
        actionType = 'move';
        break;
    }

    if (actionType) {
      this.mediator.recordHistory(config, actionType);
      console.log();
      const { id, size, position } = this.config;
      actionType === 'resize' ? this.mediator.resizeComponent(id, size, position) : this.mediator.movingComponent(id, position);
    }
  }

  styleDataChange(val: number | string | EditorImageOption, field: string): void {
    let changeValue = val;
    this.config.props.styles = {
      ...this.config.props.styles,
      [field]: changeValue
    };
    this.formData.styles = {
      ...this.formData.styles,
      [field]: changeValue
    };
    this.emitUpdate();
  }

  updateOptions(options: AgChartOptions | TableConfig | TextConfig, type: mainTypes): void {
    switch (type) {
      case 'chart':
        this.config = {
          ...this.config,
          props: {
            ...this.config.props,
            chart: options
          }
        };
        break;
      case 'table':
        this.config = {
          ...this.config,
          props: {
            ...this.config.props,
            table: options
          }
        };
        break;
      case 'text':
        this.config = {
          ...this.config,
          props: {
            ...this.config.props,
            text: options
          }
        };
        break;
    }
    this.emitUpdate();
  }

  private emitUpdate(): void {
    const newConfig = cloneDeep(this.config);

    console.log(`emitUpdate`, newConfig);
    console.log(JSON.stringify(newConfig));
    this.mediator.updateComponent(newConfig);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
