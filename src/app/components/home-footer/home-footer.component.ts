import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.scss'],
})
export class HomeFooterComponent implements OnInit {
  constructor(private authSvc: AuthService) {}

  ngOnInit() {}

  async openTermsConditions() {
    const { Browser } = Plugins;

    await Browser.open({
      url: 'https://app.covidografia.pt/#/terms-conditions',
    });
  }

  async openPrivacyPolicy() {
    const { Browser } = Plugins;

    await Browser.open({
      url: 'https://app.covidografia.pt/#/privacy-policy',
    });
  }

  logout() {
    this.authSvc.logoutFacebook();
  }
}
