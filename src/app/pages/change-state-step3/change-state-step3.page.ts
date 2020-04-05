import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { User } from 'src/app/entities/user';
import { IStep } from 'src/app/interfaces/IStep';
import { ISymptom } from 'src/app/interfaces/ISymptom';
import { NavParamsService } from 'src/app/services/nav-params.service';
import { ICondition } from './../../interfaces/icondition';
import { ConfinementStatesService } from './../../services/confinement-states.service';
import { UtilsService } from './../../services/utils.service';
import { VideoPage } from './../video/video.page';
import { getStorage } from 'src/app/services/storage.service';

export interface IConfinementStateWithChecked {
  id: number | string;
  state: string;
  description: string;
  isChecked: boolean;
}
@Component({
  selector: 'app-change-state-step3',
  templateUrl: './change-state-step3.page.html',
  styleUrls: ['./change-state-step3.page.scss'],
})
export class ChangeStateStep3Page implements OnInit {
  confinementStates: Array<IConfinementStateWithChecked>;
  steps: IStep[] = [
    { label: '1', url: 'change-state-step1', active: false },
    { label: '2', url: 'change-state-step2', active: false },
    { label: '3', url: 'change-state-step3', active: true },
  ];
  symptoms: Array<ISymptom>;
  conditions: Array<ICondition>;

  constructor(
    private confinementStatesSvc: ConfinementStatesService,
    private navCtrl: NavController,
    private navParams: NavParamsService,
    private utils: UtilsService,
    private routerOutlet: IonRouterOutlet,
    private user: User
  ) {}

  async ngOnInit() {
    this.user = await getStorage('user');
    this.confinementStates = await this.confinementStatesSvc
      .fetchConfinementStates()
      .pipe(map((v) => v.map((vv) => Object.assign(vv, { isChecked: false }))))
      .toPromise();

    this.symptoms = this.navParams.getParams('symptoms');
    if (!this.symptoms) this.symptoms = [];
    this.conditions = this.navParams.getParams('conditions');
    if (!this.conditions) this.conditions = [];
  }

  check(confinementState: IConfinementStateWithChecked) {
    this.confinementStates = this.confinementStates.map((v) => {
      if (v.id !== confinementState.id)
        return Object.assign(v, (v.isChecked = false));
      return v;
    });
  }

  async goTo(page: string) {
    this.navParams.setParams({
      symptoms: this.symptoms,
      conditions: this.conditions,
      confinementStates: this.confinementStates
        .filter((s) => s.isChecked === true)
        .map((cs) => cs.id),
    });
    this.navCtrl.navigateRoot(page);
    (
      await this.utils.swipableModal(
        VideoPage,
        this.routerOutlet.nativeEl,
        {},
        ''
      )
    ).present();
  }

  canGoFurther(): boolean {
    console.log(
      'this.symptoms',
      this.user,
      this.symptoms,
      this.conditions,
      this.confinementStates
        .filter((s) => s.isChecked === true)
        .map((cs) => cs.id)
    );
    return (
      this.symptoms.length < 1 ||
      this.conditions.length < 1 ||
      this.confinementStates.filter((s) => s.isChecked === true).length < 1
    );
  }
}
