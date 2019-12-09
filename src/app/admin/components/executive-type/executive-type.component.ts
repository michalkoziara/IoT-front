import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ExecutiveTypeApiService} from '../../services/apiService/executive-type-api.service';
import {Subscription} from 'rxjs';
import {ExecutiveType} from '../../models/executive-type';
import {AdminViewCommunicationService} from '../../services/adminViewCommunicationService/admin-view-communication.service';

@Component({
  selector: 'app-executive-type',
  templateUrl: './executive-type.component.html',
  styleUrls: ['./executive-type.component.scss']
})
export class ExecutiveTypeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  executiveTypes: { name: string }[] = [];
  dataSource: MatTableDataSource<{ name: string }>;

  executiveType: ExecutiveType | null;

  @Input()
  productKey: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;


  constructor(private executiveTypeApiService: ExecutiveTypeApiService,
              private viewCommunicationService: AdminViewCommunicationService) {
    this.dataSource = new MatTableDataSource<{ name: string }>();
    this.productKey = '';
    this.sort = new MatSort();
    this.paginator = null;

    this.executiveType = null;
  }

  ngOnInit(): void {
    this.loadExecutiveTypesList();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadExecutiveTypesList(): Subscription {
    return this.executiveTypeApiService.getExecutiveTypes(this.productKey).subscribe((data) => {
      this.executiveTypes = data.map(x => {
        return {name: x};
      });
      this.dataSource = new MatTableDataSource<{ name: string }>(this.executiveTypes);
      this.sort.sort({
        id: 'deviceKey',
        start: 'asc',
        disableClear: false
      });
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  getExecutiveType(typeName: string): void {
    this.executiveTypeApiService.getExecutiveType(
      this.productKey,
      typeName
    ).subscribe(
      data => {
        if (data.stateType) {
          if (data.stateType === 'Decimal') {
            data.stateType = 'Liczbowy';
          } else if (data.stateType === 'Enum') {
            data.stateType = 'Wyliczeniowy';
          } else {
            data.stateType = 'Logiczny';
          }
        }

        if (data.defaultState === true) {
          data.defaultState = 'Alternatywny';
        }

        if (data.defaultState === false) {
          data.defaultState = 'Podstawowy';
        }

        this.executiveType = data;
      }
    );
  }

  viewExecutiveType(typeName: string): void {
    this.getExecutiveType(typeName);
  }

  addExecutiveType(): void {
    this.viewCommunicationService.changeCurrentView('addExecutiveType');
  }
}
