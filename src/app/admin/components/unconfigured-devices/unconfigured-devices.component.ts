import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UnconfiguredApiService} from '../../services/apiService/unconfigured-api.service';

@Component({
  selector: 'app-unconfigured-devices',
  templateUrl: './unconfigured-devices.component.html',
  styleUrls: ['./unconfigured-devices.component.scss']
})
export class UnconfiguredDevicesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  unconfigured: any = [];
  dataSource: MatTableDataSource<string>;
  height: number;

  @Input()
  productKey: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private unconfiguredApiService: UnconfiguredApiService) {
  }

  ngOnInit() {
    this.loadUnconfiguredList();
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

  loadUnconfiguredList() {
    return this.unconfiguredApiService.getUnconfigured(this.productKey).subscribe((data) => {
      this.unconfigured = data.map(x => {
        return {deviceKey: x};
      });
      this.dataSource = new MatTableDataSource<string>(this.unconfigured);
      this.sort.sort({
        id: 'deviceKey',
        start: 'asc',
        disableClear: false
      });
      this.dataSource.sort = this.sort;
    });
  }

  configureUnconfigured(unconfiguredDeviceKey: string) {
    console.log(unconfiguredDeviceKey);
  }


}
