import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserGroupsApiService} from '../../services/apiService/user-groups-api.service';
import {UserGroupInList} from '../../models/user-group-in-list/user-group-in-list';
import {UserGroupsService} from '../../services/userGroupsService/user-groups.service';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.scss']
})
export class UserGroupsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'sensor', 'executive', 'formula'];
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
          return x.isAssignedTo;
        }, {})
        .map(x => {
          return new UserGroupInList(x.name, x.isAssignedTo);
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

  addUserGroup(): void {
    this.viewCommunicationService.changeCurrentView('createUserGroup');
  }

  joinUserGroup(): void {
    this.viewCommunicationService.changeCurrentView('joiningUserGroupsInDevice');
  }

  sensorsClicked(name: string): void {
    this.userGroupsService.changeSelectedUserGroup(name);
    this.viewCommunicationService.changeCurrentView('sensorsInUserGroup');
  }

  executivesClicked(name: string): void {
    this.userGroupsService.changeSelectedUserGroup(name);
    this.viewCommunicationService.changeCurrentView('executivesInUserGroup');
  }

  formulasClicked(name: string): void {
    this.userGroupsService.changeSelectedUserGroup(name);
    this.viewCommunicationService.changeCurrentView('formulasInUserGroup');
  }
}
