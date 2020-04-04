import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IConfinementState } from './../interfaces/iconfinementState';

@Injectable({
  providedIn: 'root',
})
export class ConfinementStatesService {
  constructor(private http: HttpClient) {}

  fetchConfinementStates(): Observable<Array<IConfinementState>> {
    return this.http.get<Array<IConfinementState>>(
      environment.base_api + '/confinementState/all',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        }),
      }
    );
  }
}
