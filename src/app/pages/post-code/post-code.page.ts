import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { GeoService } from './../../servives/geo.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/entities/user';
import { GeolocationPosition } from '@capacitor/core';

@Component({
  selector: 'app-post-code',
  templateUrl: './post-code.page.html',
  styleUrls: ['./post-code.page.scss'],
  providers: [NativeGeocoder],
})
export class PostCodePage implements OnInit {
  postalCode: string;
  constructor(
    private user: User,
    private geoSvc: GeoService,
    private changeRef: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const currentPosition: GeolocationPosition = await this.geoSvc.getCurrentPosition();
    console.log(
      'curre',
      currentPosition,
      currentPosition.coords.latitude,
      currentPosition.coords.longitude
    );
    const c = await this.geoSvc.getPostalCode(
      currentPosition.coords.latitude,
      currentPosition.coords.longitude
    );
    if (c.length > 0) this.postalCode = c[0].postalCode;
    this.changeRef.detectChanges();
  }
}
