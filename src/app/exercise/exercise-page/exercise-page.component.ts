import { Component, OnInit } from '@angular/core';


const TYPE_LIST = ['sentence-correcting', 'image-picking'];

@Component({
  selector: 'app-exercise-page',
  templateUrl: './exercise-page.component.html',
  styleUrls: ['./exercise-page.component.css']
})
export class ExercisePageComponent implements OnInit {
  currentExerciseType: string = '';
  currentQuestionNumber: number = 1;
  maxQuestionNumber: number = 12; // Tạm thời, sau này sẽ sửa thành @Input

  chosenAnswer: string;
  correctAnswers: string[] = [];
  isCorrect: boolean = null;

  constructor() { }

  ngOnInit() {
    this.generateRandomExerciseType();
    console.log(this.getProgressWidth());
  }

  getProgressWidth() {
    return (this.currentQuestionNumber / this.maxQuestionNumber) * 100;
  }

  generateRandomExerciseType() {
    let randomItem;
    do {
      randomItem = TYPE_LIST[Math.floor(Math.random()*TYPE_LIST.length)];
    } while (randomItem === this.currentExerciseType); // Chọn ra 1 dạng bài không trùng với dạng hiện tại

    this.currentExerciseType = randomItem;
  }

  saveAnswer($event) {
    //console.log($event);
    this.chosenAnswer = $event.chosenAnswer
    this.correctAnswers = $event.correctAnswers;
  }

  checkAnswer() {
    if (this.correctAnswers.includes(this.chosenAnswer.toLowerCase())) {
      this.isCorrect = true;
    }
    else {
      this.isCorrect = false;
    }
  }

  nextQuestion() {
    if (this.currentQuestionNumber >= this.maxQuestionNumber) {
      console.log('Kết thúc bài học. Lưu thông tin vào localStorage và navigate tới trang chọn bài học.');
      return;
    }

    this.currentQuestionNumber++;
    this.isCorrect = null;
    this.generateRandomExerciseType();
  }

}
