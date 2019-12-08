import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SensorTypeApiService} from '../../services/apiService/sensor-type-api.service';
import {Subscription} from 'rxjs';
import {SensorType} from '../../models/sensor-type';
import {AdminViewCommunicationService} from '../../services/adminViewCommunicationService/admin-view-communication.service';

@Component({
  selector: 'app-sensor-type',
  templateUrl: './sensor-type.component.html',
  styleUrls: ['./sensor-type.component.scss']
})
export class SensorTypeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  sensorTypes: { name: string }[] = [];
  dataSource: MatTableDataSource<{ name: string }>;

  sensorType: SensorType | null;

  @Input()
  productKey: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;

  constructor(private sensorTypeApiService: SensorTypeApiService,
              private viewCommunicationService: AdminViewCommunicationService) {
    this.dataSource = new MatTableDataSource<{ name: string }>();
    this.productKey = '';
    this.sort = new MatSort();
    this.paginator = null;

    this.sensorType = null;
  }

  ngOnInit(): void {
    this.loadExecutiveTypesList();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadExecutiveTypesList(): Subscription {
    return this.sensorTypeApiService.getSensorTypes(this.productKey).subscribe((data) => {
      this.sensorTypes = data.map(x => {
        return {name: x};
      });
      this.dataSource = new MatTableDataSource<{ name: string }>(this.sensorTypes);
      this.sort.sort({
        id: 'deviceKey',
        start: 'asc',
        disableClear: false
      });
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  getSensorType(typeName: string): void {
    this.sensorTypeApiService.getSensorType(
      this.productKey,
      typeName
    ).subscribe(
      data => {
        if (data.readingType) {
          if (data.readingType === 'Decimal') {
            data.readingType = 'Liczbowy';
          } else if (data.readingType === 'Enum') {
            data.readingType = 'Wyliczeniowy';
          } else {
            data.readingType = 'Logiczny';
          }
        }

        this.sensorType = data;
      }
    );
  }

  viewSensorType(typeName: string): void {
    this.getSensorType(typeName);
  }

  addSensorType(): void {
    this.viewCommunicationService.changeCurrentView('addSensorType');
  }
}
