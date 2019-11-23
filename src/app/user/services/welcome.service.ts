import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class WelcomeService {
  private isGetDeviceGroupListButtonClickedSource = new BehaviorSubject(false);
  private isAddDeviceGroupButtonClickedSource = new BehaviorSubject(false);

  isGetDeviceGroupListButtonClicked$ = this.isGetDeviceGroupListButtonClickedSource.asObservable();
  isAddDeviceGroupButtonClicked$ = this.isAddDeviceGroupButtonClickedSource.asObservable();

  changeIsGetDeviceGroupListButtonClick(isGetDeviceGroupListButtonClickedSource: boolean) {
    this.isGetDeviceGroupListButtonClickedSource.next(isGetDeviceGroupListButtonClickedSource);
  }

  changeIsAddDeviceGroupButtonClick(isAddDeviceGroupButtonClickedSource: boolean) {
    this.isAddDeviceGroupButtonClickedSource.next(isAddDeviceGroupButtonClickedSource);
  }
}
