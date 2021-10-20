import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PostModel } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts: PostModel[] = [];
  postChanged = new Subject<PostModel[]>();

  constructor() { }

  fill(posts: PostModel[]) {
    this.posts = posts;
    this.postChanged.next(this.posts);
  }

  add(guide: PostModel) {
    this.posts.push(guide);
    this.postChanged.next(this.posts);
  }

  update(guide: PostModel, index: number) {
    this.posts[index] = guide;
    this.postChanged.next(this.posts);
  }

  remove(index: number) {
    this.posts.splice(index, 1);
    this.postChanged.next(this.posts);
  }
}
