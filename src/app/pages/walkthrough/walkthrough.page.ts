import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { getStorage, setStorage } from 'src/app/services/storage.service';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: ['./walkthrough.page.scss'],
})
export class WalkthroughPage implements OnInit {
  dontShowToggle: boolean = true;
  constructor(private navCtrl: NavController) {}

  async ngOnInit() {
    console.log('', await getStorage('showIntro'));
    this.dontShowToggle = !(await getStorage('showIntro'));
  }

  async dontShowThisAgain() {
    console.log('dont', !this.dontShowToggle);
    return await setStorage('showIntro', !this.dontShowToggle);
  }

  pop() {
    this.navCtrl.back();
  }
}
