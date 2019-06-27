import { Injectable } from "@angular/core";
import {
  Exercise,
  VieEngImagePickingExercise,
  VocabPickingExercise,
  PictureTraslatingExercise,
  SentenceCorrectingExercise,
  SentenceTranslatingExercise,
} from "../models/exercise";
import { Vocabulary } from "../models/vocabulary";
import { Sentence } from "../models/sentence";
import { ArrayHelper } from "../helpers/array-helper";
import { FirebaseService } from "../services/firebase.service";
import { VIE_WORDS } from "../mock-words";

@Injectable({
  providedIn: "root"
})
export class ExerciseService {

  constructor(private firebaseService: FirebaseService) {
  }

  //IMAGE PICKING

  initExerciseVieEngImagePicking(
    vocabData: Vocabulary[]
  ): VieEngImagePickingExercise {
    let ex = new VieEngImagePickingExercise();
    ex.type = "vieeng-imagepicking";
    this.setOptionsVieEngImagePicking(ex, vocabData);
    ex.requirement =
      'Chọn từ cho "' + ex.options[ex.correctId].vieMeaning + '"';
    ex.exerciseDetail = ex.options[ex.correctId].vieMeaning;
    return ex;
  }

  setOptionsVieEngImagePicking(
    exercise: VieEngImagePickingExercise,
    vocab: Vocabulary[]
  ) {
    //Chọn 3 từ từ database cho bài tập (phù hợp với level)
    //let vocab: Vocabulary[];
    //this.vocabularyService.getVocabularies()
    //    .subscribe(vocabularyData => vocab = vocabularyData );
    while (exercise.options.length < 3) {
      let id: number;
      do {
        id = Math.floor(Math.random() * vocab.length);
      } while (exercise.options.includes(vocab[id]));
      exercise.options.push(vocab[id]);
    }
    //Chọn correctId
    exercise.correctId = Math.floor(Math.random() * 3);
    //correctAnswer
    exercise.correctAnswers.push(exercise.options[exercise.correctId].engWord);
  }

  getOptionsVieEngImagePicking(
    exercise: VieEngImagePickingExercise
  ): Vocabulary[] {
    return exercise.options;
  }

  //VOCAB PICKING

  initExerciseVocabPicking(vocabData: Vocabulary[]): VocabPickingExercise {
    let ex = new VocabPickingExercise();
    ex.type = "vocabpicking";
    this.setOptionsVocabPicking(ex, vocabData);
    ex.requirement = ex.options[ex.correctID].vieMeaning;
    ex.exerciseDetail = ex.options[ex.correctID].vieMeaning;
    return ex;
  }

  setOptionsVocabPicking(exercise: VocabPickingExercise, vocab: Vocabulary[]) {
    //Chọn 3 từ từ database cho bài tập (phù hợp với level)
    while (exercise.options.length < 3) {
      let id: number;
      do {
        id = Math.floor(Math.random() * vocab.length);
      } while (exercise.options.includes(vocab[id]));
      exercise.options.push(vocab[id]);
    }
    //Chọn correctId
    exercise.correctID = Math.floor(Math.random() * 3);
    //correctAnswer
    exercise.correctAnswers.push(exercise.options[exercise.correctID].engWord);
  }
  getOptionsVocabPicking(exercise: VocabPickingExercise): Vocabulary[] {
    return exercise.options;
  }

  //PICTURE TRANSLATING
  initExercisePictureTranslating(
    vocadData: Vocabulary[]
  ): PictureTraslatingExercise {
    let ex = new PictureTraslatingExercise();
    ex.type = "vieeng-picturetranslating";
    this.setWordToTranslatePictureTranslating(ex, vocadData);
    ex.requirement =
      'Ghi "' + ex.wordToTranslate.vieMeaning + '" bằng Tiếng Anh';
    ex.exerciseDetail = ex.wordToTranslate.vieMeaning;
    return ex;
  }

  setWordToTranslatePictureTranslating(
    exercise: PictureTraslatingExercise,
    vocab: Vocabulary[]
  ) {
    //Chọn một từ ngẫu nhiên để dịch
    exercise.wordToTranslate = vocab[Math.floor(Math.random() * vocab.length)];
    exercise.correctAnswers.push(exercise.wordToTranslate.engWord);
  }

  //SENTENCE CORRECTING

  initExerciseSentenceCorrecting(
    sentences: Sentence[],
    fakeWords: string[]
  ): SentenceCorrectingExercise {
    let ex = new SentenceCorrectingExercise();
    this.chooseSentenceSentenceCorrecting(ex, sentences);
    this.setWordsToChooseSentenceCorrecting(ex, fakeWords);
    ex.type = "engvie-sentencecorrecting";
    ex.requirement = `${ex.chosenSentence.eng} nghĩa là:`;
    ex.exerciseDetail = ex.chosenSentence.eng;
    return ex;
  }

  //** Chọn random 1 Sentence trong Sentence[] và set các thuộc tính liên quan */
  chooseSentenceSentenceCorrecting(exercise: SentenceCorrectingExercise, sentences: Sentence[]) {
    exercise.chosenSentence =
      sentences[Math.floor(Math.random() * sentences.length)];
    exercise.correctAnswers = exercise.correctAnswers.concat(
      exercise.chosenSentence.vie
    );
  }

  //** Set các lựa chọn words gồm các chữ đúng cộng thêm 4 chữ random */
  setWordsToChooseSentenceCorrecting(exercise: SentenceCorrectingExercise, fakeWords: string[]): void {
    const wordsOfChosenSentence = exercise.chosenSentence.vie[0].split(" "); // Tách câu ra thành mảng các chữ
    exercise.wordsToChoose = exercise.wordsToChoose.concat(
      wordsOfChosenSentence
    );

    const numberOfWords = wordsOfChosenSentence.length + 4;
    while (exercise.wordsToChoose.length < numberOfWords) {
      let fakeWordToPush;
      do {
        fakeWordToPush =
          fakeWords[Math.floor(Math.random() * fakeWords.length)];
      } while (exercise.wordsToChoose.includes(fakeWordToPush));

      exercise.wordsToChoose.push(fakeWordToPush);
    }

    // Shuffle array lên
    exercise.wordsToChoose = ArrayHelper.shuffleArray(exercise.wordsToChoose);
  }

  //SENTENCE TRANSLATING
  initExerciseSentenceTranslating(sentences: Sentence[]): SentenceTranslatingExercise {
    let ex = new SentenceTranslatingExercise();
    this.chooseSentenceSentenceTranslating(ex, sentences);
    ex.type = "engvie-sentencetranslating";
    ex.requirement = "Viết mục này bằng Tiếng Việt:";
    ex.exerciseDetail = ex.chosenSentence.eng;
    return ex;
  }

  //** Chọn random 1 Sentence trong Sentence[] và set các thuộc tính liên quan */
  chooseSentenceSentenceTranslating(exercise: SentenceTranslatingExercise, sentences: Sentence[]) {
    exercise.chosenSentence =
      sentences[Math.floor(Math.random() * sentences.length)];
    exercise.correctAnswers = exercise.correctAnswers.concat(exercise.chosenSentence.vie);
  }
}
