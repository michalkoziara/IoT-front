import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class DeviceGroupsService {
  private selectedDeviceGroupSource = new BehaviorSubject(null);
  selectedDeviceGroup$ = this.selectedDeviceGroupSource.asObservable();

  changeSelectedDeviceGroup(selectedDeviceGroupSource: string) {
    this.selectedDeviceGroupSource.next(selectedDeviceGroupSource);
  }
}
