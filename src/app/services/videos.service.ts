import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { defer, from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IVideo } from './../interfaces/ivideo';
import { getStorage } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  constructor(
    private webHttp: HttpClient,
    private nativeHttp: HTTP,
    private platform: Platform
  ) {}

  fetchVideos(): Observable<IVideo> {
    if (this.platform.is('ios') || this.platform.is('android')) {
      return from(getStorage('token')).pipe(
        switchMap((token) => {
          return defer(() =>
            this.nativeHttp.get(
              environment.base_api + '/video/all',
              {},
              {
                Authorization: 'Bearer ' + token.token,
              }
            )
          ).pipe(map((response) => JSON.parse(response.data)));
        })
      );
    } else {
      return from(getStorage('token')).pipe(
        switchMap((token) => {
          return this.webHttp.get<IVideo>(environment.base_api + '/video/all', {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + token.token,
            }),
          });
        })
      );
    }
  }
}
