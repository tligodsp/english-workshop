export class ExerciseResultHelper {
    static getTimeInMinFromSecond(sec: number): string {
        return Math.floor(sec / 60) + ' phút ' + sec % 60 + ' giây';
    }

    static getAccuracy(numberOfCorrects: number, numberOfQuestions: number): string {
        return Math.round((numberOfCorrects / numberOfQuestions) * 100) + '%';
    }
}