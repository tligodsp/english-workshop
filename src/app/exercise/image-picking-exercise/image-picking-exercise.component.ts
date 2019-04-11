import { Component, OnInit } from '@angular/core';
import { VieEngImagePickingExercise } from '../../models/exercise';
import { VocabularyService } from '../../vocabulary.service';
import { Vocabulary } from '../../models/vocabulary';
import { Output, EventEmitter } from '@angular/core'; 

@Component({
  selector: 'app-image-picking-exercise',
  templateUrl: './image-picking-exercise.component.html',
  styleUrls: ['./image-picking-exercise.component.css']
})
export class ImagePickingExerciseComponent implements OnInit {
  exercise: VieEngImagePickingExercise = new VieEngImagePickingExercise();
  vocabData: Vocabulary[];
  @Output() sendAnswerEvent = new EventEmitter<Object>();

  constructor(private vocabularyService: VocabularyService) { }

  sendAnswer(option: Vocabulary) {
    this.sendAnswerEvent.emit({ chosenAnswer: option.engWord, correctAnswers: this.exercise.correctAnswers  });
  }

  ngOnInit() {
    this.vocabularyService.getVocabularies()
        .subscribe(vocabularies => this.vocabData = vocabularies);
    this.exercise.initExercise(this.vocabData);
  }

}
