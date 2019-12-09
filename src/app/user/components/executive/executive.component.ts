import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ExecutivesApiService} from '../../services/apiService/executives-api.service';
import {Executive} from '../../models/executive/executive';
import {UserGroupsApiService} from '../../services/apiService/user-groups-api.service';
import {UserGroupsService} from '../../services/userGroupsService/user-groups.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserGroupInList} from '../../models/user-group-in-list/user-group-in-list';
import {ExecutiveTypesApiService} from '../../services/apiService/executive-types-api.service';
import {ExecutiveType} from '../../models/executive-type/executive-type';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormulasApiService} from '../../services/apiService/formulas-api.service';
import {interval, Subscriber, Subscription} from 'rxjs';
import {flatMap, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-executive',
  templateUrl: './executive.component.html',
  styleUrls: ['./executive.component.scss']
})
export class ExecutiveComponent implements OnInit, OnDestroy {
  executive: Executive | null;
  executiveType: ExecutiveType | null;
  formulas: string[];
  userGroups: UserGroupInList[];

  executive$: Subscription;

  isUserGroupChangeCardVisible = false;
  isStateChangeCardVisible = false;
  isFormulaChangeCardVisible = false;
  isPositiveStateChangeCardVisible = false;
  isNegativeStateChangeCardVisible = false;
  isFormulaUsedChangeCardVisible = false;

  stateFormGroup: FormGroup;
  statePositiveFormGroup: FormGroup;
  stateNegativeFormGroup: FormGroup;
  selectedUserGroup: string | null;
  selectedState: string | boolean | number | null;
  selectedPositiveState: string | boolean | number | null;
  selectedNegativeState: string | boolean | number | null;
  selectedIsFormulaUsed: boolean | null;

  selectedFormula: string | null;

  @Input()
  productKey: string;

  @Input()
  deviceKey: string;

  constructor(private executiveApiService: ExecutivesApiService,
              private userGroupsApiService: UserGroupsApiService,
              private executiveTypesApiService: ExecutiveTypesApiService,
              private formulasApiService: FormulasApiService,
              private userGroupsService: UserGroupsService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {
    this.executive = null;
    this.productKey = '';
    this.deviceKey = '';
    this.userGroups = [];
    this.formulas = [];
    this.selectedUserGroup = '';
    this.executiveType = null;
    this.selectedState = null;
    this.selectedPositiveState = '';
    this.selectedNegativeState = '';
    this.selectedFormula = null;
    this.selectedIsFormulaUsed = null;
    this.stateFormGroup = this.formBuilder.group({stateCtrl: ['']});
    this.statePositiveFormGroup = this.formBuilder.group({statePositiveCtrl: ['']});
    this.stateNegativeFormGroup = this.formBuilder.group({stateNegativeCtrl: ['']});
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
        flatMap(() => this.executiveApiService.getExecutive(
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
            data.defaultState = 'Tak';
          }

          if (data.defaultState === false) {
            data.defaultState = 'Nie';
          }

          this.selectedUserGroup = data.deviceUserGroup;
          this.selectedFormula = data.formulaName;
          this.executive = data;

          this.userGroupsService.changeSelectedUserGroup(data.deviceUserGroup);

          this.executiveTypesApiService.getExecutiveType(this.productKey, data.deviceTypeName).subscribe(
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
    this.userGroupsApiService.getUserGroups(this.productKey).subscribe(
      data => {
        this.userGroups = data.userGroups
          .filter(x => {
            return x.isAssignedTo;
          }, {});

        this.isUserGroupChangeCardVisible = true;
        this.isStateChangeCardVisible = false;
        this.isFormulaChangeCardVisible = false;
        this.isNegativeStateChangeCardVisible = false;
        this.isPositiveStateChangeCardVisible = false;
        this.isFormulaUsedChangeCardVisible = false;
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
      null
    );
  }

  modifyExecutive(
    newUserGroup: string | null,
    newState: string | boolean | number | null,
    newFormula: string | null,
    newPositiveState: string | boolean | number | null,
    newNegativeState: string | boolean | number | null,
    newIsFormulaUsed: boolean | null): void {
    this.executiveApiService.getExecutive(this.productKey, this.deviceKey).subscribe(
      data => {
        this.executiveApiService.modifyExecutive(
          {
            name: data.name,
            typeName: data.deviceTypeName,
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
        null
      );
    }
  }

  showFormulaChangeCard(): void {
    if (this.executive !== null && this.executive.deviceUserGroup !== null) {
      this.formulasApiService.getFormulas(this.productKey, this.executive.deviceUserGroup).subscribe(
        data => {
          this.formulas = data.names;

          this.isFormulaChangeCardVisible = true;
          this.isStateChangeCardVisible = false;
          this.isUserGroupChangeCardVisible = false;
          this.isNegativeStateChangeCardVisible = false;
          this.isPositiveStateChangeCardVisible = false;
          this.isFormulaUsedChangeCardVisible = false;
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
          null
        );
      } else {
        this.modifyExecutive(
          '',
          null,
          '',
          this.selectedPositiveState,
          '',
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
          null
        );
      } else {
        this.modifyExecutive(
          '',
          null,
          '',
          '',
          this.selectedNegativeState,
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
  }

  changeIsFormulaUsed(): void {
    this.modifyExecutive(
      '',
      null,
      '',
      '',
      '',
      this.selectedIsFormulaUsed
    );
  }
}
