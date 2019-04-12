import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise-page',
  templateUrl: './exercise-page.component.html',
  styleUrls: ['./exercise-page.component.css']
})
export class ExercisePageComponent implements OnInit {
  chosenAnswer: string;
  correctAnswers: string[];
  
  constructor() { }

  ngOnInit() {
  }

  saveAnswer($event) {
    //console.log($event);
    this.chosenAnswer = $event.chosenAnswer;
    this.correctAnswers = $event.correctAnswers;
  }


}
