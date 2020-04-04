import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/entities/user';
import { ICase } from 'src/app/interfaces/ICase';
import { ICaseConditions } from 'src/app/interfaces/icase-conditions';
import { CaseConditionsService } from 'src/app/services/case-conditions.service';
import { CaseConfinementsService } from 'src/app/services/case-confinements.service';
import { UserService } from 'src/app/services/user.service';
import { ICaseConfinements } from './../../interfaces/icase-confinements';

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
    private caseConditionsService: CaseConditionsService
  ) {}

  async ngOnInit() {
    // Set token for testing
    sessionStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiMzVmZTQwMjM5NTk5NTU1ZjBhYzYyOTEzYzM0NmRkMWFiODllYmVhMjMzZTFkZmZlZTAwOGJmNjFkYTE4MTUwZTU5ZmJlYjA0OGQ3MTM1OTczOTMxNDNmMGQzOGU1Nzg4ZmRmYTNmM2I2M2Q3YWJiYTJkMDhhNDVmNzU5YjU3NDMyMGYwMjlkYjVmMTkzOTM4YzBiZTFkNjUwYTljZDE2OWUxOTg5OGRhMWVkMTMxY2VhOWYwZmVmYjY1ZDNmMDA2Iiwic2Vzc2lvbiI6ImI1YTFjY2YzMzA2YTJlMjE0OTY3MjNlOGU2Yjk1NDI3Iiwicm9sZXMiOlsidXNlciJdLCJpYXQiOjE1ODYwMzM3OTgsImV4cCI6MTU4NjEyMDE5OH0.zdHoP9TlhHvs7RbiOn-eTeXretvV9EfJk0-bibPj4lA'
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
}
