import { Vocabulary } from './vocabulary';

export class Exercise {
    requirement: string; //Vd: Viet muc nay bang tieng Viet, Danh dau nghia dung,...
    type: string;
    correctAnswer: string;
}

export class VieEngImagePickingExercise extends Exercise {
    options: Vocabulary[];
    correctId: number; //id cua tu dung trong options array
    setOptions() {
        //Chọn 3 từ từ database cho bài tập (phù hợp với level)
        //Chọn correctId
        //correctAnswer = options[correctId].engWord
    }
    getRequirement(): string {
        return 'Chọn từ cho "' + this.options[this.correctId].vieMeaning + '"';
    }
    constructor() {
        super();
        this.type = "vieengimagepicking";
        this.setOptions();
    }
}
