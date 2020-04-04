import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICondition } from '../interfaces/icondition';

@Injectable({
  providedIn: 'root',
})
export class ConditionsService {
  constructor(private http: HttpClient) {}

  fetchConditions(): Observable<Array<ICondition>> {
    return this.http.get<Array<ICondition>>(
      environment.base_api + '/condition/all',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        }),
      }
    );
  }
}
