import { Vocabulary } from './vocabulary';

export class Exercise {
    requirement: string; //Vd: Viet muc nay bang tieng Viet, Danh dau nghia dung,...
    type: string;
    correctAnswers: string[] = [];
    exerciseDetail: string; //word or sentence to translate
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
        this.correctAnswers.push(this.options[this.correctId].engWord);
    }
    getOptions(): Vocabulary[] {
        return this.options;
    }

    initExercise(vocabData: Vocabulary[]) {
        this.type = "vieeng-imagepicking";
        this.setOptions(vocabData);
        this.requirement = 'Chọn từ cho "' + this.options[this.correctId].vieMeaning + '"';
        this.exerciseDetail = this.options[this.correctId].vieMeaning;
    }
    constructor() {
        super();
    }
}

export class VocabPickingExercise extends Exercise
{
    options: Vocabulary[]=[];
    correctID : number;
    setOptions(vocab : Vocabulary[])
        {
            //Chọn 3 từ từ database cho bài tập (phù hợp với level)
            while (this.options.length<3) {
                let id : number;
                do{
                    id=Math.floor(Math.random()*vocab.length);
                } while(this.options.includes(vocab[id]));
                this.options.push(vocab[id]);
            }
            //Chọn correctId
            this.correctID = Math.floor(Math.random() * 3);
            //correctAnswer
            this.correctAnswers.push(this.options[this.correctID].engWord);
        }
    getOptions(): Vocabulary[] {
        return this.options;
    }
    
    initExercise(vocabData: Vocabulary[]) {
        this.type = "vocabpicking";
        this.setOptions(vocabData);
        this.requirement = this.options[this.correctID].vieMeaning;
        this.exerciseDetail = this.options[this.correctID].vieMeaning;
    }
    constructor() {
        super();
    }
}

export class PictureTraslatingExercise extends Exercise {
    wordToTranslate: Vocabulary;
    
    constructor() {
        super();
    }

    setWordToTranslate(vocab: Vocabulary[]) {
        //Chọn một từ ngẫu nhiên để dịch
        this.wordToTranslate = vocab[Math.floor(Math.random() * vocab.length)];
        this.correctAnswers.push(this.wordToTranslate.engWord);
    }

    initExercise(vocadData: Vocabulary[]) {
        this.type = "vieeng-picturetranslating";
        this.setWordToTranslate(vocadData);
        this.requirement = 'Ghi "' + this.wordToTranslate.vieMeaning + '" bằng Tiếng Anh';
        this.exerciseDetail = this.wordToTranslate.vieMeaning;
    }
}

import { Sentence } from './sentence'
import { VIE_WORDS } from '../mock-words';
import { ArrayHelper } from '../helpers/array-helper';


export class SentenceCorrectingExercise extends Exercise {
    chosenSentence: Sentence;
    wordsToChoose: string[] = [];

    constructor() {
        super();
    }

    //** Chọn random 1 Sentence trong Sentence[] và set các thuộc tính liên quan */
    chooseSentence(sentences: Sentence[]) {
        this.chosenSentence = sentences[Math.floor(Math.random() * sentences.length)];
        this.correctAnswers = this.correctAnswers.concat(this.chosenSentence.vie);
    }

    //** Set các lựa chọn words gồm các chữ đúng cộng thêm 4 chữ random */
    setWordsToChoose(): void {
        const wordsOfChosenSentence = this.chosenSentence.vie[0].split(" "); // Tách câu ra thành mảng các chữ
        this.wordsToChoose = this.wordsToChoose.concat(wordsOfChosenSentence);

        const numberOfWords = wordsOfChosenSentence.length + 4;
        while (this.wordsToChoose.length < numberOfWords) {
            let fakeWordToPush;
            do {
                fakeWordToPush = VIE_WORDS[Math.floor(Math.random() * VIE_WORDS.length)];
            } while (this.wordsToChoose.includes(fakeWordToPush));

            this.wordsToChoose.push(fakeWordToPush);
        }

        // Shuffle array lên
        this.wordsToChoose = ArrayHelper.shuffleArray(this.wordsToChoose);
    }

    initExercise(sentences: Sentence[]) {
        this.chooseSentence(sentences);
        this.setWordsToChoose();
        this.type = 'engvie-sentencecorrecting';
        this.requirement = `${this.chosenSentence.eng} nghĩa là:`
        this.exerciseDetail = this.chosenSentence.eng;
    }
}

export class SentenceTranslatingExercise extends Exercise {
    chosenSentence: Sentence;
    
    constructor() {
        super();
    }

    //** Chọn random 1 Sentence trong Sentence[] và set các thuộc tính liên quan */
    chooseSentence(sentences: Sentence[]) {
        this.chosenSentence = sentences[Math.floor(Math.random() * sentences.length)];
        this.correctAnswers = this.correctAnswers.concat(this.chosenSentence.vie);
    }

    initExercise(sentences: Sentence[]) {
        this.chooseSentence(sentences);
        this.type = 'engvie-sentencetranslating';
        this.requirement = 'Viết mục này bằng Tiếng Việt:';
        this.exerciseDetail = this.chosenSentence.eng;
    }
}
