import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class AdminWelcomeService {
  private isGetUsersGroupsListButtonClickedSource = new BehaviorSubject(false);
  private isGetSensorsListButtonClickedSource = new BehaviorSubject(false);
  private isGetDeviceListButtonClickedSource = new BehaviorSubject(false);
  private isGetUnconfiguredListButtonClickedSource = new BehaviorSubject(false);
  private isGetSensorsTypesListButtonClickedSource = new BehaviorSubject(false);
  private isGetDevicesTypesListButtonClickedSource = new BehaviorSubject(false);

  isGetUsersGroupsListButtonClicked$ = this.isGetUsersGroupsListButtonClickedSource.asObservable();
  isGetSensorsListButtonClicked$ = this.isGetSensorsListButtonClickedSource.asObservable();
  isGetDeviceListButtonClicked$ = this.isGetDeviceListButtonClickedSource.asObservable();
  isGetUnconfiguredListButtonClicked$ = this.isGetUnconfiguredListButtonClickedSource.asObservable();
  isGetSensorTypesListButtonClicked$ = this.isGetSensorsTypesListButtonClickedSource.asObservable();
  isGetDevicesTypesListButtonClicked$ = this.isGetDevicesTypesListButtonClickedSource.asObservable();

  changeIsGetUsersGroupsListButtonClicked(isGetUsersGroupsListButtonClicked: boolean) {
    this.isGetUsersGroupsListButtonClickedSource.next(isGetUsersGroupsListButtonClicked);
  }

  changeIsGetSensorsListButtonClickedSource(isGetSensorsListButtonClicked: boolean) {
    this.isGetSensorsListButtonClickedSource.next(isGetSensorsListButtonClicked);
  }

  changeIsGetDeviceListButtonClicked(isGetDeviceListButtonClicked: boolean) {
    this.isGetDeviceListButtonClickedSource.next(isGetDeviceListButtonClicked);
  }

  changeIsGetUnconfigureListButtonClicked(isGetUnconfiguredListButtonClicked: boolean) {
    this.isGetUnconfiguredListButtonClickedSource.next(isGetUnconfiguredListButtonClicked);
  }

  changeIsGetSensorTypesListButtonClicked(isGetSensorTypesListButtonClicked: boolean) {
    this.isGetSensorsTypesListButtonClickedSource.next(isGetSensorTypesListButtonClicked);
  }

  changeIsGetDevicesTypesListButtonClicked(isGetDevicesTypesListButtonClicked: boolean) {
    this.isGetSensorsTypesListButtonClickedSource.next(isGetDevicesTypesListButtonClicked);
  }

}
