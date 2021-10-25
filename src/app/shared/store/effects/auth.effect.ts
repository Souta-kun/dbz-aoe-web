import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { login, loginFail, loginSuccess, logout } from '../actions';

@Injectable()
export class UsuariosEffect {
  constructor(private actions$: Actions, private authSvc: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((login) =>
        this.authSvc.login(login.email, login.password).pipe(
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
}
