import { Component, OnInit } from "@angular/core";
import { COURSES } from "../../mock-courses";
import { Course } from "../../models/course";
import { Vocabulary } from "../../models/vocabulary";
import { Sentence } from "../../models/sentence";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  NgForm
} from "@angular/forms";
import { SharedDataService } from "../../services/shared-data.service";
import { CourseService } from "../../services/course.service";
import { ExerciseDataService } from "../../services/exercise-data.service";
import { ToastrService } from "ngx-toastr";
import { formArrayNameProvider } from "@angular/forms/src/directives/reactive_directives/form_group_name";
import { ID } from "../../helpers/ultil";
import { ArrayHelper } from "../../helpers/array-helper";

@Component({
  selector: "app-create-data-page",
  templateUrl: "./create-data-page.component.html",
  styleUrls: ["./create-data-page.component.css"]
})
export class CreateDataPageComponent implements OnInit {
  courses = COURSES;
  vocabSelectedCourse: Course;
  options: FormGroup;
  exerciseDataType: string;
  sentenceCount: number;
  selectFormControl = new FormControl("", Validators.required);
  newCourse = new Course();
  newVocabulary = new Vocabulary();
  newSentence = new Sentence();
  newWord = "";

  vieSentenceArr: string[] = new Array(5);

  courseForm = this.formBuilder.group({
    courseKey: ["", Validators.required],
    courseTitle: ["", Validators.required],
    courseDescription: [""],
    courseQuestionNumber: ["", Validators.required],
    courseLogoUrl: [""],
    courseBackgroundColor: [""],
    courseExp: ["", Validators.required],
    courseRequirement: ["", Validators.required]
  });
  vocabularyForm = this.formBuilder.group({
    // vocabularyId: ['', Validators.required],
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

  constructor(
    fb: FormBuilder,
    public sharedDataService: SharedDataService,
    private courseService: CourseService,
    private exerciseDataService: ExerciseDataService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: "auto"
    });
    this.exerciseDataType = "course";
    this.sentenceCount = 1;
  }

