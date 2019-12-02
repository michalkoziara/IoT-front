import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class UserGroupsService {
  private selectedUserGroupSource = new BehaviorSubject(null as string | null);
  selectedUserGroup$ = this.selectedUserGroupSource.asObservable();

  private selectedJoiningUserGroupSource = new BehaviorSubject(null as string | null);
  selectedJoiningUserGroup$ = this.selectedJoiningUserGroupSource.asObservable();

  changeSelectedUserGroup(selectedUserGroupSource: string | null): void {
    this.selectedUserGroupSource.next(selectedUserGroupSource);
  }

  changeSelectedJoiningUserGroup(selectedJoiningUserGroupSource: string): void {
    this.selectedJoiningUserGroupSource.next(selectedJoiningUserGroupSource);
  }
}
