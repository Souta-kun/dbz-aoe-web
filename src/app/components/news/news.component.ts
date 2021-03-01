import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostModel } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {
  sub: Subscription;
  posts: PostModel[] = [];
  img: string = 'https://scontent.fsal2-1.fna.fbcdn.net/v/t1.0-9/132557439_204403257987941_307335167125627793_n.jpg?_nc_cat=105&ccb=3&_nc_sid=8bfeb9&_nc_ohc=TcDJ010AQ5AAX_fwA6-&_nc_ht=scontent.fsal2-1.fna&oh=93538d2ca805fd14370fff91ba6ceb1e&oe=605CE9FE';
  
  constructor(private postService: PostService,
              private dsService: DataStorageService) { }

  ngOnInit(): void {
    this.sub = this.postService.postChanged.subscribe(posts => {
      this.posts = posts;
    });
    this.dsService.getPost();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
