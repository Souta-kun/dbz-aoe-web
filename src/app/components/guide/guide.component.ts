import { Component, OnInit } from '@angular/core';
import { GuideModel } from 'src/app/models/guide.model';
import { GuideService } from 'src/app/services/guide.service';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit {
  guides = [];

  constructor(private guideService: GuideService) { }

  ngOnInit(): void {
    this.guides = this.guideService.getGuides();
  }

}
