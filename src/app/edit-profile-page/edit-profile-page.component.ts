import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from "ngx-toastr";
import { User } from '../models/user';
import { DifficultyService } from '../services/difficulty.service';
import { Difficulty } from '../models/difficulty';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.css']
})
export class EditProfilePageComponent implements OnInit {
  user: User = new User();

  isValid = true;

  activeTab: string = 'account';
  cardTitle: string = 'Cài đặt tài khoản';

  // Account tab
  imageName: string = '';

  // Password tab
  currentPassword: string = '';
  newPassword: string = '';

  // Difficulty tab
  difficulties: Difficulty[] = [];

  constructor(private userService: UserService, private difficultyService: DifficultyService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;

      console.log(this.user.photoURL);
    });

    this.difficultyService.getDifficulties().subscribe(difficulties => {
      this.difficulties = difficulties;
    });
  }

  changeActiveTab(toTab: string) {
    this.activeTab = toTab;
    switch (this.activeTab) {
      case 'account':
        this.cardTitle = 'Cài đặt tài khoản';
        break;
      case 'password':
        this.cardTitle = 'Đặt lại mật khẩu';
        break;
      case 'difficulty':
        this.cardTitle = 'Chế độ luyện tập mỗi ngày';
        break;
    }
  }

  checkValid() {
    if (this.user.displayName === '' || this.user.email === '') {
      this.isValid = false;
      return;
    }

    // if (this.currentPassword === '' || this.newPassword === '') {
    //   this.isValid = false;
    //   return;
    // }

    if (!this.user.difficulty) {
      this.isValid = false;
      return;
    }

    this.isValid = true;
  }

  saveChanges() {
    this.checkValid();
    if (this.isValid === false) {
      this.toastrService.error('Nhập đủ trường đi má', 'Thất bại', { timeOut: 2000, positionClass: 'toast-bottom-center' });
      return;
    }

    this.userService.updateUserData(this.user).subscribe(response => {
      this.toastrService.success('Đã lưu thông tin tài khoản', 'Thành công', { timeOut: 2000, positionClass: 'toast-bottom-center' });
    })
  }

  // Account tab
  photoUploaded(event) {
    console.log(event.srcElement.value.split('/').pop().split('\\').pop());
    this.imageName = event.srcElement.value.split('/').pop().split('\\').pop();

    const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.user.photoURL = reader.result; // Đây là Base64
  }

  // Difficulty tab
  selectDifficulty(difficulty: Difficulty) {
    this.user.difficulty = difficulty;
    this.user.difficultyId = difficulty.id;
  }
}

