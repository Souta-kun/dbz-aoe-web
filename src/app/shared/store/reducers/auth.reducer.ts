import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';
import * as actions from '../actions';

export interface State {
  user: User;
  logged: boolean;
  error: string;
}

export const initialState: State = {
  user: null,
  logged: false,
  error: null,
};

const _authReducer = createReducer(
  initialState,
  on(actions.login, (state) => ({ ...state })),
  on(actions.loginSuccess, (state, { email, expiresIn, token, userId }) => ({
    ...state,
    user: new User(
      email,
      userId,
      token,
      new Date(new Date().getTime() + expiresIn * 1000)
    ),
    logged: true,
    error: null,
  })),
  on(actions.loginFail, (state, { error }) => ({
    ...state,
    logged: false,
    error: error,
  })),
  on(actions.logout, (state) => ({ ...state, logged: false, user: null }))
);

export function authReducer(state, action) {
  return _authReducer(state, action);
}
