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

  handleError(response: {
    error: ErrorEvent | { errorMessage: string };
    status: string;
    message: string;
  }): Observable<never> {
    if (response.error instanceof ErrorEvent) {
      console.log(response.error.message);
      return throwError(response.error.message);
    } else {
      console.log(`Error Code: ${response.status}\nMessage: ${response.error.errorMessage}`);
      return throwError({errorCode: response.status, message: response.error.errorMessage});
    }
  }
}
