import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store/app.reducer';

@Injectable()
export class GuardInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('user').pipe(
      take(1),
      exhaustMap(({ user }) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: req.params.append('auth', user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
