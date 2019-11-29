import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DeviceGroupsApiService} from '../../services/apiService/device-groups-api.service';
import {DeviceGroupInList} from '../../models/device-group-in-list/device-group-in-list';
import {DeviceGroupsService} from '../../services/deviceGroupsService/device-groups.service';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-device-groups-card',
  templateUrl: './device-groups-card.component.html',
  styleUrls: ['./device-groups-card.component.scss']
})
export class DeviceGroupsCardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'productKey', 'actions'];
  deviceGroups: DeviceGroupInList[] = [];
  dataSource: MatTableDataSource<DeviceGroupInList>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;

  constructor(private viewCommunicationService: ViewCommunicationService,
              private deviceGroupsApi: DeviceGroupsApiService,
              private deviceGroupService: DeviceGroupsService) {
    this.dataSource = new MatTableDataSource<DeviceGroupInList>();
    this.sort = new MatSort();
    this.paginator = null;
  }

  ngOnInit(): void {
    this.loadDeviceGroupsInList();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadDeviceGroupsInList(): Subscription {
    return this.deviceGroupsApi.getDeviceGroups().subscribe((data) => {
      this.deviceGroups = data;
      this.dataSource = new MatTableDataSource<DeviceGroupInList>(this.deviceGroups);
      this.dataSource.paginator = this.paginator;
      this.sort.sort({
        id: 'name',
        start: 'asc',
        disableClear: false
      });
      this.dataSource.sort = this.sort;
    });
  }

  userGroupClicked(productKey: string): void {
    this.deviceGroupService.changeSelectedDeviceGroup(productKey);
    this.viewCommunicationService.changeCurrentView('userGroupAssignedToList');
  }

  addNewDeviceGroup(): void {
    this.viewCommunicationService.changeCurrentView('addNewDeviceGroup');
  }
}
