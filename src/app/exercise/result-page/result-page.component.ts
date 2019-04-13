import { Component, OnInit } from '@angular/core';
import { ExerciseResultHelper } from '../../helpers/exercise-result-helper';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
  correctAnswers = 8;
  speed = ExerciseResultHelper.getTimeInMinFromSecond(100);
  accuracy = ExerciseResultHelper.getAccuracy(1, 3);
  totalPoints = 1358;

  constructor() { }

  ngOnInit() {
  }

}
