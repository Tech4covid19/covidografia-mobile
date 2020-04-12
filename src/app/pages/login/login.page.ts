import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { setStorage, getStorage } from 'src/app/services/storage.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  webToken: string;
  constructor(private authSvc: AuthService, private navCtrl: NavController) {}

  async ngOnInit() {
    const token = await getStorage('token');
    console.log('_token', token);
    this.webToken = token.token;
  }

  async facebookLogin() {
    return this.authSvc.facebookLogin();
  }

  async logoutFacebook() {
    return this.authSvc.logoutFacebook();
  }

  async getCurrentAccessToken() {
    return this.authSvc.getCurrentFacebookAccessToken();
  }

  async webTestLogin() {
    console.log(this.webToken);
    setStorage('token', { token: this.webToken, fetchedAt: moment() }).then(
      () => {
        this.navCtrl.navigateForward('home');
      }
    );
  }
}
