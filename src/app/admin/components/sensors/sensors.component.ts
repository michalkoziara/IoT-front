import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Sensor} from '../../models/sensor';
import {SensorApiService} from '../../services/apiService/sensor-api.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'isActive', 'deviceKey', 'modify', 'delete'];
  sensors: any = [];
  dataSource: MatTableDataSource<[Sensor]>;
  height: number;

  @Input()
  productKey: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor( private sensorApiService: SensorApiService) {
    console.log(this.sensorApiService);
  }

  ngOnInit() {
    this.loadSenorsInList();
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

  loadSenorsInList() {
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
      this.dataSource = new MatTableDataSource<[Sensor]>(this.sensors);
      this.sort.sort({
        id: 'name',
        start: 'asc',
        disableClear: false
      });
      this.dataSource.sort = this.sort;
    });
  }

  modifySensor(deviceKey: string) {
    console.log(deviceKey);
  }

  deleteSensor(deviceKey: string) {
    console.log(deviceKey);
  }
}
