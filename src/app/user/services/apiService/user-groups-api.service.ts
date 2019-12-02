import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {UserGroupInList} from '../../models/user-group-in-list/user-group-in-list';

@Injectable()
export class UserGroupsApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getUserGroups(productKey: string): Observable<{ 'userGroups': UserGroupInList[] }> {
    return this.http.get<{ 'userGroups': UserGroupInList[] }>(`${environment.apiUrl}/hubs/${productKey}/user-groups`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  createUserGroup(
    productKey: string,
    requestData: {
      groupName: string;
      password: string;
    }): Observable<object> {
    return this.http
      .post<object>(`${environment.apiUrl}/hubs/${productKey}/user-groups`, requestData, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  joinUserGroup(
    productKey: string,
    userGroupName: string,
    requestData: { password: string }): Observable<object> {
    return this.http
      .post<object>(`${environment.apiUrl}/hubs/${productKey}/user-groups/${userGroupName}/users`, requestData, this.httpOptions)
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
