import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ExecutiveInUserGroup} from '../../models/executive-in-user-group/executive-in-user-group';
import {ExecutivesApiService} from '../../services/apiService/executives-api.service';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';
import {ExecutivesService} from '../../services/executivesService/executives.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-executives',
  templateUrl: './executives.component.html',
  styleUrls: ['./executives.component.scss']
})
export class ExecutivesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'state', 'isActive', 'formulaName', 'isFormulaUsed', 'view'];
  executives: ExecutiveInUserGroup[] = [];
  dataSource: MatTableDataSource<ExecutiveInUserGroup>;

  @Input()
  productKey: string;

  @Input()
  userGroupName: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;

  constructor(private viewCommunicationService: ViewCommunicationService,
              private executivesApiService: ExecutivesApiService,
              private executivesService: ExecutivesService) {
    this.dataSource = new MatTableDataSource<ExecutiveInUserGroup>();
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
    return this.executivesApiService.getExecutives(this.productKey, this.userGroupName).subscribe((data) => {
      this.executives = data.map(
        x => {
          if (x.state === true) {
            x.state = 'Podstawowy';
          }

          if (x.state === false) {
            x.state = 'Alternatywny';
          }

          if (x.isFormulaUsed === true) {
            x.isFormulaUsed = 'Tak';
          }

          if (x.isFormulaUsed === false) {
            x.isFormulaUsed = 'Nie';
          }

          if (x.isActive === true) {
            x.isActive = 'Tak';
          }

          if (x.isActive === false) {
            x.isActive = 'Nie';
          }
          return x;
        }
      );
      this.dataSource = new MatTableDataSource<ExecutiveInUserGroup>(this.executives);
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

  addExecutive(): void {
    this.viewCommunicationService.changeCurrentView('listUnassignedExecutives');
  }
}
