import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ICaseConditions } from 'src/app/interfaces/icase-conditions';
import { State } from 'src/app/reducers';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss'],
})
export class ConditionsComponent implements OnInit {
  caseConditions: Observable<Array<ICaseConditions>> = of([]);

  constructor(private store: Store<State>) {}

  async ngOnInit() {
    this.caseConditions = this.store.select(
      (state) => state.conditions.conditions
    );
  }

  decideClass(condition: ICaseConditions): string {
    switch (condition.summary_order) {
      case 6:
        return 'noSymptomsCard';
      case 10:
        return 'suspiciousCard';
      case 20:
        return 'recoveredCard';
      case 30:
        return 'infectedCard';
      default:
        return 'symptomsCard';
    }
  }
}
