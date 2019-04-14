import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  selectedCourse: Course;

  constructor() { }

}
