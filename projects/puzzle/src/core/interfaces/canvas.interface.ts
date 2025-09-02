import { Point } from '@angular/cdk/drag-drop';

export interface Tick {
  position: number;
  label: string;
}

export interface TooltipPosition extends Point {
  left: number;
  top: number;
  width: number;
  height: number;
}
