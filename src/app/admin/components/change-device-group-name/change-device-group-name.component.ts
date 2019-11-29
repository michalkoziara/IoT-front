import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-change-device-group-name',
  templateUrl: './change-device-group-name.component.html',
  styleUrls: ['./change-device-group-name.component.scss']
})
export class ChangeDeviceGroupNameComponent implements OnInit {

  @Input()
  productKey: string;

  constructor() {
  }

  ngOnInit() {
  }

}
