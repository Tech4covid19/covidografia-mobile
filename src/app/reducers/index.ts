import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { conditionsReducer, ConditionsState } from './conditions.reducer';
import { confinementsReducer, ConfinementsState } from './confinements.reducer';
import { userReducer, UserState } from './user.reducer';

export interface State {
  user: UserState;
  conditions: ConditionsState;
  confinements: ConfinementsState;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  conditions: conditionsReducer,
  confinements: confinementsReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
