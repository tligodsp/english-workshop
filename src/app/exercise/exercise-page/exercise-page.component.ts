import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
const TYPE_LIST = ['sentence-correcting', 'image-picking', 'picture-translating', 'sentence-translating'];

@Component({
  selector: 'app-exercise-page',
  templateUrl: './exercise-page.component.html',
  styleUrls: ['./exercise-page.component.css']
})
export class ExercisePageComponent implements OnInit {
  currentExerciseType: string = '';
  currentQuestionNumber: number = 1;
  maxQuestionNumber: number = 8; // Tạm thời, sau này sẽ sửa thành @Input

  chosenAnswer: string;
  correctAnswers: string[] = [];
  isCorrect: boolean = null;

  correctSound = new Audio();
  incorrectSound = new Audio();

  constructor(private router: Router) { }

  ngOnInit() {
    this.generateRandomExerciseType();
    
    this.correctSound.src = '../../assets/sounds/correct.mp3';
    this.incorrectSound.src = '../../assets/sounds/incorrect.mp3';
  }

  getProgressWidth() {
    return ((this.currentQuestionNumber - 1) / this.maxQuestionNumber) * 100;
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
      this.correctSound.play();
      this.isCorrect = true;
    }
    else {
      this.incorrectSound.play();
      this.isCorrect = false;
    }
  }

  nextQuestion() {
    if (this.currentQuestionNumber >= this.maxQuestionNumber) {
      console.log('Kết thúc bài học. Lưu thông tin vào localStorage và navigate tới trang chọn bài học.');
      this.router.navigate(['/exercise/result']);
      return;
    }

    this.currentQuestionNumber++;
    this.isCorrect = null;
    this.generateRandomExerciseType();
  }

}
