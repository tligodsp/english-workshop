import { Component, OnInit } from '@angular/core';
import { VocabularyService } from '../../vocabulary.service';
import { Vocabulary } from '../../models/vocabulary';
import {VocabPickingExercise} from '../../models/exercise';
import { Output, EventEmitter, Input } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-vocab-picking-exercise',
  templateUrl: './vocab-picking-exercise.component.html',
  styleUrls: ['./vocab-picking-exercise.component.css']
})
export class VocabPickingExerciseComponent implements OnInit {
  exercise: VocabPickingExercise = new VocabPickingExercise(); // dang bai tap
  vocabData: Vocabulary[];
  chosenId: number;
  @Input() courseKey: string;
  @Output() sendAnswerEvent = new EventEmitter<Object>();

  constructor(private vocabularyService: VocabularyService, private exerciseService: ExerciseService,
    private sharedService: SharedDataService) { }

  sendAnswer(option: Vocabulary, index: number) {
    this.chosenId = index;
    this.sendAnswerEvent.emit({ chosenAnswer: option.engWord, 
                                correctAnswers: this.exercise.correctAnswers,
                                exerciseDetail: this.exercise.exerciseDetail  });
  }

  ngOnInit() {
    // this.vocabularyService.getVocabularies()
    //     .subscribe(vocabularies => this.vocabData = vocabularies);
    this.vocabData = this.sharedService.vocabList;

    this.vocabData = this.vocabData.filter(data => data.courseKey === this.courseKey);

    //this.exercise.initExercise(this.vocabData);
    this.exercise = this.exerciseService.initExerciseVocabPicking(this.vocabData);
    this.chosenId = -1;

    this.sendAnswerEvent.emit({ correctAnswers: this.exercise.correctAnswers });
  }

}
