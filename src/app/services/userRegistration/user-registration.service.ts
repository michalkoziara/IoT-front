import {Injectable} from '@angular/core';
import {UserRegistrationRequest} from './user-registration-request';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = {
  observe: 'response' as 'body',
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})

};

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http: HttpClient) {
  }

  register(userData: UserRegistrationRequest): Observable<object> {
    return this.http
      .post<object>(`${environment.apiUrl}/users`, userData, httpOptions)
      .pipe(
        map(Response => {
            return Response;
          }
        )
      );
  }
}
