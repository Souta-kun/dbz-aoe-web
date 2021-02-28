import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DownloadModel } from '../models/download.model';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  download: DownloadModel[] = [];
  downloadChanged = new Subject<DownloadModel[]>();

  get(download: DownloadModel) {
    this.download.push(download);
    this.downloadChanged.next(this.download);
  }

  set(downloads: DownloadModel[]) {
    this.download = downloads;
    this.downloadChanged.next(this.download);
  }

  add(download: DownloadModel) {
    this.download.push(download);
    this.downloadChanged.next(this.download);
  }

  update(download: DownloadModel, index: number) {
    this.download[index] = download;
    this.downloadChanged.next(this.download);
  }

  remove(index: number) {
    this.download.splice(index, 1);
    this.downloadChanged.next(this.download);
  }
}
