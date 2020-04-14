import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IVideo } from 'src/app/interfaces/ivideo';
import { getStorage, setStorage } from 'src/app/services/storage.service';
import { VideosService } from './../../services/videos.service';


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
