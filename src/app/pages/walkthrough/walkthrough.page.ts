import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { getStorage, setStorage } from 'src/app/services/storage.service';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: ['./walkthrough.page.scss'],
})
export class WalkthroughPage implements OnInit {
  dontShowToggle: boolean;
  constructor(private navCtrl: NavController) {}

  async ngOnInit() {
    setTimeout(() => {
      this.dontShowToggle = true;
      this.dontShowThisAgain();
    }, 500);
  }

  async dontShowThisAgain() {
    console.log('dont', this.dontShowToggle);
    return await setStorage('hideIntro', this.dontShowToggle);
  }

  pop() {
    this.navCtrl.back();
  }
}
