import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Difficulty } from "../models/difficulty";
import { User } from "../models/user";
import { Observable, of } from "rxjs";
import { COURSES } from '../mock-courses';
import { SENTENCES } from '../mock-sentences';
import { VOCABULARIES } from '../mock-vocabularies';
import { VIE_WORDS } from '../mock-words';
import { Course } from '../models/course';
import { Vocabulary } from '../models/vocabulary';
import { Sentence } from '../models/sentence';
import { ID } from '../helpers/ultil';
import * as firebase from 'firebase/app'

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  constructor(public db: AngularFirestore) {}

  addStuff() {
    // For migrating mock datas to server
    // COURSES.forEach(item => {
    //   console.log(item);
    //   this.db.collection("courses").doc(item.key).set(item);
    // });
    // this.db.collection("exercise-data").doc("0").collection("words").doc("vie-word").set({
    //   wordList: VIE_WORDS
    // });
    SENTENCES.forEach(item => {
      console.log(item);
      let newId = ID();
      this.db.collection('exercise-data').doc('0').collection('sentences').doc(newId).set({ ...item, id: newId });
    });
  }

  updateUserData(user: User) {
    const userRef = this.db.collection('users').doc(user.uid);
    
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      totalExp: user.totalExp,
      todayExp: user.todayExp,
      streak: user.streak,
      difficultyId: user.difficultyId,
      difficulty: user.difficulty,
      totalPoints: user.totalPoints,
      role: user.role,
      photoURL: user.photoURL,
      
    }

    return userRef.set(data, { merge: true });
  }

  updateCourse(course: Course) {
    this.db.collection('courses').doc(course.key).set({ ...course }, { merge: true });
  }

  updateVocabulary(vocab: Vocabulary) {
    this.db.collection('exercise-data').doc('0').collection('vocabularies').doc(vocab.id).set({ ...vocab }, { merge: true });
  }

  updateSentence(sentence: Sentence) {
    this.db.collection('exercise-data').doc('0').collection('sentences').doc(sentence.id).set({ ...sentence }, { merge: true });
  }

  updateVieWord(newWordList: string[]) {
    this.db.collection('exercise-data').doc('0').collection('words').doc('vie-word').update({
      wordList: newWordList
    });
  }

  createCourse(course: Course) {
    this.db.collection('courses').doc(course.key).set({ ...course });
    // return this.db.collection('courses').doc(course.key).set(course).then(() => console.log("email sent"))
    // .catch((error) => console.log('error'));
  }

  createVocabulary(vocab: Vocabulary) {
    this.db.collection('exercise-data').doc('0').collection('vocabularies').doc(vocab.id).set({ ...vocab });
  }

  createSentence(sentence: Sentence) {
    let newId = ID();
    this.db.collection('exercise-data').doc('0').collection('sentences').doc(newId).set({ ...sentence, id: newId });
  }

  createVieWord(word: string) {
    this.db.collection('exercise-data').doc('0').collection('words').doc('vie-word').update({
      wordList: firebase.firestore.FieldValue.arrayUnion(word)
    });
  }

  deleteCourse(courseKey: string) {
    this.db.collection('courses').doc(courseKey).delete();
  }

  deleteVocavulary(vocabId: string) {
    this.db.collection('exercise-data').doc('0').collection('vocabularies').doc(vocabId).delete();
  }

  deleteSentence(sentenceId: string) {
    this.db.collection('exercise-data').doc('0').collection('sentences').doc(sentenceId).delete();
  }

  deleteVieWord(word: string) {
    this.db.collection('exercise-data').doc('0').collection('words').doc('vie-word').update({
      wordList: firebase.firestore.FieldValue.arrayRemove(word)
    });
  }

  getCoursesValueChanges() {
    return this.db.collection('courses').valueChanges();
  }

  getVocabulariesValueChanges() {
    return this.db.collection('exercise-data').doc('0').collection('vocabularies').valueChanges();
  }

  getSentencesValueChanges() {
    return this.db.collection('exercise-data').doc('0').collection('sentences').valueChanges();
  }

  getVieWordsValueChanges() {
    return this.db.collection('exercise-data').doc('0').collection('words').doc('vie-word').valueChanges();
  }

  getCourses(): Course[] {
    let res: Course[] = [];
    this.db.collection('courses').get().toPromise().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // res.push({ ...doc.data() });
        res.push({
          key: doc.data().key,
          title: doc.data().title,
          maxQuestionNumber: doc.data().maxQuestionNumber,
          description: doc.data().description,
          logoUrl: doc.data().logoUrl,
          backgroundColor: doc.data().backgroundColor,
          exp: doc.data().exp
        });
      });
      //console.log('in');
    });
    //console.log('out');
    return res;
  }

  getVocabularies(): Vocabulary[] {
    let res: Vocabulary[] = [];
    this.db.collection('exercise-data').doc('0').collection('vocabularies').get().toPromise().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // res.push({ ...doc.data() });
        res.push({
          id: doc.data().id,
          courseKey: doc.data().courseKey,
          engWord: doc.data().engWord,
          vieMeaning: doc.data().vieMeaning,
          illustration: doc.data().illustration
        });
      });
    });
    return res;
  }

  getSentences(): Sentence[] {
    let res: Sentence[] = [];
    this.db.collection('exercise-data').doc('0').collection('sentences').get().toPromise().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // res.push({ ...doc.data() });
        res.push({
          courseKey: doc.data().courseKey,
          eng: doc.data().eng,
          vie: doc.data().vie,
          id: doc.data().id
        });
      });
      //console.log('sentence in');
    });
    //console.log('sentence out');
    return res;
  }

  getVieWordList(): string[] {
    let res: string[] = [];
    this.db.collection('exercise-data').doc('0').collection('words').doc('vie-word').get().toPromise().then(doc => {
      doc.data().wordList.forEach(word => {
        res.push(word);
      });
    });
    return res;
  }

  getDifficulties(): Difficulty[] {
    let res: Difficulty[] = [];
    this.db.collection('difficulties').get().toPromise().then(querySnapshot => {
      querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          //console.log(doc.data().id);
          res.push({ id: doc.data().id, name: doc.data().name, minutes: doc.data().minutes });
      });
    });
    //console.log(res);
    return res;
  }

  getDifficulty(id: string): Difficulty {
    var docRef = this.db.collection('difficulties').doc(id);

    docRef.get().toPromise().then(doc => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            return {id: doc.data().id, name: doc.data().name, minutes: doc.data().minutes};
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(error => {
        console.log("Error getting document:", error);
    });
    return null;
  }
}
