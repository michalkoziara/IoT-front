import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {ExecutiveInUserGroup} from '../../models/executive-in-user-group/executive-in-user-group';
import {ExecutiveInList} from '../../models/executive-in-list/executive-in-list';
import {Executive} from '../../models/executive/executive';

@Injectable()
export class ExecutivesApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getExecutives(productKey: string, name: string): Observable<ExecutiveInUserGroup[]> {
    return this.http.get<ExecutiveInUserGroup[]>(`${environment.apiUrl}/hubs/${productKey}/user-groups/${name}/executive-devices`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getExecutive(productKey: string, deviceKey: string): Observable<Executive> {
    return this.http.get<Executive>(`${environment.apiUrl}/hubs/${productKey}/executive-devices/${deviceKey}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getUnassignedExecutives(productKey: string): Observable<ExecutiveInList[]> {
    return this.http.get<ExecutiveInList[]>(
      `${environment.apiUrl}/hubs/${productKey}/executive-devices/unassigned`)
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
