import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ExecutiveTypeApiService} from '../../services/apiService/executive-type-api.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-executive-type',
  templateUrl: './executive-type.component.html',
  styleUrls: ['./executive-type.component.scss']
})
export class ExecutiveTypeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  executiveType: { name: string }[] = [];
  dataSource: MatTableDataSource<{ name: string }>;

  @Input()
  productKey: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;


  constructor(private executiveTypeApiService: ExecutiveTypeApiService) {
    this.dataSource = new MatTableDataSource<{ name: string }>();
    this.productKey = '';
    this.sort = new MatSort();
    this.paginator = null;
  }

  ngOnInit(): void {
    this.loadExecutiveTypesList();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadExecutiveTypesList(): Subscription {
    return this.executiveTypeApiService.getExecutiveTypes(this.productKey).subscribe((data) => {
      this.executiveType = data.map(x => {
        return {name: x};
      });
      this.dataSource = new MatTableDataSource<{ name: string }>(this.executiveType);
      this.sort.sort({
        id: 'deviceKey',
        start: 'asc',
        disableClear: false
      });
      this.dataSource.sort = this.sort;
    });
  }

  deleteExecutiveType(typeName: string): void {
    console.log(typeName);
  }
}
