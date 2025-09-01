import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppExampleComponentsComponent } from './components/components.component';
import { AppPuzzleComponent } from './puzzle/puzzle.component';

const routes: Routes = [
    {
        path: 'components',
        component: AppExampleComponentsComponent,
        children: [
            { path: '', redirectTo: 'basic', pathMatch: 'full' },
            { path: 'basic', component: AppPuzzleComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
