import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppExampleComponentsComponent } from './components/components.component';
import { BasicPuzzleComponent } from './components/basic/basic-puzzle.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
