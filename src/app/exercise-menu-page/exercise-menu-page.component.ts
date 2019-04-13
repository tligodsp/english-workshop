import { Component, OnInit } from '@angular/core';

const COURSES = [
  {
    title: 'Cơ bản 1',
    logo: 'https://image.flaticon.com/icons/svg/1685/1685373.svg',
    backgroundColor: 'coral',
    description: 'Những từ vựng cơ bản, gặp trong đời sống hằng ngày',
    exp: 5,
  },
  {
    title: 'Cơ bản 2',
    logo: 'https://image.flaticon.com/icons/svg/1592/1592019.svg',
    backgroundColor: '',
    description: 'Thêm nhiều từ cơ bản hơn nữa',
    exp: 5,
  },
  {
    title: 'Cụm từ',
    logo: 'https://image.flaticon.com/icons/svg/1592/1592007.svg',
    backgroundColor: '',
    description: 'Một số câu giao tiếp thường dùng',
    exp: 10,
  },
];

@Component({
  selector: 'app-exercise-menu-page',
  templateUrl: './exercise-menu-page.component.html',
  styleUrls: ['./exercise-menu-page.component.css']
})
export class ExerciseMenuPageComponent implements OnInit {
  currentExp: number = 5;
  targetExp: number = 20;

  courses: any[] = COURSES;

  constructor() { }

  ngOnInit() {
  }

  getPercent():number {
    return (this.currentExp / this.targetExp) * 100;
  }

}
