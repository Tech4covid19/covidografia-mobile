import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICase } from '../interfaces/ICase';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  constructor(private http: HttpClient) {}

  fetchCases(): Observable<Array<ICase>> {
    return this.http.get<Array<ICase>>(environment.base_api + '/case/all', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      }),
    });
  }

  addCase(_case: ICase): Promise<any> {
    return this.http
      .post(environment.base_api + '/case', _case, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        }),
      })
      .toPromise();
  }
}
