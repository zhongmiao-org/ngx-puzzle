import { Routes } from '@angular/router';
import { AppExampleComponentsComponent } from './components/components.component';
import { BasicPuzzleComponent } from './components/basic/basic-puzzle.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'components',
    component: AppExampleComponentsComponent,
    children: [
      { path: '', redirectTo: 'basic', pathMatch: 'full' },
      { path: 'basic', component: BasicPuzzleComponent }
    ]
  }
];
