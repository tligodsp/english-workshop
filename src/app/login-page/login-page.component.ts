import { Component, OnInit } from '@angular/core';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  providers = AuthProvider;
  user: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }



  onLoginSuccess() {
    // console.log(event);
    this.authService.user$.subscribe(user => {
      //console.log(user);
      if (user.difficultyId === undefined ) { //first time login
        user.difficultyId = null;
        user.role = 'member';
        user.streak = 0;
        user.todayExp = 0;
        user.totalExp = 0;
        user.totalPoints = 0;
        user.difficulty = null;
      }
      this.authService.updateUserData(user);
      setTimeout(() => {
        if (user.difficultyId === null) {
          this.router.navigateByUrl('/welcome');
        }
        else {
          this.router.navigateByUrl('/exercise-page');
        }
      }, 1000);
    })
  }

  printError(event) {
   console.error(event);
  }

}
