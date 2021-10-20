import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DownloadModel } from 'src/app/models/download.model';
import { DownloadService } from 'src/app/services/download.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html'
})
export class DownloadComponent implements OnInit, OnDestroy {
  downloads: DownloadModel[] = [];
  sub: Subscription;

  constructor(private downloadService: DownloadService,
              private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.sub = this.downloadService.downloadChanged.subscribe(data => {
      this.downloads = data;
    });
    this.dataStorageService.getDownload();
  }

  onRedirect(url: string) {
    window.open(url, '_blank');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
