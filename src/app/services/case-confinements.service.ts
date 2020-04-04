import { ICaseConfinements } from './../interfaces/icase-confinements';
import { IConfinementState } from './../interfaces/iconfinementState';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CaseConfinementsService {
  constructor(private http: HttpClient) {}

  fetchCaseConfinementsByPostalCode(
    postalCode: string
  ): Observable<Array<ICaseConfinements>> {
    return this.http.get<Array<ICaseConfinements>>(
      environment.base_api + '/case/confinement/' + postalCode,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        }),
      }
    );
  }
}
