import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserGroupInList} from '../../models/user-group-in-list';
import {UserGroupApiService} from '../../services/apiService/user-group-api.service';
import {AdminWelcomeService} from '../../services/adminWelcomeService/admin-welcome.service';
import {UserGroupService} from '../../services/user-group.service';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  userGroups: any = [];
  dataSource: MatTableDataSource<UserGroupInList>;
  height: number;

  @Input()
  productKey: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userGroupApi: UserGroupApiService,
              private welcomeService: AdminWelcomeService,
              private userGroupService: UserGroupService
  ) {
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
    return this.userGroupApi.getUserGroups(this.productKey).subscribe((data) => {
      this.userGroups = data;
      this.dataSource = new MatTableDataSource<UserGroupInList>(this.userGroups);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteUserGroup(userGroupName: string) {
    console.log(userGroupName);
  }


}
