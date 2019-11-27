import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ExecutiveTypeApiService} from '../../services/apiService/executive-type-api.service';

@Component({
  selector: 'app-executive-type',
  templateUrl: './executive-type.component.html',
  styleUrls: ['./executive-type.component.scss']
})
export class ExecutiveTypeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'actions'];
  executiveType: any = [];
  dataSource: MatTableDataSource<string>;
  height: number;

  @Input()
  productKey: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private executiveTypeApiService: ExecutiveTypeApiService) {
  }

  ngOnInit() {
    this.loadExecutiveTypesList();
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

  loadExecutiveTypesList() {
    return this.executiveTypeApiService.getExecutiveTypes(this.productKey).subscribe((data) => {
      this.executiveType = data.map(x => {
        return {name: x};
      });
      this.dataSource = new MatTableDataSource<string>(this.executiveType);
      this.sort.sort({
        id: 'deviceKey',
        start: 'asc',
        disableClear: false
      });
      this.dataSource.sort = this.sort;
    });
  }

  deleteExecutiveType(typeName: string) {
    console.log(typeName);
  }
}
