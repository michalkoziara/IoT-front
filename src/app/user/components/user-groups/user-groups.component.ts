import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserGroupsApiService} from '../../services/apiService/user-groups-api.service';
import {UserGroupInList} from '../../models/user-group-in-list/user-group-in-list';
import {UserGroupsService} from '../../services/userGroupsService/user-groups.service';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.scss']
})
export class UserGroupsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'sensor', 'executive', 'formula'];
  userGroups: any = [];
  dataSource: MatTableDataSource<UserGroupInList>;
  height: number;

  @Input()
  productKey: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userGroupsApiService: UserGroupsApiService,
              private userGroupsService: UserGroupsService) {
  }

  ngOnInit() {
    this.loadUserGroupsInList();
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

  loadUserGroupsInList() {
    return this.userGroupsApiService.getUserGroups(this.productKey).subscribe((data) => {
      this.userGroups = data.map(x => {
        const userGroup = new UserGroupInList();
        userGroup.name = x;
        return userGroup;
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

  addUserGroup() {
    console.log();
  }

  joinUserGroup() {
    console.log();
  }

  sensorsClicked(name: string) {
    this.userGroupsService.changeSelectedUserGroup(name);
    this.userGroupsService.changeSelectedSensorsInUserGroup(true);
  }

  executivesClicked(name: string) {
    this.userGroupsService.changeSelectedUserGroup(name);
    this.userGroupsService.changeSelectedExecutivesInUserGroup(true);
  }

  formulasClicked(name: string) {
    this.userGroupsService.changeSelectedUserGroup(name);
    this.userGroupsService.changeSelectedFormulasInUserGroup(true);
  }
}
