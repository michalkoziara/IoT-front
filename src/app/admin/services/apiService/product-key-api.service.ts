import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {UserGroupInList} from '../../models/user-group-in-list';
import {environment} from '../../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {DeviceGroup} from '../../models/device-group';

@Injectable({
  providedIn: 'root'
})
export class ProductKeyApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getDeviceGroup(): Observable<DeviceGroup> {
    return this.http.get<DeviceGroup>(`${environment.apiUrl}/hubs`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
