import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { getStorage, setStorage } from 'src/app/services/storage.service';
import { IToken } from '../interfaces/itoken';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private navCtrl: NavController, private authSvc: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    return new Promise(async (resolve) => {
      const token: IToken = await getStorage('token');
      if (!token) {
        this.navCtrl.navigateRoot('login');
        return resolve(true);
      } else {
        let expiryDate = moment().add(1, 'days');
        let tokenDate = moment(token.fetchedAt);
        if (tokenDate.isBefore(expiryDate)) {
          return resolve(true);
        } else {
          const fbToken = await this.authSvc.getCurrentFacebookAccessToken();
          if (!fbToken) {
            this.navCtrl.navigateRoot('login');
            return resolve(true);
          } else {
            const userToken = await this.authSvc.getUserToken(fbToken);
            if (!userToken) {
              this.navCtrl.navigateRoot('login');
              resolve(true);
            } else {
              setStorage('token', { token: userToken, validity: moment() });
              return resolve(true);
            }
          }
        }
      }
    });
  }
}
