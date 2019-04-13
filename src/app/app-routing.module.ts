import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowcaseComponent } from './showcase/showcase.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ExercisePageComponent } from './exercise/exercise-page/exercise-page.component';
import { ExerciseMenuPageComponent } from './exercise-menu-page/exercise-menu-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/showcase', pathMatch: 'full' },
  { path: 'showcase', component: ShowcaseComponent },
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'exercise', component: ExercisePageComponent },
  { path: 'exercise-menu', component: ExerciseMenuPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
