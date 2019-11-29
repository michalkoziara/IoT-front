import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AdminRegisterRequest} from './admin-register-request';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminRegisterService {
  httpOptions = {
    observe: 'response' as 'body',
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  register(adminData: AdminRegisterRequest): Observable<object> {
    return this.http
      .post<object>(`${environment.apiUrl}/admins`, adminData, this.httpOptions)
      .pipe(
        map(response => {
          return response;
        }
        )
      );
  }

}
