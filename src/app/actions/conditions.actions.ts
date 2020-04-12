import { createAction, props } from '@ngrx/store';
import { ICaseConditions } from '../interfaces/icase-conditions';

export const loadConditions = createAction(
  '[Conditions] Load Conditionss',
  props<{ zipcode: string; conditions: Array<ICaseConditions> }>()
);

export const loadConditionsFailure = createAction(
  '[Conditions] Load Conditionss Failure',
  props<{ zipcode: string; err: any }>()
);
