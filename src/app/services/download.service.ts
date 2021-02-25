import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DownloadModel } from '../models/download.model';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient,
              private dataStorageService: DataStorageService) { }

  getDownloads() {
    return this.dataStorageService.downloads.slice();
  }

  getDownload() {

  }

  postDownload() {
    const body = new DownloadModel('WololoKindowns 5.8.1', 'url');
    this.http
      .post(
        environment.dbConection,
        body
      )
      .subscribe(result => {
        console.log(result);
      });

  }
}
