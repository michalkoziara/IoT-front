import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ExecutivesApiService} from '../../services/apiService/executives-api.service';
import {ExecutiveInList} from '../../models/executive-in-list/executive-in-list';
import {ExecutivesService} from '../../services/executivesService/executives.service';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';

@Component({
  selector: 'app-unassigned-executives',
  templateUrl: './unassigned-executives.component.html',
  styleUrls: ['./unassigned-executives.component.scss']
})
export class UnassignedExecutivesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'isActive', 'view', 'add'];
  executives: any = [];
  dataSource: MatTableDataSource<ExecutiveInList>;
  height: number;

  @Input()
  productKey: string;

  @Input()
  userGroupName: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private executivesApiService: ExecutivesApiService,
              private executivesService: ExecutivesService,
              private viewCommunicationService: ViewCommunicationService) {
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

  viewExecutive(deviceKey: string, deviceName: string) {
    this.executivesService.changeSelectedExecutive(deviceKey);
    this.executivesService.changeSelectedExecutiveName(deviceName);
    this.viewCommunicationService.changeCurrentView('showExecutive');
  }

  addExecutive(deviceKey: string) {
    console.log();
  }
}
