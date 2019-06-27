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

  updateVocabulary(vocab: Vocabulary) {
    this.firebaseService.updateVocabulary(vocab);
  }

  updateSentence(sentence: Sentence) {
    this.firebaseService.updateSentence(sentence);
  }

  updateVieWord(wordList: string[]) {
    this.firebaseService.updateVieWord(wordList);
  }

  deleteVocabulary(vocabId: string) {
    this.firebaseService.deleteVocavulary(vocabId);
  }

  deleteSentence(sentenceId: string) {
    this.firebaseService.deleteSentence(sentenceId);
  }

  deleteVieWord(word: string) {
    this.firebaseService.deleteVieWord(word);
  }

  getVocabularies(): Observable<Vocabulary[]> {
    return of(this.firebaseService.getVocabularies());
  }

  getVocabulariesValueChanges() {
    return this.firebaseService.getVocabulariesValueChanges();
  }

  getSentences(): Observable<Sentence[]> {
    return of(this.firebaseService.getSentences());
  }

  getSentencesValueChanges() {
    return this.firebaseService.getSentencesValueChanges();
  }

  getVieWords(): Observable<string[]> {
    return of(this.firebaseService.getVieWordList());
  }

  getVieWordsValueChanges() {
    return this.firebaseService.getVieWordsValueChanges();
  }

  createVieWord(word: string) {
    this.firebaseService.createVieWord(word);
  }

  createVocabulary(vocab: Vocabulary) {
    this.firebaseService.createVocabulary(vocab);
  }

  createSentence(sentence: Sentence) {
    this.firebaseService.createSentence(sentence);
  }
}
