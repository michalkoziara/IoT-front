import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class DeviceGroupsService {
  private selectedDeviceGroupSource = new BehaviorSubject(null as string | null);
  selectedDeviceGroup$ = this.selectedDeviceGroupSource.asObservable();

  changeSelectedDeviceGroup(selectedDeviceGroupSource: string): void {
    this.selectedDeviceGroupSource.next(selectedDeviceGroupSource);
  }
}
