import { IonRouterOutlet, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/entities/user';
import { ICase } from 'src/app/interfaces/ICase';
import { ICaseConditions } from 'src/app/interfaces/icase-conditions';
import { CaseConditionsService } from 'src/app/services/case-conditions.service';
import { CaseConfinementsService } from 'src/app/services/case-confinements.service';
import { UserService } from 'src/app/services/user.service';
import { ICaseConfinements } from './../../interfaces/icase-confinements';
import { setStorage, getStorage } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { NavParamsService } from 'src/app/services/nav-params.service';
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
  cases: Observable<Array<ICase>>;
  caseConfinements: Observable<Array<ICaseConfinements>>;
  caseConditions: Observable<Array<ICaseConditions>>;

  constructor(
    private userSvc: UserService,
    private user: User,
    private caseConfinementsService: CaseConfinementsService,
    private caseConditionsService: CaseConditionsService,
    private utils: UtilsService,
    private routerOutlet: IonRouterOutlet
  ) {}

  async ngOnInit() {
    // Set token for testing
    // https://staging.api.covidografia.pt/login/facebook
    sessionStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiYjJkZTA4ZjJkODYzNDUzNjVhNGRjNTY0MjlhNDcwYzkxMjI2MjhkODdmNDY5ZDIzNDAyN2Q5MzY5YzE1MzNmNzc3MjQyNTIwZjk5MjM1NmVjNzgwYmVlYmNkZWQ3ZGFjYjcwNzI3NWYzOGZmMGQwNWQxMzYzNWEwZjViMTdkNDFjM2EyMDljNTFiNzcwMDZiZTJkYzFjMmQwYmRjY2Y1MzM4YjFmMzc4ZmYyYjI3YzMzN2JjYjE2YTgzY2Q5MDA4Iiwic2Vzc2lvbiI6Ijc1ODY3YTU1NmQwYjkzNjg4YWZlNTEwMTA1NTAzZDNiIiwicm9sZXMiOlsidXNlciJdLCJpYXQiOjE1ODYwOTQ0MDAsImV4cCI6MTU4NjE4MDgwMH0.JBRjd4HQ7FDOUaYUYAj911BaETNA6uEANjNR22mP6OU'
    );

    //TODO: This must be protected by an Angular Guard
    this.user = await getStorage('user');
    if (!this.user || !this.user.id) {
      this.user = await this.userSvc.fetchUser().toPromise();
      setStorage('user', this.user);
    }
    console.log('user', this.user);
    this.fetchData();
  }

  async fetchData() {
    this.caseConfinements = this.caseConfinementsService.fetchCaseConfinementsByPostalCode(
      this.user.postalcode
    );
    this.caseConditions = this.caseConditionsService.fetchCaseConditionsByPostalCode(
      this.user.postalcode
    );

    console.log(
      'tag',
      await this.caseConfinements.toPromise(),
      await this.caseConditions.toPromise()
    );
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
}
