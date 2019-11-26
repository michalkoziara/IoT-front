import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {DeviceGroup} from '../../models/device-group';
import {environment} from '../../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {Devices} from '../../models/devices';

@Injectable({
  providedIn: 'root'
})
export class DeviceApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getDevices(productKey: string): Observable<[Devices]> {
    return this.http.get<[Devices]>(`${environment.apiUrl}/hubs/${productKey}/executive-devices`)
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
