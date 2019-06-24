import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { FirebaseService } from "./firebase.service";

import { Difficulty } from "../models/difficulty";
import { DIFFICULTIES } from "../mock-difficulties";

@Injectable({
  providedIn: "root"
})
export class DifficultyService {
  constructor(private firebaseService: FirebaseService) {}

  getDifficulties(): Observable<Difficulty[]> {
    // return of(DIFFICULTIES); // of ở đây để mô phỏng lệnh http.get, trả về 1 Observable
    // let darr: any;
    // this.firebaseService.getDifficulties().subscribe(result =>{
    //   darr = result;
    //   console.log(darr);
    // })
    // return darr;
    //return this.firebaseService.getDifficulties();
    return of(this.firebaseService.getDifficulties());
  }

  getDifficulty(id: string): Observable<Difficulty> {
    return of(this.firebaseService.getDifficulty(id));
  }
}
