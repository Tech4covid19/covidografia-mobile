import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from 'src/app/reducers';
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
  ) {}

  fetchUser(): Observable<User> {
    if (this.platform.is('ios') || this.platform.is('android')) {
      return defer(() =>
        this.nativeHttp.get(
          environment.base_api + '/user',
          {},
          {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          }
        )
      ).pipe(map((response) => JSON.parse(response.data)));
    } else {
      return this.webHttp.get<User>(environment.base_api + '/user', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        }),
      });
    }
  }

  updateOnboarding(user: User) {
    this.store.dispatch(loadUser(user));
    if (this.platform.is('ios') || this.platform.is('android')) {
      return defer(() =>
        this.nativeHttp.put(
          environment.base_api + '/user',
          Object.assign(user, { showOnboarding: false }),
          {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
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
              Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            }),
          }
        )
        .toPromise();
    }
  }

  updatePostalCode(user: User) {
    this.store.dispatch(loadUser(user));
    if (this.platform.is('ios') || this.platform.is('android')) {
      return defer(() =>
        this.nativeHttp.put(
          environment.base_api + '/user',
          Object.assign(user, { postalCode: user.postalcode }),
          {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
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
              Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            }),
          }
        )
        .toPromise();
    }
  }
}
