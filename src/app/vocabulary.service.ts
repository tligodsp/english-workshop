import { Injectable } from '@angular/core';
import { Vocabulary } from './models/vocabulary';
import { VOCABULARIES } from './mock-vocabularies';
import { Observable, of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {
  vocabList: any;
  constructor(db: AngularFireDatabase) {
    //console.log('aaaaaaa');
    db.list('exercise-datas/vocabularies').snapshotChanges()
      .subscribe(vocabList => {
        this.vocabList = vocabList;
        console.log(this.vocabList);
      })
  }
  getVocabularies(): Observable<Vocabulary[]> {
    return of(VOCABULARIES);
  } 
}
