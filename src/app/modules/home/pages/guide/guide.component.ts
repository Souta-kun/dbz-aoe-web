import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { GuideModel } from 'src/app/core/models/guide.model';
import { GuideService } from 'src/app/core/services/guide.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
})
export class GuideComponent implements OnInit, OnDestroy {
  guides: GuideModel[] = [];
  sub: Subscription;

  constructor(
    private dsService: DataStorageService,
    private sanitizer: DomSanitizer,
    private guideService: GuideService
  ) {}

  ngOnInit(): void {
    this.sub = this.guideService.guideChanged.subscribe((data) => {
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
