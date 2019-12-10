import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UnconfiguredApiService} from '../../services/apiService/unconfigured-api.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-unconfigured-devices',
  templateUrl: './unconfigured-devices.component.html',
  styleUrls: ['./unconfigured-devices.component.scss']
})
export class UnconfiguredDevicesComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  unconfigured: { deviceKey: string }[] = [];
  dataSource: MatTableDataSource<{ deviceKey: string }>;

  @Input()
  productKey: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;


  constructor(private unconfiguredApiService: UnconfiguredApiService) {
    this.dataSource = new MatTableDataSource<{ deviceKey: string }>();
    this.productKey = '';
    this.sort = new MatSort();
    this.paginator = null;
  }

  ngOnInit(): void {
    this.loadUnconfiguredList();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadUnconfiguredList(): Subscription {
    return this.unconfiguredApiService.getUnconfigured(this.productKey).subscribe((data) => {
      this.unconfigured = data.map(x => {
        return {deviceKey: x};
      });
      this.dataSource = new MatTableDataSource<{ deviceKey: string }>(this.unconfigured);
      this.sort.sort({
        id: 'deviceKey',
        start: 'asc',
        disableClear: false
      });
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  configureUnconfigured(unconfiguredDeviceKey: string): void {
    console.log(unconfiguredDeviceKey);
  }
}
