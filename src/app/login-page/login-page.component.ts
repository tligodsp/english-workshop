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
    this.authService.user$.subscribe(user => {
      this.user = user;
      //console.log(this.user);
    });
  }

  // async updateUser() {
  //   await this.authService.user$.toPromise().then(user => {
  //     //this.user = user;
  //     console.log('a');
  //     console.log(this.user);
  //     console.log('b');
  //   });
  //   console.log(this.user);
  // }

  onLoginSuccess() {
    setTimeout(()=>{
      this.authService.user$.subscribe(user => {
        if (user.difficultyId === undefined ) { //first time login
          user.difficultyId = null;
          //user.role = 'member';
          user.streak = 0;
          user.todayExp = 0;
          user.totalExp = 0;
          user.totalPoints = 0;
          user.difficulty = null;
          user.photoURL = 'https://secure.gravatar.com/avatar/422cc9aff6a6b347433ee23d19638245?s=150&d=mm&r=g';
          if (!user.email) {
            user.role = 'guest';
          }
          else {
            user.role = 'member';
          }
          console.log('first');
        }
        this.authService.updateUserData(user);
        setTimeout(() => {
          if (user.difficultyId === null) {
            this.router.navigateByUrl('/welcome');
          }
          else {
            this.router.navigateByUrl('/exercise-menu');
          }
        }, 1000);
      })
    }, 2000);
  }

  printError(event) {
   console.error(event);
  }

}
