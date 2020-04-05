import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { FacebookLoginResponse } from '@rdlabo/capacitor-facebook-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  async facebookLogin() {
    const { FacebookLogin } = Plugins;

    const FACEBOOK_PERMISSIONS = [
      'email',
      'user_birthday',
      'user_photos',
      'user_gender',
    ];
    const result = await (<FacebookLoginResponse>(
      FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS })
    ));

    if (result.accessToken) {
      // Login successful.
      console.log(`Facebook access token is ${result.accessToken.token}`);
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
    } else {
      // Not logged in.
    }
  }
}
