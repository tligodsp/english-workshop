import { Component, OnInit } from '@angular/core';

import { SentenceCorrectingExercise } from '../../models/exercise';
import { SENTENCES } from '../../mock-sentences';
import { ArrayHelper } from 'src/app/helpers/array-helper';

@Component({
  selector: 'app-sentence-correcting',
  templateUrl: './sentence-correcting.component.html',
  styleUrls: ['./sentence-correcting.component.css']
})
export class SentenceCorrectingComponent implements OnInit {
  exercise: SentenceCorrectingExercise = new SentenceCorrectingExercise();
  wordsChoosing: string[] = [];

  constructor() { }

  ngOnInit() {
    // TODO: Get sentences bằng http
    this.exercise.initExercise(SENTENCES);
  }

  chooseWord(word: string) {
    this.wordsChoosing.push(word);
  }

  removeWord(word: string) {
    this.wordsChoosing = ArrayHelper.removeItemByValue(this.wordsChoosing, word);
  }
}
