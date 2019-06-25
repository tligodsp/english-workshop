import { Component, OnInit } from '@angular/core';
import { COURSES } from '../../mock-courses';
import { Course } from '../../models/course';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-data-page',
  templateUrl: './create-data-page.component.html',
  styleUrls: ['./create-data-page.component.css']
})
export class CreateDataPageComponent implements OnInit {
  courses = COURSES;
  options: FormGroup;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  ngOnInit() {
  }

}
