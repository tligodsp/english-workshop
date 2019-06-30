import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Difficulty } from '../models/difficulty';
import { DifficultyService } from '../services/difficulty.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { SharedDataService } from '../services/shared-data.service';

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
  user: User;

  modalRef: BsModalRef;

  constructor(
    private difficultyService: DifficultyService,
    private userService: UserService,
    private modalService: BsModalService,
    private sharedDateService:SharedDataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getDifficulties();

    if (this.sharedDateService.curUser && this.sharedDateService.curUser.difficultyId) {
      this.router.navigateByUrl('/exercise-menu');
    }

    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      console.log(user);
      if (user.difficultyId) {
        this.router.navigateByUrl('/exercise-menu');
      }
    });
    // if (localStorage.getItem('user')) {
    //   //this.router.navigateByUrl('/exercise-menu');
    //   console.log('b');
    // }

  }

  getDifficulties(): void {
    this.difficultyService.getDifficulties()
      .subscribe((difficulties: Difficulty[]) => {
        this.difficulties = difficulties;
        this.selectedDifficulty = difficulties[1];
        //console.log(0);
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
    // let user: User;
    // // user.totalExp = 0;
    // // user.todayExp = 0;
    // // user.streak = 0;
    // // user.difficulty = { ...this.selectedDifficulty };
    // // localStorage.setItem('user', JSON.stringify(user));
    // this.userService.getCurrentUser().subscribe(curUser => {
    //   user = curUser;
    //   user.difficulty = { ...this.selectedDifficulty };
    //   user.difficultyId = this.selectedDifficulty.id;
    //   this.userService.updateUserData(user).subscribe(() => {
    //     this.modalRef.hide();
    //     //this.router.navigateByUrl('/exercise-menu');
    //   })
    // });
    this.user.difficulty = { ...this.selectedDifficulty };
    this.user.difficultyId = this.selectedDifficulty.id;
    this.userService.updateUserData(this.user).subscribe(() => {
      this.modalRef.hide();
    });


    // this.modalRef.hide();
    // this.router.navigateByUrl('/exercise-menu');
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }
}
