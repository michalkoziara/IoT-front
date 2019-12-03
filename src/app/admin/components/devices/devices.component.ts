import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DeviceApiService} from '../../services/apiService/device-api.service';
import {Devices} from '../../models/devices';
import {Subscription} from 'rxjs';
import {DeviceService} from '../../services/deviceService/device.service';
import {AdminViewCommunicationService} from '../../services/admin-view-communication.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'isActive', 'deviceKey', 'modify', 'delete'];
  devices: Devices[] = [];
  dataSource: MatTableDataSource<Devices>;

  @Input()
  productKey: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;

  constructor(private viewCommunicationService: AdminViewCommunicationService,
              private deviceApiService: DeviceApiService,
              private deviceService: DeviceService) {
    this.productKey = '';
    this.dataSource = new MatTableDataSource<Devices>();
    this.sort = new MatSort();
    this.paginator = null;
  }

  ngOnInit(): void {
    this.loadDevicesInList();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadDevicesInList(): Subscription {
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
      this.dataSource = new MatTableDataSource<Devices>(this.devices);
      this.sort.sort({
        id: 'name',
        start: 'asc',
        disableClear: false
      });
      this.dataSource.sort = this.sort;
    });
  }

  modifyDevice(deviceKey: string): void {
    this.deviceService.changeSelectedExecutive(deviceKey);
    this.viewCommunicationService.changeCurrentView('deviceDetails');
  }

  deleteDevice(deviceKey: string): void {
    console.log(deviceKey);
  }

  addDevice(): void {
    this.viewCommunicationService.changeCurrentView('addDevice');
  }
}
