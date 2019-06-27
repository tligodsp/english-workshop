import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {

  isLoggedIn: boolean;
  user: User;

  constructor(private router: Router, private authService: AuthService) { 
    this.authService.user$.subscribe(user => {
      //console.log(user);
      this.user = user;
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
      this.router.navigateByUrl('/welcome');
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
