import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ExecutivesApiService} from '../../services/apiService/executives-api.service';
import {ExecutiveInList} from '../../models/executive-in-list/executive-in-list';
import {ExecutivesService} from '../../services/executivesService/executives.service';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-unassigned-executives',
  templateUrl: './unassigned-executives.component.html',
  styleUrls: ['./unassigned-executives.component.scss']
})
export class UnassignedExecutivesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'isActive', 'view', 'add'];
  executives: ExecutiveInList[] = [];
  dataSource: MatTableDataSource<ExecutiveInList>;

  @Input()
  productKey: string;

  @Input()
  userGroupName: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;

  constructor(private executivesApiService: ExecutivesApiService,
              private executivesService: ExecutivesService,
              private viewCommunicationService: ViewCommunicationService,
              private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<ExecutiveInList>();
    this.productKey = '';
    this.userGroupName = '';
    this.sort = new MatSort();
    this.paginator = null;
  }

  ngOnInit(): void {
    this.loadExecutivesInList();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadExecutivesInList(): Subscription {
    return this.executivesApiService.getUnassignedExecutives(this.productKey).subscribe((data) => {
      this.executives = data.map(
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
      this.dataSource = new MatTableDataSource<ExecutiveInList>(this.executives);
      this.dataSource.paginator = this.paginator;
      this.sort.sort({
        id: 'name',
        start: 'asc',
        disableClear: false
      });
      this.dataSource.sort = this.sort;
    });
  }

  viewExecutive(deviceKey: string, deviceName: string): void {
    this.executivesService.changeSelectedExecutive(deviceKey);
    this.executivesService.changeSelectedExecutiveName(deviceName);
    this.viewCommunicationService.changeCurrentView('showExecutive');
  }

  addExecutive(deviceKey: string): void {
    this.executivesApiService.getExecutive(this.productKey, deviceKey).subscribe(
      (data) => {
        this.executivesApiService.modifyExecutive(
          {
            name: data.name,
            typeName: data.deviceTypeName,
            state: data.state,
            positiveState: data.positiveState,
            negativeState: data.negativeState,
            formulaName: data.formulaName,
            userGroupName: this.userGroupName,
            isFormulaUsed: data.isFormulaUsed as boolean
          },
          this.productKey,
          deviceKey)
          .subscribe(() => {
            this.viewCommunicationService.changeCurrentView('executivesInUserGroup');
          },
          () => {
            this.snackBar.open('Wystąpił błąd poczas dodawania, spróbuj ponownie', undefined, {duration: 3000});
          });
      });
  }
}
