import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ExercisePageComponent } from './exercise/exercise-page/exercise-page.component';
import { SentenceCorrectingComponent } from './exercise/sentence-correcting/sentence-correcting.component';
import { ImagePickingExerciseComponent } from './exercise/image-picking-exercise/image-picking-exercise.component';
import { PictureTranslatingComponent } from './exercise/picture-translating/picture-translating.component';
import { SentenceTranslatingComponent } from './exercise/sentence-translating/sentence-translating.component';

@NgModule({
   declarations: [
      AppComponent,
      ShowcaseComponent,
      WelcomePageComponent,
      ExercisePageComponent,
      SentenceCorrectingComponent,
      ImagePickingExerciseComponent,
      PictureTranslatingComponent,
      SentenceTranslatingComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ModalModule.forRoot(),
      TooltipModule.forRoot(),
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
