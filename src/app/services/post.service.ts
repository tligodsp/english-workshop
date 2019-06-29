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

  updatePostUpvote(postId: string, upvoteUserId: string, upvoteValue: number, newUpvote: number) {
    this.firebaseService.updatePostUpvote(postId, upvoteUserId, upvoteValue, newUpvote);
  }

  updateCommentUpvote(postId: string, commentId: string, upvoteUserId: string, upvoteValue: number, newUpvote: number) {
    this.firebaseService.updateCommentUpvote(postId, commentId, upvoteUserId, upvoteValue, newUpvote);
  }

  getPosts(): Observable<Post[]> {
    //console.log('b');
    return of(this.firebaseService.getPosts());
  }

  getPostValueChanges(id: string) {
    return this.firebaseService.getPostValueChanges(id);
  }

  getPostUpvoteUsersValueChanges(postId: string) {
    return this.firebaseService.getPostUpvoteUsersValueChanges(postId);
  }

  getCommentUpvoteUsersValueChanges(postId: string, commentId: string) {
    return this.firebaseService.getCommentUpvoteUsersValueChanges(postId, commentId);
  }

  getPostCommentValueChanges(postId: string) {
    return this.firebaseService.getPostCommentsValueChanges(postId);
  }

  getPostsValueChanges() {
    return this.firebaseService.getPostsValueChanges();
  }
}
