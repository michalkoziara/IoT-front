import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  position: number;
  name: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', symbol: 'H'},
  {position: 2, name: 'Helium', symbol: 'He'},
  {position: 3, name: 'Lithium', symbol: 'Li'},
  {position: 4, name: 'Beryllium', symbol: 'Be'},
  {position: 5, name: 'Boron', symbol: 'B'},
  {position: 6, name: 'Carbon', symbol: 'C'},
  {position: 7, name: 'Nitrogen', symbol: 'N'},
  {position: 8, name: 'Oxygen', symbol: 'O'},
  {position: 9, name: 'Fluorine', symbol: 'F'},
  {position: 10, name: 'Neon', symbol: 'Ne'},
];

@Component({
  selector: 'app-device-groups-card',
  templateUrl: './device-groups-card.component.html',
  styleUrls: ['./device-groups-card.component.scss']
})
export class DeviceGroupsCardComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
