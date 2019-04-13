import { Component, OnInit, TemplateRef } from '@angular/core';
import { ExerciseResultHelper } from '../../helpers/exercise-result-helper';
import { Session } from '../../models/session';
import { SessionService } from '../../session.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ExerciseAnswer } from 'src/app/models/exerciseAnswer';

const MOCKANSWERS: ExerciseAnswer[] = [
  { exerciseRequirement: 'Viết bằng tiếng Anh', exerciseDetail: 'Tôi ăn một quả trứng', userAnswer: 'I eat an egg', correctAnswer: 'I eat an egg', isCorrect: true, initExerciseAnswer: null },
  { exerciseRequirement: 'Viết bằng tiếng Việt', exerciseDetail: 'The boy drinks water', userAnswer: 'Trứng', correctAnswer: 'Cậu ấy uống ước', isCorrect: true, initExerciseAnswer: null },
  { exerciseRequirement: 'Chọn hình có nghĩa đúng', exerciseDetail: 'Táo', userAnswer: 'I drink water', correctAnswer: 'apple', isCorrect: false, initExerciseAnswer: null },
  { exerciseRequirement: 'Viết bằng tiếng Anh', exerciseDetail: 'Cậu ấy ăn cơm', userAnswer: 'Nước', correctAnswer: 'Chingchong eats rice', isCorrect: false, initExerciseAnswer: null },
  { exerciseRequirement: 'Đánh giấu nghĩa đúng', exerciseDetail: 'Sữa', userAnswer: 'Egg', correctAnswer: 'Milk', isCorrect: true, initExerciseAnswer: null },
  { exerciseRequirement: 'Viết bằng tiếng Anh', exerciseDetail: 'Tôi ăn táo', userAnswer: 'I eat an egg', correctAnswer: 'I eat an apple', isCorrect: false, initExerciseAnswer: null },
  { exerciseRequirement: 'Viết bằng tiếng Việt', exerciseDetail: 'She is a girl', userAnswer: 'girl', correctAnswer: 'Cô ấy là một cô gái', isCorrect: true, initExerciseAnswer: null },
  { exerciseRequirement: 'Viết bằng tiếng Anh', exerciseDetail: 'Tôi uống sữa', userAnswer: 'I eat', correctAnswer: 'I drink milk', isCorrect: true, initExerciseAnswer: null },
];

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
  correctAnswers: number;
  speed: string;
  accuracy: string;
  totalPoints: number;
  session: Session;
  sessionAnswers = MOCKANSWERS;

  modalRef: BsModalRef;
  popoverContext = {
    userAnswer: '',
    correctAnswer: ''
  };

  constructor(private sessionService: SessionService, private modalService: BsModalService) { }

  ngOnInit() {
    
    this.session = this.sessionService.curSession;
    this.correctAnswers = this.session.numberOfCorrectAnswers;
    this.speed = ExerciseResultHelper.getTimeInMinFromSecond(this.session.speed);
    this.accuracy = ExerciseResultHelper.getAccuracy(this.correctAnswers, this.session.numberOfQuestions);
    this.totalPoints = this.session.getTotalPoints();
    
    /*
    this.correctAnswers = 8;
    this.speed = ExerciseResultHelper.getTimeInMinFromSecond(100);
    this.accuracy = ExerciseResultHelper.getAccuracy(3, 4);
    this.totalPoints = 1303;
    */
    //console.log(this.session.sessionAnswers);

    this.sessionAnswers = this.session.sessionAnswers;
  }

  openConfirmModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
    return;
  }

  setPopoverContext(userAnswer: string, correctAnswer: string) {
    this.popoverContext.userAnswer = userAnswer;
    this.popoverContext.correctAnswer = correctAnswer;
  }
}
