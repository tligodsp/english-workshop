import { Component, OnInit } from '@angular/core';
import { ImagePickingExerciseComponent } from '../image-picking-exercise/image-picking-exercise.component';
import { Exercise } from '../../models/exercise';

@Component({
  selector: 'app-exercise-page',
  templateUrl: './exercise-page.component.html',
  styleUrls: ['./exercise-page.component.css']
})
export class ExercisePageComponent implements OnInit {
  exerciseType: string;

  checkAnswer($event) {
    console.log($event);
    let chosenAnswer = $event.chosenAnswer;
    let correctAnswers = $event.correctAnswers;
    if (correctAnswers.includes(chosenAnswer)) {
      console.log('Correct');
    }
    else {
      console.log('Incorrect');
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
