import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowcaseComponent } from './showcase/showcase.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/showcase', pathMatch: 'full' },
  { path: 'showcase', component: ShowcaseComponent },
  { path: 'welcome', component: WelcomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
