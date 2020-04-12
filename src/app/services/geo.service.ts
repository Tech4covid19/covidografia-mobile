import { Injectable } from '@angular/core';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@ionic-native/native-geocoder/ngx';

import {
  GeolocationOptions,
  GeolocationPosition,
  Plugins,
} from '@capacitor/core';
import { Platform } from '@ionic/angular';

const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class GeoService {
  // https://github.com/ionic-team/capacitor/issues/1893
  constructor(
    private nativeGeocoder: NativeGeocoder,
    private platform: Platform
  ) {}

  async getPostalCode(
    lat: number,
    lng: number
  ): Promise<NativeGeocoderResult[]> {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };
    try {
      return this.nativeGeocoder.reverseGeocode(lat, lng, options);
    } catch (err) {
      console.log('error getting postal code', err);
    }
  }

  async getCurrentPosition(
    options: GeolocationOptions = {}
  ): Promise<GeolocationPosition> {
    if (this.platform.is('ios')) {
      return new Promise<GeolocationPosition>((resolve, reject) => {
        const id = Geolocation.watchPosition(options, (position, err) => {
          Geolocation.clearWatch({ id });
          if (err) {
            reject(err);
            return;
          }
          resolve(position);
        });
      });
    } else {
      return Geolocation.getCurrentPosition();
    }
  }
}
