import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ExecutiveInList} from '../../models/executive-in-list/executive-in-list';
import {SensorsApiService} from '../../services/apiService/sensors-api.service';
import {SensorsService} from '../../services/sensorsService/sensors.service';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';

@Component({
  selector: 'app-unassigned-sensors',
  templateUrl: './unassigned-sensors.component.html',
  styleUrls: ['./unassigned-sensors.component.scss']
})
export class UnassignedSensorsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'isActive', 'view', 'add'];
  sensors: any = [];
  dataSource: MatTableDataSource<ExecutiveInList>;
  height: number;

  @Input()
  productKey: string;

  @Input()
  userGroupName: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private sensorsApiService: SensorsApiService,
              private sensorsService: SensorsService,
              private viewCommunicationService: ViewCommunicationService) {
  }

  ngOnInit() {
    this.loadSensorsInList();
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

  viewSensor(deviceKey: string, deviceName: string) {
    this.sensorsService.changeSelectedSensor(deviceKey);
    this.sensorsService.changeSelectedSensorName(deviceName);
    this.viewCommunicationService.changeCurrentView('showSensor');
  }

  addSensor(deviceKey: string) {
    console.log();
  }
}
