import {Component, Input, OnInit} from '@angular/core';
import {ExecutivesApiService} from '../../services/apiService/executives-api.service';
import {Executive} from '../../models/executive/executive';
import {UserGroupsApiService} from '../../services/apiService/user-groups-api.service';
import {UserGroupsService} from '../../services/userGroupsService/user-groups.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserGroupInList} from '../../models/user-group-in-list/user-group-in-list';

@Component({
  selector: 'app-executive',
  templateUrl: './executive.component.html',
  styleUrls: ['./executive.component.scss']
})
export class ExecutiveComponent implements OnInit {
  executive: Executive | null;
  userGroups: UserGroupInList[];
  isUserGroupChangeCardVisible = false;
  selectedUserGroup: string | null;

  @Input()
  productKey: string;

  @Input()
  deviceKey: string;

  constructor(private executiveApiService: ExecutivesApiService,
              private userGroupsApiService: UserGroupsApiService,
              private userGroupsService: UserGroupsService,
              private snackBar: MatSnackBar) {
    this.executive = null;
    this.productKey = '';
    this.deviceKey = '';
    this.userGroups = [];
    this.selectedUserGroup = '';
  }

  ngOnInit(): void {
    this.getExecutive();
  }

  getExecutive(): void {
    this.executiveApiService.getExecutive(
      this.productKey,
      this.deviceKey
    ).subscribe(
      data => {
        if (data.state === true) {
          data.state = 'Podstawowy';
        }

        if (data.state === false) {
          data.state = 'Alternatywny';
        }

        if (data.isUpdated === true) {
          data.isUpdated = 'Tak';
        }

        if (data.isUpdated === false) {
          data.isUpdated = 'Nie';
        }

        if (data.isActive === true) {
          data.isActive = 'Tak';
        }

        if (data.isActive === false) {
          data.isActive = 'Nie';
        }

        if (data.positiveState === true) {
          data.positiveState = 'Tak';
        }

        if (data.positiveState === false) {
          data.positiveState = 'Nie';
        }

        if (data.negativeState === true) {
          data.negativeState = 'Tak';
        }

        if (data.negativeState === false) {
          data.negativeState = 'Nie';
        }

        if (data.isFormulaUsed === true) {
          data.isFormulaUsed = 'Tak';
        }

        if (data.isFormulaUsed === false) {
          data.isFormulaUsed = 'Nie';
        }

        if (data.defaultState === true) {
          data.defaultState = 'Tak';
        }

        if (data.defaultState === false) {
          data.defaultState = 'Nie';
        }

        this.selectedUserGroup = data.deviceUserGroup;
        this.executive = data;
      }
    );
  }

  showUserGroupChangeCard(): void {
    this.isUserGroupChangeCardVisible = true;
    this.userGroupsApiService.getUserGroups(this.productKey).subscribe(
      data => {
        this.userGroups = data.userGroups
          .filter(x => {
            return x.isAssignedTo;
          }, {});
      },
      () => {
        this.snackBar.open('Wystąpił błąd poczas dodawania, spróbuj ponownie', undefined, {duration: 3000});
        this.isUserGroupChangeCardVisible = false;
      });
  }

  deleteUserGroup(): void {
    this.modifyUserGroup(null);
  }

  changeUserGroup(): void {
    this.modifyUserGroup(this.selectedUserGroup);
  }

  modifyUserGroup(newUserGroup: string | null): void {
    this.executiveApiService.getExecutive(this.productKey, this.deviceKey).subscribe(
      data => {
        this.executiveApiService.modifyExecutive(
          {
            name: data.name,
            typeName: data.deviceTypeName,
            state: data.state,
            positiveState: newUserGroup !== '' ? null : data.positiveState,
            negativeState: newUserGroup !== '' ? null : data.negativeState,
            formulaName: newUserGroup !== '' ? null : data.formulaName,
            userGroupName: newUserGroup !== '' ? newUserGroup : data.deviceUserGroup,
            isFormulaUsed: newUserGroup !== '' ? false : data.isFormulaUsed as boolean
          },
          this.productKey,
          this.deviceKey)
          .subscribe(() => {
            this.isUserGroupChangeCardVisible = false;

            if (this.executive !== null) {
              if (newUserGroup !== null) {
                this.executive.isAssigned = true;
                this.executive.deviceUserGroup = newUserGroup;
                this.snackBar.open(
                  `Urządzenie ${data.name} zostało dodane do grupy użytkowników ${newUserGroup}`,
                  undefined,
                  {duration: 3000}
                );
              } else {
                this.executive.isAssigned = false;
                this.executive.deviceUserGroup = null;
                this.snackBar.open(
                  `Urządzenie ${data.name} zostało usunięte z grupy użytkowników`,
                  undefined,
                  {duration: 3000}
                );
              }
              this.userGroupsService.changeSelectedUserGroup(newUserGroup);
              this.selectedUserGroup = this.executive.deviceUserGroup;
            }
          },
          () => {
            this.snackBar.open('Wystąpił błąd poczas dodawania, spróbuj ponownie', undefined, {duration: 3000});
          });
      },
      () => {
        this.snackBar.open('Wystąpił błąd poczas dodawania, spróbuj ponownie', undefined, {duration: 3000});
      });
  }
}
