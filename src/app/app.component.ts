import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
    },
    {
      title: 'About Us',
      url: '/about',
      icon: 'information-circle',
    },
    {
      title: 'Atualizar o meu estado',
      url: '/status-update',
      icon: 'help-circle',
    },
    {
      title: 'Login FB',
      url: '/login',
      icon: 'person-circle',
    },
    {
      title: 'Postal Code',
      url: '/post-code',
      icon: 'locate',
    },
    {
      title: 'Intro',
      url: '/walkthrough',
      icon: 'information-circle',
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {}
}
