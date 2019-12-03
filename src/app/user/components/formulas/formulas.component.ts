import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormulasApiService} from '../../services/apiService/formulas-api.service';
import {Subscription} from 'rxjs';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';
import {FormulasService} from '../../services/formulasService/formulas.service';

@Component({
  selector: 'app-formulas',
  templateUrl: './formulas.component.html',
  styleUrls: ['./formulas.component.scss']
})
export class FormulasComponent implements OnInit {
  displayedColumns: string[] = ['name', 'view'];
  formulas: { name: string }[] = [];
  dataSource: MatTableDataSource<{ 'name': string }>;

  @Input()
  productKey: string;

  @Input()
  userGroupName: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;

  constructor(private formulasApiService: FormulasApiService,
              private viewCommunicationService: ViewCommunicationService,
              private formulasService: FormulasService) {
    this.dataSource = new MatTableDataSource<{ name: string }>();
    this.productKey = '';
    this.userGroupName = '';
    this.sort = new MatSort();
    this.paginator = null;
  }

  ngOnInit(): void {
    this.loadFormulasInList();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadFormulasInList(): Subscription {
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

  viewFormula(name: string): void {
    this.formulasService.changeSelectedFormula(name);
    this.viewCommunicationService.changeCurrentView('showFormula');
  }

  createFormula(): void {
    this.viewCommunicationService.changeCurrentView('addFormula');
  }
}
