import { Injectable } from '@angular/core';
import { Vocabulary } from './models/vocabulary';
import { VOCABULARIES } from './mock-vocabularies';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {
  getVocabularies(): Observable<Vocabulary[]> {
    return of(VOCABULARIES);
  } 
  constructor() { }
}
