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
  sensors: any = [];
  dataSource: MatTableDataSource<SensorInUserGroup>;
  height: number;
  sensors$: Subscription;

  @Input()
  productKey: string;

  @Input()
  userGroupName: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private viewCommunicationService: ViewCommunicationService,
              private sensorsApiService: SensorsApiService,
              private sensorsService: SensorsService) {
  }

  ngOnInit() {
    this.sensors$ = this.loadSensorsInList();
    this.sort.sort({
      id: 'name',
      start: 'asc',
      disableClear: false
    });
  }

  ngOnDestroy() {
    this.sensors$.unsubscribe();
  }

  getPaginatorData() {
    this.calculateTableHeight();
  }

  calculateTableHeight() {
    setTimeout(() => {
        this.height = 0;
        if (this.paginator && this.paginator.length > 0 && this.paginator.pageSize > 0) {
          const pages = Math.floor(this.paginator.length / this.paginator.pageSize);
          if (pages === this.paginator.pageIndex && this.paginator.length / this.paginator.pageSize > pages) {
            this.height = this.paginator.length % this.paginator.pageSize;
          } else {
            this.height = this.paginator.pageSize;
          }
        }
        this.height *= 48;
        this.height += 160;
      },
      100);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.calculateTableHeight();
  }

  loadSensorsInList() {
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
      });
  }

  viewSensor(deviceKey: string, deviceName: string) {
    this.sensorsService.changeSelectedSensor(deviceKey);
    this.sensorsService.changeSelectedSensorName(deviceName);
    this.viewCommunicationService.changeCurrentView('showSensor');
  }

  addSensor() {
    this.viewCommunicationService.changeCurrentView('listUnassignedSensors');
  }
}
