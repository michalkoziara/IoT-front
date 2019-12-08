import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {DeviceGroup} from '../../models/device-group';

@Injectable()
export class ProductKeyApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getDeviceGroup(): Observable<DeviceGroup[]> {
    return this.http.get<DeviceGroup[]>(`${environment.apiUrl}/hubs`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  changeDeviceGroupName(productKey: string, changedName: string): Observable<{ name: string }> {
    return this.http.put<{ name: string }>(`${environment.apiUrl}/hubs/${productKey}`,
      {name: changedName},
      this.httpOptions)
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
