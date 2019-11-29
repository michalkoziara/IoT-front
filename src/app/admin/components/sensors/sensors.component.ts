import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Sensor} from '../../models/sensor';
import {SensorApiService} from '../../services/apiService/sensor-api.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'isActive', 'deviceKey', 'actions'];
  sensors: Sensor[] = [];
  dataSource: MatTableDataSource<Sensor>;

  @Input()
  productKey: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;

  constructor(private sensorApiService: SensorApiService) {
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
}
