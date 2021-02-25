import { Component, OnInit } from '@angular/core';
import { DownloadModel } from 'src/app/models/download.model';
import { DownloadService } from 'src/app/services/download.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  downloads = [];

  constructor(private downloadService: DownloadService) { }

  ngOnInit(): void {    
    this.downloads = this.downloadService.getDownloads();

    this.downloadService.postDownload();
  }
  
  onRedirect(url: string) {
    window.open(url, '_blank');
  }
}
