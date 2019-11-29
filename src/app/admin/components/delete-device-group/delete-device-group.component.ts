import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-delete-device-group',
  templateUrl: './delete-device-group.component.html',
  styleUrls: ['./delete-device-group.component.scss']
})
export class DeleteDeviceGroupComponent implements OnInit {
  @Input()
  productKey: string;

  constructor() { }

  ngOnInit() {
  }

}
