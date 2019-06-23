import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Session } from '../../models/session';
import { SessionService } from '../../services/session.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

const TYPE_LIST = ['engvie-sentencecorrecting', 'vieeng-imagepicking', 'vieeng-picturetranslating', 'engvie-sentencetranslating', 'vocabpicking'];

@Component({
  selector: 'app-exercise-page',
  templateUrl: './exercise-page.component.html',
  styleUrls: ['./exercise-page.component.css']
})
export class ExercisePageComponent implements OnInit {
  selectedCourseKey: string = '';
  currentExerciseType: string = '';
  currentQuestionNumber: number = 1;
  maxQuestionNumber: number; // Tạm thời, sau này sẽ sửa thành @Input

  modalRef: BsModalRef

  session: Session = new Session();
  myTimer;
  elapsedTime: number;

  chosenAnswer: string;
  correctAnswers: string[] = [];
  isCorrect: boolean = null;
  exerciseDetail: string;

  correctSound = new Audio();
  incorrectSound = new Audio();

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private sharedDataService: SharedDataService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    if (!this.sharedDataService.selectedCourse) {
      this.router.navigateByUrl('/exercise-menu'); // Chưa chọn course thì trả ra menu
      return;
    }

    this.selectedCourseKey = this.sharedDataService.selectedCourse.key;

    this.maxQuestionNumber = this.sharedDataService.selectedCourse.maxQuestionNumber;

    this.generateRandomExerciseType();

    //this.session.initSession(this.maxQuestionNumber);
    this.session = this.sessionService.initSession(this.maxQuestionNumber);
    this.correctSound.src = '../../assets/sounds/correct.mp3';
    this.incorrectSound.src = '../../assets/sounds/incorrect.mp3';

    this.elapsedTime = 0;
    this.myTimer = setInterval(() => this.timeTick(), 1000);
  }

  openClosingModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  confirmClosingModal(): void {
    this.sharedDataService.selectedCourse = null;
    this.sessionService.curSession = null;
    this.modalRef.hide();
    this.router.navigateByUrl('/exercise-menu');
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
      //this.session.increaseNumberOfCorrectAnswers();
      this.sessionService.increaseNumberOfCorrectAnswers(this.session);
    }
    else {
      this.incorrectSound.play();
      this.isCorrect = false;
    }
    //this.session.pushUserAnswer(this.currentExerciseType, this.chosenAnswer, this.correctAnswers, this.exerciseDetail, this.isCorrect);
    this.sessionService.pushUserAnswer(this.session, this.currentExerciseType, this.chosenAnswer, this.correctAnswers, this.exerciseDetail, this.isCorrect);
  }

  nextQuestion() {
    if (this.currentQuestionNumber >= this.maxQuestionNumber) {
      console.log('Kết thúc bài học. Lưu thông tin vào localStorage và navigate tới trang chọn bài học.');
      clearInterval(this.myTimer);
      //this.session.setSpeed(this.elapsedTime);
      this.sessionService.setSpeed(this.session, this.elapsedTime);
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

  skipQuestion() {
    this.chosenAnswer = 'skip-question';
    this.checkAnswer();
  }

}
