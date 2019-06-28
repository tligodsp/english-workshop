import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { FirebaseService } from "./firebase.service";
import { AuthService } from "./auth.service";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firebaseService: FirebaseService, private authService: AuthService) { }

  getCurrentUser(): Observable<User> {
    return this.authService.user$;
  }

  updateUserData(user: User) {
    return of(this.firebaseService.updateUserData(user));
  }

  getUsersValueChanges() {
    return this.firebaseService.getUsersValueChanges();
  }
}
