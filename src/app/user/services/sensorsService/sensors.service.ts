import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SensorsService {
  private selectedSensorSource = new BehaviorSubject(null as string | null);
  selectedSensor$ = this.selectedSensorSource.asObservable();

  private selectedSensorNameSource = new BehaviorSubject(null as string | null);
  selectedSensorName$ = this.selectedSensorNameSource.asObservable();

  changeSelectedSensor(selectedSensorSource: string): void {
    this.selectedSensorSource.next(selectedSensorSource);
  }

  changeSelectedSensorName(selectedSensorNameSource: string): void {
    this.selectedSensorNameSource.next(selectedSensorNameSource);
  }
}
