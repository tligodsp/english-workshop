import { Component, OnInit, Input } from '@angular/core';
import { VieEngImagePickingExercise } from '../../models/exercise';
import { VocabularyService } from '../../vocabulary.service';
import { Vocabulary } from '../../models/vocabulary';
import { Output, EventEmitter } from '@angular/core'; 
import { ExerciseService } from '../../services/exercise.service';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-image-picking-exercise',
  templateUrl: './image-picking-exercise.component.html',
  styleUrls: ['./image-picking-exercise.component.css']
})
export class ImagePickingExerciseComponent implements OnInit {
  exercise: VieEngImagePickingExercise = new VieEngImagePickingExercise();
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
    this.exercise = this.exerciseService.initExerciseVieEngImagePicking(this.vocabData);
    this.chosenId = -1;

    this.sendAnswerEvent.emit({ correctAnswers: this.exercise.correctAnswers });
  }

}
