import {Component, Input, OnInit} from '@angular/core';
import {ExecutivesApiService} from '../../services/apiService/executives-api.service';
import {Executive} from '../../models/executive/executive';
import {UserGroupsApiService} from '../../services/apiService/user-groups-api.service';
import {UserGroupsService} from '../../services/userGroupsService/user-groups.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserGroupInList} from '../../models/user-group-in-list/user-group-in-list';
import {ExecutiveTypesApiService} from '../../services/apiService/executive-types-api.service';
import {ExecutiveType} from '../../models/executive-type/executive-type';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-executive',
  templateUrl: './executive.component.html',
  styleUrls: ['./executive.component.scss']
})
export class ExecutiveComponent implements OnInit {
  executive: Executive | null;
  userGroups: UserGroupInList[];
  executiveType: ExecutiveType | null;
  isUserGroupChangeCardVisible = false;
  isStateChangeCardVisible = false;
  isFormulaChangeCardVisible = false;
  selectedUserGroup: string | null;
  selectedState: string | boolean | number | null;

  stateFormGroup: FormGroup;

  @Input()
  productKey: string;

  @Input()
  deviceKey: string;

  constructor(private executiveApiService: ExecutivesApiService,
              private userGroupsApiService: UserGroupsApiService,
              private executiveTypesApiService: ExecutiveTypesApiService,
              private userGroupsService: UserGroupsService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {
    this.executive = null;
    this.productKey = '';
    this.deviceKey = '';
    this.userGroups = [];
    this.selectedUserGroup = '';
    this.executiveType = null;
    this.selectedState = null;
    this.stateFormGroup = this.formBuilder.group({stateCtrl: ['']});
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
          data.state = 'Alternatywny';
        }

        if (data.state === false) {
          data.state = 'Podstawowy';
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

        this.executiveTypesApiService.getExecutiveType(this.productKey, data.deviceTypeName).subscribe(
          typeData => {
            if (typeData.stateType) {
              if (typeData.stateType === 'Decimal') {
                typeData.stateType = 'Liczbowy';
              } else if (typeData.stateType === 'Enum') {
                typeData.stateType = 'Wyliczeniowy';
                this.selectedState = data.state;
              } else {
                typeData.stateType = 'Logiczny';
                this.selectedState = data.state === 'Alternatywny';
              }
            }
            this.executiveType = typeData;
          },
          () => {
            this.snackBar.open('Wystąpił błąd poczas dodawania, spróbuj ponownie', undefined, {duration: 3000});
          }
        );
      },
      () => {
        this.snackBar.open('Wystąpił błąd poczas dodawania, spróbuj ponownie', undefined, {duration: 3000});
      }
    );
  }

  showUserGroupChangeCard(): void {
    this.userGroupsApiService.getUserGroups(this.productKey).subscribe(
      data => {
        this.userGroups = data.userGroups
          .filter(x => {
            return x.isAssignedTo;
          }, {});
        this.isUserGroupChangeCardVisible = true;
        this.isStateChangeCardVisible = false;
      },
      () => {
        this.snackBar.open('Wystąpił błąd poczas dodawania, spróbuj ponownie', undefined, {duration: 3000});
      });
  }

  deleteUserGroup(): void {
    this.modifyUserGroup(null, null);
  }

  changeUserGroup(): void {
    this.modifyUserGroup(this.selectedUserGroup, null);
  }

  modifyUserGroup(newUserGroup: string | null, newState: string | boolean | number | null): void {
    this.executiveApiService.getExecutive(this.productKey, this.deviceKey).subscribe(
      data => {
        this.executiveApiService.modifyExecutive(
          {
            name: data.name,
            typeName: data.deviceTypeName,
            state: newState !== null ? newState : data.state,
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
            this.isStateChangeCardVisible = false;

            if (this.executive !== null) {
              if (newUserGroup !== '') {
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
                this.selectedUserGroup = newUserGroup;
              }
              if (newState !== null) {
                if (newState === true) {
                  this.executive.state = 'Alternatywny';
                } else if (newState === false) {
                  this.executive.state = 'Podstawowy';
                } else {
                  this.executive.state = newState;
                }

                this.snackBar.open(
                  `Stan urządzenia ${data.name} został zmieniony`,
                  undefined,
                  {duration: 3000}
                );
              }
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

  showStateChangeCard(): void {
    if (this.executive !== null && this.executiveType !== null) {
      if (this.executiveType.stateType === 'Liczbowy') {
        this.stateFormGroup.patchValue({stateCtrl: this.executive.state});
        this.stateFormGroup.controls.stateCtrl.setValidators(
          [
            Validators.max(this.executiveType.stateRangeMax),
            Validators.min(this.executiveType.stateRangeMin)
          ]
        );
        this.stateFormGroup.controls.stateCtrl.updateValueAndValidity({onlySelf: true, emitEvent: false});
      }

      this.isStateChangeCardVisible = true;
      this.isUserGroupChangeCardVisible = false;
    }
  }

  changeState(): void {
    if (this.executiveType !== null) {
      if (this.executiveType.stateType === 'Liczbowy') {
        this.selectedState = (this.stateFormGroup.get('stateCtrl') as AbstractControl).value as number;
      }
      this.modifyUserGroup('', this.selectedState);
    }
  }
}
