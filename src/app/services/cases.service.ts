import { Injectable } from '@angular/core';
import { Observable, defer, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICase } from '../interfaces/ICase';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { map, switchMap } from 'rxjs/operators';
import { getStorage } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  constructor(
    private webHttp: HttpClient,
    private nativeHttp: HTTP,
    private platform: Platform
  ) {
    nativeHttp.setDataSerializer('json');
  }

  fetchCases(): Observable<Array<ICase>> {
    if(this.platform.is('capacitor')) {
      return from(getStorage('token')).pipe(
        switchMap((token) => {
          return defer(() =>
            this.nativeHttp.get(
              environment.base_api + '/cases/all',
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
          return this.webHttp.get<Array<ICase>>(
            environment.base_api + '/case/all',
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

  addCase(_case: ICase): Promise<any> {
    if(this.platform.is('capacitor')) {
      return from(getStorage('token'))
        .pipe(
          switchMap((token) => {
            return defer(() =>
              this.nativeHttp.post(environment.base_api + '/case', _case, {
                Authorization: 'Bearer ' + token.token,
              })
            ).pipe(map((response) => JSON.parse(response.data)));
          })
        )
        .toPromise();
    } else {
      return from(getStorage('token'))
        .pipe(
          switchMap((token) => {
            return this.webHttp.post(environment.base_api + '/case', _case, {
              headers: new HttpHeaders({
                Authorization: 'Bearer ' + token.token,
              }),
            });
          })
        )
        .toPromise();
    }
  }
}
