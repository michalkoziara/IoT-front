import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-delete-device-group',
  templateUrl: './delete-device-group.component.html',
  styleUrls: ['./delete-device-group.component.scss']
})
export class DeleteDeviceGroupComponent {
  @Input()
  productKey: string;

  constructor() {
    this.productKey = '';
  }
}
