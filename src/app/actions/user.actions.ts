import { createAction, props } from '@ngrx/store';
import { User } from '../entities/user';

export const loadUser = createAction('[User] Load User', props<User>());

export const removeUser = createAction('[User] Remove User');
