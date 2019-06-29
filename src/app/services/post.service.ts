import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { FirebaseService } from "./firebase.service";
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private firebaseService: FirebaseService) { }

  createPost(post: Post) {
    this.firebaseService.createPost(post);
  }

  updatePostUpvote(postId: string, newUpvote: number) {
    this.firebaseService.updatePostUpvote(postId, newUpvote);
  }

  getPosts(): Observable<Post[]> {
    //console.log('b');
    return of(this.firebaseService.getPosts());
  }

  getPostsValueChanges() {
    return this.firebaseService.getPostsValueChanges();
  }
}
