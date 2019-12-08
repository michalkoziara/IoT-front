import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {finalize} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {SensorTypeApiService} from '../../services/apiService/sensor-type-api.service';
import {SensorApiService} from '../../services/apiService/sensor-api.service';
import {AdminViewCommunicationService} from '../../services/adminViewCommunicationService/admin-view-communication.service';

@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.scss']
})
export class AddSensorComponent implements OnInit {
  sensorFormGroup: FormGroup;
  progressBar = false;
  sensorTypes: string[] = [];
  selectedTypeName: string | null;

  @Input()
  productKey: string;

  constructor(private sensorTypeApiService: SensorTypeApiService,
              private sensorsApiService: SensorApiService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private viewCommunicationService: AdminViewCommunicationService) {
    this.sensorFormGroup = this.formBuilder.group({
      deviceKeyCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required],
      nameCtrl: ['', Validators.required]
    });
    this.productKey = '';
    this.selectedTypeName = null;
  }

  ngOnInit(): void {
    this.loadSensorTypesList();
  }

  loadSensorTypesList(): Subscription {
    return this.sensorTypeApiService.getSensorTypes(this.productKey).subscribe((data) => {
      this.sensorTypes = data;
    },
    () => {
      this.snackBar.open('Wystąpił błąd, spróbuj ponownie', undefined, {duration: 3000});
    });
  }

  createSensor(): void {
    if (this.sensorFormGroup.get('nameCtrl') !== null
      && this.sensorFormGroup.get('passwordCtrl') !== null
      && this.sensorFormGroup.get('deviceKeyCtrl') !== null) {
      this.progressBar = true;

      const name = (this.sensorFormGroup.get('nameCtrl') as AbstractControl).value;
      const password = (this.sensorFormGroup.get('passwordCtrl') as AbstractControl).value;
      const deviceKey = (this.sensorFormGroup.get('deviceKeyCtrl') as AbstractControl).value;

      this.sensorsApiService.postSensor(
        this.productKey,
        {
          deviceKey,
          password,
          sensorName: name,
          sensorTypeName: this.selectedTypeName as string
        }
      ).pipe(
        finalize(() => this.afterComplete())
      ).subscribe(
        () => {
          this.snackBar.open('Dodano nowy czujnik', undefined, {duration: 3000});
          this.viewCommunicationService.changeCurrentView('sensorsList');
        },
        () => {
          this.snackBar.open('Wystąpił błąd poczas tworzenia, spróbuj ponownie', undefined, {duration: 3000});
        }
      );
    }
  }

  afterComplete(): void {
    this.progressBar = false;
  }
}
