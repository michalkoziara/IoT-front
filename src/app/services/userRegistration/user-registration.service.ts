import {Injectable} from '@angular/core';
import {UserRegistrationRequest} from './user-registration-request';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

  register(userData: UserRegistrationRequest) {
    return this.http.post<any>(`${environment.apiUrl}/users`, userData, httpOptions).pipe(map(Response => {
      return Response;
    }));
  }

}
