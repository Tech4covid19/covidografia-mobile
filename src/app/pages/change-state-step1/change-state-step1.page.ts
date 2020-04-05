import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { IStep } from 'src/app/interfaces/IStep';
import { NavParamsService } from './../../services/nav-params.service';
import { SymptomsService } from './../../services/symptoms.service';

export interface ISymptomWithChecked {
  id: number | string;
  symptom: string;
  isChecked: boolean;
}
@Component({
  selector: 'app-change-state-step1',
  templateUrl: './change-state-step1.page.html',
  styleUrls: ['./change-state-step1.page.scss'],
})
export class ChangeStateStep1Page implements OnInit {
  symptoms: Array<ISymptomWithChecked>;
  steps: IStep[] = [
    { label: '1', url: 'change-state-step1', active: true },
    { label: '2', url: 'change-state-step2', active: false },
    { label: '3', url: 'change-state-step3', active: false },
  ];

  constructor(
    private symptomsSvc: SymptomsService,
    private navCtrl: NavController,
    private navParams: NavParamsService
  ) {}

  async ngOnInit() {
    this.symptoms = await this.symptomsSvc
      .fetchSymptoms()
      .pipe(map((v) => v.map((vv) => Object.assign(vv, { isChecked: false }))))
      .toPromise();
  }

  check(symptom: ISymptomWithChecked) {
    if (symptom.id === 1)
      this.symptoms = this.symptoms.map((v) => {
        if (v.id !== 1) return Object.assign(v, (v.isChecked = false));
        return v;
      });
    else
      this.symptoms = this.symptoms.map((v) => {
        if (v.id == 1) return Object.assign(v, (v.isChecked = false));
        return v;
      });
  }

  goTo(page: string) {
    this.navParams.setParams({
      symptoms: this.symptoms
        .filter((s) => s.isChecked === true)
        .map((s) => s.id),
    });
    this.navCtrl.navigateForward(page);
  }

  canGoFurther(): boolean {
    return this.symptoms.filter((s) => s.isChecked === true).length < 1;
  }
}
