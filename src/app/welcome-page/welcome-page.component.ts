import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Difficulty } from '../models/difficulty';
import { DifficultyService } from '../services/difficulty.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

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
  difficulties: Difficulty[];
  selectedDifficulty: Difficulty;

  modalRef: BsModalRef;

  constructor(
    private difficultyService: DifficultyService,
    private modalService: BsModalService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getDifficulties();

    if (localStorage.getItem('user')) {
      this.router.navigateByUrl('/exercise-menu');
    }

  }

  getDifficulties(): void {
    this.difficultyService.getDifficulties()
      .subscribe((difficulties: Difficulty[]) => {
        this.difficulties = difficulties;
        this.selectedDifficulty = difficulties[1];
      });
  }

  selectDifficulty(difficulty: Difficulty): void {
    this.selectedDifficulty = difficulty;
  }

  openConfirmModal(template: TemplateRef<any>): void {
    if (!this.selectedDifficulty) {
      console.log('Difficulty not seletected');
      return;
    }

    this.modalRef = this.modalService.show(template);
    return;
  }

  confirmDifficulty(): void {
    if (!this.selectedDifficulty) {
      console.log('Difficulty not selected');
      return;
    }

    console.log('User saved to localStorage');
    const user = new User();
    user.totalExp = 0;
    user.todayExp = 0;
    user.streak = 0;
    user.difficulty = { ...this.selectedDifficulty };
    localStorage.setItem('user', JSON.stringify(user));

    this.modalRef.hide();
    this.router.navigateByUrl('/exercise-menu');
  }
}
