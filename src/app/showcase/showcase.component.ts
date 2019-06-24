import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getStart() {
    const user = localStorage.getItem('user');
    if (user) {
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
}
