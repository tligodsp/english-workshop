import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from "ngx-toastr";
import { User } from '../models/user';
import { DifficultyService } from '../services/difficulty.service';
import { Difficulty } from '../models/difficulty';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.css']
})
export class EditProfilePageComponent implements OnInit {
  originalUser: User = new User(); // User gốc chưa thay đổi
  user: User = new User(); // User input đã thay đổi

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

  constructor(private userService: UserService, private difficultyService: DifficultyService, private toastrService: ToastrService, private authService: AuthService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.originalUser = {...user};
      this.user = {...user};

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

    // if (!this.user.difficulty) {
    //   this.isValid = false;
    //   return;
    // }

    this.isValid = true;
  }

  saveChanges() {
    if (this.activeTab === 'account') {
      this.checkValid();
      if (this.isValid === false) {
        this.toastrService.error('Nhập đủ trường đi má', 'Thất bại', { timeOut: 2000, positionClass: 'toast-bottom-center' });
        return;
      }

      this.originalUser.displayName = this.user.displayName;
      this.originalUser.email = this.user.email; // Không cho sửa nhưng cứ để vô cho chắc
      this.originalUser.photoURL = this.user.photoURL;

      this.userService.updateUserData(this.originalUser).subscribe(response => {
        this.toastrService.success('Đã lưu thông tin tài khoản', 'Thành công', { timeOut: 2000, positionClass: 'toast-bottom-center' });
      });
      return;
    }


    if (this.activeTab === 'password') {
      this.userService.updateUserPassword(this.currentPassword, this.newPassword);
      return;
    }

    if (this.activeTab === 'difficulty') {
      if (this.user.difficultyId === this.originalUser.difficultyId) {
        return;
      }

      this.originalUser.difficulty = {...this.user.difficulty};
      this.originalUser.difficultyId = this.user.difficultyId;

      this.userService.updateUserData(this.originalUser).subscribe(response => {
        this.toastrService.success('Đã lưu chế độ huấn luyện', 'Thành công', { timeOut: 2000, positionClass: 'toast-bottom-center' });
      });
      return;
    }
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

  signOut() {
    this.authService.signOut();
  }
}

