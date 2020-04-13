import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { loadConditions } from 'src/app/actions/conditions.actions';
import { User } from 'src/app/entities/user';
import { ICase } from 'src/app/interfaces/ICase';
import { ICaseConditions } from 'src/app/interfaces/icase-conditions';
import { State } from 'src/app/reducers';
import { CaseConditionsService } from 'src/app/services/case-conditions.service';
import { CaseConfinementsService } from 'src/app/services/case-confinements.service';
import { getStorage, setStorage } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { loadConfinements } from './../../actions/confinements.actions';
import { loadUser } from './../../actions/user.actions';
import { ICaseConfinements } from './../../interfaces/icase-confinements';
import { PostCodePage } from './../post-code/post-code.page';
import { VideoPage } from './../video/video.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  title: string = 'Covidografia';
  numUtilizadores: number = 0;
  postalCode: number = 0;
  numSymptoms: number = 0;
  user: Observable<User>;
  cases: Observable<Array<ICase>> = of([]);
  caseConfinements: Observable<Array<ICaseConfinements>> = of();
  caseConditions: Observable<Array<ICaseConditions>>;

  constructor(
    private userSvc: UserService,
    private caseConfinementsService: CaseConfinementsService,
    private caseConditionsService: CaseConditionsService,
    private utils: UtilsService,
    private routerOutlet: IonRouterOutlet,
    private store: Store<State>,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    this.caseConditions = this.store
      .select((state) => state.conditions)
      .pipe(map((c) => c.conditions));

    this.caseConfinements = this.store
      .select((state) => state.confinements)
      .pipe(map((c) => c.confinements));

    this.user = this.store
      .select((state) => state.user)
      .pipe(map((c) => c.user));

    this.setCurrentUser();
  }

  async ionViewWillEnter() {
    const showVideo = await getStorage('hideVideo');
    if (!showVideo) {
      (
        await this.utils.swipableModal(
          VideoPage,
          this.routerOutlet.nativeEl,
          {},
          ''
        )
      ).present();
    }
  }

  async setCurrentUser() {
    //TODO: This must be protected by an Angular Guard
    const user = await getStorage('user');
    this.store.dispatch(loadUser(user));

    this.userSvc.fetchUser().subscribe((user) => {
      this.store.dispatch(loadUser(user));
      setStorage('user', this.user);
      this.fetchData(user);
    });
  }

  async fetchData(user) {
    this.caseConfinementsService
      .fetchCaseConfinementsByPostalCode(user.postalcode)
      .subscribe((c) => {
        this.store.dispatch(
          loadConfinements({
            zipcode: user.postalcode,
            confinements: c,
          })
        );
      });

    this.caseConditionsService
      .fetchCaseConditionsByPostalCode(user.postalcode)
      .subscribe((c) => {
        this.store.dispatch(
          loadConditions({
            zipcode: user.postalcode,
            conditions: c,
          })
        );
      });
  }

  async doRefresh(event) {
    this.userSvc.fetchUser().subscribe((user) => {
      this.store.dispatch(loadUser(user));
      setStorage('user', this.user);
      this.fetchData(user);
    });
    //event.target.complete(); remove the timeout and uncoment this for faster but less animated
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  numConditions(numConditions: Array<ICaseConditions>): number {
    return numConditions.reduce((total, d) => total + d.status, 0);
  }

  async openPostalCode() {
    const modal = await this.utils.swipableModal(
      PostCodePage,
      this.routerOutlet.nativeEl,
      {},
      ''
    );
    modal.present();
    modal.onDidDismiss().then(async () => {
      const showVideo = await getStorage('hideVideo');
      if (!showVideo) {
        (
          await this.utils.swipableModal(
            VideoPage,
            this.routerOutlet.nativeEl,
            {},
            ''
          )
        ).present();
      }
    });
  }

  async share() {
    const { Share } = Plugins;
    try {
      await Share.share({
        title: 'Covidografia',
        text:
          'A colaboração de todos é fundamental para que as autoridades de saúde possam acompanhar o desenvolvimento geográfico do surto de COVID-19. Só assim será possível avaliar com mais precisão a evolução da pandemia na sua área de residência.',
        url: 'https://covidografia.pt/',
        dialogTitle:
          'A plataforma que tira uma fotografia instantânea aos sintomas dos portugueses',
      });
    } catch (err) {
      this.utils.presentToast('Erro ao tentar partilhar', 2000, 'bottom', 'Ok');
    }
  }
}
