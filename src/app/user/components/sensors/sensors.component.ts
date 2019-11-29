import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SensorInUserGroup} from '../../models/sensor-in-user-group/sensor-in-user-group';
import {SensorsApiService} from '../../services/apiService/sensors-api.service';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';
import {flatMap, startWith} from 'rxjs/operators';
import {interval, Subscriber, Subscription} from 'rxjs';
import {SensorsService} from '../../services/sensorsService/sensors.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'isActive', 'sensorReadingValue', 'view'];
  sensors: SensorInUserGroup[] = [];
  dataSource: MatTableDataSource<SensorInUserGroup>;
  sensors$: Subscription;
  filterValue: string | null;

  @Input()
  productKey: string;

  @Input()
  userGroupName: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;

  constructor(private viewCommunicationService: ViewCommunicationService,
              private sensorsApiService: SensorsApiService,
              private sensorsService: SensorsService) {
    this.dataSource = new MatTableDataSource<SensorInUserGroup>();
    this.sensors$ = new Subscriber();
    this.productKey = '';
    this.userGroupName = '';
    this.filterValue = null;
    this.sort = new MatSort();
    this.paginator = null;
  }

  ngOnInit(): void {
    this.sensors$ = this.loadSensorsInList();
    this.sort.sort({
      id: 'name',
      start: 'asc',
      disableClear: false
    });
  }

  ngOnDestroy(): void {
    this.sensors$.unsubscribe();
  }

  applyFilter(filterValue: string): void {
    this.filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadSensorsInList(): Subscription {
    return interval(5000)
      .pipe(
        startWith(0),
        flatMap(() => this.sensorsApiService.getSensors(this.productKey, this.userGroupName))
      )
      .subscribe((data) => {
        this.sensors = data.map(
          x => {
            if (x.sensorReadingValue === true) {
              x.sensorReadingValue = 'Podstawowy';
            }

            if (x.sensorReadingValue === false) {
              x.sensorReadingValue = 'Alternatywny';
            }

            if (x.isActive === true) {
              x.isActive = 'Tak';
            }

            if (x.isActive === false) {
              x.isActive = 'Nie';
            }
            return x;
          }
        );
        this.dataSource = new MatTableDataSource<SensorInUserGroup>(this.sensors);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        if (this.filterValue !== null) {
          this.dataSource.filter = this.filterValue;
        }
      });
  }

  viewSensor(deviceKey: string, deviceName: string): void {
    this.sensorsService.changeSelectedSensor(deviceKey);
    this.sensorsService.changeSelectedSensorName(deviceName);
    this.viewCommunicationService.changeCurrentView('showSensor');
  }

  addSensor(): void {
    this.viewCommunicationService.changeCurrentView('listUnassignedSensors');
  }
}
