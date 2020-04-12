import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ConditionsEffects } from './conditions.effects';

describe('ConditionsEffects', () => {
  let actions$: Observable<any>;
  let effects: ConditionsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConditionsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<ConditionsEffects>(ConditionsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
