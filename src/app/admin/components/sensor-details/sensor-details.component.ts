import {Component, Input, OnInit} from '@angular/core';
import {SensorDetails} from '../../models/sensor-details';
import {SensorApiService} from '../../services/apiService/sensor-api.service';

@Component({
  selector: 'app-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.scss']
})
export class SensorDetailsComponent implements OnInit {
  sensor: SensorDetails | null;

  @Input()
  productKey: string;

  @Input()
  deviceKey: string;

  constructor(private sensorsApiService: SensorApiService) {
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
