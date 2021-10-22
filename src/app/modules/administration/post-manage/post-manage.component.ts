import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PostModel } from 'src/app/core/models/post.model';
import { PostService } from 'src/app/core/services/post.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-manage',
  templateUrl: './post-manage.component.html',
  styleUrls: ['./post-manage.component.css'],
})
export class PostManageComponent implements OnInit, OnDestroy {
  isEdit = false;
  currentIndex: number;
  currentPost: PostModel;
  posts: PostModel[] = [];
  form: FormGroup;
  sub: Subscription;

  constructor(
    private postService: PostService,
    private dsService: DataStorageService
  ) {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.maxLength(150),
      ]),
      message: new FormControl(null, [
        Validators.required,
        Validators.maxLength(500),
      ]),
      urlImage: new FormControl(null, [Validators.maxLength(500)]),
    });
  }

  ngOnInit(): void {
    this.sub = this.postService.postChanged.subscribe((data) => {
      this.posts = data;
    });
    this.dsService.getPost();
  }

  Create() {
    this.postService.add(
      new PostModel(
        this.form.controls['title'].value,
        this.form.controls['message'].value,
        Date.now(),
        this.form.controls['urlImage'].value
      )
    );
    this.onReset();
    this.dsService.putPost(this.posts.slice()).subscribe(
      (result) => {},
      (error) => {
        this.dsService.getPost();
        console.log(`error: ${error}`);
      }
    );
  }

  Update() {
    this.postService.update(
      new PostModel(
        this.form.controls['title'].value,
        this.form.controls['message'].value,
        this.currentPost.publicated,
        this.form.controls['urlImage'].value
      ),
      this.currentIndex
    );
    this.onReset();
    this.dsService.putPost(this.posts.slice()).subscribe(
      (result) => {},
      (error) => {
        this.dsService.getPost();
        console.log(`error: ${error}`);
      }
    );
  }

  onSave() {
    if (this.form.invalid) {
      return;
    }

    if (this.isEdit) {
      this.Update();
    } else {
      this.Create();
    }
  }

  onDelete() {
    this.postService.remove(this.currentIndex);
    this.onReset();
    this.dsService.putPost(this.posts.slice()).subscribe(
      (result) => {},
      (error) => {
        this.dsService.getGuide();
        console.log(`error: ${error}`);
      }
    );
  }

  onReset() {
    this.form.reset();
    this.isEdit = false;
    this.currentIndex = null;
    this.currentPost = null;
  }

  onShow(post: PostModel, index: number) {
    this.currentIndex = index;
    this.isEdit = true;
    this.currentPost = post;
    this.form.patchValue({
      title: post.title,
      message: post.message,
      urlImage: post.urlImage,
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
