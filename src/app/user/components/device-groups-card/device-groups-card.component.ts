import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DeviceGroupsApiService} from '../../services/apiService/device-groups-api.service';
import {DeviceGroupInList} from '../../models/device-group-in-list/device-group-in-list';
import {WelcomeService} from '../../services/welcomeService/welcome.service';
import {DeviceGroupsService} from '../../services/deviceGroupsService/device-groups.service';

@Component({
  selector: 'app-device-groups-card',
  templateUrl: './device-groups-card.component.html',
  styleUrls: ['./device-groups-card.component.scss']
})
export class DeviceGroupsCardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'productKey', 'actions'];
  deviceGroups: any = [];
  dataSource: MatTableDataSource<DeviceGroupInList>;
  height: number;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private deviceGroupsApi: DeviceGroupsApiService,
              private welcomeService: WelcomeService,
              private deviceGroupService: DeviceGroupsService) {
  }

  ngOnInit() {
    this.loadDeviceGroupsInList();
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

  loadDeviceGroupsInList() {
    return this.deviceGroupsApi.getDeviceGroups().subscribe((data) => {
      this.deviceGroups = data;
      this.dataSource = new MatTableDataSource<DeviceGroupInList>(this.deviceGroups);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  userGroupClicked(productKey: string) {
    this.deviceGroupService.changeSelectedDeviceGroup(productKey);
    this.welcomeService.changeIsGetDeviceGroupListButtonClick(false);
  }

  addNewDeviceGroup() {
    this.welcomeService.changeIsGetDeviceGroupListButtonClick(false);
    this.welcomeService.changeIsAddDeviceGroupButtonClick(true);
  }
}
