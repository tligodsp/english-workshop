import { Component, OnInit } from '@angular/core';

import { SentenceCorrectingExercise } from '../../models/exercise';
import { SENTENCES } from '../../mock-sentences';

@Component({
  selector: 'app-sentence-correcting',
  templateUrl: './sentence-correcting.component.html',
  styleUrls: ['./sentence-correcting.component.css']
})
export class SentenceCorrectingComponent implements OnInit {
  exercise: SentenceCorrectingExercise = new SentenceCorrectingExercise();

  constructor() { }

  ngOnInit() {
    // TODO: Get sentences bằng http
    this.exercise.initExercise(SENTENCES);
  }

  test() {
    console.log(this.exercise.chosenSentence);
    console.log(this.exercise.wordsToChoose);
  }
}
