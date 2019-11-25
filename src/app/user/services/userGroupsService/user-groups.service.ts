import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class UserGroupsService {
  private selectedUserGroupSource = new BehaviorSubject(null);
  selectedUserGroup$ = this.selectedUserGroupSource.asObservable();

  changeSelectedUserGroup(selectedUserGroupSource: string) {
    this.selectedUserGroupSource.next(selectedUserGroupSource);
  }
}
