import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  login,
  loginFail,
  loginSuccess,
  logout,
  logoutSuccess,
} from '../actions';

@Injectable()
export class UsuariosEffect {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authSvc: AuthService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((login) =>
        this.authSvc.login(login.email, login.password).pipe(
          tap(({ email, expiresIn, idToken, localId }) => {
            const expirationDate = new Date(
              new Date().getTime() + +expiresIn * 1000
            );
            const user = new User(email, localId, idToken, expirationDate);
            localStorage.setItem('userData', JSON.stringify(user));
          }),
          map((data) =>
            loginSuccess({
              email: data.email,
              expiresIn: +data.expiresIn,
              token: data.idToken,
              userId: data.localId,
            })
          ),
          catchError((error) => of(loginFail({ error: error })))
        )
      ) // Llama servicio ([pipe.map] Sobre la accion directa a encadenar)
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        localStorage.removeItem('userData');
        this.router.navigate(['auth']);
      }),
      mergeMap(() => of(logoutSuccess()))
    )
  );
}
