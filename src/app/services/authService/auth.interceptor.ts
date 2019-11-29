import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthService} from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {
  }

  intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    const authInfo = this.authenticationService.currentAuthInfoValue;
    if (authInfo && authInfo.authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authInfo.authToken}`
        }
      });
    }

    return next.handle(request);
  }
}
