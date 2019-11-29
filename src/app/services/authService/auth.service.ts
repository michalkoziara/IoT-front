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
  public currentAuthInfo: Observable<AuthInfo | null>;

  private readonly currentAuthInfoSubject: BehaviorSubject<AuthInfo | null>;

  constructor(private http: HttpClient) {
    const authInfo = localStorage.getItem('authInfo');
    this.currentAuthInfoSubject = new BehaviorSubject<AuthInfo | null>(
      authInfo !== null
        ? JSON.parse(authInfo)
        : null);
    this.currentAuthInfo = this.currentAuthInfoSubject.asObservable();
  }

  public get currentAuthInfoValue(): AuthInfo | null {
    return this.currentAuthInfoSubject != null
      ? this.currentAuthInfoSubject.value
      : null;
  }

  login(credentials: AuthRequest): Observable<AuthInfo | null> {
    return this.http.post<AuthInfo | null>(`${environment.apiUrl}/users/login`, credentials, httpOptions)
      .pipe(
        map(authInfo => {
          localStorage.setItem('authInfo', JSON.stringify(authInfo));
          this.currentAuthInfoSubject.next(authInfo);
          return authInfo;
        }
        )
      );
  }

  logout(): void {
    localStorage.removeItem('authInfo');
    this.currentAuthInfoSubject.next(null);
  }
}
