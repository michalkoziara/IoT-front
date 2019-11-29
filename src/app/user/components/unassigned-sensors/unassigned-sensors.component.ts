import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ExecutiveInList} from '../../models/executive-in-list/executive-in-list';
import {SensorsApiService} from '../../services/apiService/sensors-api.service';
import {SensorsService} from '../../services/sensorsService/sensors.service';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';
import {Subscription} from 'rxjs';
import {SensorInList} from '../../models/sensor-in-list/sensor-in-list';

@Component({
  selector: 'app-unassigned-sensors',
  templateUrl: './unassigned-sensors.component.html',
  styleUrls: ['./unassigned-sensors.component.scss']
})
export class UnassignedSensorsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'isActive', 'view', 'add'];
  sensors: SensorInList[] = [];
  dataSource: MatTableDataSource<ExecutiveInList>;

  @Input()
  productKey: string;

  @Input()
  userGroupName: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;

  constructor(private sensorsApiService: SensorsApiService,
              private sensorsService: SensorsService,
              private viewCommunicationService: ViewCommunicationService) {
    this.dataSource = new MatTableDataSource<ExecutiveInList>();
    this.sort = new MatSort();
    this.paginator = null;
    this.productKey = '';
    this.userGroupName = '';
  }

  ngOnInit(): void {
    this.loadSensorsInList();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadSensorsInList(): Subscription {
    return this.sensorsApiService.getUnassignedSensors(this.productKey).subscribe((data) => {
      this.sensors = data.map(
        x => {
          if (x.isActive === 'true') {
            x.isActive = 'Tak';
          }

          if (x.isActive === 'false') {
            x.isActive = 'Nie';
          }
          return x;
        }
      );
      this.dataSource = new MatTableDataSource<ExecutiveInList>(this.sensors);
      this.dataSource.paginator = this.paginator;
      this.sort.sort({
        id: 'name',
        start: 'asc',
        disableClear: false
      });
      this.dataSource.sort = this.sort;
    });
  }

  viewSensor(deviceKey: string, deviceName: string): void {
    this.sensorsService.changeSelectedSensor(deviceKey);
    this.sensorsService.changeSelectedSensorName(deviceName);
    this.viewCommunicationService.changeCurrentView('showSensor');
  }

  addSensor(deviceKey: string): void {
    this.sensorsApiService.getSensor(this.productKey, deviceKey).subscribe(() => {

      }
    );
  }
}
