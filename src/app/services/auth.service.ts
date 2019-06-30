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
import * as firebase from 'firebase/app'
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  //authState: FirebaseAuthState = null

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, private difficultyService: DifficultyService, private toastrService: ToastrService) {
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

  async getCurUserData() {
    //this.afAuth.user.
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
      photoURL: user.photoURL,
      totalPoints: user.totalPoints,
      role: user.role,
      lastDidExercise: user.lastDidExercise ? user.lastDidExercise: null,
    }

    return userRef.set(data, { merge: true });
  }

  updateUserPassword(oldPassword: string, newPassword: string) {
    const currentUser = this.afAuth.auth.currentUser;

    const credential = auth.EmailAuthProvider.credential(currentUser.email, oldPassword);
    currentUser.reauthenticateWithCredential(credential).then(
      success => {
        if (newPassword.length < 6) {
          this.toastrService.error('Mật khẩu phải có ít nhất 6 ký tự', 'Thất bại', { timeOut: 2000, positionClass: 'toast-bottom-center' });
          return;
        }

        this.afAuth.auth.currentUser.updatePassword(newPassword)
          .then(() => this.toastrService.success('Đổi mật khẩu thành công', 'Thành công', { timeOut: 2000, positionClass: 'toast-bottom-center' }))
          .catch((err) => this.toastrService.error(err, 'Thất bại', { timeOut: 2000, positionClass: 'toast-bottom-center' }));
      },
      error => {
        console.log(error);
        if(error.code === "auth/wrong-password"){
          this.toastrService.error('Mật khẩu cũ không đúng', 'Thất bại', { timeOut: 2000, positionClass: 'toast-bottom-center' });
        }

      }
    )
  }
}
