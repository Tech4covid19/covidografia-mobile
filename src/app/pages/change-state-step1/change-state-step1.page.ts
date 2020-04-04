import { NavParamsService } from './../../services/nav-params.service';
import { NavController } from '@ionic/angular';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IStep } from 'src/app/interfaces/IStep';
import { ISymptom } from 'src/app/interfaces/ISymptom';
import { SymptomsService } from './../../services/symptoms.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

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
      symptoms: this.symptoms.filter((s) => s.isChecked === true),
    });
    this.navCtrl.navigateForward(page);
  }

  canGoFurther(): boolean {
    return this.symptoms.filter((s) => s.isChecked === true).length < 1;
  }
}
