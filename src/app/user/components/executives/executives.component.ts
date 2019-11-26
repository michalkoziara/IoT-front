import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ExecutiveInUserGroup} from '../../models/executive-in-user-group/executive-in-user-group';
import {ExecutivesApiService} from '../../services/apiService/executives-api.service';

@Component({
  selector: 'app-executives',
  templateUrl: './executives.component.html',
  styleUrls: ['./executives.component.scss']
})
export class ExecutivesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'state', 'isActive', 'formulaName', 'isFormulaUsed', 'view'];
  executives: any = [];
  dataSource: MatTableDataSource<ExecutiveInUserGroup>;
  height: number;

  @Input()
  productKey: string;

  @Input()
  userGroupName: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private executivesApiService: ExecutivesApiService) {
  }

  ngOnInit() {
    this.loadExecutivesInList();
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

  loadExecutivesInList() {
    return this.executivesApiService.getExecutives(this.productKey, this.userGroupName).subscribe((data) => {
      this.executives = data.map(
        x => {
          if (x.state === 'true') {
            x.state = 'Podstawowy';
          }

          if (x.state === 'false') {
            x.state = 'Alternatywny';
          }

          if (x.isFormulaUsed === 'true') {
            x.isFormulaUsed = 'Tak';
          }

          if (x.isFormulaUsed === 'false') {
            x.isFormulaUsed = 'Nie';
          }

          if (x.isActive === 'true') {
            x.isActive = 'Tak';
          }

          if (x.isActive === 'false') {
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

  viewExecutive(deviceKey: string) {
    console.log();
  }

  addExecutive() {
    console.log();
  }
}
