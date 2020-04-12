import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { FacebookLoginResponse } from '@rdlabo/capacitor-facebook-login';
import { defer } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private nativeHttp: HTTP) {}

  ngOnInit() {}

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
      this.getUserToken(result.accessToken.token);
    } else {
      // Cancelled by user.
    }
  }

  async logoutFacebook() {
    const { FacebookLogin } = Plugins;

    await FacebookLogin.logout();
  }

  async getCurrentAccessToken() {
    const { FacebookLogin } = Plugins;

    const result = await (<FacebookLoginResponse>(
      FacebookLogin.getCurrentAccessToken()
    ));

    if (result.accessToken) {
      console.log(`Facebook access token is ${result.accessToken.token}`);
      this.getUserToken(result.accessToken.token);
    } else {
      // Not logged in.
    }
  }

  getUserToken(token: string) {
    this.nativeHttp.setDataSerializer('json');
    this.nativeHttp
      .post(
        environment.base_api + '/login/facebook/token',
        {
          access_token: token,
        },
        { 'Content-Type': 'application/json' }
      )
      .then((response) => {
        const token = JSON.parse(response.data).token;
        sessionStorage.setItem('token', token);
      })
      .catch((err) => console.log('err getting token', JSON.stringify(err)));
  }
}
