import { Component, OnDestroy, OnInit } from '@angular/core';

import { PostModel } from 'src/app/core/models/post.model';
import { PostService } from 'src/app/core/services/post.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
})
export class NewsComponent implements OnInit, OnDestroy {
  sub: Subscription;
  posts: PostModel[] = [];

  constructor(
    private postService: PostService,
    private dsService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.sub = this.postService.postChanged.subscribe((posts) => {
      this.posts = posts;
    });
    this.dsService.getPost();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
