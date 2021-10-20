import { Injectable } from '@angular/core';

import { DownloadModel } from '../models/download.model';
import { Subject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private downloads: DownloadModel[] = [];
  downloadChanged = new Subject<DownloadModel[]>();

  constructor() {}

  fill(downloads: DownloadModel[]) {
    this.downloads = downloads;
    this.downloadChanged.next(this.downloads);
  }

  add(download: DownloadModel) {
    this.downloads.push(download);
    this.downloadChanged.next(this.downloads);
  }

  update(download: DownloadModel, index: number) {
    this.downloads[index] = download;
    this.downloadChanged.next(this.downloads);
  }

  remove(index: number) {
    this.downloads.splice(index, 1);
    this.downloadChanged.next(this.downloads);
  }
}
