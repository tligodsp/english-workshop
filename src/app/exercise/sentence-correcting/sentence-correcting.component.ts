import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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
  @Output() sendAnswerEvent = new EventEmitter<Object>();

  constructor() { }

  ngOnInit() {
    // TODO: Get sentences bằng http
    this.exercise.initExercise(SENTENCES);
  }

  sendAnswer() {
    const chosenAnswer = this.wordsChoosing.join(' ');
    const correctAnswers = this.exercise.correctAnswers;
    this.sendAnswerEvent.emit({ chosenAnswer, correctAnswers });
  }

  chooseWord(word: string) {
    this.wordsChoosing.push(word);
    
    this.sendAnswer();
  }

  removeWord(word: string) {
    this.wordsChoosing = ArrayHelper.removeItemByValue(this.wordsChoosing, word);

    this.sendAnswer();
  }
}
