import { Component } from '@angular/core';
import { ThyContent, ThyLayout } from 'ngx-tethys/layout';
import { NgxPuzzleComponent } from 'ngx-puzzle';

@Component({
    selector: 'example-puzzle',
    standalone: true,
    templateUrl: './puzzle.component.html',
    imports: [ThyLayout, ThyContent, NgxPuzzleComponent],
    styleUrl: './puzzle.component.scss'
})
export class AppPuzzleComponent {}
