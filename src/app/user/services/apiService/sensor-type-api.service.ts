import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {SensorType} from '../../models/sensor-type/sensor-type';

@Injectable()
export class SensorTypeApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getSensorType(productKey: string, name: string): Observable<SensorType> {
    return this.http.get<SensorType>(`${environment.apiUrl}/hubs/${productKey}/sensor-types/${name}`)
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
