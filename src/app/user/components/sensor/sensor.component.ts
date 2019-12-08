import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SensorsApiService} from '../../services/apiService/sensors-api.service';
import {Sensor} from '../../models/sensor/sensor';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserGroupsApiService} from '../../services/apiService/user-groups-api.service';
import {UserGroupInList} from '../../models/user-group-in-list/user-group-in-list';
import {UserGroupsService} from '../../services/userGroupsService/user-groups.service';
import {interval, Subscriber, Subscription} from 'rxjs';
import {flatMap, startWith} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {SensorReading} from '../../models/sensor-reading/sensor-reading';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit, OnDestroy {
    sensor: Sensor | null;
    sensor$: Subscription;
    userGroups: UserGroupInList[];
    isUserGroupChangeCardVisible = false;
    selectedUserGroup: string | null;

    displayedColumns: string[] = ['date', 'sensorReadingValue'];
    sensorReadings: SensorReading[] = [];
    dataSource: MatTableDataSource<SensorReading>;
    sensorReadings$: Subscription;
    filterValue: string | null;

    lineChartData: ChartDataSets[];
    yLabel: string[] = [];
    lineChartLabels: Label[];

    lineChartOptions = {
      responsive: true,
      scales: {
        xAxes: [
          {
            display: true,
            type: 'time',
            gridLines: {
              display: true
            },
            time: {
              displayFormats: {
                millisecond: 'HH:mm:ss.SSS',
                second: 'HH:mm:ss',
                minute: 'HH:mm',
                hour: 'HH:mm'
              },
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 15
            }
          }
        ],
        yAxes: [{
          scaleLabel: {
            display: true,
          },
          ticks: {
            callback: (value: number): string | number => {
              if (this.yLabel.length > 0) {
                return this.yLabel[value];
              } else {
                return value;
              }
            },
          },
        }]
      }
    };

    lineChartLegend = false;
    lineChartPlugins = [];
    lineChartType = 'line';
    lineChartColors: Color[] = [
      {
        borderColor: 'rgb(63, 81, 181)',
        backgroundColor: 'rgba(255, 64, 129, 0.28)',
      },
    ];

    @Input()
    productKey: string;

    @Input()
    deviceKey: string;

    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;

    constructor(private sensorsApiService: SensorsApiService,
                private userGroupsApiService: UserGroupsApiService,
                private userGroupsService: UserGroupsService,
                private snackBar: MatSnackBar) {
      this.sensor = null;
      this.sensor$ = new Subscriber();
      this.productKey = '';
      this.deviceKey = '';
      this.userGroups = [];
      this.selectedUserGroup = '';

      this.dataSource = new MatTableDataSource<SensorReading>();
      this.sensorReadings$ = new Subscriber();
      this.filterValue = null;
      this.sort = new MatSort();
      this.paginator = null;

      this.lineChartData = [];
      this.lineChartLabels = [];
    }

    ngOnInit(): void {
      this.sensor$ = this.getSensor();
      this.sensorReadings$ = this.loadSensorReadingsInList();
      this.sort.sort({
        id: 'date',
        start: 'asc',
        disableClear: false
      });
    }

    ngOnDestroy(): void {
      this.sensor$.unsubscribe();
      this.sensorReadings$.unsubscribe();
    }

    getSensor(): Subscription {
      return interval(9500)
        .pipe(
          startWith(0),
          flatMap(() => this.sensorsApiService.getSensor(
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
                this.sensor.isUpdated = 'Nie';

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

    applyFilter(filterValue: string): void {
      this.filterValue = filterValue.trim().toLowerCase();
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    loadSensorReadingsInList(): Subscription {
      return interval(9500)
        .pipe(
          startWith(0),
          flatMap(() => this.sensorsApiService.getSensorReadings(this.productKey, this.deviceKey))
        )
        .subscribe((data) => {
          this.sensorReadings = data.values.map(
            x => {
              if (x.value === true) {
                x.value = 'Alternatywny';
              } else if (x.value === false) {
                x.value = 'Podstawowy';
              }
              return x;
            }
          );

          this.lineChartLabels = data.values.map(
            x => x.date
          );

          this.yLabel = Array.from(
            new Set(
              data.values
                .filter(x => (typeof (x.value) === 'string' || typeof (x.value) === 'boolean'))
                .map(x => {
                  if (x.value === true) {
                    return 'Alternatywny';
                  } else if (x.value === false) {
                    return 'Podstawowy';
                  } else {
                    return x.value as string;
                  }
                })
            )
          );

          this.lineChartData = [
            {
              data: data.values.map(
                x => {
                  if (this.yLabel.length > 0) {
                    if (x.value === true) {
                      return ({t: x.date, y: this.yLabel.indexOf('Alternatywny')});
                    } else if (x.value === false) {
                      return ({t: x.date, y: this.yLabel.indexOf('Podstawowy')});
                    } else {
                      return ({t: x.date, y: this.yLabel.indexOf(x.value as string)});
                    }
                  } else {
                    return ({t: x.date, y: x.value as number});
                  }
                }
              ),
              steppedLine: this.yLabel.length > 0 ? 'after' : false,
              label: data.sensorName
            }
          ];

          this.dataSource = new MatTableDataSource<SensorReading>(this.sensorReadings);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          if (this.filterValue !== null) {
            this.dataSource.filter = this.filterValue;
          }
        });
    }
}
