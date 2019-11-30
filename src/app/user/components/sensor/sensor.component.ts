import {Component, Input, OnInit} from '@angular/core';
import {SensorsApiService} from '../../services/apiService/sensors-api.service';
import {Sensor} from '../../models/sensor/sensor';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserGroupsApiService} from '../../services/apiService/user-groups-api.service';
import {UserGroupInList} from '../../models/user-group-in-list/user-group-in-list';
import {UserGroupsService} from '../../services/userGroupsService/user-groups.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit {
  sensor: Sensor | null;
  userGroups: UserGroupInList[];
  isUserGroupChangeCardVisible = false;
  selectedUserGroup: string | null;

  @Input()
  productKey: string;

  @Input()
  deviceKey: string;

  constructor(private sensorsApiService: SensorsApiService,
              private userGroupsApiService: UserGroupsApiService,
              private userGroupsService: UserGroupsService,
              private snackBar: MatSnackBar) {
    this.sensor = null;
    this.productKey = '';
    this.deviceKey = '';
    this.userGroups = [];
    this.selectedUserGroup = '';
  }

  ngOnInit(): void {
    this.getSensor();
  }

  getSensor(): void {
    this.sensorsApiService.getSensor(
      this.productKey,
      this.deviceKey
    ).subscribe(
      data => {
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

        if (data.readingValue === true) {
          data.readingValue = 'Tak';
        }

        if (data.readingValue === false) {
          data.readingValue = 'Nie';
        }
        this.selectedUserGroup = data.sensorUserGroup;
        this.sensor = data;
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
    this.sensorsApiService.getSensor(this.productKey, this.deviceKey).subscribe(
      data => {
        this.sensorsApiService.modifySensor(
          {name: data.name, typeName: data.sensorTypeName, userGroupName: newUserGroup},
          this.productKey,
          this.deviceKey)
          .subscribe(() => {
            this.isUserGroupChangeCardVisible = false;

            if (this.sensor !== null) {
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
              this.userGroupsService.changeSelectedUserGroup(newUserGroup);
              this.selectedUserGroup = this.sensor.sensorUserGroup;
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
