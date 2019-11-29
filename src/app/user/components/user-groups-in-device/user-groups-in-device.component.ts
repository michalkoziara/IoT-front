import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserGroupInList} from '../../models/user-group-in-list/user-group-in-list';
import {UserGroupsApiService} from '../../services/apiService/user-groups-api.service';
import {UserGroupsService} from '../../services/userGroupsService/user-groups.service';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-groups-in-device',
  templateUrl: './user-groups-in-device.component.html',
  styleUrls: ['./user-groups-in-device.component.scss']
})
export class UserGroupsInDeviceComponent implements OnInit {
  displayedColumns: string[] = ['name', 'join'];
  userGroups: UserGroupInList[] = [];
  dataSource: MatTableDataSource<UserGroupInList>;

  @Input()
  productKey: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;

  constructor(private userGroupsApiService: UserGroupsApiService,
              private userGroupsService: UserGroupsService,
              private viewCommunicationService: ViewCommunicationService) {
    this.dataSource = new MatTableDataSource<UserGroupInList>();
    this.productKey = '';
    this.sort = new MatSort();
    this.paginator = null;
  }

  ngOnInit(): void {
    this.loadUserGroupsInList();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadUserGroupsInList(): Subscription {
    return this.userGroupsApiService.getUserGroups(this.productKey).subscribe((data) => {
      this.userGroups = data.userGroups
        .filter(x => {
          return (!x.isAssignedTo);
        }, {})
        .map(x => {
          return new UserGroupInList(
            x.name,
            x.isAssignedTo
          );
        }, {});
      this.dataSource = new MatTableDataSource<UserGroupInList>(this.userGroups);
      this.dataSource.paginator = this.paginator;
      this.sort.sort({
        id: 'name',
        start: 'asc',
        disableClear: false
      });
      this.dataSource.sort = this.sort;
    });
  }

  joinUserGroup(name: string): void {
    this.userGroupsService.changeSelectedJoiningUserGroup(name);
    this.viewCommunicationService.changeCurrentView('joiningUserGroup');
  }
}
