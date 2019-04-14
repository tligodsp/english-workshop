import { Component, OnInit } from '@angular/core';
import { VocabularyService } from '../../vocabulary.service';
import { Vocabulary } from '../../models/vocabulary';
import {VocabPickingExercise} from '../../models/exercise';
import { Output, EventEmitter } from '@angular/core'; 

@Component({
  selector: 'app-vocab-picking-exercise',
  templateUrl: './vocab-picking-exercise.component.html',
  styleUrls: ['./vocab-picking-exercise.component.css']
})
export class VocabPickingExerciseComponent implements OnInit {
  exercise: VocabPickingExercise = new VocabPickingExercise(); // dang bai tap
  vocabData: Vocabulary[];
  chosenId: number;
  @Output() sendAnswerEvent = new EventEmitter<Object>();

  constructor(private vocabularyService: VocabularyService) { }

  sendAnswer(option: Vocabulary, index: number) {
    this.chosenId = index;
    this.sendAnswerEvent.emit({ chosenAnswer: option.engWord, 
                                correctAnswers: this.exercise.correctAnswers,
                                exerciseDetail: this.exercise.exerciseDetail  });
  }

  ngOnInit() {
    this.vocabularyService.getVocabularies()
        .subscribe(vocabularies => this.vocabData = vocabularies);
    this.exercise.initExercise(this.vocabData);
    this.chosenId = -1;
  }

}
