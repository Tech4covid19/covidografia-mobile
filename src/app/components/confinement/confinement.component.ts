import { Component, Input, OnInit } from '@angular/core';
import { ICaseConfinements } from '../../interfaces/icase-confinements';

@Component({
  selector: 'app-confinement',
  templateUrl: './confinement.component.html',
  styleUrls: ['./confinement.component.scss'],
})
export class ConfinementComponent implements OnInit {
  @Input() caseConfinements: Array<ICaseConfinements>;

  constructor() {}

  ngOnInit() {}

  getValue(fieldFilter: string): string {
    if (this.caseConfinements == null || this.caseConfinements.length < 1)
      return '?';
    return this.caseConfinements
      .filter((x) => x.confinement_state_text === fieldFilter)[0]
      .confinement_state.toString();
  }
}
