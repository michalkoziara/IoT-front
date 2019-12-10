import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {Sensor} from '../../models/sensor';
import {SensorDetails} from '../../models/sensor-details';

@Injectable()
export class SensorApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getSensors(productKey: string): Observable<[Sensor]> {
    return this.http.get<[Sensor]>(`${environment.apiUrl}/hubs/${productKey}/sensors`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getSensor(productKey: string, deviceKey: string): Observable<SensorDetails> {
    return this.http.get<SensorDetails>(`${environment.apiUrl}/hubs/${productKey}/sensors/${deviceKey}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  postSensor(
    productKey: string,
    requestData: { deviceKey: string; password: string; sensorName: string; sensorTypeName: string }): Observable<object> {
    return this.http
      .post<object>(`${environment.apiUrl}/hubs/${productKey}/sensors`,
        requestData,
        this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  modifySensor(
    changedSensor: { name: string; typeName: string; userGroupName: string | null },
    productKey: string,
    deviceKey: string): Observable<object> {
    return this.http
      .put<object>(`${environment.apiUrl}/hubs/${productKey}/sensors/${deviceKey}`,
        changedSensor,
        this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteSensor(productKey: string, deviceKey: string): Observable<object> {
    return this.http
      .delete<object>(`${environment.apiUrl}/hubs/${productKey}/sensors/${deviceKey}`, this.httpOptions)
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
