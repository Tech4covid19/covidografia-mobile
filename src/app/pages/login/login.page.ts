import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { State } from 'src/app/reducers';
import { Logout } from 'src/app/reducers/clearState.metareducer';
import {
  getStorage,
  removeStorage,
  setStorage,
} from 'src/app/services/storage.service';
import { AuthService } from './../../services/auth.service';
import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  webToken: string;
  constructor(
    private authSvc: AuthService,
    private navCtrl: NavController,
    private store: Store<State>,
    private utils: UtilsService,
    private changeRef: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const token = await getStorage('token');
    this.webToken = token ? token.token : '';
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
    await setStorage('token', { token: this.webToken, fetchedAt: moment() });
    this.navCtrl.navigateForward('home');
  }

  async testCleanAll() {
    await removeStorage('user');
    await removeStorage('token');
    await removeStorage('hideVideo');
    await removeStorage('hideIntro');
    this.logoutFacebook();
    this.store.dispatch(new Logout());
    this.utils.presentToast('All clean for testing', 1000, 'bottom', 'Cool');
    const token = await getStorage('token');
    console.log('_token', token);
    this.webToken = token ? token.token : '';
    this.changeRef.detectChanges();
  }
}
