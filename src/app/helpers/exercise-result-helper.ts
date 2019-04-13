export class ExerciseResultHelper {
    static getTimeInMinFromSecond(sec: number): string {
        if (sec < 60) 
            return sec + ' giây';
        return Math.floor(sec / 60) + ' phút ' + sec % 60 + ' giây';
    }

    static getAccuracy(numberOfCorrects: number, numberOfQuestions: number): string {
        return Math.round((numberOfCorrects / numberOfQuestions) * 100) + '%';
    }
}