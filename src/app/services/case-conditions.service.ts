import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICaseConditions } from '../interfaces/icase-conditions';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CaseConditionsService {
  constructor(
    private webHttp: HttpClient,
    private nativeHttp: HTTP,
    private platform: Platform
  ) {}

  fetchCaseConditionsByPostalCode(
    postalCode: string
  ): Observable<Array<ICaseConditions>> {
    if (this.platform.is('ios') || this.platform.is('android')) {
      return defer(() =>
        this.nativeHttp.get(
          environment.base_api + '/case/condition/' + postalCode,
          {},
          {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          }
        )
      ).pipe(map((response) => JSON.parse(response.data)));
    } else {
      return this.webHttp.get<Array<ICaseConditions>>(
        environment.base_api + '/case/condition/' + postalCode,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          }),
        }
      );
    }
  }
}
