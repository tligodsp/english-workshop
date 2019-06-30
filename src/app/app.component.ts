import { Component, OnInit } from '@angular/core';
import { SharedDataService } from './services/shared-data.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { TimeHelper } from './helpers/time-helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'english-workshop';
  constructor(private authService: AuthService, private sharedDataService: SharedDataService, private userService: UserService) {
    //console.log('aaasdadasasdasdasd');
  }
  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.sharedDataService.curUser = user;
      console.log(this.sharedDataService.curUser);
    });
    setTimeout(() => {
      if (this.sharedDataService) {
        if (!this.sharedDataService.curUser.lastDidExercise) {
          this.sharedDataService.curUser.todayExp = 0;
          this.sharedDataService.curUser.streak = 0;
          this.userService.updateUserData(this.sharedDataService.curUser);
        }
        else if (this.sharedDataService.curUser.lastDidExercise) {
          let d = new Date();
          let userLastDidExercise = this.sharedDataService.curUser.lastDidExercise.toDate();
          if (TimeHelper.getDaysBetween(d, userLastDidExercise) > 1.5) {
            //this.sharedDataService.curUser.todayExp = 0;
            this.sharedDataService.curUser.streak = 0;
            //this.userService.updateUserData(this.sharedDataService.curUser);
          } 
          if (d > userLastDidExercise && d.getDate() !== userLastDidExercise.getDate()) {
            this.sharedDataService.curUser.todayExp = 0;
          }
          //console.log(TimeHelper.getDaysBetween((new Date()), this.sharedDataService.curUser.lastDidExercise.toDate()))
          this.userService.updateUserData(this.sharedDataService.curUser);
        }
      }
    }, 2000);
  }

}
