import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Sensor} from '../../models/sensor';
import {SensorApiService} from '../../services/apiService/sensor-api.service';
import {Subscription} from 'rxjs';
import {AdminViewCommunicationService} from '../../services/admin-view-communication.service';
import {SensorService} from '../../services/sensorService/sensor.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'isActive', 'deviceKey', 'modify', 'delete'];
  sensors: Sensor[] = [];
  dataSource: MatTableDataSource<Sensor>;

  @Input()
  productKey: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;

  constructor(private sensorApiService: SensorApiService,
              private viewCommunicationService: AdminViewCommunicationService,
              private sensorsService: SensorService) {
    this.dataSource = new MatTableDataSource<Sensor>();
    this.productKey = '';
    this.sort = new MatSort();
    this.paginator = null;
  }

  ngOnInit(): void {
    this.loadSenorsInList();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadSenorsInList(): Subscription {
    return this.sensorApiService.getSensors(this.productKey).subscribe((data) => {
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
      this.dataSource = new MatTableDataSource<Sensor>(this.sensors);
      this.sort.sort({
        id: 'name',
        start: 'asc',
        disableClear: false
      });
      this.dataSource.sort = this.sort;
    });
  }

  modifySensor(deviceKey: string): void {
    this.sensorsService.changeSelectedSensor(deviceKey);
    this.viewCommunicationService.changeCurrentView('sensorDetails');
  }

  deleteSensor(deviceKey: string): void {
    console.log(deviceKey);
  }

  viewSensor(deviceKey: string, deviceName: string): void {
    this.sensorsService.changeSelectedSensor(deviceKey);
    this.sensorsService.changeSelectedSensorName(deviceName);
    this.viewCommunicationService.changeCurrentView('showSensor');
  }

  addSensor(): void {
    this.viewCommunicationService.changeCurrentView('addSensor');
  }
}
