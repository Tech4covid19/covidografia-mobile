import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { loadUser } from 'src/app/actions/user.actions';
import { User } from 'src/app/entities/user';
import { IStep } from 'src/app/interfaces/IStep';
import { State } from 'src/app/reducers';
import { NavParamsService } from 'src/app/services/nav-params.service';
import { setStorage } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { ICase } from './../../interfaces/ICase';
import { CasesService } from './../../services/cases.service';
import { ConfinementStatesService } from './../../services/confinement-states.service';
import { UtilsService } from './../../services/utils.service';

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
  symptoms: Array<number>;
  conditions: Array<number>;
  user: Observable<User>;
  constructor(
    private confinementStatesSvc: ConfinementStatesService,
    private caseSvc: CasesService,
    private navCtrl: NavController,
    private navParams: NavParamsService,
    private utils: UtilsService,
    private userSvc: UserService,
    private store: Store<State>
  ) {}

  async ngOnInit() {
    this.user = this.store
      .select((state) => state.user)
      .pipe(map((c) => c.user));

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

  goTo(page: string, user) {
    this.addCase(user);
    this.navCtrl.navigateRoot(page);
  }

  canGoFurther(): boolean {
    return (
      this.symptoms.length < 1 ||
      this.conditions.length < 1 ||
      this.confinementStates.filter((s) => s.isChecked === true).length < 1
    );
  }

  addCase(user: User) {
    const _case: ICase = {
      id: 0,
      postalCode: user.postalcode,
      geo: { lat: +user.latitude, lon: +user.longitude },
      condition: this.conditions[0],
      symptoms: this.symptoms,
      confinementState: +this.confinementStates
        .filter((s) => s.isChecked === true)
        .map((cs) => cs.id)[0],
      timestamp: Date.now().toString(),
    };
    this.userSvc.updateOnboarding(user).then(
      (success) => {
        console.log('____user submit success', JSON.stringify(success));
        this.utils.presentToast(
          'Utilizador onborading atualizado',
          2000,
          'bottom',
          'Ok'
        );
      },
      (err) => {
        console.log('____user submit err', JSON.stringify(err));
        this.utils.presentToast(
          'Erro ao atualizar onboarding',
          2000,
          'bottom',
          'Ok'
        );
      }
    );

    this.caseSvc
      .addCase(_case)
      .then(
        (success) => {
          console.log('____case submit success', JSON.stringify(success));
          this.utils.presentToast('Adicionado caso', 2000, 'bottom', 'Ok');
        },
        (err) => {
          console.log('____case submit err', JSON.stringify(err));
          this.utils.presentToast(
            'Erro ao adicionar caso',
            2000,
            'bottom',
            'Ok'
          );
        }
      )
      .finally(() => {
        this.userSvc.fetchUser().subscribe((user) => {
          console.log('afterUser', user);
          this.store.dispatch(loadUser(user));
          setStorage('user', user);
        });
      });
  }
}
