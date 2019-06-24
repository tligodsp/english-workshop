import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../models/user';
import { DifficultyService } from './difficulty.service';
import { Difficulty } from '../models/difficulty';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, private difficultyService: DifficultyService) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else
          return of(null);
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  public updateUserData(user) {
    //Set user data to firestore on login
    //console.log(user.uid);
    // const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const userRef = this.afs.collection('users').doc(user.uid);

    // let dif: Difficulty = { id: 1, name: 'Vừa', minutes: 10};
    // this.difficultyService.getDifficulty(user.difficultyId)
    //   .subscribe((difficulty: Difficulty) => {
    //     dif = difficulty;
    //   });
    
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      totalExp: user.totalExp,
      todayExp: user.todayExp,
      streak: user.streak, //days
      difficultyId: user.difficultyId,
      difficulty: user.difficulty,
      totalPoints: user.totalPoints,
      role: user.role,
    }

    return userRef.set(data, { merge: true });
  }
}
