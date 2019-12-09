import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DeviceDetails} from '../../models/device-details';
import {DeviceApiService} from '../../services/apiService/device-api.service';
import {interval, Subscriber, Subscription} from 'rxjs';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {flatMap, startWith} from 'rxjs/operators';
import {ExecutiveType} from '../../models/executive-type';
import {UserGroupInList} from '../../models/user-group-in-list';
import {UserGroupApiService} from '../../services/apiService/user-group-api.service';
import {ExecutiveTypeApiService} from '../../services/apiService/executive-type-api.service';
import {UserGroupService} from '../../services/userGroupService/user-group.service';
import {FormulaApiService} from '../../services/apiService/formula-api.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit, OnDestroy {
  executive: DeviceDetails | null;
  executiveType: ExecutiveType | null;
  formulas: string[];
  userGroups: UserGroupInList[];
  deviceTypes: string[] = [];

  executive$: Subscription;

  isUserGroupChangeCardVisible = false;
  isStateChangeCardVisible = false;
  isFormulaChangeCardVisible = false;
  isPositiveStateChangeCardVisible = false;
  isNegativeStateChangeCardVisible = false;
  isFormulaUsedChangeCardVisible = false;
  isDeviceTypeChangeCardVisible = false;
  isNameChangeCardVisible = false;

  stateFormGroup: FormGroup;
  statePositiveFormGroup: FormGroup;
  stateNegativeFormGroup: FormGroup;
  nameFormGroup: FormGroup;
  selectedUserGroup: string | null;
  selectedDeviceType: string | null;
  selectedState: string | boolean | number | null;
  selectedPositiveState: string | boolean | number | null;
  selectedNegativeState: string | boolean | number | null;
  selectedIsFormulaUsed: boolean | null;

  selectedFormula: string | null;

  @Input()
  productKey: string;

  @Input()
  deviceKey: string;

  constructor(private deviceApiService: DeviceApiService,
              private userGroupApiService: UserGroupApiService,
              private executiveTypeApiService: ExecutiveTypeApiService,
              private formulaApiService: FormulaApiService,
              private userGroupService: UserGroupService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {
    this.executive = null;
    this.productKey = '';
    this.deviceKey = '';
    this.userGroups = [];
    this.formulas = [];
    this.selectedUserGroup = '';
    this.selectedDeviceType = '';
    this.executiveType = null;
    this.selectedState = null;
    this.selectedPositiveState = '';
    this.selectedNegativeState = '';
    this.selectedFormula = null;
    this.selectedIsFormulaUsed = null;
    this.stateFormGroup = this.formBuilder.group({stateCtrl: ['']});
    this.statePositiveFormGroup = this.formBuilder.group({statePositiveCtrl: ['']});
    this.stateNegativeFormGroup = this.formBuilder.group({stateNegativeCtrl: ['']});
    this.nameFormGroup = this.formBuilder.group({nameCtrl: ['']});
    this.executive$ = new Subscriber();
  }

  ngOnInit(): void {
    this.executive$ = this.getExecutive();
  }

  ngOnDestroy(): void {
    this.executive$.unsubscribe();
  }

  getExecutive(): Subscription {
    return interval(9500)
      .pipe(
        startWith(0),
        flatMap(() => this.deviceApiService.getExecutive(
          this.productKey,
          this.deviceKey
        ))
      )
      .subscribe(
        data => {
          this.selectedIsFormulaUsed = data.isFormulaUsed as boolean;

          if (data.state === true) {
            data.state = 'Alternatywny';
          }

          if (data.state === false) {
            data.state = 'Podstawowy';
          }

          if (data.isUpdated === true) {
            data.isUpdated = 'Nie';
          }

          if (data.isUpdated === false) {
            data.isUpdated = 'Tak';
          }

          if (data.isActive === true) {
            data.isActive = 'Tak';
          }

          if (data.isActive === false) {
            data.isActive = 'Nie';
          }

          if (data.positiveState === true) {
            data.positiveState = 'Alternatywny';
          }

          if (data.positiveState === false) {
            data.positiveState = 'Podstawowy';
          }

          if (data.negativeState === true) {
            data.negativeState = 'Alternatywny';
          }

          if (data.negativeState === false) {
            data.negativeState = 'Podstawowy';
          }

          if (data.isFormulaUsed === true) {
            data.isFormulaUsed = 'Tak';
          }

          if (data.isFormulaUsed === false) {
            data.isFormulaUsed = 'Nie';
          }

          if (data.defaultState === true) {
            data.defaultState = 'Alternatywny';
          }

          if (data.defaultState === false) {
            data.defaultState = 'Podstawowy';
          }

          this.selectedUserGroup = data.deviceUserGroup;
          this.selectedFormula = data.formulaName;
          this.selectedDeviceType = data.deviceTypeName;
          this.executive = data;

          this.executiveTypeApiService.getExecutiveType(this.productKey, data.deviceTypeName).subscribe(
            typeData => {
              if (typeData.stateType) {
                if (typeData.stateType === 'Decimal') {
                  typeData.stateType = 'Liczbowy';
                } else if (typeData.stateType === 'Enum') {
                  typeData.stateType = 'Wyliczeniowy';
                  this.selectedState = data.state;
                  this.selectedNegativeState = data.negativeState;
                  this.selectedPositiveState = data.positiveState;
                } else {
                  typeData.stateType = 'Logiczny';
                  this.selectedState = data.state === 'Alternatywny';
                  this.selectedNegativeState = data.negativeState === 'Alternatywny';
                  this.selectedPositiveState = data.positiveState === 'Alternatywny';
                }
              }
              this.executiveType = typeData;
            },
            () => {
              this.snackBar.open('Wystąpił błąd, spróbuj ponownie', undefined, {duration: 3000});
            }
          );
        },
        () => {
          this.snackBar.open('Wystąpił błąd, spróbuj ponownie', undefined, {duration: 3000});
        }
      );
  }

  showUserGroupChangeCard(): void {
    this.userGroupApiService.getUserGroups(this.productKey).subscribe(
      data => {
        this.userGroups = data.userGroups;

        this.isUserGroupChangeCardVisible = true;
        this.isStateChangeCardVisible = false;
        this.isFormulaChangeCardVisible = false;
        this.isNegativeStateChangeCardVisible = false;
        this.isPositiveStateChangeCardVisible = false;
        this.isFormulaUsedChangeCardVisible = false;
        this.isNameChangeCardVisible = false;
        this.isDeviceTypeChangeCardVisible = false;
      },
      () => {
        this.snackBar.open('Wystąpił błąd, spróbuj ponownie', undefined, {duration: 3000});
      });
  }

  deleteUserGroup(): void {
    this.modifyExecutive(
      null,
      null,
      '',
      '',
      '',
      null,
      null,
      null
    );
  }

  changeUserGroup(): void {
    this.modifyExecutive(
      this.selectedUserGroup,
      null,
      '',
      '',
      '',
      null,
      null,
      null
    );
  }

  modifyExecutive(
    newUserGroup: string | null,
    newState: string | boolean | number | null,
    newFormula: string | null,
    newPositiveState: string | boolean | number | null,
    newNegativeState: string | boolean | number | null,
    newIsFormulaUsed: boolean | null,
    newDeviceType: string | null,
    newName: string | null): void {
    if (newDeviceType && this.executive) {
      newState = this.executive.defaultState;

      newPositiveState = null;
      newNegativeState = null;
      newIsFormulaUsed = false;
    }

    this.deviceApiService.getExecutive(this.productKey, this.deviceKey).subscribe(
      data => {
        this.deviceApiService.putExecutive(
          {
            name: newName === null ? data.name : newName,
            typeName: newDeviceType === null ? data.deviceTypeName : newDeviceType,
            state: newState !== null ? newState : data.state,
            positiveState: newUserGroup !== ''
              ? null
              : newPositiveState !== '' ? newPositiveState : data.positiveState,
            negativeState: newUserGroup !== ''
              ? null
              : newNegativeState !== '' ? newNegativeState : data.negativeState,
            formulaName: newUserGroup !== ''
              ? null
              : newFormula !== '' ? newFormula : data.formulaName,
            userGroupName: newUserGroup !== '' ? newUserGroup : data.deviceUserGroup,
            isFormulaUsed: newUserGroup !== ''
              ? false
              : newIsFormulaUsed !== null ? newIsFormulaUsed : data.isFormulaUsed as boolean
          },
          this.productKey,
          this.deviceKey)
          .subscribe(() => {
            this.isUserGroupChangeCardVisible = false;
            this.isStateChangeCardVisible = false;
            this.isFormulaChangeCardVisible = false;
            this.isPositiveStateChangeCardVisible = false;
            this.isNegativeStateChangeCardVisible = false;
            this.isFormulaUsedChangeCardVisible = false;
            this.isNameChangeCardVisible = false;
            this.isDeviceTypeChangeCardVisible = false;

            if (this.executive !== null) {
              this.executive.isUpdated = 'Nie';

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
              if (newPositiveState !== '') {
                if (newPositiveState === true) {
                  this.executive.positiveState = 'Alternatywny';
                } else if (newPositiveState === false) {
                  this.executive.positiveState = 'Podstawowy';
                } else {
                  this.executive.positiveState = newPositiveState;
                }
                this.selectedPositiveState = newPositiveState;
                this.snackBar.open(
                  `Stan urządzenia ${data.name} gdy formuła spełniona został zmieniony`,
                  undefined,
                  {duration: 3000}
                );
              }
              if (newNegativeState !== '') {
                if (newNegativeState === true) {
                  this.executive.negativeState = 'Alternatywny';
                } else if (newNegativeState === false) {
                  this.executive.negativeState = 'Podstawowy';
                } else {
                  this.executive.negativeState = newNegativeState;
                }
                this.selectedNegativeState = newNegativeState;
                this.snackBar.open(
                  `Stan urządzenia ${data.name} gdy formuła niespełniona został zmieniony`,
                  undefined,
                  {duration: 3000}
                );
              }
              if (newFormula !== '') {
                this.executive.formulaName = newFormula;
                this.snackBar.open(
                  `Formuła sterującą urządzeniem została zmieniona`,
                  undefined,
                  {duration: 3000}
                );
              }
              if (newIsFormulaUsed !== null) {
                this.executive.isFormulaUsed = newIsFormulaUsed ? 'Tak' : 'Nie';
                this.snackBar.open(
                  `Automatyczne sterowanie urządzeniem zostało zmienione`,
                  undefined,
                  {duration: 3000}
                );
              }

              if (newDeviceType !== null) {
                this.executive.deviceTypeName = newDeviceType;
                this.snackBar.open(
                  `Typ urządzenia został zmieniony na ${newDeviceType}`,
                  undefined,
                  {duration: 3000}
                );
              }

              if (newName !== null) {
                this.executive.name = newName;
                this.snackBar.open(
                  `Nazwa urządzenia została zmieniona na ${newName}`,
                  undefined,
                  {duration: 3000}
                );
              }
            }
          },
          () => {
            this.snackBar.open('Wystąpił błąd, spróbuj ponownie', undefined, {duration: 3000});
          });
      },
      () => {
        this.snackBar.open('Wystąpił błąd, spróbuj ponownie', undefined, {duration: 3000});
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
      this.isFormulaChangeCardVisible = false;
      this.isUserGroupChangeCardVisible = false;
      this.isNegativeStateChangeCardVisible = false;
      this.isPositiveStateChangeCardVisible = false;
      this.isFormulaUsedChangeCardVisible = false;
      this.isNameChangeCardVisible = false;
      this.isDeviceTypeChangeCardVisible = false;
    }
  }

  changeState(): void {
    if (this.executiveType !== null) {
      if (this.executiveType.stateType === 'Liczbowy') {
        this.selectedState = (this.stateFormGroup.get('stateCtrl') as AbstractControl).value as number;
      }
      this.modifyExecutive(
        '',
        this.selectedState,
        '',
        '',
        '',
        null,
        null,
        null
      );
    }
  }

  showFormulaChangeCard(): void {
    if (this.executive !== null && this.executive.deviceUserGroup !== null) {
      this.formulaApiService.getFormulas(this.productKey, this.executive.deviceUserGroup).subscribe(
        data => {
          this.formulas = data.names;

          this.isFormulaChangeCardVisible = true;
          this.isStateChangeCardVisible = false;
          this.isUserGroupChangeCardVisible = false;
          this.isNegativeStateChangeCardVisible = false;
          this.isPositiveStateChangeCardVisible = false;
          this.isFormulaUsedChangeCardVisible = false;
          this.isNameChangeCardVisible = false;
          this.isDeviceTypeChangeCardVisible = false;
        },
        () => {
          this.snackBar.open('Wystąpił błąd, spróbuj ponownie', undefined, {duration: 3000});
        });
    }
  }

  changeFormula(): void {
    this.modifyExecutive(
      '',
      null,
      this.selectedFormula,
      '',
      '',
      null,
      null,
      null
    );
  }

  showPositiveStateChangeCard(): void {
    if (this.executive !== null && this.executiveType !== null) {
      if (this.executiveType.stateType === 'Liczbowy') {
        this.statePositiveFormGroup.patchValue({statePositiveCtrl: this.executive.positiveState});
        this.statePositiveFormGroup.controls.statePositiveCtrl.setValidators(
          [
            Validators.max(this.executiveType.stateRangeMax),
            Validators.min(this.executiveType.stateRangeMin),
            Validators.pattern(`^(?!${this.executive.negativeState}$).*$`)
          ]
        );
        this.statePositiveFormGroup.controls.statePositiveCtrl.updateValueAndValidity({onlySelf: true, emitEvent: false});
      }

      this.isPositiveStateChangeCardVisible = true;
      this.isNegativeStateChangeCardVisible = false;
      this.isStateChangeCardVisible = false;
      this.isUserGroupChangeCardVisible = false;
      this.isFormulaChangeCardVisible = false;
      this.isFormulaUsedChangeCardVisible = false;
      this.isNameChangeCardVisible = false;
      this.isDeviceTypeChangeCardVisible = false;
    }
  }

  changePositiveState(): void {
    if (this.executiveType !== null) {
      if (this.executiveType.stateType === 'Liczbowy') {
        this.selectedPositiveState = (this.statePositiveFormGroup.get('statePositiveCtrl') as AbstractControl).value as number;
      }

      if (this.executiveType.stateType === 'Logiczny') {
        this.modifyExecutive(
          '',
          null,
          '',
          this.selectedPositiveState,
          !this.selectedPositiveState,
          null,
          null,
          null
        );
      } else {
        this.modifyExecutive(
          '',
          null,
          '',
          this.selectedPositiveState,
          '',
          null,
          null,
          null
        );
      }
    }
  }

  showNegativeStateChangeCard(): void {
    if (this.executive !== null && this.executiveType !== null) {
      if (this.executiveType.stateType === 'Liczbowy') {
        this.stateNegativeFormGroup.patchValue({stateNegativeCtrl: this.executive.negativeState});
        this.stateNegativeFormGroup.controls.stateNegativeCtrl.setValidators(
          [
            Validators.max(this.executiveType.stateRangeMax),
            Validators.min(this.executiveType.stateRangeMin),
            Validators.pattern(`^(?!${this.executive.positiveState}$).*$`)
          ]
        );
        this.stateNegativeFormGroup.controls.stateNegativeCtrl.updateValueAndValidity({onlySelf: true, emitEvent: false});
      }

      this.isNegativeStateChangeCardVisible = true;
      this.isPositiveStateChangeCardVisible = false;
      this.isStateChangeCardVisible = false;
      this.isUserGroupChangeCardVisible = false;
      this.isFormulaChangeCardVisible = false;
      this.isFormulaUsedChangeCardVisible = false;
      this.isNameChangeCardVisible = false;
      this.isDeviceTypeChangeCardVisible = false;
    }
  }

  changeNegativeState(): void {
    if (this.executiveType !== null) {
      if (this.executiveType.stateType === 'Liczbowy') {
        this.selectedNegativeState = (this.stateNegativeFormGroup.get('stateNegativeCtrl') as AbstractControl).value as number;
      }

      if (this.executiveType.stateType === 'Logiczny') {
        this.modifyExecutive(
          '',
          null,
          '',
          !this.selectedNegativeState,
          this.selectedNegativeState,
          null,
          null,
          null
        );
      } else {
        this.modifyExecutive(
          '',
          null,
          '',
          '',
          this.selectedNegativeState,
          null,
          null,
          null
        );
      }
    }
  }

  showIsFormulaUsedChangeCard(): void {
    this.isFormulaUsedChangeCardVisible = true;
    this.isNegativeStateChangeCardVisible = false;
    this.isPositiveStateChangeCardVisible = false;
    this.isStateChangeCardVisible = false;
    this.isUserGroupChangeCardVisible = false;
    this.isFormulaChangeCardVisible = false;
    this.isNameChangeCardVisible = false;
    this.isDeviceTypeChangeCardVisible = false;
  }

  changeIsFormulaUsed(): void {
    this.modifyExecutive(
      '',
      null,
      '',
      '',
      '',
      this.selectedIsFormulaUsed,
      null,
      null
    );
  }

  showDeviceTypeChangeCard(): void {
    this.isDeviceTypeChangeCardVisible = true;
    this.isNameChangeCardVisible = false;
    this.isFormulaUsedChangeCardVisible = false;
    this.isNegativeStateChangeCardVisible = false;
    this.isPositiveStateChangeCardVisible = false;
    this.isStateChangeCardVisible = false;
    this.isUserGroupChangeCardVisible = false;
    this.isFormulaChangeCardVisible = false;

    this.executiveTypeApiService.getExecutiveTypes(this.productKey).subscribe(
      data => {
        this.deviceTypes = data;
      },
      () => {
        this.snackBar.open('Wystąpił błąd poczas modyfikacji, spróbuj ponownie', undefined, {duration: 3000});
        this.isDeviceTypeChangeCardVisible = false;
      });
  }

  changeDeviceType(): void {
    this.modifyExecutive(
      '',
      null,
      '',
      '',
      '',
      null,
      this.selectedDeviceType,
      null
    );
  }

  showNameChangeCard(): void {
    this.isNameChangeCardVisible = true;
    this.isDeviceTypeChangeCardVisible = false;
    this.isFormulaUsedChangeCardVisible = false;
    this.isNegativeStateChangeCardVisible = false;
    this.isPositiveStateChangeCardVisible = false;
    this.isStateChangeCardVisible = false;
    this.isUserGroupChangeCardVisible = false;
    this.isFormulaChangeCardVisible = false;
  }

  changeName(): void {
    const newName = (this.nameFormGroup.get('nameCtrl') as AbstractControl).value;
    this.modifyExecutive(
      '',
      null,
      '',
      '',
      '',
      null,
      null,
      newName
    );
  }
}
