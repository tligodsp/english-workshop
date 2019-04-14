import { Exercise, VieEngImagePickingExercise, VocabPickingExercise, PictureTraslatingExercise, 
            SentenceCorrectingExercise, SentenceTranslatingExercise } from './exercise';

export class ExerciseAnswer {
    exerciseRequirement: string;
    exerciseDetail: string; //word or sentence to translate
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;

    initExerciseAnswer(exerciseType: string, userAnswer: string, correctAnswer: string[], exerciseDetail: string, isCorrect: boolean) {
        switch (exerciseType) {
            case 'vieeng-imagepicking': {
                this.exerciseRequirement = "Chọn hình có nghĩa đúng";
                break;
            }
            case 'vocabpicking': {
                this.exerciseRequirement = "Đánh giấu nghĩa đúng";
                break;
            }
            case 'vieeng-picturetranslating': {
                this.exerciseRequirement = "Viết bằng Tiếng Anh";
                break;
            }
            case 'engvie-sentencecorrecting': {
                this.exerciseRequirement = "Viết bằng Tiếng Việt";
                break;
            }
            case 'engvie-sentencetranslating': {
                this.exerciseRequirement = "Viết bằng Tiếng Việt";
                break;
            }
        }
        this.exerciseDetail = exerciseDetail;
        this.correctAnswer = correctAnswer[0];
        this.userAnswer = userAnswer;
        this.isCorrect = isCorrect;
    }
    /*
    initExerciseAnswer(exercise: Exercise, userAns: string) {
        switch (exercise.type) {
            case 'vieeng-imagepicking': {
                let castedExercise = exercise as VieEngImagePickingExercise;
                this.exerciseRequirement = "Chọn hình có nghĩa đúng";
                this.exerciseDetail = castedExercise.options[castedExercise.correctId].vieMeaning;
                break;
            }
            case 'vocabpicking': {
                let castedExercise = exercise as VocabPickingExercise;
                this.exerciseRequirement = "Đánh giấu nghĩa đúng";
                this.exerciseDetail = castedExercise.options[castedExercise.correctID].vieMeaning;
                break;
            }
            case 'vieeng-picturetranslating': {
                let castedExercise = exercise as PictureTraslatingExercise;
                this.exerciseRequirement = "Viết bằng Tiếng Anh";
                this.exerciseDetail = castedExercise.wordToTranslate.vieMeaning;
                break;
            }
            case 'engvie-sentencecorrecting': {
                let castedExercise = exercise as SentenceCorrectingExercise;
                this.exerciseRequirement = "Viết bằng Tiếng Việt";
                this.exerciseDetail = castedExercise.chosenSentence.eng;
                break;
            }
            case 'engvie-sentencetranslating': {
                let castedExercise = exercise as SentenceTranslatingExercise;
                this.exerciseRequirement = "Viết bằng Tiếng Việt";
                this.exerciseDetail = castedExercise.chosenSentence.eng;
                break;
            }
        }
        this.correctAnswer = exercise.correctAnswers[0];
        this.userAnswer = userAns;
    }
    */
}