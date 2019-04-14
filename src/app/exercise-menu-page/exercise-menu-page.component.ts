import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { COURSES } from '../mock-courses';
import { Course } from '../models/course';
import { SharedDataService } from '../services/shared-data.service';
import { Router } from '@angular/router';
import { TimeHelper } from '../helpers/time-helper';

@Component({
  selector: 'app-exercise-menu-page',
  templateUrl: './exercise-menu-page.component.html',
  styleUrls: ['./exercise-menu-page.component.css']
})
export class ExerciseMenuPageComponent implements OnInit {
  user: User;
  currentExp: number = 5;
  targetExp: number = 20;
  timeLeft: number; //in millisecond

  courses: Course[];

  constructor(
    private sharedData: SharedDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserFromLocalStorage();
    this.getCourses();
    this.timeLeft = TimeHelper.getTimeTillMidnight();
    console.log(this.timeLeft);
  }
  

  getCourses() {
    this.courses = COURSES;
  }

  getUserFromLocalStorage() {
    const localUser = JSON.parse(localStorage.getItem('user'));
    this.user = localUser;
  }

  getPercent():number {
    return (this.user.todayExp / this.user.difficulty.minutes) * 100;
  }

  selectCourse(course: Course) {
    this.sharedData.selectedCourse = course;
    this.router.navigateByUrl('/exercise');
  }

  onDateChange() {
    //this.router.navigateByUrl('/exercise-menu'); //reload at midnight
    //console.log('midnight');
  }

}
