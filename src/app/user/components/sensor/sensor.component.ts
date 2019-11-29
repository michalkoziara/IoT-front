import {Component, Input, OnInit} from '@angular/core';
import {SensorsApiService} from '../../services/apiService/sensors-api.service';
import {Sensor} from '../../models/sensor/sensor';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit {
  sensor: Sensor | null;

  @Input()
  productKey: string;

  @Input()
  deviceKey: string;

  constructor(private sensorsApiService: SensorsApiService) {
    this.sensor = null;
    this.productKey = '';
    this.deviceKey = '';
  }

  ngOnInit(): void {
    this.getSensor();
  }

  getSensor(): void {
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
