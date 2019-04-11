import { Vocabulary } from './vocabulary';
import { VocabularyService } from '../vocabulary.service';
import { Options } from 'selenium-webdriver/safari';

export class Exercise {
    requirement: string; //Vd: Viet muc nay bang tieng Viet, Danh dau nghia dung,...
    type: string;
    correctAnswer: string;
}

export class VieEngImagePickingExercise extends Exercise {
    //level: number;
    options: Vocabulary[] = [];
    correctId: number; //id cua tu dung trong options array
    setOptions(vocab: Vocabulary[]) {
        //Chọn 3 từ từ database cho bài tập (phù hợp với level)
        //let vocab: Vocabulary[];
        //this.vocabularyService.getVocabularies()
        //    .subscribe(vocabularyData => vocab = vocabularyData );
        while (this.options.length < 3) {
            let id: number;
            do {
                id = Math.floor(Math.random() * vocab.length);
            }
            while (this.options.includes(vocab[id]));
            this.options.push(vocab[id]);
        }  
        //Chọn correctId
        this.correctId = Math.floor(Math.random() * 3);
        //correctAnswer
        this.correctAnswer = this.options[this.correctId].engWord;
    }
    getOptions(): Vocabulary[] {
        return this.options;
    }

    initExercise(vocabData: Vocabulary[]) {
        this.type = "vieengimagepicking";
        this.setOptions(vocabData);
        this.requirement = 'Chọn từ cho "' + this.options[this.correctId].vieMeaning + '"';
    }
    constructor() {
        super();
    }
}
