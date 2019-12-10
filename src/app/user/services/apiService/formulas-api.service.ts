import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {Formula} from '../../models/formula/formula';

@Injectable()
export class FormulasApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getFormulas(productKey: string, userGroupName: string): Observable<{'names': string[]}> {
    return this.http.get<{'names': string[]}>(`${environment.apiUrl}/hubs/${productKey}/user-groups/${userGroupName}/formulas`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getFormula(productKey: string, userGroupName: string, formulaName: string): Observable<Formula> {
    return this.http.get<Formula>(`${environment.apiUrl}/hubs/${productKey}/user-groups/${userGroupName}/formulas/${formulaName}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  postFormula(
    productKey: string,
    userGroupName: string,
    requestData: Formula): Observable<object> {
    return this.http
      .post<object>(`${environment.apiUrl}/hubs/${productKey}/user-groups/${userGroupName}/formulas`, requestData, this.httpOptions)
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
