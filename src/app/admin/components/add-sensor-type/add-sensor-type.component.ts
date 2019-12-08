import {Component, Input} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AdminViewCommunicationService} from '../../services/adminViewCommunicationService/admin-view-communication.service';
import {finalize} from 'rxjs/operators';
import {MatSelectionList} from '@angular/material/list';
import {SensorTypeApiService} from '../../services/apiService/sensor-type-api.service';
import {SensorType} from '../../models/sensor-type';

@Component({
  selector: 'app-add-sensor-type',
  templateUrl: './add-sensor-type.component.html',
  styleUrls: ['./add-sensor-type.component.scss']
})
export class AddSensorTypeComponent {
  sensorTypeFormGroup: FormGroup;
  progressBar = false;
  selectedType: string | null;

  minNumberValue: number | null;
  maxNumberValue: number | null;

  listOfEnumReadings: { number: number; text: string }[] = [];
  selectedEnumReadingsToDelete: number[] = [];

  @Input()
  productKey: string;

  constructor(private sensorTypeApiService: SensorTypeApiService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private viewCommunicationService: AdminViewCommunicationService) {
    this.sensorTypeFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      minValueCtrl: [''],
      maxValueCtrl: [''],
      readingEnumCtrl: [''],
    });
    this.productKey = '';
    this.selectedType = null;
    this.minNumberValue = null;
    this.maxNumberValue = null;
  }

  createSensorType(): void {
    if (this.sensorTypeFormGroup.get('nameCtrl') !== null && this.selectedType !== null) {
      this.progressBar = true;

      const name = (this.sensorTypeFormGroup.get('nameCtrl') as AbstractControl).value;

      let minValue: number | null = null;
      let maxValue: number | null = null;
      let readingType: string | null;
      let enumerator: { number: number; text: string }[] = [];

      if (this.selectedType === 'Liczbowy') {
        readingType = 'Decimal';

        if (this.sensorTypeFormGroup.get('minValueCtrl')) {
          minValue = (this.sensorTypeFormGroup.get('minValueCtrl') as AbstractControl).value;
        }

        if (this.sensorTypeFormGroup.get('maxValueCtrl')) {
          maxValue = (this.sensorTypeFormGroup.get('maxValueCtrl') as AbstractControl).value;
        }
      } else if (this.selectedType === 'Wyliczeniowy') {
        readingType = 'Enum';

        minValue = 0;
        maxValue = this.listOfEnumReadings.length === 0 ? null : this.listOfEnumReadings.length - 1;
        enumerator = this.listOfEnumReadings;
      } else {
        readingType = 'Boolean';

        minValue = 0;
        maxValue = 1;
      }

      if (name !== null && minValue !== null && maxValue !== null) {
        const requestData: SensorType = new SensorType(
          name,
          readingType,
          minValue,
          maxValue,
          enumerator
        );

        this.sensorTypeApiService.postSensorType(
          this.productKey,
          requestData,
        ).pipe(
          finalize(() => this.afterComplete())
        ).subscribe(
          () => {
            this.snackBar.open('Dodano nowy typ czujnika', undefined, {duration: 3000});
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

    this.sensorTypeFormGroup.controls.minValueCtrl.setValidators(validatorFns);
    this.sensorTypeFormGroup.controls.minValueCtrl.updateValueAndValidity({onlySelf: true, emitEvent: false});
  }

  populateMaxValue(maxValue: number): void {
    this.maxNumberValue = maxValue;

    const validatorFns: ValidatorFn[] = [Validators.max(maxValue), Validators.required];
    if (this.minNumberValue) {
      validatorFns.push(Validators.min(this.minNumberValue));
    }

    this.sensorTypeFormGroup.controls.maxValueCtrl.setValidators(validatorFns);
    this.sensorTypeFormGroup.controls.maxValueCtrl.updateValueAndValidity({onlySelf: true, emitEvent: false});
  }

  changeSelectedType(selectedType: string): void {
    if (selectedType === 'Liczbowy') {
      this.sensorTypeFormGroup.controls.minValueCtrl.setValidators([Validators.required]);
      this.sensorTypeFormGroup.controls.minValueCtrl.updateValueAndValidity({onlySelf: true, emitEvent: false});

      this.sensorTypeFormGroup.controls.maxValueCtrl.setValidators([Validators.required]);
      this.sensorTypeFormGroup.controls.maxValueCtrl.updateValueAndValidity({onlySelf: true, emitEvent: false});
    } else {
      this.sensorTypeFormGroup.controls.minValueCtrl.clearValidators();
      this.sensorTypeFormGroup.controls.minValueCtrl.updateValueAndValidity({onlySelf: true, emitEvent: false});

      this.sensorTypeFormGroup.controls.maxValueCtrl.clearValidators();
      this.sensorTypeFormGroup.controls.maxValueCtrl.updateValueAndValidity({onlySelf: true, emitEvent: false});
    }

    this.sensorTypeFormGroup.reset();
  }

  addEnumReading(): void {
    this.listOfEnumReadings.push(
      {
        number: this.listOfEnumReadings.length,
        text: (this.sensorTypeFormGroup.get('readingEnumCtrl') as AbstractControl).value
      }
    );
  }

  changeSelectedList(selectionList: MatSelectionList): void {
    this.selectedEnumReadingsToDelete = selectionList.selectedOptions.selected.map(
      selectedOption => selectedOption.value
    );
  }

  deleteEnumReadings(): void {
    this.listOfEnumReadings = this.listOfEnumReadings
      .filter(enumReading => !this.selectedEnumReadingsToDelete.includes(enumReading.number))
      .map((enumReading, i) => {
        enumReading.number = i;
        return enumReading;
      });
  }
}
