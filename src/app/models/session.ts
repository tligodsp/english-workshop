import { ExerciseAnswer } from './exerciseAnswer';
import { Exercise } from './exercise';

export class Session {
    numberOfQuestions: number;
    numberOfCorrectAnswers: number;
    speed: number; //in second
    sessionAnswers: ExerciseAnswer[] = [];

    initSession(numOfQuestions: number) {
        this.numberOfQuestions = numOfQuestions;
        this.numberOfCorrectAnswers = 0;
        this.speed = 0;
        this.sessionAnswers;
    }

    pushUserAnswer(exerciseType: string, userAnswer: string, correctAnswer: string[], exerciseDetail: string, isCorrect: boolean) {
        let newAnswer = new ExerciseAnswer();
        newAnswer.initExerciseAnswer(exerciseType, userAnswer, correctAnswer, exerciseDetail, isCorrect);
        this.sessionAnswers.push(newAnswer);
    }

    increaseNumberOfCorrectAnswers() {
        this.numberOfCorrectAnswers++;
    }

    setSpeed(speedToSet: number) {
        this.speed = speedToSet;
    }

    getCorrectAnswersPoint(): number {
        return this.numberOfCorrectAnswers * 15 // 15 điểm cho mỗi câu đúng
    }

    getSpeedPoint(): number {
        if (this.speed > 180)
            return 0; // nếu làm bài lâu hơn 3 phút thì không được bonus speed points

        return Math.round((Math.abs(this.speed - 180) / 180) * 20 * this.numberOfCorrectAnswers); // tính dựa trên tốc độ và số câu đúng
    }

    getAccuracy(): number {
        return Math.round(this.numberOfCorrectAnswers / this.numberOfQuestions);
    }

    getAccuracyPoint(): number {
        return this.getAccuracy() * 120; // 100% -> 120pts, 50% -> 60pts, 0% -> 0pts
    }

    getTotalPoints(): number {
        return this.getAccuracyPoint() + this.getCorrectAnswersPoint() + this.getSpeedPoint(); 
    }
}