import {Component, Input, OnInit} from '@angular/core';
import {DeviceDetails} from '../../models/device-details';
import {DeviceApiService} from '../../services/apiService/device-api.service'

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

  constructor(private deviceApiService: DeviceApiService) {
    this.executive = null;
    this.productKey = '';
    this.deviceKey = '';
  }

  ngOnInit() {
    this.getDeviceDetails();
  }

  getDeviceDetails(): void {
    this.deviceApiService.getExecutive(
      this.productKey,
      this.deviceKey
    ).subscribe(
      data => {
        if (data.state === true) {
          data.state = 'Podstawowy';
        }

        if (data.state === false) {
          data.state = 'Alternatywny';
        }

        if (data.isUpdated === true) {
          data.isUpdated = 'Tak';
        }

        if (data.isUpdated === false) {
          data.isUpdated = 'Nie';
        }

        if (data.isActive === true) {
          data.isActive = 'Tak';
        }

        if (data.isActive === false) {
          data.isActive = 'Nie';
        }

        if (data.positiveState === true) {
          data.positiveState = 'Tak';
        }

        if (data.positiveState === false) {
          data.positiveState = 'Nie';
        }

        if (data.negativeState === true) {
          data.negativeState = 'Tak';
        }

        if (data.negativeState === false) {
          data.negativeState = 'Nie';
        }

        if (data.isFormulaUsed === true) {
          data.isFormulaUsed = 'Tak';
        }

        if (data.isFormulaUsed === false) {
          data.isFormulaUsed = 'Nie';
        }

        if (data.defaultState === true) {
          data.defaultState = 'Tak';
        }

        if (data.defaultState === false) {
          data.defaultState = 'Nie';
        }

        this.executive = data;
      }
    );
  }
}
