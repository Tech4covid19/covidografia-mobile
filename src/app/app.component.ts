import { Component, OnInit } from '@angular/core';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController, Platform } from '@ionic/angular';
import { getStorage } from 'src/app/services/storage.service';

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
      url: '/change-state-step1',
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
    private statusBar: StatusBar,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      const { SplashScreen, StatusBar } = Plugins;
      try {
        await SplashScreen.hide();
        await StatusBar.setStyle({ style: StatusBarStyle.Light });
      } catch (err) {}
    });
  }

  async ngOnInit() {
    getStorage('hideIntro').then((hideIntro) => {
      if (!hideIntro) this.navCtrl.navigateForward('/walkthrough');
    });
  }
}
