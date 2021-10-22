import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GuideModel } from '../models/guide.model';

@Injectable({
  providedIn: 'root',
})
export class GuideService {
  private guides: GuideModel[] = [];
  guideChanged = new Subject<GuideModel[]>();

  constructor() {}

  fill(guides: GuideModel[]) {
    this.guides = guides;
    this.guideChanged.next(this.guides);
  }

  add(guide: GuideModel) {
    this.guides.push(guide);
    this.guideChanged.next(this.guides);
  }

  update(guide: GuideModel, index: number) {
    this.guides[index] = guide;
    this.guideChanged.next(this.guides);
  }

  remove(index: number) {
    this.guides.splice(index, 1);
    this.guideChanged.next(this.guides);
  }
}
