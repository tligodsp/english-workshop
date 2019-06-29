import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SharedDataService } from '../services/shared-data.service';
import { User } from '../models/user';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {

  isLoggedIn: boolean;
  user: User;
  userLoaded = false;

  constructor(private router: Router, public sharedDateService:SharedDataService, private authService: AuthService) { 
    this.authService.user$.subscribe(user => {
      //console.log(user);
      this.user = user;
      this.sharedDateService.curUser = user;
      this.userLoaded = true;
      if (user) {
        this.isLoggedIn = true;
        //console.log('true');
      }
      else {
        this.isLoggedIn = false;
        //console.log('false');
      }
    });
  }

  ngOnInit() {
  }

  getStart() {
    //const user = localStorage.getItem('user');
    if (this.user && this.user.difficultyId) {
      this.router.navigateByUrl('/exercise-menu');
    } else {
      //this.router.navigateByUrl('/welcome');
      this.navigateToLogin();
    }
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

  navigateToWelcome() {
    this.router.navigateByUrl('/welcome');
  }

  logOut() {
    this.authService.signOut();
  }
}
