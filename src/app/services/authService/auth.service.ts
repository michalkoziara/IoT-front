import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthRequest} from './auth-request';
import {AuthInfo} from './auth-info';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentAuthInfo: Observable<AuthInfo>;

  private currentAuthInfoSubject: BehaviorSubject<AuthInfo>;

  constructor(private http: HttpClient) {
    this.currentAuthInfoSubject = new BehaviorSubject<AuthInfo>(JSON.parse(localStorage.getItem('authInfo')));
    this.currentAuthInfo = this.currentAuthInfoSubject.asObservable();
  }

  public get currentAuthInfoValue(): AuthInfo {
    return this.currentAuthInfoSubject.value;
  }

  login(credentials: AuthRequest) {
    return this.http.post<any>(`${environment.apiUrl}/users/login`, credentials, httpOptions)
      .pipe(
        map(authInfo => {
            localStorage.setItem('authInfo', JSON.stringify(authInfo));
            this.currentAuthInfoSubject.next(authInfo);
            return authInfo;
          }
        )
      );
  }

  logout() {
    localStorage.removeItem('authInfo');
    this.currentAuthInfoSubject.next(null);
  }
}
