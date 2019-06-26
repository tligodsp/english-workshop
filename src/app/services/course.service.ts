import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { FirebaseService } from "./firebase.service";

import { Course } from "../models/course";
import { forEach } from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private firebaseService: FirebaseService) {}

  getCourses(): Observable<Course[]> {
    return of(this.firebaseService.getCourses());
  }

  createCourse(course: Course) {
    this.firebaseService.createCourse(course);
  }

  isNewKey(key: string, courseList: Course[]): Boolean {
    for (let course of courseList) {
      console.log(course);
      if (course.key === key) {
        return false;
      }
    }
    return true;
  }

}
