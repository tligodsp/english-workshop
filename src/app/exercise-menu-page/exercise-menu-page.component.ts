import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { COURSES } from '../mock-courses';
import { Course } from '../models/course';
import { SharedDataService } from '../services/shared-data.service';
import { Router } from '@angular/router';
import { TimeHelper } from '../helpers/time-helper';
import { UserService } from '../services/user.service';
import { FirebaseService } from '../services/firebase.service';
import { CourseService } from '../services/course.service';
import { ExerciseDataService } from '../services/exercise-data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-exercise-menu-page',
  templateUrl: './exercise-menu-page.component.html',
  styleUrls: ['./exercise-menu-page.component.css']
})
export class ExerciseMenuPageComponent implements OnInit {
  user: User;
  // currentExp: number = 5;
  // targetExp: number = 20;
  timeLeft: number; //in millisecond

  courses: Course[];

  constructor(
    private sharedData: SharedDataService,
    private router: Router,
    private userService: UserService,
    private firebaseService: FirebaseService,
    private courseService: CourseService,
    private exerciseDataService: ExerciseDataService,
    private authService: AuthService
  ) { 
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.sharedData.curUser = user;
    });
    //this.firebaseService.addStuff();
    
    this.exerciseDataService.getVieWords().subscribe(vieWords => {
      this.sharedData.vieWords = vieWords;
      //console.log(vieWords);
    });
    this.exerciseDataService.getVocabularies().subscribe(vocabularies => {
      this.sharedData.vocabList = vocabularies;
      //console.log(vocabularies);
    });
    this.exerciseDataService.getSentences().subscribe(sentences => {
      this.sharedData.sentenceList = sentences;
      //console.log(sentences);
    });
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
      //console.log(courses);
    });
  }

  ngOnInit() {
    //this.getUserFromLocalStorage();
    //this.getCourses();
    this.timeLeft = TimeHelper.getTimeTillMidnight();
    console.log(this.timeLeft);
  }
  

  // getCourses() {
  //   this.courses = COURSES;
  // }

  // getUserFromLocalStorage() {
  //   const localUser = JSON.parse(localStorage.getItem('user'));
  //   this.user = localUser;
  //   this.user.role = 'admin';
  // }

  getPercent():number {
    return (this.user.todayExp / this.user.difficulty.minutes) * 100;
  }

  selectCourse(course: Course) {
    this.sharedData.selectedCourse = course;
    //console.log(this.sharedData.vieWords);
    this.router.navigateByUrl('/exercise');
  }

  onDateChange() {
    //this.router.navigateByUrl('/exercise-menu'); //reload at midnight
    //console.log('midnight');
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

  navigateToShowcase() {
    this.router.navigateByUrl('/showcase');
  }

  logOut() {
    this.authService.signOut().then(() => {
      this.navigateToShowcase();
    });

  }

}
