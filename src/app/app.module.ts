import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { CountdownModule } from 'ngx-countdown';

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
import { ExerciseMenuPageComponent } from './exercise-menu-page/exercise-menu-page.component';
import { ResultPageComponent } from './exercise/result-page/result-page.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatButtonModule,
   MatFormFieldModule,
   MatIconModule,
   MatInputModule,
   MatListModule,
   MatSelectModule,
   MatSidenavModule,
   MatCardModule,
   MatTableModule } from '@angular/material';

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
      ExerciseMenuPageComponent,
      ResultPageComponent,
      LoginPageComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ModalModule.forRoot(),
      TooltipModule.forRoot(),
      NgCircleProgressModule.forRoot(),
      PopoverModule.forRoot(),
      CountdownModule,
      BrowserAnimationsModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireDatabaseModule,
      NgxAuthFirebaseUIModule.forRoot(environment.firebase),
      MatButtonModule,
      MatFormFieldModule,
      MatIconModule,
      MatListModule,
      MatInputModule,
      MatSelectModule,
      MatSidenavModule,
      MatCardModule,
      MatTableModule
   ],
   providers: [ AngularFirestore ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
