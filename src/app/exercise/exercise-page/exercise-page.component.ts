import { Component, OnInit } from '@angular/core';
import { ImagePickingExerciseComponent } from '../image-picking-exercise/image-picking-exercise.component';
import { Exercise } from '../../models/exercise';

@Component({
  selector: 'app-exercise-page',
  templateUrl: './exercise-page.component.html',
  styleUrls: ['./exercise-page.component.css']
})
export class ExercisePageComponent implements OnInit {
  chosenAnswer: string;
  correctAnswers: string[] = [];
  isCorrect: boolean = null;

  constructor() { }

  ngOnInit() {
  }

  saveAnswer($event) {
    //console.log($event);
    this.chosenAnswer = $event.chosenAnswer;
    this.correctAnswers = $event.correctAnswers;
  }

  checkAnswer() {
    if (this.correctAnswers.includes(this.chosenAnswer)) {
      this.isCorrect = true;
    }
    else {
      this.isCorrect = false;
    }
  }

  nextQuestion() {
    
  }

}
