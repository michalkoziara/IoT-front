import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DeviceGroupInList} from '../../models/device-group-in-list/device-group-in-list';
import {environment} from '../../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class DeviceGroupsApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getDeviceGroups(): Observable<DeviceGroupInList[]> {
    return this.http.get<DeviceGroupInList[]>(`${environment.apiUrl}/hubs`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  addDeviceGroup(requestData: {
    productKey: string;
    productPassword: string;
  }): Observable<{ productKey: string; productPassword: string }> {
    return this.http.put<{ productKey: string; productPassword: string }>(
      `${environment.apiUrl}/users`,
      requestData,
      this.httpOptions
    ).pipe(
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
