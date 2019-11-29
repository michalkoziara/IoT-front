import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {SensorInUserGroup} from '../../models/sensor-in-user-group/sensor-in-user-group';
import {SensorInList} from '../../models/sensor-in-list/sensor-in-list';
import {Sensor} from '../../models/sensor/sensor';

@Injectable()
export class SensorsApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getSensors(productKey: string, name: string): Observable<SensorInUserGroup[]> {
    return this.http.get<SensorInUserGroup[]>(`${environment.apiUrl}/hubs/${productKey}/user-groups/${name}/sensors`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getSensor(productKey: string, deviceKey: string): Observable<Sensor> {
    return this.http.get<Sensor>(`${environment.apiUrl}/hubs/${productKey}/sensors/${deviceKey}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getUnassignedSensors(productKey: string): Observable<SensorInList[]> {
    return this.http.get<SensorInList[]>(
      `${environment.apiUrl}/hubs/${productKey}/sensors/unassigned`)
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
