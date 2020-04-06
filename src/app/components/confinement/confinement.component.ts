import { Component, Input, OnInit } from '@angular/core';
import { ICaseConfinements } from '../../interfaces/icase-confinements';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confinement',
  templateUrl: './confinement.component.html',
  styleUrls: ['./confinement.component.scss'],
})
export class ConfinementComponent implements OnInit {
  @Input() caseConfinements: Observable<Array<ICaseConfinements>>;

  constructor() {}

  ngOnInit() {}

  getValue(
    caseConfinements: Array<ICaseConfinements>,
    fieldFilter: string
  ): string {
    if (caseConfinements == null || caseConfinements.length < 1) return '?';
    return caseConfinements
      .filter((x) => x.confinement_state_text === fieldFilter)[0]
      .confinement_state.toString();
  }
}
