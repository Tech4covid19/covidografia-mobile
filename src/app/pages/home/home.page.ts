import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { IonRouterOutlet } from '@ionic/angular';
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
  cases: Observable<Array<ICase>> = of([]);
  caseConfinements: Observable<Array<ICaseConfinements>> = of();
  caseConditions: Observable<Array<ICaseConditions>>;

  constructor(
    private userSvc: UserService,
    private user: User,
    private caseConfinementsService: CaseConfinementsService,
    private caseConditionsService: CaseConditionsService,
    private utils: UtilsService,
    private routerOutlet: IonRouterOutlet,
    private store: Store<State>
  ) {}

  async ngOnInit() {
    this.caseConditions = this.store
      .select((state) => state.conditions)
      .pipe(map((c) => c.conditions));

    this.caseConfinements = this.store
      .select((state) => state.confinements)
      .pipe(map((c) => c.confinements));

    // Set token for testing
    // https://staging.api.covidografia.pt/login/facebook
    sessionStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiM2QyYTAyNjQ1MDM1ZTU0OWQ3MTFkMTBjYTdiMzQ2YjFkZjkwMzc4NWI5YTkxMWE5OTQwMDE5ZDFkMDAwNTA5M2Q3YjQzZWI3NzM4OTliYjk1MTRlNGM2N2M4MTQ5ZTZiYmRkZDg1YjU3ZjAzZmJlMDQ2MWYzZjg5ZjdhOTE1M2FkZTEyMzQxYjllZTEwYTFjYTlkYzlkNTA3MTA1MzE1ZTUzNjUxMjllNmIxNDI5NjQ3MDdkOWJjMDM0YjQyOTdkIiwic2Vzc2lvbiI6ImU1N2U2MTE3Y2I3ZGMxMGE5NWU4YTQzOTIxNzEyYWVjIiwicm9sZXMiOlsidXNlciJdLCJpYXQiOjE1ODY2MjU4NzcsImV4cCI6MTU4NjcxMjI3N30.0g5No5k2G4giLddC3BKCVl1kqPVVND1O7CvUC20Zqow'
    );
    this.setCurrentUser();
  }

  async setCurrentUser() {
    //TODO: This must be protected by an Angular Guard
    const user = await getStorage('user');
    this.store.dispatch(loadUser(user));

    this.userSvc.fetchUser().subscribe((user) => {
      console.log('got user', user);
      this.user = user;
      setStorage('user', this.user);
      this.fetchData();
    });
  }

  async fetchData() {
    this.caseConfinementsService
      .fetchCaseConfinementsByPostalCode(this.user.postalcode)
      .subscribe((c) => {
        console.log('c________ ', c);
        this.store.dispatch(
          loadConfinements({
            zipcode: this.user.postalcode,
            confinements: c,
          })
        );
      });

    this.caseConditionsService
      .fetchCaseConditionsByPostalCode(this.user.postalcode)
      .subscribe((c) => {
        this.store.dispatch(
          loadConditions({
            zipcode: this.user.postalcode,
            conditions: c,
          })
        );
      });
  }

  async doRefresh(event) {
    await this.fetchData();
    //event.target.complete(); remove the timeout and uncoment this for faster but less animated
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  numConditions(numConditions: Array<ICaseConditions>): number {
    return numConditions.reduce((total, d) => total + d.status, 0);
  }

  getPostalCode(caseConditions: Array<ICaseConditions>): string {
    if (caseConditions == null || caseConditions.length < 1) return '?';
    return caseConditions[0].postalcode.slice(0, 4);
  }

  async openPostalCode() {
    (
      await this.utils.swipableModal(
        PostCodePage,
        this.routerOutlet.nativeEl,
        {},
        ''
      )
    ).present();
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
      console.log('sharing is not possible', err);
    }
  }
}
