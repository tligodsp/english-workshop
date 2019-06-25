import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { Vocabulary } from '../models/vocabulary';
import { Sentence } from '../models/sentence';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  selectedCourse: Course;
  vocabList: Vocabulary[];
  sentenceList: Sentence[];
  vieWords: string[];
  curUser: User;

  constructor() { }

}
