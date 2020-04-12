import { createReducer, on } from '@ngrx/store';
import { ICaseConfinements } from '../interfaces/icase-confinements';
import * as ConfinementsActions from './../actions/confinements.actions';

export const confinementsFeatureKey = 'confinements';

export interface ConfinementsState {
  confinements: Array<ICaseConfinements>;
}

export const initialState: ConfinementsState = {
  confinements: [
    {
      postalcode: '',
      confinement_state: -1,
      confinement_state_text: '',
      hits: -1,
    },
    {
      postalcode: '',
      confinement_state: -1,
      confinement_state_text: '',
      hits: -1,
    },
    {
      postalcode: '',
      confinement_state: -1,
      confinement_state_text: '',
      hits: -1,
    },
  ],
};

export const confinementsReducer = createReducer(
  initialState,
  on(
    ConfinementsActions.loadConfinements,
    (state, { zipcode, confinements }) => ({
      zipcode: zipcode,
      confinements: confinements,
    })
  )
);
