import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { GuideModel } from 'src/app/models/guide.model';
import { GuideService } from 'src/app/services/guide.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-guide-manage',
  templateUrl: './guide-manage.component.html',
  styleUrls: ['./guide-manage.component.css']
})
export class GuideManageComponent implements OnInit, OnDestroy {
  isEdit = false;
  currentIndex: number;  
  guides: GuideModel[] = [];
  form: FormGroup;
  sub: Subscription;

  constructor(private guideService: GuideService,
              private dsService: DataStorageService) { 
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.maxLength(150), Validators.required]),
      url: new FormControl(null, [Validators.maxLength(500), Validators.required]),
      description: new FormControl(null, [Validators.maxLength(500)])
    });
  }

  ngOnInit(): void {
    this.sub = this.guideService.guideChanged.subscribe(data => {
      this.guides = data;
    });
    this.dsService.getGuide();
  }

  Create() {
    this.guideService.add(new GuideModel(
      this.form.controls["title"].value,
      this.form.controls["description"].value,
      this.form.controls["url"].value
    ));
    this.onReset();
    this.dsService.putGuide(this.guides.slice())
      .subscribe(
        result => {

        },
        error => {
          this.dsService.getGuide();
          console.log(`error: ${error}`);
        }
      );
  }

  Update() {
    this.guideService.update(
      new GuideModel(
        this.form.controls["title"].value,
        this.form.controls["description"].value,
        this.form.controls["url"].value
      ), 
      this.currentIndex
    );
    this.onReset();
    this.dsService.putGuide(this.guides.slice())
      .subscribe(
        result => {

        },
        error => {
          this.dsService.getGuide();
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
    this.guideService.remove(this.currentIndex); 
    this.onReset();
    this.dsService.putGuide(this.guides.slice())
      .subscribe(
        result => {

        },
        error => {
          this.dsService.getGuide();
          console.log(`error: ${error}`);
        }
      );
  }

  onReset() {
    this.form.reset();
    this.isEdit = false;
    this.currentIndex = null;    
  }

  onShow(guide: GuideModel, index: number) {
    this.currentIndex = index;
    this.isEdit = true;
    this.form.patchValue({
      title: guide.title,
      url: guide.url,
      description: guide.description
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