  changeExerciseDataType(newType: string) {
    this.exerciseDataType = newType;
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

  sentenceCountArray(): number[] {
    return Array.from({ length: this.sentenceCount }, (v, k) => k + 1);
  }

  vocabCourseSelected(event) {
    this.newVocabulary.courseKey = event.value;
    // console.log(this.newVocabulary);
  }

  sentenceCourseSelected(event) {
    this.newSentence.courseKey = event.value;
  }

  onCreateClick() {
    if (this.exerciseDataType === "course") {
      this.createCourse();
    } else if (this.exerciseDataType === "vocabulary") {
      this.createVocabulary();
      // console.log(ID());
    } else if (this.exerciseDataType === "sentence") {
      this.createSentence();
      // console.log(this.newSentence);
    }
    else if (this.exerciseDataType === "word") {
      this.createWord();
      // console.log(this.newWord);
    }
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

  createWord() {
    if (!this.newWord || this.newWord.length < 1) {
      this.toastrService.error("Hãy nhập đầy đủ các trường bắt buộc", "Error", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    }
    else if (this.newWord.includes(" ")) {
      this.toastrService.error("Từ không được chứa khoảng trắng", "Error", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    }
    else {
      console.log(this.newWord);
      try {
        this.exerciseDataService.createVieWord(this.newWord);
        this.toastrService.success("Tạo mock word thành công", "Success", {
          timeOut: 2000,
          positionClass: "toast-bottom-center"
        });
        this.wordForm.reset();
        this.wordForm.markAsUntouched();

      } catch (err) {
        console.log(err);
        this.toastrService.error(err.name, "Error", {
          timeOut: 2000,
          positionClass: "toast-bottom-center"
        });
      }
    }
  }

  createSentence() {
    this.newSentence.vie = [];
    for (let i = 1; i <= this.sentenceCount; i++) {
      this.newSentence.vie.push(this.vieSentenceArr[i - 1]);
    }
    //console.log(this.newSentence);
    if (
      !this.newSentence.courseKey ||
      this.newSentence.courseKey.length < 1 ||
      !this.newSentence.eng ||
      this.newSentence.eng.length < 1 ||
      !this.isProperStringList(this.newSentence.vie)
    ) {
      this.toastrService.error("Hãy nhập đầy đủ các trường bắt buộc", "Error", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    }
    else if(this.hasDuplicates(ArrayHelper.stringArrayToLowerCase(this.newSentence.vie))) {
      this.toastrService.error("Các câu Tiếng Việt không được giống nhau", "Error", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    } 
    else {
      console.log(this.newSentence);
      try {
        this.exerciseDataService.createSentence(this.newSentence);
        this.toastrService.success("Tạo sentence thành công", "Success", {
          timeOut: 2000,
          positionClass: "toast-bottom-center"
        });
        this.sentenceForm.reset();
        this.sentenceForm.markAsUntouched();
        this.vieSentenceArr = [];
        this.sentenceCount = 1;

      } catch (err) {
        console.log(err);
        this.toastrService.error(err.name, "Error", {
          timeOut: 2000,
          positionClass: "toast-bottom-center"
        });
      }
    }
  }

  createVocabulary() {
    //console.log(this.newVocabulary);
    this.newVocabulary.id = ID();
    if (
      !this.newVocabulary.id ||
      this.newVocabulary.id.length < 1 ||
      (!this.newVocabulary.engWord || this.newVocabulary.engWord.length < 1) ||
      (!this.newVocabulary.vieMeaning ||
        this.newVocabulary.vieMeaning.length < 1) ||
      (!this.newVocabulary.illustration ||
        this.newVocabulary.illustration.length < 1) ||
      (!this.newVocabulary.courseKey || this.newVocabulary.courseKey.length < 1)
    ) {
      this.toastrService.error("Hãy nhập đầy đủ các trường bắt buộc", "Error", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    } else {
      console.log(this.newVocabulary);
      try {
        this.exerciseDataService.createVocabulary(this.newVocabulary);
        this.toastrService.success("Tạo vocabulary thành công", "Success", {
          timeOut: 2000,
          positionClass: "toast-bottom-center"
        });
        this.vocabularyForm.reset();
        this.vocabularyForm.markAsUntouched();

      } catch (err) {
        console.log(err);
        this.toastrService.error(err.name, "Error", {
          timeOut: 2000,
          positionClass: "toast-bottom-center"
        });
      }
    }
  }

  createCourse() {
    console.log(this.newCourse);
    if (!this.newCourse.description) {
      this.newCourse.description = "";
    }
    if (!this.newCourse.logoUrl) {
      this.newCourse.logoUrl = "";
    }
    if (!this.newCourse.backgroundColor) {
      this.newCourse.backgroundColor = "";
    }
    if (
      !this.newCourse.key ||
      this.newCourse.key.length < 1 ||
      (!this.newCourse.title || this.newCourse.title.length < 1) ||
      this.newCourse.maxQuestionNumber === undefined ||
      this.newCourse.exp === undefined ||
      this.newCourse.requirement === undefined
    ) {
      this.toastrService.error("Hãy nhập đầy đủ các trường bắt buộc", "Error", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    } else if (
      !this.courseService.isNewKey(
        this.newCourse.key,
        this.sharedDataService.courseList
      )
    ) {
      this.toastrService.error("Key đã tồn tại", "Error", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    } else if (this.newCourse.maxQuestionNumber < 1 || this.newCourse.exp < 1) {
      this.toastrService.error(
        "Question number, Exp và Requirement phải lớn hơn 0",
        "Error",
        {
          timeOut: 2000,
          positionClass: "toast-bottom-center"
        }
      );
    } else {
      try {
        this.courseService.createCourse(this.newCourse);
        this.toastrService.success("Tạo course thành công", "Success", {
          timeOut: 2000,
          positionClass: "toast-bottom-center"
        });
        this.courseService.getCourses().subscribe(courseList => {
          this.sharedDataService.courseList = courseList;
          //console.log(courseList);
        });
        this.courseForm.reset();
        this.courseForm.markAsUntouched();
        //this.newCourse = new Course();
        //console.log(this.newCourse);
        //this.courseForm.
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
    this.courseService.getCourses().subscribe(courseList => {
      this.sharedDataService.courseList = courseList;
      //console.log(courseList);
    });
  }
}
