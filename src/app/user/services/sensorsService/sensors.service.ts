import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SensorsService {
  private selectedSensorSource = new BehaviorSubject(null);
  selectedSensor$ = this.selectedSensorSource.asObservable();

  private selectedSensorNameSource = new BehaviorSubject(null);
  selectedSensorName$ = this.selectedSensorNameSource.asObservable();

  changeSelectedSensor(selectedSensorSource: string) {
    this.selectedSensorSource.next(selectedSensorSource);
  }

  changeSelectedSensorName(selectedSensorNameSource: string) {
    this.selectedSensorNameSource.next(selectedSensorNameSource);
  }
}
