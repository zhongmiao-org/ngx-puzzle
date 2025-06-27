import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPuzzleComponent } from './puzzle.component';

@NgModule({
    imports: [NgxPuzzleComponent, CommonModule],
    exports: [NgxPuzzleComponent]
})
export class NgxPuzzleModule {}
