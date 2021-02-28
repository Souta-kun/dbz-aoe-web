import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RedesModel } from 'src/app/models/red.model';
import { RedService } from 'src/app/services/red.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-redes-sociales',
  templateUrl: './redes-sociales.component.html',
  styleUrls: ['./redes-sociales.component.css']
})
export class RedesSocialesComponent implements OnInit, OnDestroy {
  redes: RedesModel[] = [];
  sub: Subscription;

  constructor(private redService: RedService,
              private dataStorageService: DataStorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.sub = this.dataStorageService.redes.subscribe(data => {
      this.redes = data;
    });
  }
  
  onRedirect(url: string) {
    window.open(url, '_blank');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
