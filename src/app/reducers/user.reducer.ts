import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../entities/user';
import * as UserActions from './../actions/user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  user: User;
}

export const initialState: UserState = {
  user: null,
};

const _userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, (state, user) => ({ user: user })),
  on(UserActions.removeUser, (state) => null)
);

export function userReducer(state: UserState | undefined, action: Action) {
  return _userReducer(state, action);
}
