import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';

export const login = createAction(
  '[Auth Component] Log In',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth Component] Log In Succes',
  props<{
    email: string;
    userId: string;
    token: string;
    expiresIn: number;
  }>()
);

export const loginFail = createAction(
  '[Auth Component] Log In Fail',
  props<{ error: string }>()
);

export const logout = createAction('[Auth Component] Log Out');
