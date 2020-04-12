import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { HTTP } from '@ionic-native/http/ngx';
import { FacebookLoginResponse } from '@rdlabo/capacitor-facebook-login';
import * as moment from 'moment';
import { defer } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { setStorage } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private nativeHttp: HTTP) {}

  async getUserToken(token: string) {
    this.nativeHttp.setDataSerializer('json');
    return defer(() =>
      this.nativeHttp.post(
        environment.base_api + '/login/facebook/token',
        {
          access_token: token,
        },
        { 'Content-Type': 'application/json' }
      )
    ).pipe(map((response) => JSON.parse(response.data).token));
  }

  async getCurrentFacebookAccessToken() {
    const { FacebookLogin } = Plugins;

    const result = await (<FacebookLoginResponse>(
      FacebookLogin.getCurrentAccessToken()
    ));

    if (result.accessToken) {
      return result.accessToken.token;
    } else {
      return null;
    }
  }

  async facebookLogin() {
    const { FacebookLogin } = Plugins;

    const FACEBOOK_PERMISSIONS = ['email', 'user_birthday'];
    const result = await (<FacebookLoginResponse>(
      FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS })
    ));

    if (result.accessToken) {
      // Login successful.
      console.log(
        `Facebook access token is ${result.accessToken.token}`,
        ' The rest is ',
        JSON.stringify(result)
      );
      const userToken = await this.getUserToken(result.accessToken.token);
      setStorage('token', { token: userToken, validity: moment() });
    } else {
      // Cancelled by user.
    }
  }

  async logoutFacebook() {
    const { FacebookLogin } = Plugins;

    await FacebookLogin.logout();
  }
}
