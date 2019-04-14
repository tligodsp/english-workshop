import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

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
  @Input() courseKey: string;
  @Output() sendAnswerEvent = new EventEmitter<Object>();

  constructor() { }

  ngOnInit() {
    const filteredSentences = SENTENCES.filter(data => data.courseKey === this.courseKey);

    // TODO: Get sentences bằng http
    this.exercise.initExercise(filteredSentences);

    this.sendAnswer(); // Chủ yếu để send correctAnswers
  }

  sendAnswer() {
    const chosenAnswer = this.wordsChoosing.join(' ');
    const correctAnswers = this.exercise.correctAnswers;
    this.sendAnswerEvent.emit({ chosenAnswer, correctAnswers, exerciseDetail: this.exercise.exerciseDetail  });
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
