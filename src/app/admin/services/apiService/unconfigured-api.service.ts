import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';

@Injectable()
export class UnconfiguredApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getUnconfigured(productKey: string): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/hubs/${productKey}/non-configured-devices`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error: {
    error: ErrorEvent;
    status: string;
    message: string;
  }): Observable<never> {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
