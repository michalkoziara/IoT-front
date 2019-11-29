import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {AuthService} from './auth.service';
import {ErrorConstantMessages} from '../../shared/error-constant-messages';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router,
              private authenticationService: AuthService,
              private snackBar: MatSnackBar) {
  }

  intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    return next.handle(request).pipe(
      catchError(response => {
        if (response.status === 400 &&
            (response.error.errorMessage === ErrorConstantMessages.RESPONSE_MESSAGE_SIGNATURE_EXPIRED
              || response.error.errorMessage === ErrorConstantMessages.RESPONSE_MESSAGE_INVALID_TOKEN
              || response.error.errorMessage === ErrorConstantMessages.RESPONSE_MESSAGE_USER_NOT_DEFINED)) {
          this.authenticationService.logout();
          this.router.navigate(['/login']);
          this.snackBar.open('Wybrana akcja wymaga ponownego zalogowania', undefined, {duration: 3000});
          return EMPTY;
        }

        return throwError(response);
      }
      )
    );
  }
}
