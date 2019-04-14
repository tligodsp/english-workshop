import { Component, OnInit, Input } from '@angular/core';
import { PictureTraslatingExercise } from '../../models/exercise';
import { VocabularyService } from '../../vocabulary.service';
import { Vocabulary } from '../../models/vocabulary';
import { Output, EventEmitter } from '@angular/core'; 

@Component({
  selector: 'app-picture-translating',
  templateUrl: './picture-translating.component.html',
  styleUrls: ['./picture-translating.component.css']
})
export class PictureTranslatingComponent implements OnInit {
  exercise: PictureTraslatingExercise = new PictureTraslatingExercise();
  vocabData: Vocabulary[];
  userInput: string;
  @Input() courseKey: string;
  @Output() sendAnswerEvent = new EventEmitter<Object>();

  constructor(private vocabularyService: VocabularyService) { }

  sendAnswer() {
    this.sendAnswerEvent.emit({ chosenAnswer: this.userInput, 
                                correctAnswers: this.exercise.correctAnswers,
                                exerciseDetail: this.exercise.exerciseDetail  });
  }

  ngOnInit() {
    this.vocabularyService.getVocabularies()
        .subscribe(vocabularies => this.vocabData = vocabularies);

    this.vocabData = this.vocabData.filter(data => data.courseKey === this.courseKey);

    this.exercise.initExercise(this.vocabData);
    this.userInput = '';
    this.sendAnswer();
  }

}
