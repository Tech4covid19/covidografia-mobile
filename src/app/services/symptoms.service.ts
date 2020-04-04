import { ISymptom } from '../interfaces/ISymptom';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SymptomsService {
  constructor(private http: HttpClient) {}

  fetchSymptoms(): Observable<Array<ISymptom>> {
    return this.http.get<Array<ISymptom>>(
      environment.base_api + '/symptom/all',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        }),
      }
    );
  }
}
