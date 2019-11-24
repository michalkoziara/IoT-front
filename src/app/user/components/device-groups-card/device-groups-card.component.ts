import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DeviceGroupsApiService} from '../../services/apiService/device-groups-api.service';
import {DeviceGroupInList} from '../../models/device-group-in-list';

@Component({
  selector: 'app-device-groups-card',
  templateUrl: './device-groups-card.component.html',
  styleUrls: ['./device-groups-card.component.scss']
})
export class DeviceGroupsCardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'productKey'];
  deviceGroups: any = [];
  dataSource: MatTableDataSource<DeviceGroupInList>;
  height: number;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private deviceGroupsApi: DeviceGroupsApiService) {
  }

  ngOnInit() {
    this.loadDeviceGroupsInList();
  }

  getPaginatorData() {
    this.calculateTableHeight();
  }

  calculateTableHeight() {
    if (this.paginator && this.paginator.length > 0 && this.paginator.pageSize > 0) {
      const pages = Math.floor(this.paginator.length / this.paginator.pageSize);
      if (pages === this.paginator.pageIndex && this.paginator.length / this.paginator.pageSize > pages) {
        this.height = this.paginator.length % this.paginator.pageSize;
      } else {
        this.height = this.paginator.pageSize;
      }
    }
    this.height *= 48;
    this.height += 184;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadDeviceGroupsInList() {
    return this.deviceGroupsApi.getDeviceGroups().subscribe((data: {}) => {
      this.deviceGroups = data;
      this.dataSource = new MatTableDataSource<DeviceGroupInList>(this.deviceGroups);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
