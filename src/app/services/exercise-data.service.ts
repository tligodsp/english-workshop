import { Injectable } from '@angular/core';
import { Vocabulary } from '../models/vocabulary';
import { VOCABULARIES } from '../mock-vocabularies';
import { Sentence } from '../models/sentence';
import { Observable, of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseDataService {
  constructor(private firebaseService: FirebaseService) {}

  getVocabularies(): Observable<Vocabulary[]> {
    return of(this.firebaseService.getVocabularies());
  }

  getSentences(): Observable<Sentence[]> {
    return of(this.firebaseService.getSentences());
  }

  getVieWords(): Observable<string[]> {
    return of(this.firebaseService.getVieWordList());
  }
}
