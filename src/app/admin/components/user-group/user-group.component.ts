import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserGroupInList} from '../../models/user-group-in-list';
import {UserGroupApiService} from '../../services/apiService/user-group-api.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DeleteUserGroupDialogComponent} from '../delete-user-group-dialog/delete-user-group-dialog.component';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  userGroups: UserGroupInList[] = [];
  dataSource: MatTableDataSource<UserGroupInList>;

  @Input()
  productKey: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;

  constructor(private userGroupApi: UserGroupApiService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
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
    return this.userGroupApi.getUserGroups(this.productKey).subscribe((data) => {
      this.userGroups = data.userGroups;
      this.dataSource = new MatTableDataSource<UserGroupInList>(this.userGroups);
      this.sort.sort({
        id: 'name',
        start: 'asc',
        disableClear: false
      });
      this.dataSource.sort = this.sort;
    });
  }

  deleteUserGroup(userGroupName: string): void {
    const dialogRef = this.dialog.open(DeleteUserGroupDialogComponent);
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        this.userGroupApi.deleteUserGroup(this.productKey, userGroupName).pipe().subscribe(
          data => {
            console.log('User group was deleted');
          },
          error => {
            this.snackBar.open('Wystąpił błąd poczas usuwania grupy urządzeń spróbuj ponownie', undefined, {duration: 2000});
          }
        );
      }
    });
  }
}
