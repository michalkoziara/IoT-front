import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SensorTypeApiService} from '../../services/apiService/sensor-type-api.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sensor-type',
  templateUrl: './sensor-type.component.html',
  styleUrls: ['./sensor-type.component.scss']
})
export class SensorTypeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  sensorType: { name: string }[] = [];
  dataSource: MatTableDataSource<{ name: string }>;

  @Input()
  productKey: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;

  constructor(private sensorTypeApiService: SensorTypeApiService) {
    this.dataSource = new MatTableDataSource<{ name: string }>();
    this.productKey = '';
    this.sort = new MatSort();
    this.paginator = null;
  }

  ngOnInit(): void {
    this.loadExecutiveTypesList();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadExecutiveTypesList(): Subscription {
    return this.sensorTypeApiService.getSensorTypes(this.productKey).subscribe((data) => {
      this.sensorType = data.map(x => {
        return {name: x};
      });
      this.dataSource = new MatTableDataSource<{ name: string }>(this.sensorType);
      this.sort.sort({
        id: 'deviceKey',
        start: 'asc',
        disableClear: false
      });
      this.dataSource.sort = this.sort;
    });
  }

  deleteExecutiveType(typeName: string): void {
    console.log(typeName);
  }
}
