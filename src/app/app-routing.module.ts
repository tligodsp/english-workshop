import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowcaseComponent } from './showcase/showcase.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ExercisePageComponent } from './exercise/exercise-page/exercise-page.component';
import { ExerciseMenuPageComponent } from './exercise-menu-page/exercise-menu-page.component';
import { ResultPageComponent } from './exercise/result-page/result-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreateDataPageComponent } from './admin/create-data-page/create-data-page.component';
import { UpdateDataPageComponent } from './admin/update-data-page/update-data-page.component';
import { EditProfilePageComponent } from './edit-profile-page/edit-profile-page.component';
import { PostListComponent } from './forum/post-list/post-list.component';
import { PostPageComponent } from './forum/post-page/post-page.component';
import { TestStuffComponent } from './test-stuff/test-stuff.component';

const routes: Routes = [
  { path: '', redirectTo: '/showcase', pathMatch: 'full' },
  { path: 'showcase', component: ShowcaseComponent },
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'exercise', component: ExercisePageComponent },
  { path: 'exercise-menu', component: ExerciseMenuPageComponent },
  { path: 'exercise/result', component: ResultPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'admin/create-data', component: CreateDataPageComponent },
  { path: 'admin/update-data', component: UpdateDataPageComponent },
  { path: 'edit-profile', component: EditProfilePageComponent },
  { path: 'forum', component: PostListComponent },
  { path: 'forum/post/:id', component: PostPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
