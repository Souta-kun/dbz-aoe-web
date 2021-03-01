import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { GuideModel } from 'src/app/models/guide.model';
import { GuideService } from 'src/app/services/guide.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit, OnDestroy {
  guides: GuideModel[] = [];
  sub:Subscription;

  constructor(private dsService: DataStorageService,
              private sanitizer: DomSanitizer,
              private guideService: GuideService) { }

  ngOnInit(): void {
    this.sub = this.guideService.guideChanged.subscribe(data => { 
      this.guides = data;
    });
    this.dsService.getGuide();
  }

  getUrlSecure(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
