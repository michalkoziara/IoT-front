import {Component, Input, OnInit} from '@angular/core';
import {DeviceDetails} from '../../models/device-details';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit {

  executive: DeviceDetails | null;

  @Input()
  productKey: string;

  @Input()
  deviceKey: string;

  constructor() {
    this.executive = null;
    this.productKey = '';
    this.deviceKey = '';
  }

  ngOnInit() {
  }

}
