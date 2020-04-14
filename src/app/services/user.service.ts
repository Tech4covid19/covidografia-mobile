import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { defer, from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { State } from 'src/app/reducers';
import { getStorage } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';
import { loadUser } from '../actions/user.actions';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private webHttp: HttpClient,
    private nativeHttp: HTTP,
    private platform: Platform,
    private store: Store<State>
  ) {
    nativeHttp.setDataSerializer('json');
  }

  fetchUser(): Observable<User> {
    if(this.platform.is('capacitor')) {
      return from(getStorage('token')).pipe(
        switchMap((token) => {
          console.log('VALLEJO_token', JSON.stringify(token.token));
          return defer(() =>
            this.nativeHttp.get(
              environment.base_api + '/user',
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
          console.log('VALLEJO_token', token.token);
          return this.webHttp.get<User>(environment.base_api + '/user', {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + token.token,
            }),
          });
        })
      );
    }
  }

  async updateOnboarding(user: User) {
    this.store.dispatch(loadUser(user));
    const token = (await getStorage('token')).token;
    if(this.platform.is('capacitor')) {
      return defer(() =>
        this.nativeHttp.put(
          environment.base_api + '/user',
          Object.assign(user, { showOnboarding: false }),
          {
            Authorization: 'Bearer ' + token,
          }
        )
      ).toPromise();
    } else {
      return this.webHttp
        .put(
          environment.base_api + '/user',
          Object.assign(user, { showOnboarding: false }),
          {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + token,
            }),
          }
        )
        .toPromise();
    }
  }

  async updatePostalCode(user: User) {
    this.store.dispatch(loadUser(user));
    const token = (await getStorage('token')).token;
    if(this.platform.is('capacitor')) {
      return defer(() =>
        this.nativeHttp.put(
          environment.base_api + '/user',
          Object.assign(user, { postalCode: user.postalcode }),
          {
            Authorization: 'Bearer ' + token,
          }
        )
      ).toPromise();
    } else {
      return this.webHttp
        .put(
          environment.base_api + '/user',
          Object.assign(user, { postalCode: user.postalcode }),
          {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + token,
            }),
          }
        )
        .toPromise();
    }
  }
}
