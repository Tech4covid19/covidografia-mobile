import { createAction, props } from '@ngrx/store';
import { ICaseConfinements } from './../interfaces/icase-confinements';

export const loadConfinements = createAction(
  '[Confinements] Load Confinementss',
  props<{ zipcode: string; confinements: Array<ICaseConfinements> }>()
);

export const loadConfinementsFailure = createAction(
  '[Confinements] Load Confinementss Failure',
  props<{ zipcode: string; err: any }>()
);
