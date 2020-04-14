import { Observable } from 'rxjs';
import { VideosService } from './../../services/videos.service';
import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { getStorage, setStorage } from 'src/app/services/storage.service';
import { IVideo } from 'src/app/interfaces/ivideo';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {
  toggle: boolean = true;
  videos: Observable<IVideo>;
  constructor(
    private modalCtrl: ModalController,
    private videoSvc: VideosService,
    public sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    this.toggle = (await getStorage('hideVideo')) || false;
    this.videos = this.videoSvc.fetchVideos();
  }

  async close() {
    await setStorage('hideVideo', this.toggle);
    this.modalCtrl.dismiss();
  }
}
