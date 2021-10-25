import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { browserReload } from './shared/store/actions';
import { AppState } from './shared/store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate;
    } = JSON.parse(localStorage.getItem('userData'));

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
