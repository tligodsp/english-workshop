import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { FirebaseService } from "./firebase.service";
import { Post } from '../models/post';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private firebaseService: FirebaseService) { }

  createPost(post: Post) {
    this.firebaseService.createPost(post);
  }

  createComment(postId: string, comment: Comment) {
    this.firebaseService.createComment(postId, comment);
  }

  updatePostUpvote(postId: string, newUpvote: number) {
    this.firebaseService.updatePostUpvote(postId, newUpvote);
  }

  updateCommentUpvote(postId: string, commentId: string, newUpvote: number) {
    this.firebaseService.updateCommentUpvote(postId, commentId, newUpvote);
  }

  getPosts(): Observable<Post[]> {
    //console.log('b');
    return of(this.firebaseService.getPosts());
  }

  getPostValueChanges(id: string) {
    return this.firebaseService.getPostValueChanges(id);
  }

  getPostCommentValueChanges(postId: string) {
    return this.firebaseService.getPostCommentsValueChanges(postId);
  }

  getPostsValueChanges() {
    return this.firebaseService.getPostsValueChanges();
  }
}
