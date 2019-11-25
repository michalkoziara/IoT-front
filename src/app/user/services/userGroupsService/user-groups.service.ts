import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class UserGroupsService {
  private selectedUserGroupSource = new BehaviorSubject(null);
  selectedUserGroup$ = this.selectedUserGroupSource.asObservable();

  private selectedSensorsInUserGroupSource = new BehaviorSubject(false);
  selectedSensorsInUserGroup$ = this.selectedSensorsInUserGroupSource.asObservable();

  private selectedExecutivesInUserGroupSource = new BehaviorSubject(false);
  selectedExecutivesInUserGroup$ = this.selectedExecutivesInUserGroupSource.asObservable();

  private selectedFormulasInUserGroupSource = new BehaviorSubject(false);
  selectedFormulasInUserGroup$ = this.selectedFormulasInUserGroupSource.asObservable();

  changeSelectedUserGroup(selectedUserGroupSource: string) {
    this.selectedUserGroupSource.next(selectedUserGroupSource);
  }

  changeSelectedSensorsInUserGroup(selectedSensorsInUserGroupSource: boolean) {
    this.selectedSensorsInUserGroupSource.next(selectedSensorsInUserGroupSource);
  }

  changeSelectedExecutivesInUserGroup(selectedExecutivesInUserGroupSource: boolean) {
    this.selectedExecutivesInUserGroupSource.next(selectedExecutivesInUserGroupSource);
  }

  changeSelectedFormulasInUserGroup(selectedFormulasInUserGroupSource: boolean) {
    this.selectedFormulasInUserGroupSource.next(selectedFormulasInUserGroupSource);
  }
}
