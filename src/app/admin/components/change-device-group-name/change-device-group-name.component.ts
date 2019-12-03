import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-change-device-group-name',
  templateUrl: './change-device-group-name.component.html',
  styleUrls: ['./change-device-group-name.component.scss']
})
export class ChangeDeviceGroupNameComponent {

  @Input()
  productKey: string;

  constructor() {
    this.productKey = '';
  }
}
