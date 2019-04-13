import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
const TYPE_LIST = ['engvie-sentencecorrecting', 'vieeng-imagepicking', 'vieeng-picturetranslating', 'engvie-sentencetranslating', 'vocabpicking'];
import { Session } from '../../models/session';
import { SessionService } from '../../session.service';


@Component({
  selector: 'app-exercise-page',
  templateUrl: './exercise-page.component.html',
  styleUrls: ['./exercise-page.component.css']
})
export class ExercisePageComponent implements OnInit {
  currentExerciseType: string = '';
  currentQuestionNumber: number = 1;
  maxQuestionNumber: number = 8; // Tạm thời, sau này sẽ sửa thành @Input
  session: Session = new Session();
  myTimer;
  elapsedTime: number;

  chosenAnswer: string;
  correctAnswers: string[] = [];
  isCorrect: boolean = null;
  exerciseDetail: string;

  correctSound = new Audio();
  incorrectSound = new Audio();

  constructor(private router: Router, private sessionService: SessionService) { }

  ngOnInit() {
    this.generateRandomExerciseType();

    this.session.initSession(this.maxQuestionNumber);
    this.correctSound.src = '../../assets/sounds/correct.mp3';
    this.incorrectSound.src = '../../assets/sounds/incorrect.mp3';

    this.elapsedTime = 0;
    this.myTimer = setInterval(() => this.timeTick(), 1000);
  }

  timeTick() {
    this.elapsedTime++;
    //console.log(this.elapsedTime);
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
    this.exerciseDetail = $event.exerciseDetail;
  }

  checkAnswer() {
    console.log(this.chosenAnswer);
    if(this.chosenAnswer.length < 1)
      return;
    if (this.correctAnswers.includes(this.chosenAnswer.toLowerCase())) {
      this.correctSound.play();
      this.isCorrect = true;
      this.session.increaseNumberOfCorrectAnswers();
    }
    else {
      this.incorrectSound.play();
      this.isCorrect = false;
    }
    this.session.pushUserAnswer(this.currentExerciseType, this.chosenAnswer, this.correctAnswers, this.exerciseDetail, this.isCorrect);
  }

  nextQuestion() {
    if (this.currentQuestionNumber >= this.maxQuestionNumber) {
      console.log('Kết thúc bài học. Lưu thông tin vào localStorage và navigate tới trang chọn bài học.');
      clearInterval(this.myTimer);
      this.session.setSpeed(this.elapsedTime);
      this.sessionService.curSession = this.session;
      this.router.navigate(['/exercise/result']);
      return;
    }
    this.chosenAnswer = '';
    this.correctAnswers = [];
    this.exerciseDetail = '';
    this.currentQuestionNumber++;
    this.isCorrect = null;
    this.generateRandomExerciseType();
  }

}
