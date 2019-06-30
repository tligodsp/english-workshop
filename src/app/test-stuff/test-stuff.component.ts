import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-test-stuff',
  templateUrl: './test-stuff.component.html',
  styleUrls: ['./test-stuff.component.css']
})
export class TestStuffComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  testTask() {
    this.taskService.performIn(minutes(30), 'sendWelcomeEmail', { user: 'qmb9UYrAJiUkdGbiQUnq8EFp7LG2' } )
    function minutes(v: number) {
      return v * 60 * 1000;
    }
  }
  

  

}
