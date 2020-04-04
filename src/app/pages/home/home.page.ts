import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/entities/user';
import { ICase } from 'src/app/interfaces/ICase';
import { ICaseConditions } from 'src/app/interfaces/icase-conditions';
import { CaseConditionsService } from 'src/app/services/case-conditions.service';
import { CaseConfinementsService } from 'src/app/services/case-confinements.service';
import { UserService } from 'src/app/services/user.service';
import { ICaseConfinements } from './../../interfaces/icase-confinements';
import { CasesService } from './../../services/cases.service';

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
    private caseSvc: CasesService,
    private caseConfinementsService: CaseConfinementsService,
    private caseConditionsService: CaseConditionsService
  ) {}

  async ngOnInit() {

    // Set token for testing
    sessionStorage.setItem(
      'token',
      ''
    );

    //TODO: This must be protected by an Angular Guard
    if (!this.user.id) {
      this.user = await this.userSvc.fetchUser().toPromise();
    }

    this.fetchData();
  }

  async fetchData() {
    this.caseConfinements = this.caseConfinementsService.fetchCaseConfinementsByPostalCode(
      this.user.postalcode
    );
    this.caseConditions = this.caseConditionsService.fetchCaseConditionsByPostalCode(
      this.user.postalcode
    );
  }

  doRefresh(event) {
    this.fetchData();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  numConditions(numConditions: Array<ICaseConditions>): number {
    return numConditions.reduce((total, d) => total + d.status, 0);
  }

  getPostalCode(caseConditions: Array<ICaseConditions>): string {
    return caseConditions[0].postalcode.slice(0, 4);
  }
}
