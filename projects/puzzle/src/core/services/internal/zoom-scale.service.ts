import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZoomScaleService {
  // 正向缩放（外层缩放）
  private readonly _scale = signal(1);
  readonly scale = this._scale.asReadonly();

  setScale(value: number) {
    console.log(`setScale: ${value}`);
    this._scale.set(value);
  }

  get reverseZoom() {
    const s = this._scale();
    return s === 0 ? 1 : 1 / s;
  }
}
