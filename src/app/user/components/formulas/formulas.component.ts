import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormulasApiService} from '../../services/apiService/formulas-api.service';

@Component({
  selector: 'app-formulas',
  templateUrl: './formulas.component.html',
  styleUrls: ['./formulas.component.scss']
})
export class FormulasComponent implements OnInit {
  displayedColumns: string[] = ['name', 'view'];
  formulas: any = [];
  dataSource: MatTableDataSource<{ 'name': string }>;
  height: number;

  @Input()
  productKey: string;

  @Input()
  userGroupName: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private formulasApiService: FormulasApiService) {
  }

  ngOnInit() {
    this.loadFormulasInList();
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

  loadFormulasInList() {
    return this.formulasApiService.getFormulas(this.productKey, this.userGroupName).subscribe((data) => {
      this.formulas = data.names.map(
        x => {
          return {name: x};
        }
      );
      this.dataSource = new MatTableDataSource<{ 'name': string }>(this.formulas);
      this.dataSource.paginator = this.paginator;
      this.sort.sort({
        id: 'name',
        start: 'asc',
        disableClear: false
      });
      this.dataSource.sort = this.sort;
    });
  }

  viewFormula(name: string) {
    console.log();
  }

  createFormula() {
    console.log();
  }
}
