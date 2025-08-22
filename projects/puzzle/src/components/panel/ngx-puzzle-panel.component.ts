import { AfterViewInit, Component, HostBinding, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CHART_SERIES_TYPE_OPTIONS, INIT_SETTINGS_CONFIG, TEXT_TYPE_OPTIONS, TABLE_TYPE_OPTIONS } from '../../core/constants';
import { CdkDrag, CdkDragEnd, CdkDropList } from '@angular/cdk/drag-drop';
import { PuzzleCanvasMediatorService } from 'ngx-puzzle/core/mediator/puzzle-canvas-mediator.service';
import { ComponentConfig } from 'ngx-puzzle/core/interfaces';
import { mainTypes } from 'ngx-puzzle/core/types';
import { ChartTypesEnum, TextTypesEnum, TableTypesEnum } from 'ngx-puzzle/core/enums';
import { generateUUID } from '../../utils';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
  selector: 'ngx-puzzle-panel, puzzle-panel',
  standalone: true,
  imports: [CdkDropList, CdkDrag, ThyTooltipDirective, ThyIcon],
  templateUrl: './ngx-puzzle-panel.component.html',
  styleUrl: './ngx-puzzle-panel.component.scss',
  host: {
    '[class.ngx-puzzle-panel]': `true`
  }
})
export class NgxPuzzlePanelComponent implements OnInit, AfterViewInit {
  private canvasElement!: HTMLElement;

  private canvasContainer!: HTMLElement;

  private mediator = inject(PuzzleCanvasMediatorService);

  public chartList = CHART_SERIES_TYPE_OPTIONS;

  public tableList = TABLE_TYPE_OPTIONS;

  public textList = TEXT_TYPE_OPTIONS;

  ngOnInit() {}

  ngAfterViewInit() {
    this.canvasElement = document.getElementById('puzzle-canvas') as HTMLElement;
    this.canvasContainer = document.getElementById('canvas-container') as HTMLElement;
  }

  onDragEnded(event: CdkDragEnd, type: mainTypes, subType: ChartTypesEnum | TableTypesEnum | TextTypesEnum) {
    const canvasEleRect = this.canvasElement.getBoundingClientRect();
    const offsetTop = this.canvasContainer.scrollTop;
    const offsetLeft = this.canvasContainer.scrollLeft;
    const { dropPoint } = event;

    const isInCanvas =
      dropPoint.x >= canvasEleRect.left &&
      dropPoint.x <= canvasEleRect.right &&
      dropPoint.y >= canvasEleRect.top &&
      dropPoint.y <= canvasEleRect.bottom;
    if (isInCanvas) {
      const config: ComponentConfig = {
        ...INIT_SETTINGS_CONFIG[type],
        id: generateUUID(),
        subType,
        position: {
          x: parseInt(`${dropPoint.x - canvasEleRect.left - 25 + offsetLeft}`),
          y: parseInt(`${dropPoint.y - canvasEleRect.top - 20 + offsetTop}`)
        }
      };
      console.log(`config`, config);
      this.mediator.addComponent(config);
    }
  }
}
