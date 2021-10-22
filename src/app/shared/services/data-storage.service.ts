import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DownloadModel } from '../../core/models/download.model';
import { DownloadService } from '../../core/services/download.service';
import { GuideModel } from '../../core/models/guide.model';
import { GuideService } from '../../core/services/guide.service';
import { PostModel } from '../../core/models/post.model';
import { PostService } from '../../core/services/post.service';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private downloadUrl: string = 'downloads.json';
  private guideUrl: string = 'guides.json';
  private postUrl: string = 'posts.json';

  constructor(
    private http: HttpClient,
    private downloadService: DownloadService,
    private guideService: GuideService,
    private postService: PostService
  ) {}

  getDownload() {
    this.http
      .get<DownloadModel[]>(`${environment.apiDatabase}${this.downloadUrl}`)
      .pipe(
        map((response) => {
          if (!response) {
            response = [];
          }
          return response;
        })
      )
      .subscribe(
        (response) => {
          this.downloadService.fill(response);
        },
        (error) => {
          console.log(`error: ${error}`);
        }
      );
  }

  putDownload(body: DownloadModel[]) {
    return this.http.put(`${environment.apiDatabase}${this.downloadUrl}`, body);
  }

  getGuide() {
    this.http
      .get<GuideModel[]>(`${environment.apiDatabase}${this.guideUrl}`)
      .pipe(
        map((response) => {
          if (!response) {
            response = [];
          }
          return response;
        })
      )
      .subscribe(
        (response) => {
          this.guideService.fill(response);
        },
        (error) => {
          console.log(`error: ${error}`);
        }
      );
  }

  putGuide(body: GuideModel[]) {
    return this.http.put(`${environment.apiDatabase}${this.guideUrl}`, body);
  }

  getPost() {
    this.http
      .get<PostModel[]>(`${environment.apiDatabase}${this.postUrl}`)
      .pipe(
        map((response) => {
          if (!response) {
            response = [];
          }
          return response;
        })
      )
      .subscribe(
        (response) => {
          this.postService.fill(response);
        },
        (error) => {
          console.log(`error: ${error}`);
        }
      );
  }

  putPost(body: PostModel[]) {
    return this.http.put(`${environment.apiDatabase}${this.postUrl}`, body);
  }
}
