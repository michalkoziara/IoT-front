import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DeviceApiService} from '../../services/apiService/device-api.service';
import {Devices} from '../../models/devices';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'isActive', 'deviceKey', 'modify', 'delete'];
  devices: any = [];
  dataSource: MatTableDataSource<[Devices]>;
  height: number;

  @Input()
  productKey: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private deviceApiService: DeviceApiService) {
  }

  ngOnInit() {
    this.loadDevicesInList();
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

  loadDevicesInList() {
    return this.deviceApiService.getDevices(this.productKey).subscribe((data) => {
      this.devices = data.map(
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
      this.dataSource = new MatTableDataSource<[Devices]>(this.devices);
      this.sort.sort({
        id: 'name',
        start: 'asc',
        disableClear: false
      });
      this.dataSource.sort = this.sort;
    });
  }

  modifyDevice(deviceKey: string) {
    console.log(deviceKey);
  }


  deleteDevice(deviceKey: string) {
    console.log(deviceKey);
  }
}
