import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from './core/interfaces/iuser';
import { browserReload } from './shared/store/actions';
import { AppState } from './shared/store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    const userData: IUser = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      this.store.dispatch(
        browserReload({
          email: userData.email,
          userId: userData.id,
          token: userData._token,
          expiresIn: userData._tokenExpirationDate,
        })
      );
    }
  }
}
