import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {Devices} from '../../models/devices';
import {DeviceDetails} from '../../models/device-details';

@Injectable()
export class DeviceApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getDevices(productKey: string): Observable<Devices[]> {
    return this.http.get<[Devices]>(`${environment.apiUrl}/hubs/${productKey}/executive-devices`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getExecutive(productKey: string, deviceKey: string): Observable<DeviceDetails> {
    return this.http.get<DeviceDetails>(`${environment.apiUrl}/hubs/${productKey}/executive-devices/${deviceKey}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  putExecutive(
    changedExecutive: {
      name: string;
      typeName: string;
      state: string | boolean | number;
      positiveState: string | boolean | number | null;
      negativeState: string | boolean | number | null;
      formulaName: string | null;
      userGroupName: string | null;
      isFormulaUsed: boolean;
    },
    productKey: string,
    deviceKey: string): Observable<object> {
    return this.http
      .post<object>(`${environment.apiUrl}/hubs/${productKey}/executive-devices/${deviceKey}`,
        changedExecutive,
        this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  postExecutive(
    productKey: string,
    requestData: { deviceKey: string; password: string; deviceName: string; deviceTypeName: string }): Observable<object> {
    return this.http
      .post<object>(`${environment.apiUrl}/hubs/${productKey}/executive-devices`,
        requestData,
        this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteExecutive(productKey: string, deviceKey: string): Observable<object> {
    return this.http
      .delete<object>(`${environment.apiUrl}/hubs/${productKey}/executive-devices/${deviceKey}`, this.httpOptions)
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
