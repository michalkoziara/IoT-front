import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AdminRegisterRequest} from './admin-register-request';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

const httpOptions = {
  observe: 'response' as 'body',
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})

};

@Injectable({
  providedIn: 'root'
})

export class AdminRegisterService {

  constructor(private http: HttpClient) {
  }


  register(adminData: AdminRegisterRequest) {
    return this.http.post<any>(`${environment.apiUrl}/admins`, adminData, httpOptions).pipe(map(response => {
      return response;
    }));
  }

}
