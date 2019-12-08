import {Component, Input} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ExecutiveTypeApiService} from '../../services/apiService/executive-type-api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AdminViewCommunicationService} from '../../services/adminViewCommunicationService/admin-view-communication.service';
import {finalize} from 'rxjs/operators';
import {ExecutiveType} from '../../models/executive-type';
import {MatSelectionList} from '@angular/material/list';

@Component({
  selector: 'app-add-executive-type',
  templateUrl: './add-executive-type.component.html',
  styleUrls: ['./add-executive-type.component.scss']
})
export class AddExecutiveTypeComponent {
  executiveTypeFormGroup: FormGroup;
  progressBar = false;
  selectedType: string | null;

  minNumberValue: number | null;
  maxNumberValue: number | null;

  defaultBooleanValue: boolean;

  listOfEnumStates: { number: number; text: string }[] = [];
  defaultEnumValue: number | null;
  selectedEnumStatesToDelete: number[] = [];

  @Input()
  productKey: string;

  constructor(private executiveTypeApiService: ExecutiveTypeApiService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private viewCommunicationService: AdminViewCommunicationService) {
    this.executiveTypeFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      minValueCtrl: [''],
      maxValueCtrl: [''],
      defaultNumberValueCtrl: [''],
      stateEnumCtrl: [''],
    });
    this.productKey = '';
    this.selectedType = null;
    this.minNumberValue = null;
    this.maxNumberValue = null;

    this.defaultBooleanValue = false;
    this.defaultEnumValue = null;
  }

  createExecutiveType(): void {
    if (this.executiveTypeFormGroup.get('nameCtrl') !== null && this.selectedType !== null) {
      this.progressBar = true;

      const name = (this.executiveTypeFormGroup.get('nameCtrl') as AbstractControl).value;

      let minValue: number | null = null;
      let maxValue: number | null = null;
      let defaultValue: number | null = null;
      let stateType: string | null;
      let enumerator: { number: number; text: string }[] = [];

      if (this.selectedType === 'Liczbowy') {
        stateType = 'Decimal';

        if (this.executiveTypeFormGroup.get('minValueCtrl')) {
          minValue = (this.executiveTypeFormGroup.get('minValueCtrl') as AbstractControl).value;
        }

        if (this.executiveTypeFormGroup.get('maxValueCtrl')) {
          maxValue = (this.executiveTypeFormGroup.get('maxValueCtrl') as AbstractControl).value;
        }

        if (this.executiveTypeFormGroup.get('defaultNumberValueCtrl')) {
          defaultValue = (this.executiveTypeFormGroup.get('defaultNumberValueCtrl') as AbstractControl).value;
        }
      } else if (this.selectedType === 'Wyliczeniowy') {
        stateType = 'Enum';

        minValue = 0;
        maxValue = this.listOfEnumStates.length === 0 ? null : this.listOfEnumStates.length - 1;
        defaultValue = this.defaultEnumValue;
        enumerator = this.listOfEnumStates;
      } else {
        stateType = 'Boolean';

        minValue = 0;
        maxValue = 1;

        defaultValue = this.defaultBooleanValue ? 1 : 0;
      }

      if (name !== null && minValue !== null && maxValue !== null && defaultValue !== null) {
        const requestData: ExecutiveType = new ExecutiveType(
          name,
          stateType,
          minValue,
          maxValue,
          enumerator,
          defaultValue
        );

        this.executiveTypeApiService.postExecutiveType(
          this.productKey,
          requestData,
        ).pipe(
          finalize(() => this.afterComplete())
        ).subscribe(
          () => {
            this.snackBar.open('Dodano nowy typ urządzeń', undefined, {duration: 3000});
          },
          () => {
            this.snackBar.open('Wystąpił błąd poczas tworzenia, spróbuj ponownie', undefined, {duration: 3000});
          }
        );
      }
    }
  }

  afterComplete(): void {
    this.progressBar = false;
  }

  populateMinValue(minValue: number): void {
    this.minNumberValue = minValue;

    const validatorFns: ValidatorFn[] = [Validators.min(minValue), Validators.required];
    if (this.maxNumberValue) {
      validatorFns.push(Validators.max(this.maxNumberValue));
    }

    this.executiveTypeFormGroup.controls.defaultNumberValueCtrl.setValidators(validatorFns);
    this.executiveTypeFormGroup.controls.defaultNumberValueCtrl.updateValueAndValidity({onlySelf: true, emitEvent: false});
  }

  populateMaxValue(maxValue: number): void {
    this.maxNumberValue = maxValue;

    const validatorFns: ValidatorFn[] = [Validators.max(maxValue), Validators.required];
    if (this.minNumberValue) {
      validatorFns.push(Validators.min(this.minNumberValue));
    }

    this.executiveTypeFormGroup.controls.defaultNumberValueCtrl.setValidators(validatorFns);
    this.executiveTypeFormGroup.controls.defaultNumberValueCtrl.updateValueAndValidity({onlySelf: true, emitEvent: false});
  }

  changeSelectedType(selectedType: string): void {
    if (selectedType === 'Liczbowy') {
      const validatorFns: ValidatorFn[] = [Validators.required];
      if (this.minNumberValue) {
        validatorFns.push(Validators.min(this.minNumberValue));
      }
      if (this.maxNumberValue) {
        validatorFns.push(Validators.max(this.maxNumberValue));
      }

      this.executiveTypeFormGroup.controls.defaultNumberValueCtrl.setValidators(validatorFns);
      this.executiveTypeFormGroup.controls.defaultNumberValueCtrl.updateValueAndValidity({onlySelf: true, emitEvent: false});

      this.executiveTypeFormGroup.controls.minValueCtrl.setValidators([Validators.required]);
      this.executiveTypeFormGroup.controls.minValueCtrl.updateValueAndValidity({onlySelf: true, emitEvent: false});

      this.executiveTypeFormGroup.controls.maxValueCtrl.setValidators([Validators.required]);
      this.executiveTypeFormGroup.controls.maxValueCtrl.updateValueAndValidity({onlySelf: true, emitEvent: false});
    } else {
      this.executiveTypeFormGroup.controls.defaultNumberValueCtrl.clearValidators();
      this.executiveTypeFormGroup.controls.defaultNumberValueCtrl.updateValueAndValidity({onlySelf: true, emitEvent: false});

      this.executiveTypeFormGroup.controls.minValueCtrl.clearValidators();
      this.executiveTypeFormGroup.controls.minValueCtrl.updateValueAndValidity({onlySelf: true, emitEvent: false});

      this.executiveTypeFormGroup.controls.maxValueCtrl.clearValidators();
      this.executiveTypeFormGroup.controls.maxValueCtrl.updateValueAndValidity({onlySelf: true, emitEvent: false});
    }

    this.executiveTypeFormGroup.reset();
  }

  changeDefaultBoolean(defaultBoolean: boolean): void {
    this.defaultBooleanValue = defaultBoolean;
  }

  addEnumState(): void {
    this.listOfEnumStates.push(
      {
        number: this.listOfEnumStates.length,
        text: (this.executiveTypeFormGroup.get('stateEnumCtrl') as AbstractControl).value
      }
    );
  }

  changeSelectedList(selectionList: MatSelectionList): void {
    this.selectedEnumStatesToDelete = selectionList.selectedOptions.selected.map(
      selectedOption => selectedOption.value
    );
  }

  deleteEnumStates(): void {
    this.listOfEnumStates = this.listOfEnumStates
      .filter(enumState => !this.selectedEnumStatesToDelete.includes(enumState.number))
      .map((enumState, i) => {
        enumState.number = i;
        return enumState;
      });
  }
}
