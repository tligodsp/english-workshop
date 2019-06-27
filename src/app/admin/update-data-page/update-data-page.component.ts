import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  QueryList,
  ViewChildren
} from "@angular/core";
import { CourseService } from "../../services/course.service";
import { ExerciseDataService } from "../../services/exercise-data.service";
import { Course } from "../../models/course";
import { Vocabulary } from "../../models/vocabulary";
import { Sentence } from "../../models/sentence";
import { MatTableDataSource } from "@angular/material/table";
import { SharedDataService } from "../../services/shared-data.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ToastrService } from "ngx-toastr";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ArrayHelper } from "../../helpers/array-helper";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  NgForm
} from "@angular/forms";

import { FirebaseService } from '../../services/firebase.service';

interface Word {
  wordList: string[]
}

@Component({
  selector: "app-update-data-page",
  templateUrl: "./update-data-page.component.html",
  styleUrls: ["./update-data-page.component.css"]
})
export class UpdateDataPageComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) coursePaginator: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) vocabPaginator: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) sentencePaginator: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) wordPaginator: MatPaginator;

  courseList: Course[];
  exerciseDataType: string;
  courseDisplayedColumns: string[] = [
    "courseKey",
    "courseTitle",
    "courseDesc",
    "courseExp",
    "courseAction"
  ];
  courseDataSource: MatTableDataSource<Course> = new MatTableDataSource<
    Course
  >();
  vocabDisplayedColumns: string[] = [
    "vocabCourse",
    "vocabEng",
    "vocabVie",
    "vocabAction"
  ];
  vocabDataSource: MatTableDataSource<Vocabulary> = new MatTableDataSource<
    Vocabulary
  >();
  sentenceDisplayedColumns: string[] = [
    "sentenceCourse",
    "sentenceEng",
    "sentenceVie",
    "sentenceAction"
  ];
  sentenceDataSource: MatTableDataSource<Sentence> = new MatTableDataSource<
    Sentence
  >();
  wordDisplayedColumns: string[] = [
    "word",
    "wordAction"
  ];
  wordDataSource: MatTableDataSource<string> = new MatTableDataSource<
    string
  >();

  options: FormGroup;
  courseForm = this.formBuilder.group({
    courseKey: ["", Validators.required],
    courseTitle: ["", Validators.required],
    courseDescription: [""],
    courseQuestionNumber: ["", Validators.required],
    courseLogoUrl: [""],
    courseBackgroundColor: [""],
    courseExp: ["", Validators.required]
  });
  vocabularyForm = this.formBuilder.group({
    vocabularyCourse: ["", Validators.required],
    vocabularyEngWord: ["", Validators.required],
    vocabularyVieWord: ["", Validators.required],
    vocabularyIllust: ["", Validators.required]
  });
  sentenceForm = this.formBuilder.group({
    sentenceCourse: ["", Validators.required],
    sentenceEng: ["", Validators.required],
    sentenceVie1: ["", Validators.required],
    sentenceVie2: ["", Validators.required],
    sentenceVie3: ["", Validators.required],
    sentenceVie4: ["", Validators.required],
    sentenceVie5: ["", Validators.required]
  });
  wordForm = this.formBuilder.group({
    word: ["", Validators.required],
  });

  openedCourse: Course = new Course();
  openedVocab: Vocabulary = new Vocabulary();
  openedSentence: Sentence = new Sentence();
  openedWord: string = '';
  uneditedWord: string = '';

  sentenceCount: number;
  vieSentenceArr: string[] = new Array(5);

  modalRef: BsModalRef;

  constructor(
    fb: FormBuilder,
    private courseService: CourseService,
    private exerciseDataService: ExerciseDataService,
    private sharedDataService: SharedDataService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private modalService: BsModalService
  ) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: "auto"
    });
    this.exerciseDataType = "word";
    this.sentenceCount = 1;
  }

  changeExerciseDataType(newType: string) {
    this.exerciseDataType = newType;

    setTimeout(() => {
      if (newType === "course") {
        this.courseDataSource.paginator = this.coursePaginator;
      } else if (newType === "vocabulary") {
        this.vocabDataSource.paginator = this.vocabPaginator;
      } else if (newType === "sentence") {
        this.sentenceDataSource.paginator = this.sentencePaginator;
      }
      else if (newType === "word") {
        this.wordDataSource.paginator = this.wordPaginator;
      }
    }, 1000);
  }

  courseApplyFilter(filterValue: string) {
    this.courseDataSource.filter = filterValue.trim().toLowerCase();
    if (this.courseDataSource.paginator) {
      this.courseDataSource.paginator.firstPage();
    }
  }

  vocabApplyFilter(filterValue: string) {
    this.vocabDataSource.filter = filterValue.trim().toLowerCase();
    if (this.vocabDataSource.paginator) {
      this.vocabDataSource.paginator.firstPage();
    }
  }

  sentenceApplyFilter(filterValue: string) {
    this.sentenceDataSource.filter = filterValue.trim().toLowerCase();
    if (this.sentenceDataSource.paginator) {
      this.sentenceDataSource.paginator.firstPage();
    }
  }

  wordApplyFilter(filterValue: string) {
    this.wordDataSource.filter = filterValue.trim().toLowerCase();
    if (this.wordDataSource.paginator) {
      this.wordDataSource.paginator.firstPage();
    }
  }

  vocabCourseSelected(event) {
    this.openedVocab.courseKey = event.value;
    // console.log(this.newVocabulary);
  }

  sentenceCourseSelected(event) {
    this.openedSentence.courseKey = event.value;
  }

  sentenceCountArray(): number[] {
    return Array.from({ length: this.sentenceCount }, (v, k) => k + 1);
  }

  increaseSentenceCount() {
    if (this.sentenceCount >= 5) {
      return;
    }
    this.sentenceCount++;
  }

  decreaseSentenceCount() {
    if (this.sentenceCount <= 1) {
      return;
    }
    this.sentenceCount--;
  }

  isProperStringList(strList: string[]) {
    if (strList.length < 1) {
      return false;
    }
    
    //console.log(strList);
    for (let str of strList) {
      if (!str || str.length < 1) {
        return false;
      }
    }
    return true;
  }

  hasDuplicates(strList: string[]) {
    return (new Set(strList)).size !== strList.length;
  }

  nothing() {}

  deleteCourse(courseKey: string) {
    try {
      this.courseService.deleteCourse(courseKey);
      this.toastrService.success("Xóa course thành công", "Success", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    } catch (err) {
      console.log(err);
      this.toastrService.error(err.name, "Error", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    }
  }

  deleteVocabulary(vocabId: string) {
    try {
      this.exerciseDataService.deleteVocabulary(vocabId);
      this.toastrService.success("Xóa vocabulary thành công", "Success", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    } catch (err) {
      console.log(err);
      this.toastrService.error(err.name, "Error", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    }
  }

  deleteSentence(sentenceId: string) {
    try {
      this.exerciseDataService.deleteSentence(sentenceId);
      this.toastrService.success("Xóa sentence thành công", "Success", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    } catch (err) {
      console.log(err);
      this.toastrService.error(err.name, "Error", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    }
  }

  deleteWord(word: string) {
    try {
      this.exerciseDataService.deleteVieWord(word);
      this.toastrService.success("Xóa mock word thành công", "Success", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    } catch (err) {
      console.log(err);
      this.toastrService.error(err.name, "Error", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    }
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: "modal-lg" })
    );
    return;
  }

  onEditWordClick(template: TemplateRef<any>, word: string) {
    this.openedWord = word;
    this.uneditedWord = word;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: "modal-lg" })
    );
    return;
  }

  onEditSetenceClick(template: TemplateRef<any>, selectedSentence: Sentence) {
    this.openedSentence = { ...selectedSentence };
    this.sentenceCount = this.openedSentence.vie.length;
    this.vieSentenceArr = [];
    for (let i = 0; i < this.openedSentence.vie.length; i++) {
      this.vieSentenceArr[i] = this.openedSentence.vie[i];
    }
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: "modal-lg" })
    );
    return;
  }

  onEditVocabClick(template: TemplateRef<any>, selectedVocab: Vocabulary) {
    this.openedVocab = { ...selectedVocab };
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: "modal-lg" })
    );
    return;
  }

  onEditCourseClick(template: TemplateRef<any>, selectedCourse: Course) {
    this.openedCourse = { ...selectedCourse };
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: "modal-lg" })
    );
    return;
  }

  onUpdateWordClick() {
    
    if (this.openedWord.length < 1) {
      this.toastrService.error("Hãy nhập đầy đủ các trường bắt buộc", "Error", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    }
    else if (this.openedWord.includes(" ")) {
      this.toastrService.error("Từ không được chứa khoảng trắng", "Error", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    }
    else {
      try {
        let strList = this.wordDataSource.data;
        
        console.log(this.uneditedWord);
        console.log(strList);
        ArrayHelper.replaceStr(strList, this.uneditedWord, this.openedWord);
        console.log(this.openedWord);
        console.log(strList);

        this.exerciseDataService.updateVieWord(strList);
        this.toastrService.success("Cập nhật mock word thành công", "Success", {
          timeOut: 2000,
          positionClass: "toast-bottom-center"
        });
        this.uneditedWord = '';
        this.modalRef.hide();
      } catch (err) {
        console.log(err);
        this.toastrService.error(err.name, "Error", {
          timeOut: 2000,
          positionClass: "toast-bottom-center"
        });
      }
    }
  }

  onUpdateSentenceClick() {
    this.openedSentence.vie = [];
    for (let i = 1; i <= this.sentenceCount; i++) {
      this.openedSentence.vie.push(this.vieSentenceArr[i - 1]);
    }
    console.log(this.openedSentence);
    if ( this.openedSentence.eng.length < 1 || !this.isProperStringList(this.openedSentence.vie)
    ) {
      this.toastrService.error("Hãy nhập đầy đủ các trường bắt buộc", "Error", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    }
    else if(this.hasDuplicates(ArrayHelper.stringArrayToLowerCase(this.openedSentence.vie))) {
      this.toastrService.error("Các câu Tiếng Việt không được giống nhau", "Error", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    } 
    else {
      console.log(this.openedSentence);
      try {
        //this.exerciseDataService.createSentence(this.newSentence);
        this.exerciseDataService.updateSentence(this.openedSentence);
        this.toastrService.success("Cập nhật sentence thành công", "Success", {
          timeOut: 2000,
          positionClass: "toast-bottom-center"
        });
        this.vieSentenceArr = [];
        this.sentenceCount = 1;
        this.modalRef.hide();
      } catch (err) {
        console.log(err);
        this.toastrService.error(err.name, "Error", {
          timeOut: 2000,
          positionClass: "toast-bottom-center"
        });
      }
    }
  }

  onUpdateVocabClick() {
    console.log(this.openedVocab);
    if (
      this.openedVocab.engWord.length < 1 ||
      this.openedVocab.vieMeaning.length < 1 ||
      this.openedVocab.illustration.length < 1
    ) {
      this.toastrService.error("Hãy nhập đầy đủ các trường bắt buộc", "Error", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    } else {
      try {
        this.exerciseDataService.updateVocabulary(this.openedVocab);
        this.toastrService.success(
          "Cập nhật vocabulary thành công",
          "Success",
          {
            timeOut: 2000,
            positionClass: "toast-bottom-center"
          }
        );
        this.modalRef.hide();
      } catch (err) {
        console.log(err);
        this.toastrService.error(err.name, "Error", {
          timeOut: 2000,
          positionClass: "toast-bottom-center"
        });
      }
    }
  }

  onUpdateCourseClick() {
    console.log(this.openedCourse);
    if (
      this.openedCourse.title.length < 1 ||
      this.openedCourse.maxQuestionNumber === null ||
      this.openedCourse.exp === null
    ) {
      this.toastrService.error("Hãy nhập đầy đủ các trường bắt buộc", "Error", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    } else if (
      this.openedCourse.maxQuestionNumber < 1 ||
      this.openedCourse.exp < 1
    ) {
      this.toastrService.error(
        "Question number và Exp phải lớn hơn 0",
        "Error",
        {
          timeOut: 2000,
          positionClass: "toast-bottom-center"
        }
      );
    } else {
      try {
        this.courseService.updateCourse(this.openedCourse);
        this.toastrService.success("Update course thành công", "Success", {
          timeOut: 2000,
          positionClass: "toast-bottom-center"
        });
        // this.courseService.getCourses().subscribe(courseList => {
        //   this.sharedDataService.courseList = courseList;
        //   //console.log(courseList);
        // });
        this.modalRef.hide();
      } catch (err) {
        console.log(err);
        this.toastrService.error(err.name, "Error", {
          timeOut: 2000,
          positionClass: "toast-bottom-center"
        });
      }
    }
  }

  ngOnInit() {
    // this.courseService.getCourses().subscribe(courseList => {
    //   this.courseList = courseList;
    //   // setTimeout(()=>{
    //   //   // this.courseDataSource = new MatTableDataSource(this.courseList);
    //   //   // this.courseDataSource.data = courseList as Course[];
    //   // },5000);
    //   this.courseDataSource.data = courseList as Course[];
    //   console.log(this.courseDataSource);
    // });
    this.courseService
      .getCoursesValueChanges()
      .subscribe((courseList: Course[]) => {
        this.courseDataSource.data = courseList;
        this.courseDataSource.paginator = this.coursePaginator;
      });
    this.exerciseDataService
      .getVocabulariesValueChanges()
      .subscribe((vocabList: Vocabulary[]) => {
        this.vocabDataSource.data = vocabList;
        this.vocabDataSource.paginator = this.vocabPaginator;
      });
    this.exerciseDataService.getSentencesValueChanges().subscribe((sentenceList: Sentence[]) => {
      this.sentenceDataSource.data = sentenceList;
      this.sentenceDataSource.paginator = this.sentencePaginator;
    });
    this.exerciseDataService.getVieWordsValueChanges().subscribe((vieWord: Word) => {
      this.wordDataSource.data = vieWord.wordList;
      this.wordDataSource.paginator = this.wordPaginator;
    })
  }
}
