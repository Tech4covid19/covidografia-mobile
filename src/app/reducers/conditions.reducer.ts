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
      postalcode_description: '',
      status: -1,
      status_text: 'Com sintomas',
      summary_order: 5,
      hits: '-1',
      latest_status_ts: '',
    },
    {
      postalcode: '',
      postalcode_description: '',
      status: -1,
      status_text: 'Suspeitos',
      summary_order: 10,
      hits: '-1',
      latest_status_ts: null,
    },
    {
      postalcode: '',
      postalcode_description: '',
      status: -1,
      status_text: 'Recuperados',
      summary_order: 20,
      hits: '-1',
      latest_status_ts: null,
    },
    {
      postalcode: '',
      postalcode_description: '',
      status: -1,
      status_text: 'Infetados',
      summary_order: 30,
      hits: '-1',
      latest_status_ts: '2020-04-03T23:43:09.000Z',
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
