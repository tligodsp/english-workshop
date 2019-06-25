import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { FirebaseService } from "./firebase.service";

import { Course } from "../models/course";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private firebaseService: FirebaseService) {}

  getCourses(): Observable<Course[]> {
    return of(this.firebaseService.getCourses());
  }

}
