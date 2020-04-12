import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../entities/user';
import * as UserActions from './../actions/user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  user: User;
}

export const initialState: UserState = {
  user: {
    postalcode: '',
    name: '',
    email: '',
    county: '',
    confinement_state: '',
    patientToken: '',
    has_symptoms_text: '',
    has_symptoms: null,
    phone: '',
    show_onboarding: null,
    personal_hash: '',
    health_hash: '',
    id: '',
    year: '',
    postalcode1: '',
    postalcode2: '',
    latest_status: {
      timestamp: '',
    },
    latitude: '',
    longitude: '',
    info: {
      version: -1,
      name: '',
      email: '',
      phone: '',
    },
    optin_download_use: null,
    optin_privacy: null,
    optin_health_geo: null,
    optin_push: null,
    created_at: '',
    updated_at: '',
    cases: null,
    networks: null,
  },
};

const _userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, (state, user) => ({ user: user })),
  on(UserActions.removeUser, (state) => null)
);

export function userReducer(state: UserState | undefined, action: Action) {
  return _userReducer(state, action);
}
