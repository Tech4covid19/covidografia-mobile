import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICondition } from '../interfaces/icondition';

@Injectable({
  providedIn: 'root',
})
export class ConditionsService {
  constructor(
    private webHttp: HttpClient,
    private nativeHttp: HTTP,
    private platform: Platform
  ) {}

  fetchConditions(): Observable<Array<ICondition>> {
    if (this.platform.is('ios') || this.platform.is('android')) {
      return defer(() =>
        this.nativeHttp.get(
          environment.base_api + '/condition/all',
          {},
          {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          }
        )
      ).pipe(map((response) => JSON.parse(response.data)));
    } else {
      return this.webHttp.get<Array<ICondition>>(
        environment.base_api + '/condition/all',
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          }),
        }
      );
    }
  }
}
