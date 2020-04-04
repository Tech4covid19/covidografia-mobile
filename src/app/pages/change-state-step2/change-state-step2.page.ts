import { NavController } from '@ionic/angular';
import { NavParamsService } from './../../services/nav-params.service';
import { Observable } from 'rxjs';
import { ConditionsService } from './../../services/conditions.service';
import { Component, OnInit } from '@angular/core';
import { ICondition } from 'src/app/interfaces/icondition';
import { ISymptom } from 'src/app/interfaces/ISymptom';
import { IStep } from 'src/app/interfaces/IStep';
import { map } from 'rxjs/operators';

export interface IConditionChecked {
  id: number | string;
  status: string;
  isChecked: boolean;
}
@Component({
  selector: 'app-change-state-step2',
  templateUrl: './change-state-step2.page.html',
  styleUrls: ['./change-state-step2.page.scss'],
})
export class ChangeStateStep2Page implements OnInit {
  conditions: Array<IConditionChecked>;
  symptoms: Array<ISymptom>;
  steps: IStep[] = [
    { label: '1', url: 'change-state-step1', active: false },
    { label: '2', url: 'change-state-step2', active: true },
    { label: '3', url: 'change-state-step3', active: false },
  ];

  constructor(
    private conditionsSvc: ConditionsService,
    private navParams: NavParamsService,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.conditions = await this.conditionsSvc
      .fetchConditions()
      .pipe(map((v) => v.map((vv) => Object.assign(vv, { isChecked: false }))))
      .toPromise();

    this.symptoms = this.navParams.getParams('symptoms');
    if (!this.symptoms) this.symptoms = [];
  }

  check(symptom: IConditionChecked) {
    this.conditions = this.conditions.map((v) => {
      if (v.id !== symptom.id) return Object.assign(v, (v.isChecked = false));
      return v;
    });
  }

  goTo(page: string) {
    this.navParams.setParams({
      symptoms: this.symptoms,
      conditions: this.conditions.filter((s) => s.isChecked === true),
    });
    this.navCtrl.navigateRoot('change-state-step1');
    this.navCtrl.navigateForward(page);
  }

  canGoFurther(): boolean {
    return (
      this.symptoms.length < 1 ||
      this.conditions.filter((s) => s.isChecked === true).length < 1
    );
  }
}
