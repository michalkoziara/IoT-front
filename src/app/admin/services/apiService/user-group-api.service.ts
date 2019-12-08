import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {UserGroupInList} from '../../models/user-group-in-list';

@Injectable()
export class UserGroupApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getUserGroups(productKey: string): Observable<{ 'userGroups': UserGroupInList[] }> {
    return this.http.get<{ 'userGroups': [UserGroupInList] }>(`${environment.apiUrl}/hubs/${productKey}/user-groups`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteUserGroup(productKey: string, userGroupName: string): Observable<object> {
    return this.http.delete(`${environment.apiUrl}/hubs/${productKey}/user-groups/${userGroupName}`, this.httpOptions).pipe(
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
