import { Injectable } from '@angular/core';
import { Session } from '../models/session';
import { ExerciseAnswer } from '../models/exerciseAnswer';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  curSession: Session;

  constructor() { }

  initSession(numOfQuestions: number): Session {
    let ses = new Session();
    ses.numberOfQuestions = numOfQuestions;
    ses.numberOfCorrectAnswers = 0;
    ses.speed = 0;
    ses.sessionAnswers;
    return ses;
  }

  pushUserAnswer(session: Session, exerciseType: string, userAnswer: string, correctAnswer: string[], exerciseDetail: string, isCorrect: boolean) {
      let newAnswer = new ExerciseAnswer();
      newAnswer.initExerciseAnswer(exerciseType, userAnswer, correctAnswer, exerciseDetail, isCorrect);
      session.sessionAnswers.push(newAnswer);
  }

  increaseNumberOfCorrectAnswers(session: Session) {
      session.numberOfCorrectAnswers++;
  }

  setSpeed(session: Session, speedToSet: number) {
      session.speed = speedToSet;
  }

  getCorrectAnswersPoint(session: Session): number {
      return session.numberOfCorrectAnswers * 15 // 15 điểm cho mỗi câu đúng
  }

  getSpeedPoint(session: Session): number {
      if (session.speed > 180)
          return 0; // nếu làm bài lâu hơn 3 phút thì không được bonus speed points

      return Math.round((Math.abs(session.speed - 180) / 180) * 20 * session.numberOfCorrectAnswers); // tính dựa trên tốc độ và số câu đúng
  }

  getAccuracy(session: Session): number {
      return session.numberOfCorrectAnswers / session.numberOfQuestions;
  }

  getAccuracyPoint(session: Session): number {
      return this.getAccuracy(session) * 120; // 100% -> 120pts, 50% -> 60pts, 0% -> 0pts
  }

  getTotalPoints(session: Session): number {
      return this.getAccuracyPoint(session) + this.getCorrectAnswersPoint(session) + this.getSpeedPoint(session); 
  }
}
