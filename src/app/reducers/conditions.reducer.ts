import { Action, createReducer, on } from '@ngrx/store';
import { ICaseConditions } from '../interfaces/icase-conditions';
import * as ConditionsActions from './../actions/conditions.actions';

export const conditionsFeatureKey = 'conditions';

export interface ConditionsState {
  conditions: Array<ICaseConditions>;
}

export const initialState: ConditionsState = {
  conditions: [
    {
      postalcode: '',
      status: -1,
      status_text: '',
      hits: -1,
      latest_status_ts: '',
      postalcode_description: '',
      summary_order: 6,
    },
    {
      postalcode: '',
      status: -1,
      status_text: '',
      hits: -1,
      latest_status_ts: '',
      postalcode_description: '',
      summary_order: 10,
    },
    {
      postalcode: '',
      status: -1,
      status_text: '',
      hits: -1,
      latest_status_ts: '',
      postalcode_description: '',
      summary_order: 20,
    },
    {
      postalcode: '',
      status: -1,
      status_text: '',
      hits: -1,
      latest_status_ts: '',
      postalcode_description: '',
      summary_order: 30,
    },
  ],
};

export const conditionsReducer = createReducer(
  initialState,
  on(ConditionsActions.loadConditions, (state, { zipcode, conditions }) => ({
    zipcode: zipcode,
    conditions: conditions,
  }))
);
