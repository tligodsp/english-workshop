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
    private sharedDataService: SharedDataService,
    private router: Router,
    private userService: UserService,
    private firebaseService: FirebaseService,
    private courseService: CourseService,
    private exerciseDataService: ExerciseDataService,
    private authService: AuthService
  ) { 
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.sharedDataService.curUser = user;
    });
    this.firebaseService.addStuff();
    
    this.exerciseDataService.getVieWords().subscribe(vieWords => {
      this.sharedDataService.vieWords = vieWords;
      //console.log(vieWords);
    });
    this.exerciseDataService.getVocabularies().subscribe(vocabularies => {
      this.sharedDataService.vocabList = vocabularies;
      //console.log(vocabularies);
    });
    this.exerciseDataService.getSentences().subscribe(sentences => {
      this.sharedDataService.sentenceList = sentences;
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
    // this.authService.user$.subscribe(user => {
    //   this.sharedDataService.curUser = user;
    //   console.log(this.sharedDataService.curUser);
    //   if (!this.sharedDataService.curUser.lastDidExercise) {
    //     this.sharedDataService.curUser.todayExp = 0;
    //     this.sharedDataService.curUser.streak = 0;
    //     this.userService.updateUserData(this.sharedDataService.curUser);
    //   }
    //   else if (this.sharedDataService.curUser.lastDidExercise) {
    //     let d = new Date();
    //     let userLastDidExercise = this.sharedDataService.curUser.lastDidExercise.toDate();
    //     if (TimeHelper.getDaysBetween(d, userLastDidExercise) > 1.5) {
    //       this.sharedDataService.curUser.todayExp = 0;
    //       this.sharedDataService.curUser.streak = 0;
    //       this.userService.updateUserData(this.sharedDataService.curUser);
    //     } 
    //     if (d > userLastDidExercise && d.getDate() !== userLastDidExercise.getDate()) {
    //       this.sharedDataService.curUser.todayExp = 0;
    //     }
    //     //console.log(TimeHelper.getDaysBetween((new Date()), this.sharedDataService.curUser.lastDidExercise.toDate()))
    //     this.userService.updateUserData(this.sharedDataService.curUser);
    //   }
    // });
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
    this.sharedDataService.selectedCourse = course;
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
