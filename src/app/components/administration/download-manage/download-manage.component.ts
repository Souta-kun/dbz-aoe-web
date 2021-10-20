import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DownloadModel } from 'src/app/models/download.model';
import { DownloadService } from 'src/app/services/download.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-download-manage',
  templateUrl: './download-manage.component.html',
  styleUrls: ['./download-manage.component.css']
})
export class DownloadManageComponent implements OnInit, OnDestroy {
  isEdit = false;
  currentIndex: number;  
  downloads: DownloadModel[] = [];
  form: FormGroup;
  sub: Subscription;

  constructor(private downloadService: DownloadService,
              private dsService: DataStorageService) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.maxLength(150), Validators.required]),
      url: new FormControl(null, [Validators.maxLength(500), Validators.required])
    });
  }

  ngOnInit(): void {
    this.sub = this.downloadService.downloadChanged.subscribe(data => {
      this.downloads = data;
    });
    this.dsService.getDownload();
  }

  Create() {
    this.downloadService.add(new DownloadModel(
      this.form.controls["name"].value,
      this.form.controls["url"].value
    ));
    this.onReset();
    this.dsService.putDownload(this.downloads.slice())
      .subscribe(
        result => {

        },
        error => {
          this.dsService.getDownload();
          console.log(`error: ${error}`);
        }
      );
  }

  Update() {
    this.downloadService.update(
      new DownloadModel(
        this.form.controls["name"].value,
        this.form.controls["url"].value
      ), 
      this.currentIndex
    );
    this.onReset();
    this.dsService.putDownload(this.downloads.slice())
      .subscribe(
        result => {

        },
        error => {
          this.dsService.getDownload();
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

  onReset() {
    this.form.reset();
    this.isEdit = false;
    this.currentIndex = null;
  }

  onDelete() {
    this.downloadService.remove(this.currentIndex); 
    this.onReset();
    this.dsService.putDownload(this.downloads.slice())
      .subscribe(
        result => {

        },
        error => {
          this.dsService.getDownload();
          console.log(`error: ${error}`);
        }
      );
  }

  onShow(download: DownloadModel, index: number) {
    this.currentIndex = index;
    this.isEdit = true;
    this.form.patchValue({
      name: download.name,
      url: download.url
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
