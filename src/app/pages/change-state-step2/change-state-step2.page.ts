import { Observable } from 'rxjs';
import { ConditionsService } from './../../services/conditions.service';
import { Component, OnInit } from '@angular/core';
import { ICondition } from 'src/app/interfaces/icondition';

@Component({
  selector: 'app-change-state-step2',
  templateUrl: './change-state-step2.page.html',
  styleUrls: ['./change-state-step2.page.scss'],
})
export class ChangeStateStep2Page implements OnInit {
  conditions: Observable<Array<ICondition>>;

  constructor(private conditionsSvc: ConditionsService) {}

  ngOnInit() {
    this.conditions = this.conditionsSvc.fetchConditions();
  }
}
