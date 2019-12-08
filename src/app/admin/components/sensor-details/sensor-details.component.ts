import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SensorDetails} from '../../models/sensor-details';
import {SensorApiService} from '../../services/apiService/sensor-api.service';
import {interval, Subscriber, Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {flatMap, startWith} from 'rxjs/operators';
import {UserGroupInList} from '../../models/user-group-in-list';
import {UserGroupApiService} from '../../services/apiService/user-group-api.service';
import {UserGroupService} from '../../services/userGroupService/user-group.service';
import {SensorTypeApiService} from '../../services/apiService/sensor-type-api.service';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.scss']
})
export class SensorDetailsComponent implements OnInit, OnDestroy {
  sensor: SensorDetails | null;
  sensor$: Subscription;

  userGroups: UserGroupInList[] = [];
  isUserGroupChangeCardVisible = false;
  selectedUserGroup: string | null;

  sensorTypes: string[] = [];
  isSensorTypeChangeCardVisible = false;
  selectedSensorType: string | null;

  nameFormGroup: FormGroup;
  isNameChangeCardVisible = false;

  @Input()
  productKey: string;

  @Input()
  deviceKey: string;

  constructor(private sensorApiService: SensorApiService,
              private userGroupApiService: UserGroupApiService,
              private userGroupService: UserGroupService,
              private sensorTypeApiService: SensorTypeApiService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {
    this.sensor = null;
    this.sensor$ = new Subscriber();

    this.productKey = '';
    this.deviceKey = '';

    this.selectedUserGroup = '';
    this.selectedSensorType = '';

    this.nameFormGroup = this.formBuilder.group({nameCtrl: ['']});
  }

  ngOnInit(): void {
    this.sensor$ = this.getSensor();
  }

  ngOnDestroy(): void {
    this.sensor$.unsubscribe();
  }

  getSensor(): Subscription {
    return interval(9500)
      .pipe(
        startWith(0),
        flatMap(() => this.sensorApiService.getSensor(
          this.productKey,
          this.deviceKey
        ))
      ).subscribe(
        data => {
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

          if (data.readingValue === true) {
            data.readingValue = 'Alternatywny';
          }

          if (data.readingValue === false) {
            data.readingValue = 'Podstawowy';
          }
          this.selectedUserGroup = data.sensorUserGroup;
          this.selectedSensorType = data.sensorTypeName;
          this.sensor = data;
        }
      );
  }

  showUserGroupChangeCard(): void {
    this.isUserGroupChangeCardVisible = true;
    this.isSensorTypeChangeCardVisible = false;
    this.isNameChangeCardVisible = false;

    this.userGroupApiService.getUserGroups(this.productKey).subscribe(
      data => {
        this.userGroups = data.userGroups;
      },
      () => {
        this.snackBar.open('Wystąpił błąd poczas dodawania, spróbuj ponownie', undefined, {duration: 3000});
        this.isUserGroupChangeCardVisible = false;
      });
  }

  deleteUserGroup(): void {
    this.modifySensor(null, null, null);
  }

  changeUserGroup(): void {
    this.modifySensor(this.selectedUserGroup, null, null);
  }

  showSensorTypeChangeCard(): void {
    this.isSensorTypeChangeCardVisible = true;
    this.isUserGroupChangeCardVisible = false;
    this.isNameChangeCardVisible = false;

    this.sensorTypeApiService.getSensorTypes(this.productKey).subscribe(
      data => {
        this.sensorTypes = data;
      },
      () => {
        this.snackBar.open('Wystąpił błąd poczas modyfikacji, spróbuj ponownie', undefined, {duration: 3000});
        this.isSensorTypeChangeCardVisible = false;
      });
  }

  changeSensorType(): void {
    this.modifySensor('', this.selectedSensorType, null);
  }

  showNameChangeCard(): void {
    this.isNameChangeCardVisible = true;
    this.isUserGroupChangeCardVisible = false;
    this.isSensorTypeChangeCardVisible = false;
  }

  changeName(): void {
    const newName = (this.nameFormGroup.get('nameCtrl') as AbstractControl).value;
    this.modifySensor('', null, newName);
  }

  modifySensor(newUserGroup: string | null, newSensorType: string | null, newName: string | null): void {
    this.sensorApiService.getSensor(this.productKey, this.deviceKey).subscribe(
      data => {
        this.sensorApiService.modifySensor(
          {
            name: newName === null ? data.name : newName,
            typeName: newSensorType === null ? data.sensorTypeName : newSensorType,
            userGroupName: newUserGroup === '' ? data.sensorUserGroup : newUserGroup,
          },
          this.productKey,
          this.deviceKey)
          .subscribe(() => {
            this.isUserGroupChangeCardVisible = false;
            this.isSensorTypeChangeCardVisible = false;
            this.isNameChangeCardVisible = false;

            if (this.sensor !== null) {
              this.sensor.isUpdated = 'Nie';

              if (newUserGroup !== '') {
                if (newUserGroup !== null) {
                  this.sensor.isAssigned = true;
                  this.sensor.sensorUserGroup = newUserGroup;
                  this.snackBar.open(
                    `Czujnik ${data.name} został dodany do grupy użytkowników ${newUserGroup}`,
                    undefined,
                    {duration: 3000}
                  );
                } else {
                  this.sensor.isAssigned = false;
                  this.sensor.sensorUserGroup = null;
                  this.snackBar.open(
                    `Czujnik ${data.name} został usunięty z grupy użytkowników`,
                    undefined,
                    {duration: 3000}
                  );
                }
              }

              if (newSensorType !== null) {
                this.sensor.sensorTypeName = newSensorType;
                this.snackBar.open(
                  `Typ czujnika został zmieniony na ${newSensorType}`,
                  undefined,
                  {duration: 3000}
                );
              }

              if (newName !== null) {
                this.sensor.name = newName;
                this.snackBar.open(
                  `Nazwa czujnika została zmieniona na ${newName}`,
                  undefined,
                  {duration: 3000}
                );
              }
            }
          },
          () => {
            this.snackBar.open('Wystąpił błąd poczas modyfikacji, spróbuj ponownie', undefined, {duration: 3000});
          });
      },
      () => {
        this.snackBar.open('Wystąpił błąd poczas modyfikacji, spróbuj ponownie', undefined, {duration: 3000});
      });
  }
}
