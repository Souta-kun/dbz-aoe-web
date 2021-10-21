import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select('user').pipe(
      take(1),
      map(({ logged }) => {
        if (logged) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
