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
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[];
  filteredPosts: Post[];
  courses: Course[];
  users: User[];
  isWritingPost: Boolean;
  comments: Comment[];

  newPostTitle: string;
  newPostContent: string;
  newPostCategoryId: string;

  arrHelper = ArrayHelper;

  curUserLoaded = false;
  upvoteLoaded = false;

  user: User;

  setPostsAuthors() {
    this.posts.forEach(post => {
      for (let user of this.users) {
        if (post.authorId === user.uid) {
          post.author = user;
          //console.log(user);
        }
      }
    });
  }

  newPostCategorySelected(event) {
    this.newPostCategoryId = event.value;
    //console.log(this.newPostCategoryId);
  }

  onNewPostClick() {
    this.isWritingPost = true;
    this.newPostContent = '';
    this.newPostTitle = '';
  }

  onCancelNewPostClick() {
    this.isWritingPost = false;
    this.newPostContent = '';
    this.newPostTitle = '';
  }

  isPostUpvoted(post: Post): Boolean {
    for (let upvoteUser of post.upvoteUsers) {
      if (upvoteUser.uid === this.sharedDataService.curUser.uid) {
        if (upvoteUser.upvote > 0) {
          return true;
        }
      }
    }
  }

  isPostDownvoted(post: Post): Boolean {
    for (let upvoteUser of post.upvoteUsers) {
      if (upvoteUser.uid === this.sharedDataService.curUser.uid) {
        if (upvoteUser.upvote < 0) {
          return true;
        }
      }
    }
  }

  onUpvote(post: Post) {
    if (!(this.sharedDataService.curUser.role === 'admin' || this.sharedDataService.curUser.role === 'member')) {
      return;
    }

    for (let upvoteUser of post.upvoteUsers) {
      if (upvoteUser.uid === this.sharedDataService.curUser.uid) {
        if (upvoteUser.upvote > 0) {
          return; //only upvote once
        }
        else if (upvoteUser.upvote < 0) {
          this.postService.updatePostUpvote(post.id, this.sharedDataService.curUser.uid, 0, post.upvote + 1);
          return;
        }
      }
    }

    this.postService.updatePostUpvote(post.id, this.sharedDataService.curUser.uid, 1, post.upvote + 1);
    
  } 

  onDownvote(post: Post) {
    if (!(this.sharedDataService.curUser.role === 'admin' || this.sharedDataService.curUser.role === 'member')) {
      return;
    }

    for (let upvoteUser of post.upvoteUsers) {
      if (upvoteUser.uid === this.sharedDataService.curUser.uid) {
        if (upvoteUser.upvote < 0) {
          return; //only downvote once
        }
        else if (upvoteUser.upvote > 0) {
          this.postService.updatePostUpvote(post.id, this.sharedDataService.curUser.uid, 0, post.upvote - 1);
          return;
        }
      }
    }
    
    this.postService.updatePostUpvote(post.id, this.sharedDataService.curUser.uid, -1, post.upvote - 1);
  }

  onPostClick() {
    // console.log(this.newPostTitle);
    // console.log(this.newPostContent);
    // console.log(this.newPostCategoryId);
    if (!this.newPostCategoryId) {
      this.newPostCategoryId = '';
    }
    let newPost: Post;
    newPost = {
      id: ID(),
      title: this.newPostTitle,
      authorId: this.sharedDataService.curUser.uid,
      categoryId: this.newPostCategoryId,
      content: this.newPostContent,
      upvote: 0,
      commentList: [],
      time: Timestamp.fromDate(new Date()),
    }
    //console.log(newPost);

    if ( !newPost.title || newPost.title.length < 1 ) {
      this.toastrService.error("Cin nhập tiêu đề", "Error", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    } 
    else if ( !newPost.content || newPost.content.length < 1 )
    {
      this.toastrService.error("Xin nhập nội dung", "Error", {
        timeOut: 2000,
        positionClass: "toast-bottom-center"
      });
    } 
    else {
      try {
        // this.courseService.createCourse(this.newCourse);
        this.postService.createPost(newPost);
        this.toastrService.success("Đã gửi bài", "Success", {
          timeOut: 2000,
          positionClass: "toast-bottom-center"
        });

        setTimeout(()=>{this.isWritingPost = false;},1000);
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

  getPostAuthor(post: Post): User {
    for (let user of this.users) {
      if (post.authorId === user.uid) {
        // console.log(user.photoURL);
        return user;
      }
    }
  }
  
  getPostNumComments(post: Post): number {
    if (post.commentList) {
      return post.commentList.length;
    }
    return 0;
  }

  getPostCategory(post: Post): Course {
    for (let course of this.courses) {
      if (post.categoryId === course.key) {
        return course;
      }
    }
    //post.categoryId = "";
  }

  applyFilter(categoryId: string) {
    //console.log(categoryId);
    //console.log(this.posts);
    if (categoryId === '') {
      this.filteredPosts = this.posts;
      //sort by new
      this.filteredPosts.sort((val1, val2)=> {
        return new Date(val2.time.toDate()).getTime() - new Date(val1.time.toDate()).getTime()
      })
      //console.log(this.filteredPosts);
      return;
    }
    this.filteredPosts = [];
    this.posts.forEach(post => {
      //let timestamp = Timestamp.fromDate(post.time);
      console.log(post.time.toDate());
      if (post.categoryId === categoryId) {
        this.filteredPosts.push(post);
      }
    });
  }

  logOut() {
    // console.log(this.sharedDataService.curUser);
    this.authService.signOut().then(() => {
      this.router.navigateByUrl('/showcase');
    });

  }

  constructor(private postService: PostService, private courseService: CourseService, 
    private userService: UserService, public sharedDataService: SharedDataService,
    private authService: AuthService, private toastrService: ToastrService,
    private router: Router) {
    this.isWritingPost = false;
    // this.user = this.sharedDataService.curUser;
    // console.log(this.user);
    // this.curUserLoaded = true;
  }

  ngOnInit() {
    //console.log('aaa');
    // this.postService.getPosts().subscribe(posts => {
    //   this.posts = posts;
    //   // console.log(this.posts);
    // });
    this.userService.getUsersValueChanges().subscribe((users: User[]) => {
      this.users = users;
      //console.log(users);
    });
    this.courseService.getCoursesValueChanges().subscribe((courses: Course[]) => {
      this.courses = courses;
    });
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.sharedDataService.curUser = user;
      if (this.user) {
        this.curUserLoaded = true;
      }
    });
    // this.userService.getCurrentUser().subscribe(user => {
    //   //this.u = user;
    //   this.sharedDataService.curUser = user;
      
    // });
    setTimeout(()=> {
      this.postService.getPostsValueChanges().subscribe((posts: Post[]) => {
        this.posts = posts;
        this.posts.forEach(post => {
          this.postService.getPostCommentValueChanges(post.id).subscribe((comments: Comment[]) => {
            post.commentList = comments;
            if (!post.commentList) {
              post.commentList = [];
            }
          });
          this.postService.getPostUpvoteUsersValueChanges(post.id).subscribe((upvoteUsers: UpvoteUser[]) => {
            post.upvoteUsers = upvoteUsers;
            this.upvoteLoaded = true;
            if (!post.upvoteUsers) {
              post.upvoteUsers = [];
            }

            
          });
        });
        this.applyFilter('');
        //console.log(this.posts);
      });
      
    },1000)
  }

}
