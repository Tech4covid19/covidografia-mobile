import { Component, OnInit, Input } from '@angular/core';
import { ICaseConditions } from 'src/app/interfaces/icase-conditions';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss'],
})
export class ConditionsComponent implements OnInit {
  @Input() caseConditions: Array<ICaseConditions>;
  constructor() {}

  ngOnInit() {}

  getValue(fieldFilter: string): string {
    if (this.caseConditions == null || this.caseConditions.length < 1)
      return '?';
    return this.caseConditions
      .filter((x) => x.status_text === fieldFilter)[0]
      .status.toString();
  }
}
