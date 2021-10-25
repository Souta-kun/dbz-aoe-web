import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  // private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(environment.apiAuthentication, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError)
        // tap((res) => {
        //   this.handleAuthentication(
        //     res.email,
        //     res.localId,
        //     res.idToken,
        //     +res.expiresIn
        //   );
        // })
      );
  }

  // autoLogin() {
  //   const userData: {
  //     email: string;
  //     id: string;
  //     _token: string;
  //     _tokenExpirationDate;
  //   } = JSON.parse(localStorage.getItem('userData'));
  //   if (!userData) {
  //     return;
  //   }

  //   const loadedUser = new User(
  //     userData.email,
  //     userData.id,
  //     userData._token,
  //     new Date(userData._tokenExpirationDate)
  //   );

  //   if (loadedUser.token) {
  //     this.user.next(loadedUser);
  //     const expirationDuration =
  //       new Date(userData._tokenExpirationDate).getTime() -
  //       new Date().getTime();
  //     this.autoLogout(expirationDuration);
  //   }
  // }

  // logout() {
  // this.user.next(null);
  // this.router.navigate(['/auth']);
  // localStorage.removeItem('userData');
  // if (this.tokenExpirationTimer) {
  //   clearTimeout(this.tokenExpirationTimer);
  // }
  // this.tokenExpirationTimer = null;
  // }

  // autoLogout(expirationDuration: number) {
  //   console.log(expirationDuration);
  //   this.tokenExpirationTimer = setTimeout(() => {
  //     this.logout();
  //   }, expirationDuration);
  // }

  // private handleAuthentication(
  //   email: string,
  //   userId: string,
  //   token: string,
  //   expiresIn: number
  // ) {
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new User(email, userId, token, expirationDate);
  //   this.user.next(user);
  //   this.autoLogout(expiresIn * 1000);
  //   localStorage.setItem('userData', JSON.stringify(user));
  // }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknow error ocurred!';
    if (!error.error || !error.error.error) {
      return throwError(errorMessage);
    }
    switch (error.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been delete.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage =
          'The user account has been disabled by an administrator.';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exist already';
        break;
    }

    return throwError(errorMessage);
  }
}
