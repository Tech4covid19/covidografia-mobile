import { getStorage } from 'src/app/services/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { defer, Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
    if(this.platform.is('capacitor')) {
      return from(getStorage('token')).pipe(
        switchMap((token) => {
          return defer(() =>
            this.nativeHttp.get(
              environment.base_api + '/case/condition/' + postalCode,
              {},
              {
                Authorization: 'Bearer ' + token.token,
              }
            )
          ).pipe(map((response) => JSON.parse(response.data)));
        })
      );
    } else {
      return from(getStorage('token')).pipe(
        switchMap((token) => {
          return this.webHttp.get<Array<ICaseConditions>>(
            environment.base_api + '/case/condition/' + postalCode,
            {
              headers: new HttpHeaders({
                Authorization: 'Bearer ' + token.token,
              }),
            }
          );
        })
      );
    }
  }
}
