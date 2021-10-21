import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const setUser = createAction(
  '[Auth Component] Set User',
  props<{ user: User }>()
);
