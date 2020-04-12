import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { getStorage, setStorage } from 'src/app/services/storage.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {
  toggle: boolean = true;
  constructor(private modalCtrl: ModalController) {}

  async ngOnInit() {
    this.toggle = (await getStorage('hideVideo')) || false;
  }

  async close() {
    await setStorage('hideVideo', this.toggle);
    this.modalCtrl.dismiss();
  }
}
