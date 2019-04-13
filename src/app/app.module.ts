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
import { VocabPickingExerciseComponent } from './exercise/vocab-picking-exercise/vocab-picking-exercise.component';
import { PictureTranslatingComponent } from './exercise/picture-translating/picture-translating.component';
import { SentenceTranslatingComponent } from './exercise/sentence-translating/sentence-translating.component';
import { ResultPageComponent } from './exercise/result-page/result-page.component';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
   declarations: [
      AppComponent,
      ShowcaseComponent,
      WelcomePageComponent,
      ExercisePageComponent,
      SentenceCorrectingComponent,
      ImagePickingExerciseComponent,
      VocabPickingExerciseComponent,
      PictureTranslatingComponent,
      SentenceTranslatingComponent,
      ResultPageComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ModalModule.forRoot(),
      TooltipModule.forRoot(),
      NgCircleProgressModule.forRoot({
         // set defaults here
         radius: 100,
         outerStrokeWidth: 16,
         innerStrokeWidth: 8,
         outerStrokeColor: "#78C000",
         innerStrokeColor: "#C7E596",
         animationDuration: 300,
       }),
      PopoverModule.forRoot(),
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
