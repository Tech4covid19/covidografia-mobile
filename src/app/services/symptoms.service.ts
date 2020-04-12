import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISymptom } from '../interfaces/ISymptom';

@Injectable({
  providedIn: 'root',
})
export class SymptomsService {
  constructor(
    private webHttp: HttpClient,
    private nativeHttp: HTTP,
    private platform: Platform
  ) {}

  fetchSymptoms(): Observable<Array<ISymptom>> {
    if (this.platform.is('ios') || this.platform.is('android')) {
      return defer(() =>
        this.nativeHttp.get(
          environment.base_api + '/symptom/all',
          {},
          {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          }
        )
      ).pipe(map((response) => JSON.parse(response.data)));
    } else {
      return this.webHttp.get<Array<ISymptom>>(
        environment.base_api + '/symptom/all',
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          }),
        }
      );
    }
  }
}
