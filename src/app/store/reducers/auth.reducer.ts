import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import * as actions from '../actions';

export interface State {
  user: User;
}

export const initialState: State = {
  user: null,
};

const _authReducer = createReducer(
  initialState,
  on(actions.setUser, (state, { user }) => ({ ...state, user: user }))
);

export function authReducer(state, action) {
  return _authReducer(state, action);
}
