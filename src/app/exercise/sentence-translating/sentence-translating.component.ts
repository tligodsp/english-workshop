import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  @Input() courseKey: string;
  @Output() sendAnswerEvent = new EventEmitter<Object>();

  constructor() { }

  ngOnInit() {
    const filteredSentences = SENTENCES.filter(data => data.courseKey === this.courseKey);

    // TODO: Get sentences bằng http
    this.exercise.initExercise(filteredSentences);
    this.userInput = '';

    this.sendAnswer(); // Ko sendAnswer ở đây thì nếu để trống mà bấm Xác nhận sẽ bị lỗi
  }

  sendAnswer() {
    this.sendAnswerEvent.emit({ chosenAnswer: this.userInput, 
                                correctAnswers: this.exercise.correctAnswers,
                                exerciseDetail: this.exercise.exerciseDetail });
  }

}
