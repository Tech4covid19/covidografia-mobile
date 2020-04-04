import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../entities/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  fetchUser(): Observable<User> {
    return this.http.get<User>(
      environment.base_api + '/user',
      {
        headers: new HttpHeaders({
          Authorization:
            'Bearer ' + sessionStorage.getItem('token'),
        }),
      }
    );
  }
}

