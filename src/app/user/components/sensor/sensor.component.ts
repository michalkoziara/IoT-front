import {Component, Input, OnInit} from '@angular/core';
import {ViewCommunicationService} from '../../services/viewCommunicationService/view-communication.service';
import {SensorsApiService} from '../../services/apiService/sensors-api.service';
import {Sensor} from '../../models/sensor/sensor';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit {
  sensor: Sensor;

  @Input()
  productKey: string;

  @Input()
  deviceKey: string;

  constructor(private sensorsApiService: SensorsApiService,
              private viewCommunicationService: ViewCommunicationService) {
  }

  ngOnInit() {
    this.getSensor();
  }

  getSensor() {
    this.sensorsApiService.getSensor(
      this.productKey,
      this.deviceKey
    ).subscribe(
      data => {
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

        if (data.readingValue === true) {
          data.readingValue = 'Tak';
        }

        if (data.readingValue === false) {
          data.readingValue = 'Nie';
        }
        this.sensor = data;
      }
    );
  }
}
