import { Component, OnInit } from '@angular/core';

const DIFFICULTIES = [
  { name: 'Dễ', minutes: 5},
  { name: 'Vừa', minutes: 10},
  { name: 'Khó', minutes: 15},
  { name: 'Rất Khó', minutes: 20},
];

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  difficulties = DIFFICULTIES;

  constructor() { }

  ngOnInit() {
  }

}
