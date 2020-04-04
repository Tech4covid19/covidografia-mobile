import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICaseConditions } from '../interfaces/icase-conditions';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CaseConditionsService {
  constructor(private http: HttpClient) {}

  fetchCaseConditionsByPostalCode(
    postalCode: string
  ): Observable<Array<ICaseConditions>> {
    return this.http.get<Array<ICaseConditions>>(
      environment.base_api + '/case/condition/' + postalCode,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        }),
      }
    );
  }
}
