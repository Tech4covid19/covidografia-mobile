import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICaseConditions } from 'src/app/interfaces/icase-conditions';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss'],
})
export class ConditionsComponent implements OnInit {
  @Input() caseConditions: Observable<Array<ICaseConditions>>;
  constructor() {}

  ngOnInit() {}

  getValue(
    caseConditions: Array<ICaseConditions>,
    fieldFilter: string
  ): string {
    if (caseConditions == null || caseConditions.length < 1) return '?';
    return caseConditions
      .filter((x) => x.status_text === fieldFilter)[0]
      .status.toString();
  }
}
