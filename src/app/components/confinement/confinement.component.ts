import { ConfinementsState } from './../../reducers/confinements.reducer';
import { Component, Input, OnInit } from '@angular/core';
import { ICaseConfinements } from '../../interfaces/icase-confinements';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ConditionsState } from 'src/app/reducers/conditions.reducer';
import { map } from 'rxjs/operators';
import { State } from 'src/app/reducers';

@Component({
  selector: 'app-confinement',
  templateUrl: './confinement.component.html',
  styleUrls: ['./confinement.component.scss'],
})
export class ConfinementComponent implements OnInit {
  caseConfinements: Observable<Array<ICaseConfinements>>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.caseConfinements = this.store.select(
      (state) => state.confinements.confinements
    );
  }
}
