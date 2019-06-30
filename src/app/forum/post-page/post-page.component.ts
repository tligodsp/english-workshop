import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { ArrayHelper } from '../../helpers/array-helper';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ID } from '../../helpers/ultil';
import { SharedDataService } from '../../services/shared-data.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from "ngx-toastr";
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;
import { Comment, UpvoteUser } from '../../models/comment';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  postId: string;
  posts: Post[];
  post: Post;
  postCategory: Course;
  courses: Course[];
  comments: Comment[];
  filteredPosts: Post[];
  relatedCourses: Course[];
  users: User[];
  relatedPosts: Post[] = [];
  postAuthor: User;
  // upvoteUsers: UpvoteUser[];
  user: User;

  curUserLoaded = false;

  newComment: string;

  arrHelper = ArrayHelper;

  constructor(private postService: PostService, private courseService: CourseService, 
    private userService: UserService, public shareDataService: SharedDataService,
    private authService: AuthService, private toastrService: ToastrService,
    private route: ActivatedRoute, private router: Router) { }

  onPostUpvote(post: Post) {
    if (!(this.shareDataService.curUser.role === 'admin' || this.shareDataService.curUser.role === 'member')) {
      return;
    }

    for (let upvoteUser of post.upvoteUsers) {
      if (upvoteUser.uid === this.shareDataService.curUser.uid) {
        if (upvoteUser.upvote > 0) {
          return; //only upvote once
        }
        else if (upvoteUser.upvote < 0) {
          this.postService.updatePostUpvote(post.id, this.shareDataService.curUser.uid, 0, post.upvote + 1);
          return;
        }
      }
    }

    this.postService.updatePostUpvote(post.id, this.shareDataService.curUser.uid, 1, post.upvote + 1);
  } 

  onPostDownvote(post: Post) {
    if (!(this.shareDataService.curUser.role === 'admin' || this.shareDataService.curUser.role === 'member')) {
      return;
    }

    for (let upvoteUser of post.upvoteUsers) {
      if (upvoteUser.uid === this.shareDataService.curUser.uid) {
        if (upvoteUser.upvote < 0) {
          return; //only downvote once
        }
        else if (upvoteUser.upvote > 0) {
          this.postService.updatePostUpvote(post.id, this.shareDataService.curUser.uid, 0, post.upvote - 1);
          return;
        }
      }
    }
    
    this.postService.updatePostUpvote(post.id, this.shareDataService.curUser.uid, -1, post.upvote - 1);
  }

  isPostUpvoted(post: Post): Boolean {
    for (let upvoteUser of post.upvoteUsers) {
      if (upvoteUser.uid === this.shareDataService.curUser.uid) {
        if (upvoteUser.upvote > 0) {
          return true;
        }
      }
    }
  }

  isPostDownvoted(post: Post): Boolean {
    for (let upvoteUser of post.upvoteUsers) {
      if (upvoteUser.uid === this.shareDataService.curUser.uid) {
        if (upvoteUser.upvote < 0) {
          return true;
        }
      }
    }
  }

  isCommentUpvoted(comment: Comment): Boolean {
    for (let upvoteUser of comment.upvoteUsers) {
      if (upvoteUser.uid === this.shareDataService.curUser.uid) {
        if (upvoteUser.upvote > 0) {
          return true;
        }
      }
    }
  }

  isCommentDownvoted(comment: Comment): Boolean {
    for (let upvoteUser of comment.upvoteUsers) {
      if (upvoteUser.uid === this.shareDataService.curUser.uid) {
        if (upvoteUser.upvote < 0) {
          return true;
        }
      }
    }
  }

  onCommentUpvote(comment: Comment) {
    if (!(this.shareDataService.curUser.role === 'admin' || this.shareDataService.curUser.role === 'member')) {
      return;
    }

    for (let upvoteUser of comment.upvoteUsers) {
      if (upvoteUser.uid === this.shareDataService.curUser.uid) {
        if (upvoteUser.upvote > 0) {
          return; //only upvote once
        }
        else if (upvoteUser.upvote < 0) {
          this.postService.updateCommentUpvote(this.postId, comment.id, this.shareDataService.curUser.uid, 0, comment.upvote + 1);
          return;
        }
      }
    }

    this.postService.updateCommentUpvote(this.postId, comment.id, this.shareDataService.curUser.uid, 1, comment.upvote + 1);
  } 
  
  onCommentDownvote(comment: Comment) {
    if (!(this.shareDataService.curUser.role === 'admin' || this.shareDataService.curUser.role === 'member')) {
      return;
    }

    for (let upvoteUser of comment.upvoteUsers) {
      if (upvoteUser.uid === this.shareDataService.curUser.uid) {
        if (upvoteUser.upvote < 0) {
          return; //only downvote once
        }
        else if (upvoteUser.upvote > 0) {
          this.postService.updateCommentUpvote(this.postId, comment.id, this.shareDataService.curUser.uid, 0, comment.upvote - 1);
          return;
        }
      }
    }

    this.postService.updateCommentUpvote(this.postId, comment.id, this.shareDataService.curUser.uid, - 1, comment.upvote - 1);
  }

  onCancelCommentClick() {
    this.newComment = '';
  }

  onPostClick() {
    let comment: Comment;
    comment = {
      id: ID(),
      authorId: this.shareDataService.curUser.uid,
      content: this.newComment,
      upvote: 0,
      time: Timestamp.fromDate(new Date()),
    }

    if ( !comment.content || comment.content.length < 1 )
    {
      this.toastrService.error("Xin nhập nội dung", "Error", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    } 
    else {
      try {
        console.log(comment);
        this.postService.createComment(this.postId, comment);
        this.toastrService.success("Đã bình luận", "Success", {
          timeOut: 2000,
          positionClass: "toast-bottom-center"
        });

        this.newComment = '';
        // this.courseService.getCourses().subscribe(courseList => {
        //   this.sharedDataService.courseList = courseList;
        //   //console.log(courseList);
        // });
        // this.courseForm.reset();
        // this.courseForm.markAsUntouched();

        
      } catch (err) {
        console.log(err);
        this.toastrService.error(err.name, "Error", {
          timeOut: 2000,
          positionClass: "toast-bottom-center"
        });
      }
    }
  }

  getDisplayDate(timestamp: Timestamp): string {
    let d: Date = timestamp.toDate();
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }
  
  getCategory(key: string): Course {
    for (let course of this.courses) {
      if (course.key === key) {
        return course;
      }
    } 
  }

  setPostAuthor(post: Post) {
    for (let user of this.users) {
      if (post.authorId === user.uid) {
        // console.log(user.photoURL);
        this.postAuthor = user;
        return;
      }
    }
  }

  getCommentAuthor(comment: Comment): User {
    for (let user of this.users) {
      if (comment.authorId === user.uid) {
        // console.log(user.photoURL);
        return user;
      }
    }
  }

  logOut() {
    // console.log(this.sharedDataService.curUser);
    this.authService.signOut().then(() => {
      this.router.navigateByUrl('/showcase');
    });

  }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');

    this.userService.getUsersValueChanges().subscribe((users: User[]) => {
      this.users = users;
      //console.log(users);
    });
    this.courseService.getCoursesValueChanges().subscribe((courses: Course[]) => {
      this.courses = courses;
    });
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.shareDataService.curUser = user;
      this.curUserLoaded = true;
    });
    setTimeout(()=> {
      this.postService.getPostsValueChanges().subscribe((posts: Post[]) => {
        this.posts = posts;
        //this.applyFilter('');
        //console.log(this.posts);
      });
      this.postService.getPostValueChanges(this.postId).subscribe((post: Post) => {
        this.post = post;
        this.relatedPosts = [];
        this.posts.forEach(postElem => {
          if (postElem.categoryId === post.categoryId) {
            this.relatedPosts.push(postElem);
          }
        });
        this.setPostAuthor(post);
      });
      this.postService.getPostCommentValueChanges(this.postId).subscribe((comments: Comment[]) => {
        this.comments = comments;
        if (!this.comments) {
          this.comments = [];
        }
        this.comments.forEach(comment => {
          this.postService.getCommentUpvoteUsersValueChanges(this.postId, comment.id).subscribe((upvoteUsers: UpvoteUser[]) => {
            comment.upvoteUsers = upvoteUsers;
            if (!comment.upvoteUsers) {
              comment.upvoteUsers = [];
            }
          });
        });
        
        this.comments.sort((val1, val2)=> {
          return new Date(val2.time.toDate()).getTime() - new Date(val1.time.toDate()).getTime()
        })
      });
      this.postService.getPostUpvoteUsersValueChanges(this.postId).subscribe((upvoteUsers: UpvoteUser[]) => {
        this.post.upvoteUsers = upvoteUsers;
        // this.upvoteUsers = upvoteUsers;
        //this.upvoteLoaded = true;
        if (!this.post.upvoteUsers) {
          // this.upvoteUsers = [];
          this.post.upvoteUsers = [];
        }
      });
    },1000)
  }

}
