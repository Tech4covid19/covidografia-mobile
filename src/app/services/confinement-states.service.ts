import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { defer, Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IConfinementState } from './../interfaces/iconfinementState';
import { getStorage } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ConfinementStatesService {
  constructor(
    private webHttp: HttpClient,
    private nativeHttp: HTTP,
    private platform: Platform
  ) {}

  fetchConfinementStates(): Observable<Array<IConfinementState>> {
    if(this.platform.is('capacitor')) {
      return from(getStorage('token')).pipe(
        switchMap((token) => {
          return defer(() =>
            this.nativeHttp.get(
              environment.base_api + '/confinementState/all',
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
          return this.webHttp.get<Array<IConfinementState>>(
            environment.base_api + '/confinementState/all',
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
