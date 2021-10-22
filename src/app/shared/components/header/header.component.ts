import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { logout } from 'src/app/shared/store/actions';
import { AppState } from 'src/app/shared/store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  sub: Subscription;
  logged: boolean = false;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.sub = this.store.select('user').subscribe(({ logged }) => {
      this.logged = logged;
    });
  }

  onRedirect() {
    this.router.navigate(['auth']);
  }

  onLogout() {
    this.store.dispatch(logout());
  }

  onImg() {
    this.router.navigate(['/news']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
