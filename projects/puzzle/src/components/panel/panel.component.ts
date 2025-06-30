import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CustomIconDirective } from 'app/directive/custom-icon.directive';
import { CHART_SERIES_TYPE_OPTIONS, INIT_SETTINGS_CONFIG } from 'ngx-puzzle/core/constants';
import { CdkDrag, CdkDragEnd, CdkDropList } from '@angular/cdk/drag-drop';
import { CanvasMediatorService } from 'ngx-puzzle/core/mediator/canvas-mediator.service';
import { ComponentConfig } from 'ngx-puzzle/core/interfaces';
import { generateUUID } from 'app/utils';
import { mainTypes } from 'ngx-puzzle/core/types';
import { ChartTypesEnum, TextTypesEnum, TableTypesEnum } from 'ngx-puzzle/core/enums';
import { Tooltip } from 'primeng/tooltip';
import { TABLE_TYPE_OPTIONS } from 'ngx-puzzle/core/constants/table-list';
import { TEXT_TYPE_OPTIONS } from 'ngx-puzzle/core/constants/text-list';

@Component({
	selector: 'app-panel',
	standalone: true,
	imports: [CustomIconDirective, CdkDropList, CdkDrag, Tooltip],
	templateUrl: './panel.component.html',
	styleUrl: './panel.component.scss',
})
export class PanelComponent implements OnInit, AfterViewInit {
	private canvasElement!: HTMLElement;

	private canvasContainer!: HTMLElement;

	public chartList = CHART_SERIES_TYPE_OPTIONS;

	public tableList = TABLE_TYPE_OPTIONS;

	public textList = TEXT_TYPE_OPTIONS;

	constructor(private mediator: CanvasMediatorService) {}

	ngOnInit() {}

	ngAfterViewInit() {
		this.canvasElement = document.getElementById('canvas') as HTMLElement;
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
					y: parseInt(`${dropPoint.y - canvasEleRect.top - 20 + offsetTop}`),
				},
			};
			console.log(`config`, config);
			this.mediator.addComponent(config);
		}
	}
}
