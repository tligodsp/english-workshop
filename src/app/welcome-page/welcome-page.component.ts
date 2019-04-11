import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Difficulty } from '../models/difficulty';
import { DifficultyService } from '../services/difficulty.service';

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

  constructor(private difficultyService: DifficultyService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getDifficulties();
  }

  getDifficulties(): void {
    this.difficultyService.getDifficulties()
      .subscribe(difficulties => this.difficulties = difficulties);
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
      console.log('Difficulty not seletected');
      return;
    }

    console.log('Difficulty saved to localStorage');
    localStorage.setItem('difficulty', JSON.stringify(this.selectedDifficulty));

    this.modalRef.hide();
  }
}
