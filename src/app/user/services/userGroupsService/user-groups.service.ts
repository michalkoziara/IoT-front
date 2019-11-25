import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class UserGroupsService {
  private selectedUserGroupSource = new BehaviorSubject(null);
  selectedUserGroup$ = this.selectedUserGroupSource.asObservable();

  private selectedJoiningUserGroupSource = new BehaviorSubject(null);
  selectedJoiningUserGroup$ = this.selectedJoiningUserGroupSource.asObservable();

  changeSelectedUserGroup(selectedUserGroupSource: string) {
    this.selectedUserGroupSource.next(selectedUserGroupSource);
  }

  changeSelectedJoiningUserGroup(selectedJoiningUserGroupSource: string) {
    this.selectedJoiningUserGroupSource.next(selectedJoiningUserGroupSource);
  }
}
