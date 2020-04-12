import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ConditionsActions from './../actions/conditions.actions';
import { CaseConditionsService } from './../services/case-conditions.service';
@Injectable()
export class ConditionsEffects {
  @Effect()
  loadCaseConditions: Observable<any> = this.actions$.pipe(
    ofType(ConditionsActions.loadConditions),
    mergeMap((action) =>
      this.caseConditionsService
        .fetchCaseConditionsByPostalCode(action['zipcode'])
        .pipe(
          map((data) =>
            ConditionsActions.loadConditions({
              zipcode: action['zipcode'],
              conditions: data,
            })
          ),
          catchError((err) =>
            of(
              ConditionsActions.loadConditionsFailure({
                zipcode: action['zipcode'],
                err: err,
              })
            )
          )
        )
    )
  );

  constructor(
    private actions$: Actions,
    private caseConditionsService: CaseConditionsService
  ) {}
}
