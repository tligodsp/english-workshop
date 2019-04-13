import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SentenceTranslatingExercise } from '../../models/exercise';
import { SENTENCES } from '../../mock-sentences';

@Component({
  selector: 'app-sentence-translating',
  templateUrl: './sentence-translating.component.html',
  styleUrls: ['./sentence-translating.component.css']
})
export class SentenceTranslatingComponent implements OnInit {
  exercise: SentenceTranslatingExercise = new SentenceTranslatingExercise();
  userInput: string;
  @Output() sendAnswerEvent = new EventEmitter<Object>();

  constructor() { }

  ngOnInit() {
    // TODO: Get sentences bằng http
    this.exercise.initExercise(SENTENCES);
    this.userInput = '';
  }

  sendAnswer() {
    this.sendAnswerEvent.emit({ chosenAnswer: this.userInput, 
                                correctAnswers: this.exercise.correctAnswers,
                                exerciseDetail: this.exercise.exerciseDetail });
  }

}
